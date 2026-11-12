import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import { useApiClient } from "../../api/client";
import ClientDashboardTemplate from "../templates/ClientDashboard/index";
import { getWebsiteThumbnail } from "../../services/thumbnailService";

const DynamicClientDashboard = () => {
    const { clientUrl } = useParams<{ clientUrl: string }>();
    const { isAuthenticated, user } = useAuth();
    const api = useApiClient();
    const navigate = useNavigate();
    const [clientData, setClientData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            if (!clientUrl || clientUrl === 'undefined') {
                console.error('❌ Invalid clientUrl:', clientUrl);
                console.error('❌ This means the client data does not have a dashboardUrl field set');
                console.error('💡 Please update the client in the developer dashboard to set a proper dashboardUrl');
                setClientData({
                    name: 'Error: Invalid Dashboard URL',
                    dashboardUrl: 'invalid',
                    projects: [],
                    error: 'The dashboard URL is not properly configured. Please contact your developer.'
                });
                setLoading(false);
                return;
            }

            try {
                const decodedUrl = decodeURIComponent(clientUrl);
                console.log('🔍 Looking for dashboard:', decodedUrl);
                console.log('🔍 Full URL:', window.location.href);
                console.log('🔓 Using PUBLIC API (no auth required)');

                const clientsResult = await api.publicGet(`/clients/by-dashboard/${decodedUrl}`);
                console.log('🔍 API Response:', clientsResult);

                if (clientsResult.ok && clientsResult.data) {
                    console.log('✅ Client found:', clientsResult.data);
                    console.log('🔍 CLIENT PROJECTS:', (clientsResult.data as any)?.projects);
                    console.log('🔍 PROJECTS LENGTH:', (clientsResult.data as any)?.projects?.length);
                    console.log('🔍 PROJECTS TYPE:', typeof (clientsResult.data as any)?.projects);
                    console.log('🔍 IS ARRAY?:', Array.isArray((clientsResult.data as any)?.projects));
                    
                    setClientData(clientsResult.data);
                } else {
                    console.error('❌ Client not found:', decodedUrl);
                    console.error('❌ Response:', clientsResult);
                    // Set minimal client data to show template anyway
                    setClientData({
                        name: 'Client Dashboard',
                        dashboardUrl: decodedUrl,
                        projects: []
                    });
                }
            } catch (error: any) {
                console.error('❌ Error fetching client:', error);
                // Set minimal client data to show template anyway
                setClientData({
                    name: 'Client Dashboard',
                    dashboardUrl: clientUrl,
                    projects: []
                });
            }

            setLoading(false);
        };

        checkAccess();
    }, [clientUrl, api]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontSize: '18px',
                color: '#666',
                gap: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#ABFB4F',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '0s'
                    }}></div>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#ABFB4F',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '0.2s'
                    }}></div>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#ABFB4F',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '0.4s'
                    }}></div>
                </div>
                <style>
                    {`
                        @keyframes bounce {
                            0%, 80%, 100% { 
                                transform: scale(0);
                                opacity: 0.5;
                            }
                            40% { 
                                transform: scale(1);
                                opacity: 1;
                            }
                        }
                    `}
                </style>
                <span>Loading client dashboard...</span>
            </div>
        );
    }

    // Show error if dashboard URL is invalid
    if (clientData?.error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '24px', color: '#d32f2f', marginBottom: '20px' }}>❌ Dashboard URL Error</h1>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>{clientData.error}</p>
                <p style={{ fontSize: '14px', color: '#999' }}>URL attempted: /client-dashboard/{clientUrl}</p>
                <a href="/" style={{ marginTop: '20px', color: '#2563eb', textDecoration: 'underline' }}>Go to Homepage</a>
            </div>
        );
    }

    const clientName = clientData?.name || 'Client Dashboard';
    const dashboardUrlFinal = clientData?.dashboardUrl || clientUrl || 'default-url';

    // Extract websiteUrl from DFINITY optional field (may be array)
    let websiteUrl = clientData?.websiteUrl;
    if (Array.isArray(websiteUrl) && websiteUrl.length > 0) {
        websiteUrl = websiteUrl[0];
        console.log('🔧 Extracted websiteUrl from array:', websiteUrl);
    } else if (Array.isArray(websiteUrl) && websiteUrl.length === 0) {
        websiteUrl = undefined; // Empty array = no URL
        console.log('🔧 websiteUrl is empty array, setting to undefined');
    }

    // Extract originalWebsiteUrl (the actual clickable website URL)
    let originalWebsiteUrl = clientData?.originalWebsiteUrl;
    if (Array.isArray(originalWebsiteUrl) && originalWebsiteUrl.length > 0) {
        originalWebsiteUrl = originalWebsiteUrl[0];
        console.log('🔧 Extracted originalWebsiteUrl from array:', originalWebsiteUrl);
    } else if (Array.isArray(originalWebsiteUrl) && originalWebsiteUrl.length === 0) {
        originalWebsiteUrl = undefined; // Empty array = no URL
        console.log('🔧 originalWebsiteUrl is empty array, setting to undefined');
    }

    // THE CLIENT IS THE PROJECT! 
    // Use projects array from DFINITY ONLY - NO fallback cards
    // CRITICAL: Only show cards that come from the projects array with real URLs
    const formattedProjects = clientData?.projects?.length > 0
        ? clientData.projects.map((project: any) => ({
            id: project.id,
            name: project.name,
            url: project.url,
            adminUrl: project.adminUrl || project.url,
            thumbnail: project.thumbnail || getWebsiteThumbnail(project.url),
            type: project.type || project.category || 'website',
            status: 'active',
            lastUpdated: new Date().toLocaleDateString()
        }))
        : []; // ✅ NO fallback card - if no projects, show empty dashboard

    console.log('🎨 DynamicClientDashboard - Client data:', clientData);
    console.log('🎨 DynamicClientDashboard - Raw projects from DFINITY:', clientData?.projects);
    console.log('🖼️ DynamicClientDashboard - WebsiteUrl (thumbnail):', websiteUrl);
    console.log('🌐 DynamicClientDashboard - OriginalWebsiteUrl (clickable):', originalWebsiteUrl);
    console.log('🎨 DynamicClientDashboard - Formatted projects:', formattedProjects);

    console.log('🎨 DynamicClientDashboard - Final formatted projects:', formattedProjects);
    console.log('🎨 DynamicClientDashboard - Projects count:', formattedProjects.length);
    if (formattedProjects.length === 0) {
        console.warn('⚠️ No projects to display! Client data:', clientData);
    }

    // Developers can access ANY client dashboard
    // Clients need to login/signup to access their dashboard
    const userType = user?.type;
    const isClientAuthenticated = isAuthenticated && (userType === 'client' || userType === 'developer');

    console.log('🔐 AUTHENTICATION CHECK:', {
        isAuthenticated,
        userType,
        isClientAuthenticated,
        reasoning: isClientAuthenticated
            ? `User is logged in as ${userType?.toUpperCase()} - show authenticated view`
            : 'User is NOT logged in (guest) - show public preview'
    });

    return (
        <ClientDashboardTemplate
            clientName={clientName}
            dashboardUrl={dashboardUrlFinal}
            isAuthenticated={isClientAuthenticated}
            developerId={clientData?.developerId}
            clientProjects={formattedProjects}
        />
    );
};

export default DynamicClientDashboard;
