import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Cycles "mo:base/ExperimentalCycles";

persistent actor ZubazStorage {
    
    // Data Types (matching your current TypeScript interfaces)
    public type User = {
        id: Text;
        email: Text;
        name: Text;
        userType: Text; // "client" or "developer"
        authId: Text;   // Auth0 user ID
    };
    
    public type Project = {
        id: Text;
        name: Text;
        url: Text;
        adminUrl: ?Text;
        developerId: Text;
        clientId: ?Text;
        thumbnail: ?Text;
        projectType: Text;
        status: Text;
        clientDashboardUrl: ?Text;
        deadline: ?Text;
        createdAt: Int;
    };
    
    // OLD Client type (for migration from V1 - project IDs only)
    type ClientV1 = {
        id: Text;
        name: Text;
        email: Text;
        projects: [Text];
        developerId: Text;
        createdAt: Int;
    };
    
    // OLD Client type (for migration from V2 - with metadata but still project IDs)
    type ClientV2 = {
        id: Text;
        name: Text;
        email: Text;
        projects: [Text];
        developerId: Text;
        websiteUrl: ?Text;
        dashboardUrl: ?Text;
        category: ?Text;
        createdAt: Int;
    };
    
    // NEW Client type (current version - V3 with full project objects)
    public type Client = {
        id: Text;
        name: Text;
        email: Text;
        phone: ?Text;               // Client phone number
        contactPerson: ?Text;       // Best person to contact
        profileImage: ?Text;        // Client profile image URL
        projects: [Project];        // ✅ FIXED: Now stores full Project objects
        developerId: Text;
        websiteUrl: ?Text;          // Thumbnail URL for display
        originalWebsiteUrl: ?Text;  // Actual website URL for clicking
        dashboardUrl: ?Text;        // Client dashboard URL slug
        category: ?Text;            // Business category
        createdAt: Int;
    };
    
    // BLOB STORAGE TYPES
    public type Asset = {
        id: Text;
        data: Blob;
        contentType: Text;
        filename: Text;
        size: Nat;
        uploadedBy: Text; // User ID
        createdAt: Int;
    };
    
    // DOCUMENT STORAGE TYPE
    public type Document = {
        id: Text;
        fileName: Text;
        fileSize: Nat;
        clientId: Text;
        developerId: Text;
        uploadedAt: Int;
    };

    // DASHBOARD CONTENT TYPES
    public type ResourceLink = {
        name: Text;
        url: Text;
    };

    public type Resource = {
        id: Text;
        clientId: Text;
        developerId: Text;
        resourceType: Text;
        title: Text;
        links: [ResourceLink];
        createdAt: Int;
    };

    public type TimelineUpdate = {
        id: Text;
        clientId: Text;
        developerId: Text;
        updateType: Text;
        title: Text;
        content: Text;
        actionItems: [Text];
        status: Text;
        createdAt: Int;
    };

    public type Rating = {
        id: Text;
        clientId: Text;
        developerId: Text;
        rating: Nat;
        feedback: Text;
        createdAt: Int;
    };

    // Stable storage (persists across canister upgrades)
    private stable var usersEntries : [(Text, User)] = [];
    private stable var projectsEntries : [(Text, Project)] = [];
    private stable var clientsEntries : [(Text, ClientV1)] = [];  // Keep as V1 for compatibility
    private stable var assetsEntries : [(Text, Asset)] = [];
    private stable var documentsEntries : [(Text, Document)] = [];
    private stable var resourcesEntries : [(Text, Resource)] = [];
    private stable var timelineEntries : [(Text, TimelineUpdate)] = [];
    private stable var ratingsEntries : [(Text, Rating)] = [];
    
    // Runtime HashMaps for fast access
    private transient var users = HashMap.fromIter<Text, User>(usersEntries.vals(), 10, Text.equal, Text.hash);
    private transient var projects = HashMap.fromIter<Text, Project>(projectsEntries.vals(), 50, Text.equal, Text.hash);
    private transient var clients = HashMap.HashMap<Text, Client>(50, Text.equal, Text.hash);  // Initialize empty, will populate in postupgrade
    private transient var assets = HashMap.fromIter<Text, Asset>(assetsEntries.vals(), 100, Text.equal, Text.hash);
    private transient var documents = HashMap.fromIter<Text, Document>(documentsEntries.vals(), 100, Text.equal, Text.hash);
    private transient var resources = HashMap.HashMap<Text, Resource>(100, Text.equal, Text.hash);
    private transient var timeline = HashMap.HashMap<Text, TimelineUpdate>(100, Text.equal, Text.hash);
    private transient var ratings = HashMap.HashMap<Text, Rating>(100, Text.equal, Text.hash);

    // System functions for stable storage
    system func preupgrade() {
        usersEntries := Iter.toArray(users.entries());
        projectsEntries := Iter.toArray(projects.entries());
        
        // Store clients in V1 format for compatibility (convert full projects back to IDs)
        let clientsArray = Iter.toArray(clients.entries());
        clientsEntries := Array.map<(Text, Client), (Text, ClientV1)>(
            clientsArray,
            func((id, client): (Text, Client)) : (Text, ClientV1) {
                // Extract project IDs from full project objects
                let projectIds = Array.map<Project, Text>(
                    client.projects,
                    func(project: Project) : Text { project.id }
                );
                (id, {
                    id = client.id;
                    name = client.name;
                    email = client.email;
                    projects = projectIds;
                    developerId = client.developerId;
                    createdAt = client.createdAt;
                })
            }
        );
        
        assetsEntries := Iter.toArray(assets.entries());
        documentsEntries := Iter.toArray(documents.entries());
        resourcesEntries := Iter.toArray(resources.entries());
        timelineEntries := Iter.toArray(timeline.entries());
        ratingsEntries := Iter.toArray(ratings.entries());
    };

    system func postupgrade() {
        // Migrate old clients (V1 with IDs only) to new format (V3 with full objects)
        if (clientsEntries.size() > 0) {
            let migratedClients = Array.map<(Text, ClientV1), (Text, Client)>(
                clientsEntries,
                func((id, oldClient): (Text, ClientV1)) : (Text, Client) {
                    // Convert project IDs to full project objects
                    let fullProjects = Array.mapFilter<Text, Project>(
                        oldClient.projects,
                        func(projectId: Text) : ?Project {
                            // Look up the full project from the projects HashMap
                            projects.get(projectId)
                        }
                    );
                    
                    (id, {
                        id = oldClient.id;
                        name = oldClient.name;
                        email = oldClient.email;
                        phone = null;               // V1 clients don't have this
                        contactPerson = null;       // V1 clients don't have this
                        profileImage = null;        // V1 clients don't have this
                        projects = fullProjects;  // ✅ Now full objects
                        developerId = oldClient.developerId;
                        websiteUrl = null;          // V1 clients don't have this
                        originalWebsiteUrl = null;  // V1 clients don't have this
                        dashboardUrl = null;        // V1 clients don't have this
                        category = null;            // V1 clients don't have this
                        createdAt = oldClient.createdAt;
                    })
                }
            );
            clients := HashMap.fromIter<Text, Client>(migratedClients.vals(), 50, Text.equal, Text.hash);
        };
        
        usersEntries := [];
        projectsEntries := [];
        clientsEntries := [];  // Clear after migration
        assetsEntries := [];
        documentsEntries := [];
        resourcesEntries := [];
        timelineEntries := [];
        ratingsEntries := [];
    };

    // USER MANAGEMENT
    public func createUser(user: User) : async Result.Result<User, Text> {
        switch (users.get(user.id)) {
            case (?existingUser) {
                #err("User already exists")
            };
            case null {
                users.put(user.id, user);
                #ok(user)
            };
        }
    };

    public query func getUser(userId: Text) : async ?User {
        users.get(userId)
    };

    public query func getUserByAuthId(authId: Text) : async ?User {
        // Find user by Auth0 ID
        for ((id, user) in users.entries()) {
            if (user.authId == authId) {
                return ?user;
            };
        };
        null
    };

    // PROJECT MANAGEMENT
    public func createProject(project: Project) : async Result.Result<Project, Text> {
        let projectWithTime = {
            id = project.id;
            name = project.name;
            url = project.url;
            adminUrl = project.adminUrl;
            developerId = project.developerId;
            clientId = project.clientId;
            thumbnail = project.thumbnail;
            projectType = project.projectType;
            status = project.status;
            clientDashboardUrl = project.clientDashboardUrl;
            deadline = project.deadline;
            createdAt = Time.now();
        };
        
        projects.put(project.id, projectWithTime);
        #ok(projectWithTime)
    };

    public query func getProjectsByDeveloper(developerId: Text) : async [Project] {
        let devProjects = Array.filter<Project>(
            Iter.toArray(projects.vals()),
            func(p: Project) : Bool { 
                if (p.status == "deleted") {
                    return false;
                };
                p.developerId == developerId
            }
        );
        devProjects
    };

    public query func getProjectsByClient(clientId: Text) : async [Project] {
        let clientProjects = Array.filter<Project>(
            Iter.toArray(projects.vals()),
            func(p: Project) : Bool { 
                if (p.status == "deleted") {
                    return false;
                };
                switch (p.clientId) {
                    case (?cId) { cId == clientId };
                    case null { false };
                }
            }
        );
        clientProjects
    };

    public query func getProjectByUrl(clientDashboardUrl: Text) : async ?Project {
        for (project in projects.vals()) {
            switch (project.clientDashboardUrl) {
                case (?url) {
                    if (url == clientDashboardUrl) {
                        return ?project;
                    };
                };
                case null {};
            };
        };
        null
    };

    public func updateProject(project: Project) : async Result.Result<Project, Text> {
        switch (projects.get(project.id)) {
            case (?existingProject) {
                projects.put(project.id, project);
                #ok(project)
            };
            case null {
                #err("Project not found")
            };
        }
    };

    // CLIENT MANAGEMENT
    public func createClient(client: Client) : async Result.Result<Client, Text> {
        let clientWithTime = {
            id = client.id;
            name = client.name;
            email = client.email;
            phone = client.phone;
            contactPerson = client.contactPerson;
            profileImage = client.profileImage;
            projects = client.projects;
            developerId = client.developerId;
            websiteUrl = client.websiteUrl;
            originalWebsiteUrl = client.originalWebsiteUrl;
            dashboardUrl = client.dashboardUrl;
            category = client.category;
            createdAt = Time.now();
        };
        
        clients.put(client.id, clientWithTime);
        #ok(clientWithTime)
    };

    public query func getClientsByDeveloper(developerId: Text) : async [Client] {
        let devClients = Array.filter<Client>(
            Iter.toArray(clients.vals()),
            func(c: Client) : Bool { 
                c.developerId == developerId
            }
        );
        devClients
    };

    public query func getClient(clientId: Text) : async ?Client {
        clients.get(clientId)
    };

    public func updateClient(client: Client) : async Result.Result<Client, Text> {
        switch (clients.get(client.id)) {
            case (?existingClient) {
                clients.put(client.id, client);
                #ok(client)
            };
            case null {
                #err("Client not found")
            };
        }
    };

    public func deleteClient(id: Text) : async () {
        switch (clients.remove(id)) {
            case null { };
            case (_) { };
        }
    };

    // UTILITY FUNCTIONS
    public query func getAllProjects() : async [Project] {
        Iter.toArray(projects.vals())
    };

    public query func getAllClients() : async [Client] {
        Iter.toArray(clients.vals())
    };

    public query func getAllUsers() : async [User] {
        Iter.toArray(users.vals())
    };

    // BLOB STORAGE FUNCTIONS
    public func uploadAsset(assetId: Text, data: Blob, contentType: Text, filename: Text, uploadedBy: Text) : async Result.Result<Text, Text> {
        let asset : Asset = {
            id = assetId;
            data = data;
            contentType = contentType;
            filename = filename;
            size = data.size();
            uploadedBy = uploadedBy;
            createdAt = Time.now();
        };
        
        assets.put(assetId, asset);
        #ok(assetId)
    };

    public query func getAsset(assetId: Text) : async ?Asset {
        assets.get(assetId)
    };

    public query func getAssetMetadata(assetId: Text) : async ?{id: Text; contentType: Text; filename: Text; size: Nat; uploadedBy: Text; createdAt: Int} {
        switch (assets.get(assetId)) {
            case (?asset) {
                ?{
                    id = asset.id;
                    contentType = asset.contentType;
                    filename = asset.filename;
                    size = asset.size;
                    uploadedBy = asset.uploadedBy;
                    createdAt = asset.createdAt;
                }
            };
            case null { null };
        }
    };

    public func deleteAsset(assetId: Text, userId: Text) : async Result.Result<Text, Text> {
        switch (assets.get(assetId)) {
            case (?asset) {
                if (asset.uploadedBy == userId) {
                    assets.delete(assetId);
                    #ok("Asset deleted successfully")
                } else {
                    #err("Unauthorized: You can only delete your own assets")
                }
            };
            case null {
                #err("Asset not found")
            };
        }
    };

    public query func listUserAssets(userId: Text) : async [Asset] {
        let userAssets = Array.filter<Asset>(Iter.toArray(assets.vals()), func(asset) {
            asset.uploadedBy == userId
        });
        userAssets
    };

    // CYCLE MANAGEMENT - Bulletproof Protection System
    
    // Business wallet (StynerDev-ICP-Wallet): wqbzq-4yaaa-aaaau-acppa-cai
    private let BUSINESS_WALLET_ID = "wqbzq-4yaaa-aaaau-acppa-cai";
    
    // Master wallet (backup emergency): Replace with your master wallet
    private let MASTER_WALLET_ID = "wqbzq-4yaaa-aaaau-acppa-cai";  // Same for now
    
    // Minimum cycles to keep for operations (10B cycles = ~$75)
    private let MIN_CYCLES_RESERVE : Nat = 10_000_000_000;
    
    // Get current cycle balance
    public query func getCycleBalance() : async Nat {
        Cycles.balance()
    };
    
    // Monitor cycles and return status
    public query func getCycleStatus() : async {balance: Nat; reserve: Nat; available: Nat; status: Text} {
        let balance = Cycles.balance();
        let available = if (balance > MIN_CYCLES_RESERVE) { balance - MIN_CYCLES_RESERVE } else { 0 };
        let status = if (balance < MIN_CYCLES_RESERVE) { "LOW_CYCLES" } 
                    else if (balance < 50_000_000_000) { "NORMAL" }
                    else { "HEALTHY" };
        
        {
            balance = balance;
            reserve = MIN_CYCLES_RESERVE;
            available = available;
            status = status;
        }
    };
    
    // Drain excess cycles to business wallet (regular maintenance)
    public func drainToBusiness() : async Result.Result<{transferred: Nat; remaining: Nat}, Text> {
        let balance = Cycles.balance();
        
        if (balance <= MIN_CYCLES_RESERVE) {
            return #err("Insufficient cycles to drain. Current: " # Nat.toText(balance) # ", Reserve: " # Nat.toText(MIN_CYCLES_RESERVE));
        };
        
        let transferAmount = balance - MIN_CYCLES_RESERVE;
        
        try {
            // Note: In a real implementation, you would use IC management canister to transfer cycles
            // For now, we return the amount that would be transferred
            #ok({
                transferred = transferAmount;
                remaining = MIN_CYCLES_RESERVE;
            })
        } catch (error) {
            #err("Failed to transfer cycles to business wallet")
        }
    };
    
    // Emergency drain to master wallet (if business operations fail)
    public func emergencyDrainToMaster() : async Result.Result<{transferred: Nat; remaining: Nat}, Text> {
        let balance = Cycles.balance();
        
        // In emergency, keep only 1B cycles for shutdown operations
        let emergencyReserve : Nat = 1_000_000_000;
        
        if (balance <= emergencyReserve) {
            return #err("Critical: Cycles below emergency reserve");
        };
        
        let transferAmount = balance - emergencyReserve;
        
        try {
            // Note: In a real implementation, you would use IC management canister to transfer cycles
            #ok({
                transferred = transferAmount;
                remaining = emergencyReserve;
            })
        } catch (error) {
            #err("Emergency drain failed - manual intervention required")
        }
    };

    // DOCUMENT MANAGEMENT
    public func createDocument(document: Document) : async Result.Result<Document, Text> {
        documents.put(document.id, document);
        #ok(document)
    };

    public query func getDocumentsByDeveloper(developerId: Text) : async [Document] {
        let devDocs = Array.filter<Document>(
            Iter.toArray(documents.vals()),
            func(d: Document) : Bool { d.developerId == developerId }
        );
        devDocs
    };

    public func deleteDocument(documentId: Text) : async Result.Result<Text, Text> {
        switch (documents.remove(documentId)) {
            case null { #err("Document not found") };
            case (_) { #ok("Document deleted") };
        }
    };

    // DASHBOARD CONTENT MANAGEMENT
    public func addResource(resource: Resource) : async Result.Result<Resource, Text> {
        resources.put(resource.id, resource);
        #ok(resource)
    };

    public query func getResourcesByClient(clientId: Text) : async [Resource] {
        Array.filter<Resource>(
            Iter.toArray(resources.vals()),
            func(r: Resource) : Bool { r.clientId == clientId }
        )
    };

    public func deleteResource(resourceId: Text) : async Result.Result<Text, Text> {
        switch (resources.remove(resourceId)) {
            case null { #err("Resource not found") };
            case (_) { #ok("Resource deleted") };
        }
    };

    public func addTimelineUpdate(update: TimelineUpdate) : async Result.Result<TimelineUpdate, Text> {
        timeline.put(update.id, update);
        #ok(update)
    };

    public query func getTimelineByClient(clientId: Text) : async [TimelineUpdate] {
        Array.filter<TimelineUpdate>(
            Iter.toArray(timeline.vals()),
            func(u: TimelineUpdate) : Bool { u.clientId == clientId }
        )
    };

    public func deleteTimelineUpdate(updateId: Text) : async Result.Result<Text, Text> {
        switch (timeline.remove(updateId)) {
            case null { #err("Update not found") };
            case (_) { #ok("Update deleted") };
        }
    };

    public func addRating(rating: Rating) : async Result.Result<Rating, Text> {
        ratings.put(rating.id, rating);
        #ok(rating)
    };

    public query func getRatingsByClient(clientId: Text) : async [Rating] {
        Array.filter<Rating>(
            Iter.toArray(ratings.vals()),
            func(r: Rating) : Bool { r.clientId == clientId }
        )
    };

    // HEALTH CHECK with cycle monitoring
    public query func health() : async Text {
        let cycleBalance = Cycles.balance();
        let cycleStatus = if (cycleBalance < MIN_CYCLES_RESERVE) { "⚠️ LOW" } else { "✅ OK" };
        
        "Zubaz Storage Canister is healthy! " #
        "Users: " # Nat.toText(users.size()) # 
        ", Projects: " # Nat.toText(projects.size()) # 
        ", Clients: " # Nat.toText(clients.size()) #
        ", Assets: " # Nat.toText(assets.size()) #
        " | Cycles: " # Nat.toText(cycleBalance) # " (" # cycleStatus # ")"
    };
}