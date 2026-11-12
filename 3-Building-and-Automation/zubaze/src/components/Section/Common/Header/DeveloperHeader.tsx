import { useState } from "react";
import { useCurrentUser, useAuth } from "../../../../utils/auth";
import { useApiClient } from "../../../../api/client";
import { useQueryClient } from "@tanstack/react-query";
import PlaceholderSettings from "../../Developer/Settings/PlaceholderSettings";
import { getPlaceholderThumbnail } from "../../../../services/thumbnailService";

const DeveloperHeader = () => {
    const user = useCurrentUser();
    const api = useApiClient();
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const [showCreateClientModal, setShowCreateClientModal] = useState(false);
    const [showPlaceholderSettings, setShowPlaceholderSettings] = useState(false);
    const [isCreatingClient, setIsCreatingClient] = useState(false);
    const [newClientDashboard, setNewClientDashboard] = useState({
        clientName: '',
        clientEmail: '',
        dashboardUrl: '',
        category: 'business'
    });
    const [clientProjects, setClientProjects] = useState<Array<{
        name: string;
        url: string;
        adminUrl: string;
        thumbnail: string;
        type: string;
    }>>([]);
    const [newProject, setNewProject] = useState({
        name: '',
        url: '',
        adminUrl: '',
        thumbnail: '',
        type: 'ui'
    });

    const handleCreateClientDashboard = () => {
        if (isCreatingClient) {
            console.log('⏳ Already creating client, please wait...');
            return;
        }

        if (!user?.id || !newClientDashboard.clientName || !newClientDashboard.clientEmail) {
            alert('Please fill in client name and email');
            return;
        }

        setIsCreatingClient(true);

        // Auto-add website from form if fields are filled but not added to list
        let finalProjects = [...clientProjects];
        if (newProject.name && newProject.url && clientProjects.length === 0) {
            // Set default placeholder if no thumbnail provided
            const projectWithThumbnail = {
                ...newProject,
                thumbnail: newProject.thumbnail || getPlaceholderThumbnail(newProject.name)
            };
            finalProjects = [projectWithThumbnail];
            console.log('✨ Auto-adding website from form fields:', projectWithThumbnail);
        }

        if (finalProjects.length === 0) {
            const proceed = confirm('⚠️ Warning: You haven\'t added any websites yet!\n\nThe dashboard will show default placeholder images.\n\nDo you want to continue anyway?');
            if (!proceed) {
                setIsCreatingClient(false);
                return;
            }
        }

        console.log('📦 Creating dashboard with websites:', finalProjects);
        console.log('📊 Number of websites:', finalProjects.length);
        finalProjects.forEach((proj, i) => {
            console.log(`Website ${i + 1}:`, proj);
        });

        // Ensure all projects have thumbnails - add default placeholder if missing
        finalProjects = finalProjects.map(proj => ({
            ...proj,
            thumbnail: proj.thumbnail || getPlaceholderThumbnail(proj.name)
        }));

        // Auto-generate dashboard URL if not provided
        let dashboardUrl = newClientDashboard.dashboardUrl;
        if (!dashboardUrl) {
            // Generate URL from client name: "Tio: Francisco Herrera" -> "tio-francisco-herrera-dashboard"
            dashboardUrl = newClientDashboard.clientName
                .toLowerCase()
                .replace(/:/g, '') // Remove colons specifically first
                .replace(/[^a-z0-9\s-]/g, '') // Remove other special characters but keep spaces and hyphens
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single
                .replace(/^-+|-+$/g, '') + '-dashboard'; // Remove leading/trailing hyphens and add suffix
        }

        // Call the backend API to create the client
        console.log('🔄 Calling API to create client dashboard...');
        console.log('📡 API Base URL:', import.meta.env.VITE_API_BASE_URL);

        // Use first project's thumbnail image URL as the client's website thumbnail
        // ALSO store the original website URL for clicking!
        const websiteUrl = finalProjects.length > 0 
            ? (finalProjects[0].thumbnail || finalProjects[0].url) 
            : undefined;
        
        const originalWebsiteUrl = finalProjects.length > 0 
            ? finalProjects[0].url
            : undefined;
        
        console.log('🖼️ Client thumbnail URL:', websiteUrl);
        console.log('🌐 Original website URL:', originalWebsiteUrl);

        api.post('/clients', {
            name: newClientDashboard.clientName,
            email: newClientDashboard.clientEmail,
            dashboardUrl: dashboardUrl,
            websiteUrl: websiteUrl, // Thumbnail for display
            originalWebsiteUrl: originalWebsiteUrl, // Actual website for clicking
            category: newClientDashboard.category,
            developerId: user.id,
            projects: finalProjects
        }).then(result => {
            if (result.ok) {
                console.log("✅ Created client dashboard:", result.data);
                console.log('📊 Total websites added:', finalProjects.length);

                // Show success message with the dashboard URL
                const fullUrl = `${window.location.origin}/client-dashboard/${dashboardUrl}`;
                alert(`✅ Client dashboard created successfully!
                
Client: ${newClientDashboard.clientName}
Dashboard URL: ${fullUrl}

The client can now access their dashboard at this URL.`);

                setIsCreatingClient(false);
                setShowCreateClientModal(false);
                setNewClientDashboard({
                    clientName: '',
                    clientEmail: '',
                    dashboardUrl: '',
                    category: 'business'
                });
                setClientProjects([]);
                setNewProject({
                    name: '',
                    url: '',
                    adminUrl: '',
                    thumbnail: '',
                    type: 'ui'
                });

                // 1. Instantly add to the list (optimistic update)
                if (result.data) {
                    queryClient.setQueryData<any[]>(['clients'], (old) => {
                        // Ensure old is always an array
                        const oldArray = Array.isArray(old) ? old : [];
                        const clientData = result.data as any;
                        const exists = oldArray.some((c: any) => c.id === clientData?.id);
                        if (exists) {
                            return oldArray;
                        }
                        return [...oldArray, clientData];
                    });
                }

                // 2. Mark list as stale so it re-fetches in background
                // Add small delay for DFINITY canister propagation
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ['clients'] });
                    queryClient.invalidateQueries({ queryKey: ['projects'] });
                }, 600); // 600ms is usually enough for DFINITY
            } else {
                console.error('❌ API Error:', result.error);
                const errorMsg = result.error || 'Unknown error';

                // Provide helpful debugging info
                let helpText = '';
                if (errorMsg.includes('Not authenticated')) {
                    helpText = '\n\n💡 You need to sign in with Auth0 first. Click "Sign In" in the header.';
                } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
                    helpText = '\n\n💡 Cannot reach backend server. Check:\n- Railway deployment status\n- VITE_API_BASE_URL in environment variables\n- Network connection';
                } else if (errorMsg.includes('401') || errorMsg.includes('Unauthorized')) {
                    helpText = '\n\n💡 Authentication token is invalid or expired. Try signing out and back in.';
                }

                alert(`❌ Error creating client dashboard:\n\n${errorMsg}${helpText}`);
                setIsCreatingClient(false);
            }
        }).catch(error => {
            console.error('❌ Network Error:', error);
            const errorMsg = error instanceof Error ? error.message : String(error);
            
            // Provide more helpful message for network suspension
            let userMessage = errorMsg;
            if (errorMsg.includes('interrupted') || errorMsg.includes('suspended')) {
                userMessage = '⚠️ Network request was interrupted.\n\nThis can happen if:\n• Your computer went to sleep\n• The browser tab became inactive\n• A browser extension blocked the request\n\nPlease try again and keep this tab active.';
            }
            
            alert(`❌ Network Error: ${userMessage}\n\n💡 Check browser console (F12) for details.\n\nBackend URL: ${import.meta.env.VITE_API_BASE_URL || 'Not configured'}`);
            setIsCreatingClient(false);
        });
    };

    // Use the variables to avoid lint errors
    console.log("User:", user);

    return (
        <header className="developer-header">
            <div className="header-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-header">
                        <div className="logo">
                            <div className="logo-icon"></div>
                        </div>
                    </div>

                    <div className="sidebar-menus">
                        <a href="/developer-dashboard-2" className="menu-item active" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="menu-icon dashboard-icon"></div>
                            <span>Dashboard</span>
                        </a>

                        <div className="menu-item">
                            <div className="menu-icon projects-icon"></div>
                            <span>Projects</span>
                            <div className="chevron-icon"></div>
                        </div>

                        <div className="submenu">
                            <div className="submenu-item">Add New</div>
                            <div className="submenu-item">Projects List</div>
                        </div>

                        <div className="menu-item">
                            <div className="menu-icon contact-icon"></div>
                            <span>Contact</span>
                        </div>

                        <div className="menu-item">
                            <div className="menu-icon kanban-icon"></div>
                            <span>Kanban</span>
                        </div>

                        <div className="menu-item">
                            <div className="menu-icon messages-icon"></div>
                            <span>Messages</span>
                        </div>

                        <div className="menu-item">
                            <div className="menu-icon calendar-icon"></div>
                            <span>Calendar</span>
                        </div>

                        <div 
                            className="menu-item"
                            onClick={() => setShowPlaceholderSettings(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="menu-icon settings-icon"></div>
                            <span>Settings</span>
                        </div>

                        <div
                            className="menu-item"
                            onClick={() => logout()}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="menu-icon"></div>
                            <span>Logout</span>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <button
                            className="new-project-btn"
                            onClick={() => setShowCreateClientModal(true)}
                        >
                            +New Client
                        </button>
                    </div>
                </div>

                {/* Main Header */}
                <div className="main-header">
                    <div className="header-top">
                        <div className="hamburger-menu">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>

                        <div className="search-box">
                            <span>Search</span>
                            <div className="search-icon"></div>
                        </div>

                        <div className="header-actions">
                            <div className="action-item messages">
                                <div className="icon"></div>
                                <div className="notification-badge">6</div>
                            </div>

                            <div className="action-item notifications">
                                <div className="icon"></div>
                                <div className="notification-badge">4</div>
                            </div>

                            <div className="separator"></div>

                            <div className="profile">
                                <div className="profile-picture"></div>
                                <div className="profile-info">
                                    <p className="name">Peter Parkur</p>
                                    <p className="role">Super Admin</p>
                                </div>
                                <div className="chevron-icon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Client Dashboard Modal */}
            {showCreateClientModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '16px',
                        width: '700px',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                    }}>
                        <h3 style={{ marginBottom: '30px', fontSize: '32px', fontWeight: '700', color: '#000', fontFamily: 'Poppins, sans-serif' }}>Create Client Dashboard</h3>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '16px', color: '#333', fontFamily: 'Poppins, sans-serif' }}>Client Name</label>
                            <input
                                type="text"
                                value={newClientDashboard.clientName}
                                onChange={(e) => setNewClientDashboard({ ...newClientDashboard, clientName: e.target.value })}
                                style={{ width: '100%', padding: '14px 18px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', backgroundColor: '#FAFAFA', fontFamily: 'Poppins, sans-serif' }}
                                placeholder="Enter client name"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '16px', color: '#333', fontFamily: 'Poppins, sans-serif' }}>Client Email</label>
                            <input
                                type="email"
                                value={newClientDashboard.clientEmail}
                                onChange={(e) => setNewClientDashboard({ ...newClientDashboard, clientEmail: e.target.value })}
                                style={{ width: '100%', padding: '14px 18px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', backgroundColor: '#FAFAFA', fontFamily: 'Poppins, sans-serif' }}
                                placeholder="client@example.com"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '16px', color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                                Dashboard URL <span style={{ fontSize: '14px', color: '#999', fontWeight: '400', fontFamily: 'Poppins, sans-serif' }}>(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={newClientDashboard.dashboardUrl}
                                onChange={(e) => setNewClientDashboard({ ...newClientDashboard, dashboardUrl: e.target.value })}
                                style={{ width: '100%', padding: '14px 18px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', backgroundColor: '#FAFAFA', fontFamily: 'Poppins, sans-serif' }}
                                placeholder="Leave empty to auto-generate"
                            />
                            {newClientDashboard.clientName && !newClientDashboard.dashboardUrl && (
                                <div style={{ fontSize: '14px', color: '#2953E8', marginTop: '5px', fontFamily: 'Poppins, sans-serif' }}>
                                    Will auto-generate: {newClientDashboard.clientName
                                        .toLowerCase()
                                        .replace(/[^a-z0-9\s]/g, '')
                                        .replace(/\s+/g, '-')
                                        .replace(/-+/g, '-')
                                        .replace(/^-|-$/g, '') + '-dashboard'}
                                    <br />
                                    <span style={{ fontSize: '12px', color: '#666' }}>URL: /client-dashboard/{newClientDashboard.clientName
                                        .toLowerCase()
                                        .replace(/[^a-z0-9\s]/g, '')
                                        .replace(/\s+/g, '-')
                                        .replace(/-+/g, '-')
                                        .replace(/^-|-$/g, '') + '-dashboard'}</span>
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '16px', color: '#333', fontFamily: 'Poppins, sans-serif' }}>Category</label>
                            <select
                                value={newClientDashboard.category}
                                onChange={(e) => setNewClientDashboard({ ...newClientDashboard, category: e.target.value })}
                                style={{ width: '100%', padding: '14px 18px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', backgroundColor: '#FAFAFA', fontFamily: 'Poppins, sans-serif' }}
                            >
                                <option value="business">Business</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="portfolio">Portfolio</option>
                                <option value="blog">Blog</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginBottom: '20px' }}>
                            <h4 style={{ marginBottom: '15px', fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins, sans-serif', color: '#000' }}>Client Websites ({clientProjects.length})</h4>

                            {clientProjects.map((project: any, index: number) => (
                                <div key={index} style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}>{project.name}</strong>
                                        <div style={{ fontSize: '14px', color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                                            {project.type === 'wordpress' && '📊 WordPress'}
                                            {project.type === 'shopify' && '🛒 E-commerce'}
                                            {project.type === 'webflow' && '👤 Webflow'}
                                            {project.type === 'next-js' && '⚡ Next.js'}
                                            {project.type === 'vite' && '⚡ Vite'}
                                            {project.type === 'client-dashboard' && '📋 Dashboard'}
                                            {project.type === 'other' && '🌐 Other'}
                                            {' • '}{project.url}
                                        </div>
                                    </div>
                                    <button onClick={() => setClientProjects(clientProjects.filter((_: any, i: number) => i !== index))} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>Remove</button>
                                </div>
                            ))}

                            <div style={{ border: '1px dashed #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fafafa' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <input
                                        type="text"
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}
                                        placeholder="Website Name (e.g., My E-commerce Store)"
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            value={newProject.url}
                                            onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                                            style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}
                                            placeholder="Website URL (e.g., https://client-site.com)"
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!newProject.url) {
                                                    alert('Please enter a website URL first');
                                                    return;
                                                }
                                                const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
                                                try {
                                                    const response = await fetch(`${apiBase}/fetch-thumbnail`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ url: newProject.url })
                                                    });
                                                    const data = await response.json();
                                                    if (data.success && data.thumbnail) {
                                                        setNewProject({ ...newProject, thumbnail: data.thumbnail });
                                                        alert('✅ Thumbnail found!');
                                                    } else {
                                                        // Use placeholder if no thumbnail found
                                                        const placeholder = getPlaceholderThumbnail(newProject.name || newProject.url);
                                                        setNewProject({ ...newProject, thumbnail: placeholder });
                                                        alert('⚠️ No thumbnail found. Using default placeholder. You can upload an image or paste an image URL to replace it.');
                                                    }
                                                } catch (error) {
                                                    console.error('❌ Fetch thumbnail error:', error);
                                                    // Use placeholder on error as well
                                                    const placeholder = getPlaceholderThumbnail(newProject.name || newProject.url);
                                                    setNewProject({ ...newProject, thumbnail: placeholder });
                                                    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
                                                    alert(`❌ Error fetching thumbnail: ${errorMsg}\n\n💡 Using default placeholder. You can upload an image or paste an image URL to replace it.`);
                                                }
                                            }}
                                            style={{ padding: '12px 18px', backgroundColor: '#0000FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            Fetch Thumbnail
                                        </button>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <input
                                        type="text"
                                        value={newProject.adminUrl}
                                        onChange={(e) => setNewProject({ ...newProject, adminUrl: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px', fontFamily: 'Poppins, sans-serif' }}
                                        placeholder="Admin/CMS URL (optional)"
                                    />
                                </div>
                                <div style={{ marginBottom: '15px', marginTop: '25px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666', fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>Thumbnail Image:</label>
                                    <input
                                        type="text"
                                        value={newProject.thumbnail}
                                        onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px', marginBottom: '5px', fontFamily: 'Poppins, sans-serif' }}
                                        placeholder="Paste image URL (e.g., https://example.com/image.jpg)"
                                    />
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', marginTop: '12px' }}>
                                        <span style={{ fontSize: '14px', color: '#666', fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>OR</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setNewProject({ ...newProject, thumbnail: reader.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            style={{ fontSize: '14px', flex: 1, fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>
                                    {newProject.thumbnail && (
                                        <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                                            <img
                                                src={newProject.thumbnail}
                                                alt="Preview"
                                                style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px' }}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement!.innerHTML = '<span style="color: #dc3545; font-size: 12px;">❌ Invalid image</span>';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div style={{ fontSize: '13px', color: '#999', marginTop: '4px', fontFamily: 'Poppins, sans-serif' }}>
                                        Paste image URL, upload from computer, or use screenshot services
                                    </div>
                                </div>
                                <div style={{ marginTop: '0', marginBottom: '15px' }}>
                                    <select
                                        value={newProject.type}
                                        onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px', backgroundColor: '#ffffff', fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        <option value="ui">Business</option>
                                        <option value="ui branding">E-commerce</option>
                                        <option value="ui website">Personal</option>
                                        <option value="ui branding website">All Sites</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => {
                                        if (newProject.name && newProject.url) {
                                            // Set default placeholder if no thumbnail provided
                                            const projectToAdd = {
                                                ...newProject,
                                                thumbnail: newProject.thumbnail || getPlaceholderThumbnail(newProject.name)
                                            };
                                            setClientProjects([...clientProjects, projectToAdd]);
                                            setNewProject({ name: '', url: '', adminUrl: '', thumbnail: '', type: 'ui' });
                                        } else {
                                            alert('Please enter at least website name and URL');
                                        }
                                    }}
                                    style={{ padding: '14px 28px', backgroundColor: '#0000FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', marginTop: '20px', fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Add Website
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    if (!isCreatingClient) {
                                        setShowCreateClientModal(false);
                                    }
                                }}
                                disabled={isCreatingClient}
                                style={{
                                    padding: '14px 28px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    backgroundColor: isCreatingClient ? '#f5f5f5' : 'white',
                                    cursor: isCreatingClient ? 'not-allowed' : 'pointer',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    color: isCreatingClient ? '#ccc' : '#666',
                                    fontFamily: 'Poppins, sans-serif',
                                    opacity: isCreatingClient ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateClientDashboard}
                                disabled={isCreatingClient}
                                style={{
                                    padding: '14px 36px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: isCreatingClient ? '#6666ff' : '#0000FF',
                                    color: 'white',
                                    cursor: isCreatingClient ? 'not-allowed' : 'pointer',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    fontFamily: 'Poppins, sans-serif',
                                    opacity: isCreatingClient ? 0.7 : 1
                                }}
                            >
                                {isCreatingClient ? '⏳ Creating...' : 'Create Dashboard'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder Settings Modal */}
            <PlaceholderSettings 
                isOpen={showPlaceholderSettings}
                onClose={() => setShowPlaceholderSettings(false)}
            />
        </header>
    );
};

export default DeveloperHeader;