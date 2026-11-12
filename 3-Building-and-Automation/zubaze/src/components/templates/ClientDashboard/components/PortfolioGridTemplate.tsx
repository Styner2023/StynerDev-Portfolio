import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PortfolioFilterNavTemplate from "./PortfolioFilterNavTemplate";
import { handleThumbnailError } from "../../../../services/thumbnailService";
import FAQSection from "../../../Section/Common/FAQ/FAQSection";
import CallToActionSection from "../../../Section/ClientLanding/CallToAction/CallToAction";
import SecureSolutionsSection from "../../../Section/Features/SecureSolutionsSection";
import { useDashboardContent } from "../../../../api/hooks/useDashboardContent";
import { useApiClient } from "../../../../api/client";

interface PortfolioGridTemplateProps {
    clientName: string;
    dashboardUrl?: string;
    isAuthenticated?: boolean; // Add authentication status
    clientProjects?: Array<{
        id: string;
        name: string;
        url: string;
        adminUrl: string;
        thumbnail: string;
        type: string;
        status: string;
        lastUpdated: string;
    }>;
}

const PortfolioGridTemplate = ({ clientName, dashboardUrl, isAuthenticated = false, clientProjects = [] }: PortfolioGridTemplateProps) => {
    const navigate = useNavigate();
    const isotopeRef = useRef<{ arrange: (options: { filter: string }) => void } | null>(null);
    const [filterKey, setFilterKey] = useState<string>("*");
    const api = useApiClient();
    const [clientId, setClientId] = useState<string | null>(null);

    // Fetch client ID from dashboard URL
    useEffect(() => {
        const fetchClientId = async () => {
            if (!dashboardUrl) return;
            try {
                const result = await api.publicGet(`/clients/by-dashboard/${dashboardUrl}`);
                if (result.ok && result.data) {
                    setClientId((result.data as any).id);
                }
            } catch (error) {
                console.error('Error fetching client ID:', error);
            }
        };
        fetchClientId();
    }, [dashboardUrl, api]);

    // Fetch dashboard content (timeline updates and resources)
    const { data: dashboardContent, isLoading: isLoadingContent } = useDashboardContent(clientId || '');

    console.log('🎨 PortfolioGridTemplate received:');
    console.log('  - clientName:', clientName);
    console.log('  - dashboardUrl:', dashboardUrl);
    console.log('  - isAuthenticated:', isAuthenticated);
    console.log('  - isAuthenticated TYPE:', typeof isAuthenticated);
    console.log('  - isAuthenticated === true?', isAuthenticated === true);
    console.log('  - isAuthenticated === false?', isAuthenticated === false);
    console.log('  - clientProjects:', clientProjects);
    console.log('  - clientProjects.length:', clientProjects?.length);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("isotope-layout").then((IsotopeModule) => {
                isotopeRef.current = new IsotopeModule.default(".filter-container", {
                    itemSelector: ".filter-item",
                    layoutMode: "fitRows",
                });
            });
        }
    }, []);

    useEffect(() => {
        if (isotopeRef.current) {
            isotopeRef.current.arrange({
                filter: filterKey === "*" ? "*" : `.${filterKey}`,
            });
        }
    }, [filterKey]);

    const handleFilterKeyChange = (key: string) => () => {
        setFilterKey(key);
    };

    // Enhanced debugging
    console.log('🎨 PortfolioGridTemplate detailed analysis:');
    console.log('  - clientName:', clientName);
    console.log('  - clientProjects array:', clientProjects);
    console.log('  - clientProjects length:', clientProjects?.length);
    console.log('  - clientProjects is array:', Array.isArray(clientProjects));

    // ALWAYS use the client's actual projects
    // NEVER show default hardcoded projects - only show what's passed in clientProjects
    const actualProjects = clientProjects && clientProjects.length > 0 ? clientProjects : [];

    console.log('🎨 DECISION: Will show', actualProjects.length, 'projects');
    console.log('🎨 CLIENT NAME:', clientName);
    console.log('🎨 CLIENT PROJECTS (raw):', clientProjects);
    console.log('🎨 CLIENT PROJECTS TYPE:', typeof clientProjects, 'IS ARRAY:', Array.isArray(clientProjects));
    console.log('🎨 ACTUAL PROJECTS (filtered):', actualProjects);
    console.log('🎨 DASHBOARD URL:', dashboardUrl);
    
    // Enhanced debugging - log each project
    if (clientProjects && clientProjects.length > 0) {
        console.log('🔍 DETAILED PROJECT BREAKDOWN:');
        clientProjects.forEach((proj, idx) => {
            console.log(`  Project ${idx + 1}:`, {
                id: proj.id,
                name: proj.name,
                url: proj.url,
                type: proj.type,
                thumbnail: typeof proj.thumbnail === 'string' ? proj.thumbnail.substring(0, 50) + '...' : proj.thumbnail
            });
        });
    } else {
        console.warn('⚠️ NO PROJECTS IN clientProjects ARRAY!');
    }

    return (
        <div className="section zubuz-section-padding3" style={{ position: 'relative', overflow: 'visible', paddingBottom: '0px', marginBottom: '0px' }}>
            {/* Decorative Shape - Top Right */}
            <img
                src="/assets/images/v2/shape-line.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: '100px',
                    right: '2%',
                    width: '150px',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    zIndex: 0,
                    animation: 'float-top-bottom 8s ease-in-out infinite'
                }}
            />

            {/* Decorative Circles - Right Side near Title */}
            <img
                src="/assets/images/v2/shape3-v2.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: '40px',
                    right: '25%',
                    width: '180px',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 0,
                    animation: 'float-top-bottom 6s ease-in-out infinite'
                }}
            />
            <img
                src="/assets/images/v2/shape3-v2.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: '110px',
                    right: '28%',
                    width: '130px',
                    opacity: 0.25,
                    pointerEvents: 'none',
                    zIndex: 0,
                    animation: 'float-top-bottom 7s ease-in-out infinite 0.5s'
                }}
            />
            <img
                src="/assets/images/v2/shape3-v2.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '30%',
                    width: '90px',
                    opacity: 0.2,
                    pointerEvents: 'none',
                    zIndex: 0,
                    animation: 'float-top-bottom 5s ease-in-out infinite 1s'
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="zubuz-section-title center" style={{ position: 'relative' }}>
                    <h2 style={{ marginBottom: '10px' }}>Welcome Back</h2>
                    <h3 style={{ fontSize: '32px', marginTop: '0', marginBottom: '30px', color: '#333', fontWeight: '600' }}>
                        {clientName}
                    </h3>
                    <p>Here are all your websites. Click on any card to visit your live site or access the CMS to edit.</p>
                </div>
                <PortfolioFilterNavTemplate
                    filterKey={filterKey}
                    handleFilterKeyChange={handleFilterKeyChange}
                />
                <div style={{ position: 'relative' }}>
                    <div
                        className="zubuz-portfolio-column filter-container"
                        id="zubuz-two-column"
                        style={{
                            position: 'relative',
                            transition: 'opacity 0.3s ease-in-out',
                            minHeight: '400px'
                        }}
                    >
                        {actualProjects.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '10px',
                                border: '2px dashed #dee2e6',
                                width: '100%'
                            }}>
                                <h3 style={{ marginBottom: '20px', color: '#6c757d' }}>No Projects Yet</h3>
                                <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                                    Your developer is setting up your websites. They will appear here once they're ready.
                                </p>
                                <p style={{ fontSize: '14px', color: '#adb5bd' }}>
                                    If you have questions, please contact your developer.
                                </p>
                            </div>
                        ) : (
                            actualProjects
                                .map((project) => (
                                    <div key={project.id} className={`filter-item ${project.type}`}>
                                        <div className={`collection-grid-item zubuz-portfolio-wrap ${project.type}`}>
                                            <div className="zubuz-portfolio-thumb" style={{ backgroundColor: '#f3f4f6', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {isAuthenticated && project.url && project.url !== '#' ? (
                                                    // AUTHENTICATED CLIENT with valid URL: Click goes to live website
                                                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
                                                        <img
                                                            src={project.thumbnail}
                                                            alt={project.name}
                                                            onError={(e) => handleThumbnailError(e, project.name, project.url)}
                                                            data-original-url={project.url}
                                                            style={{ transition: 'opacity 0.3s ease-in-out', width: '100%', height: 'auto', display: 'block' }}
                                                            onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                                                        />
                                                    </a>
                                                ) : isAuthenticated && (!project.url || project.url === '#') ? (
                                                    // AUTHENTICATED CLIENT but no URL: Show non-clickable thumbnail
                                                    <div style={{ cursor: 'default', position: 'relative', width: '100%', height: '100%' }}>
                                                        <img
                                                            src={project.thumbnail}
                                                            alt={project.name}
                                                            onError={(e) => handleThumbnailError(e, project.name, project.url)}
                                                            style={{ opacity: 0.7, transition: 'opacity 0.3s ease-in-out', width: '100%', height: 'auto', display: 'block' }}
                                                            onLoad={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                                                        />
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                                            color: 'white',
                                                            padding: '10px 20px',
                                                            borderRadius: '8px',
                                                            fontSize: '14px'
                                                        }}>
                                                            ⏳ Coming Soon
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // UNAUTHENTICATED: Click goes to client welcome page (sign-up or sign-in)
                                                    <div onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const dashboardParam = dashboardUrl ? `?dashboard=${Array.isArray(dashboardUrl) ? dashboardUrl[0] : dashboardUrl}` : '';
                                                        console.log('🔄 GUEST USER: Redirecting to /client with dashboard:', dashboardParam);
                                                        navigate(`/client${dashboardParam}`);
                                                    }} style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
                                                        <img
                                                            src={project.thumbnail}
                                                            alt={project.name}
                                                            onError={(e) => handleThumbnailError(e, project.name, project.url)}
                                                            data-original-url={project.url}
                                                            style={{ transition: 'opacity 0.3s ease-in-out', width: '100%', height: 'auto', display: 'block' }}
                                                            onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="zubuz-portfolio-data">
                                                    {isAuthenticated && project.url && project.url !== '#' ? (
                                                        // AUTHENTICATED with valid URL: Title links to live site
                                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                            <h3>{project.name}</h3>
                                                        </a>
                                                    ) : isAuthenticated && (!project.url || project.url === '#') ? (
                                                        // AUTHENTICATED but no URL: Non-clickable title
                                                        <h3>{project.name}</h3>
                                                    ) : (
                                                        // UNAUTHENTICATED: Title goes to client welcome page (sign-up or sign-in)
                                                        <h3 style={{ cursor: 'pointer' }} onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            const dashboardParam = dashboardUrl ? `?dashboard=${Array.isArray(dashboardUrl) ? dashboardUrl[0] : dashboardUrl}` : '';
                                                            console.log('🔄 GUEST USER: Redirecting to /client from title with dashboard:', dashboardParam);
                                                            navigate(`/client${dashboardParam}`);
                                                        }}>
                                                            {project.name}
                                                        </h3>
                                                    )}
                                                    <p>Live Website • <span style={{ color: '#10B981' }}>●</span> {project.status} • Last updated {project.lastUpdated}</p>
                                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                                        {isAuthenticated && project.url && project.url !== '#' && (
                                                            // AUTHENTICATED CLIENT with valid URL: Button goes to live website
                                                            <a
                                                                href={project.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="zubuz-default-btn pill"
                                                                style={{ fontSize: '14px', padding: '8px 20px', textDecoration: 'none' }}
                                                            >
                                                                <span>🌐 Visit Live Website</span>
                                                            </a>
                                                        )}
                                                        {isAuthenticated && (!project.url || project.url === '#') && (
                                                            // AUTHENTICATED CLIENT but no URL: Show message
                                                            <div
                                                                className="zubuz-default-btn pill"
                                                                style={{
                                                                    fontSize: '14px',
                                                                    padding: '8px 20px',
                                                                    backgroundColor: '#f3f4f6',
                                                                    color: '#6b7280',
                                                                    cursor: 'default'
                                                                }}
                                                            >
                                                                <span>⏳ Website link coming soon</span>
                                                            </div>
                                                        )}
                                                        {!isAuthenticated && (
                                                            // UNAUTHENTICATED: Button goes to client welcome page (sign-up or sign-in)
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    const dashboardParam = dashboardUrl ? `?dashboard=${Array.isArray(dashboardUrl) ? dashboardUrl[0] : dashboardUrl}` : '';
                                                                    console.log('🔄 GUEST USER: Redirecting to /client from button with dashboard:', dashboardParam);
                                                                    navigate(`/client${dashboardParam}`);
                                                                }}
                                                                className="zubuz-default-btn pill"
                                                                style={{ fontSize: '14px', padding: '8px 20px' }}
                                                            >
                                                                <span>🔐 Sign In to Access Website</span>
                                                            </button>
                                                        )}
                                                        {isAuthenticated && (
                                                            <a
                                                                className="zubuz-portfolio-icon"
                                                                href={project.adminUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="Edit Website"
                                                            >
                                                                <img src="/assets/images/portfolio/arrow-right.svg" alt="Edit" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Decorative Green Dots - Always visible */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        marginTop: '50px',
                        marginBottom: '30px',
                        alignItems: 'center'
                    }}>
                        <div 
                            onClick={() => console.log('Clicked dot 1')}
                            style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                backgroundColor: '#ABFB4F',
                                opacity: 1,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '2px solid #ABFB4F'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.2)';
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(171, 251, 79, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                        <div 
                            onClick={() => console.log('Clicked dot 2')}
                            style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                backgroundColor: '#FFFFFF',
                                opacity: 0.8,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '2px solid #ABFB4F'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.2)';
                                e.currentTarget.style.backgroundColor = '#ABFB4F';
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(171, 251, 79, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.opacity = '0.8';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                        <div 
                            onClick={() => console.log('Clicked dot 3')}
                            style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                backgroundColor: '#FFFFFF',
                                opacity: 0.8,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '2px solid #ABFB4F'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.2)';
                                e.currentTarget.style.backgroundColor = '#ABFB4F';
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(171, 251, 79, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.opacity = '0.8';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: '60px' }}>
                <div style={{ position: 'relative' }}>
                </div>

                {/* AUTHENTICATED CLIENT ONLY - Blog-Style Layout */}
                {
                    isAuthenticated && (
                        <div className="section" style={{ marginTop: '60px', marginBottom: '0px', position: 'relative', paddingTop: '0px', paddingBottom: '0px', isolation: 'isolate', contain: 'layout style' }}>
                            {/* Decorative Shape - Middle Right */}
                            <img
                                src="/assets/images/v2/shape2-v2.png"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    top: '250px',
                                    right: '3%',
                                    width: '120px',
                                    opacity: 0.5,
                                    pointerEvents: 'none',
                                    zIndex: 0,
                                    animation: 'float-left-right 7s ease-in-out infinite'
                                }}
                            />
                            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="zubuz-section-title" style={{ position: 'relative', zIndex: 3 }}>
                                            <div style={{
                                                backgroundColor: '#ABFB4F',
                                                padding: '5px 15px',
                                                borderRadius: '5px',
                                                color: '#000',
                                                fontWeight: '600',
                                                fontSize: '12px',
                                                display: 'inline-block',
                                                marginBottom: '15px'
                                            }}>Hosting</div>
                                            <h2 style={{ position: 'relative', zIndex: 4 }}>Latest Updates</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* Main Content Column */}
                                    <div className="col-lg-8">
                                        {/* Decorative Shape - Right Side Open Space */}
                                        <img
                                            src="/assets/images/v2/shape3-v2.png"
                                            alt=""
                                            style={{
                                                position: 'absolute',
                                                top: '200px',
                                                right: '1%',
                                                width: '160px',
                                                opacity: 0.45,
                                                pointerEvents: 'none',
                                                zIndex: 0,
                                                animation: 'float-top-bottom 9s ease-in-out infinite'
                                            }}
                                        />
                                        {/* Updates & Announcements - Real-time from API */}
                                        {isLoadingContent ? (
                                            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                                Loading updates...
                                            </div>
                                        ) : dashboardContent?.updates && dashboardContent.updates.length > 0 ? (
                                            dashboardContent.updates.slice(0, 1).map((update) => (
                                                <div key={update.id} className="single-post-item two-column">
                                                    <div className="post-thumbnail">
                                                        <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>
                                                            <img src="/assets/images/blog/blog1.png" alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="post-content">
                                                        <div className="post-meta">
                                                            <div className="post-category">
                                                                <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>{update.type}</Link>
                                                            </div>
                                                            <div className="post-date">{new Date(update.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                                        </div>
                                                        <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>
                                                            <h3 className="entry-title">{update.title}</h3>
                                                        </Link>
                                                        <p>{update.content}</p>
                                                        <Link 
                                                            to={`/blog-latest-updates?dashboard=${dashboardUrl}`}
                                                            className="post-read-more"
                                                            style={{ transition: 'all 0.3s ease' }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                                const img = e.currentTarget.querySelector('img');
                                                                if (img) img.style.filter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(2453%) hue-rotate(207deg) brightness(97%) contrast(101%)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.transform = 'translateX(0)';
                                                                const img = e.currentTarget.querySelector('img');
                                                                if (img) img.style.filter = 'none';
                                                            }}
                                                        >
                                                            <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ transition: 'filter 0.3s ease' }} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="single-post-item two-column">
                                                <div className="post-thumbnail">
                                                    <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>
                                                        <img src="/assets/images/blog/blog1.png" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <div className="post-meta">
                                                        <div className="post-category">
                                                            <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>Developer Notes</Link>
                                                        </div>
                                                        <div className="post-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                                    </div>
                                                    <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>
                                                        <h3 className="entry-title">No Updates Yet</h3>
                                                    </Link>
                                                    <p>Your developer hasn't posted any updates yet. Check back soon for project news and announcements.</p>
                                                    <Link 
                                                        to={`/blog-latest-updates?dashboard=${dashboardUrl}`}
                                                        className="post-read-more"
                                                        style={{ transition: 'all 0.3s ease' }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'translateX(5px)';
                                                            const img = e.currentTarget.querySelector('img');
                                                            if (img) img.style.filter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(2453%) hue-rotate(207deg) brightness(97%) contrast(101%)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'translateX(0)';
                                                            const img = e.currentTarget.querySelector('img');
                                                            if (img) img.style.filter = 'none';
                                                        }}
                                                    >
                                                        <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ transition: 'filter 0.3s ease' }} />
                                                    </Link>
                                                </div>
                                            </div>
                                        )}

                                        {/* Collaboration Score - EXACT Blog Card Design */}
                                        <div className="single-post-item two-column">
                                            <div className="post-thumbnail">
                                                <Link to="/blog-collaboration-score">
                                                    <img src="/assets/images/blog/blog2.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <div className="post-category">
                                                        <Link to="/blog-collaboration-score">Performance</Link>
                                                    </div>
                                                    <div className="post-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                                </div>
                                                <Link to="/blog-collaboration-score">
                                                    <h3 className="entry-title">Your Collaboration Score: 95/100</h3>
                                                </Link>
                                                <p>Excellent work! Your collaboration score reflects your responsiveness and quality of feedback. Keep up the great communication!</p>
                                                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                    <div style={{ marginBottom: '15px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                            <span>Task Completion</span>
                                                            <span style={{ fontWeight: '600' }}>98%</span>
                                                        </div>
                                                        <div style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                                                            <div style={{ width: '98%', height: '100%', backgroundColor: '#10B981' }}></div>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginBottom: '15px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                            <span>Requirements Quality</span>
                                                            <span style={{ fontWeight: '600' }}>92%</span>
                                                        </div>
                                                        <div style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                                                            <div style={{ width: '92%', height: '100%', backgroundColor: '#10B981' }}></div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                            <span>Response Time</span>
                                                            <span style={{ fontWeight: '600' }}>95%</span>
                                                        </div>
                                                        <div style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                                                            <div style={{ width: '95%', height: '100%', backgroundColor: '#10B981' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link 
                                                    to="/blog-collaboration-score" 
                                                    className="post-read-more"
                                                    style={{ transition: 'all 0.3s ease' }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateX(5px)';
                                                        const img = e.currentTarget.querySelector('img');
                                                        if (img) img.style.filter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(2453%) hue-rotate(207deg) brightness(97%) contrast(101%)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateX(0)';
                                                        const img = e.currentTarget.querySelector('img');
                                                        if (img) img.style.filter = 'none';
                                                    }}
                                                >
                                                    <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ transition: 'filter 0.3s ease' }} />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Website Ratings - EXACT Blog Card Design */}
                                        <div className="single-post-item two-column">
                                            <div className="post-thumbnail">
                                                <Link to="/blog-website-ratings">
                                                    <img src="/assets/images/blog/blog3.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <div className="post-category">
                                                        <Link to="/blog-website-ratings">Feedback</Link>
                                                    </div>
                                                    <div className="post-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                                </div>
                                                <Link to="/blog-website-ratings">
                                                    <h3 className="entry-title">Rate Your Website Templates</h3>
                                                </Link>
                                                <p>Help your developer improve by rating the templates they've created for you. Your feedback drives better results!</p>
                                                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                    {actualProjects.map((project) => (
                                                        <div key={`rating-${project.id}`} style={{
                                                            backgroundColor: '#f8f9fa',
                                                            padding: '15px',
                                                            borderRadius: '6px',
                                                            marginBottom: '10px',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            gap: '15px'
                                                        }}>
                                                            <div style={{ flex: '1', minWidth: '0' }}>
                                                                <strong>{project.name}</strong>
                                                                <span style={{ marginLeft: '10px', color: '#6c757d', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                                    <img src="/assets/images/icon/star-green.svg" alt="star" style={{ width: '16px', height: '16px' }} />
                                                                    4.5/5
                                                                </span>
                                                            </div>
                                                            <button
                                                                className="zubuz-default-btn"
                                                                style={{ padding: '8px 16px', fontSize: '14px', flexShrink: '0', whiteSpace: 'nowrap' }}
                                                                onClick={() => window.location.href = '/blog-website-ratings'}
                                                            >
                                                                Update
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Link 
                                                    to="/blog-website-ratings" 
                                                    className="post-read-more"
                                                    style={{ transition: 'all 0.3s ease' }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateX(5px)';
                                                        const img = e.currentTarget.querySelector('img');
                                                        if (img) img.style.filter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(2453%) hue-rotate(207deg) brightness(97%) contrast(101%)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateX(0)';
                                                        const img = e.currentTarget.querySelector('img');
                                                        if (img) img.style.filter = 'none';
                                                    }}
                                                >
                                                    <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ transition: 'filter 0.3s ease' }} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar Column - EXACT Blog Sidebar */}
                                    <div className="col-lg-4" style={{ position: 'relative', isolation: 'isolate', contain: 'layout style' }}>
                                        <div className="right-sidebar">
                                            {/* Search widget placeholder to avoid :first-child selector */}
                                            <div className="widget" style={{ display: 'none' }}></div>

                                            {/* Quick Actions */}
                                            <div className="widget">
                                                <h3 className="wp-block-heading">Quick Actions:</h3>
                                                <ul>
                                                    <li>
                                                        <a href="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ width: '16px', height: '16px' }} />
                                                            View All Updates
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ width: '16px', height: '16px' }} />
                                                            Message Developer
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ width: '16px', height: '16px' }} />
                                                            Request Changes
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ width: '16px', height: '16px' }} />
                                                            View Analytics
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ width: '16px', height: '16px' }} />
                                                            Billing & Invoices
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Recent Activity - Real-time from API */}
                                            <div className="widget zubuz_recent_posts_Widget">
                                                <h3 className="wp-block-heading">Recent Activity:</h3>
                                                {isLoadingContent ? (
                                                    <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                                                        Loading...
                                                    </div>
                                                ) : dashboardContent?.updates && dashboardContent.updates.length > 0 ? (
                                                    dashboardContent.updates.slice(0, 3).map((update, index) => (
                                                        <div key={update.id} className="post-item">
                                                            <div className="post-thumb">
                                                                <Link to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>
                                                                    <img src={`/assets/images/blog/blog${(index % 3) + 1}.png`} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="post-text">
                                                                <div className="post-date">
                                                                    {new Date(update.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                                </div>
                                                                <Link className="post-title" to={`/blog-latest-updates?dashboard=${dashboardUrl}`}>{update.title}</Link>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                                                        No recent activity
                                                    </div>
                                                )}
                                            </div>

                                            {/* Shared Resources - Google Links from Updates Tab */}
                                            <div className="widget">
                                                <h3 className="wp-block-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <img src="/assets/google-suit-icons/google-drive.png" alt="" style={{ width: '24px', height: '24px' }} />
                                                    Shared Resources:
                                                </h3>
                                                {isLoadingContent ? (
                                                    <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                                                        Loading...
                                                    </div>
                                                ) : dashboardContent?.resources && dashboardContent.resources.length > 0 ? (
                                                    <ul>
                                                        {dashboardContent.resources.map((resource: any) => (
                                                            <li key={resource.id}>
                                                                <a href={resource.links[0]?.url || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    {resource.resourceType === 'google-docs' && <img src="/assets/google-suit-icons/docs_2020q4_48dp.png" alt="" style={{ width: '20px', height: '20px' }} />}
                                                                    {resource.resourceType === 'google-sheets' && <img src="/assets/google-suit-icons/sheets_2020q4_48dp.png" alt="" style={{ width: '20px', height: '20px' }} />}
                                                                    {resource.resourceType === 'google-slides' && <img src="/assets/google-suit-icons/slides_2020q4_48dp.png" alt="" style={{ width: '20px', height: '20px' }} />}
                                                                    {resource.resourceType === 'google-drive' && <img src="/assets/google-suit-icons/google-drive.png" alt="" style={{ width: '20px', height: '20px' }} />}
                                                                    {resource.resourceType === 'other' && <img src="/assets/images/icon/arrow-right.svg" alt="" style={{ width: '16px', height: '16px' }} />}
                                                                    {resource.title}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                                                        No shared resources yet
                                                    </div>
                                                )}
                                            </div>

                                            {/* Uploaded Documents - Files from Documents Tab */}
                                            <div className="widget">
                                                <h3 className="wp-block-heading">Uploaded Documents:</h3>
                                                <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                                                    No documents uploaded yet
                                                </div>
                                            </div>

                                            {/* Status Tags */}
                                            <div className="widget">
                                                <h3 className="wp-block-heading">Status:</h3>
                                                <div className="wp-block-tag-cloud">
                                                    <a href="">All Systems Online</a>
                                                    <a href="">No Issues</a>
                                                    <a href="">Active Projects</a>
                                                    <a href="">Up to Date</a>
                                                    <a href="">Fully Deployed</a>
                                                </div>
                                            </div>

                                            {/* Contact Developer CTA */}
                                            <div className="zubuz-blog-contact" id="contact-developer">
                                                <h3>Need help or changes?</h3>
                                                <p>
                                                    Have questions or need to request updates? Your developer is here to help. Send a message anytime.
                                                </p>
                                                <a href="" onClick={(e) => { e.preventDefault(); alert('Messaging feature coming soon!'); }}>Contact Developer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* LEARN_OPTIONS_TOP_DIVIDER - Full width horizontal line above "Learn About Your Options" section */}
                            <div style={{
                                borderTop: '1px solid var(--light-color)',
                                marginTop: '60px',
                                marginBottom: '40px',
                                width: '100vw',
                                position: 'relative',
                                left: '50%',
                                right: '50%',
                                marginLeft: '-50vw',
                                marginRight: '-50vw'
                            }} />

                            {/* Educational Articles Section */}
                            <div className="section" style={{ marginTop: '0px', backgroundColor: 'white', paddingTop: '0px', paddingBottom: '0px', marginBottom: '0px', isolation: 'isolate', contain: 'layout style', position: 'relative', zIndex: 1 }}>
                                <div className="container" style={{ paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px' }}>
                                    <div className="row" style={{ marginBottom: '10px', marginTop: '0px' }}>
                                        <div className="col-lg-8">
                                            <div className="zubuz-section-title" style={{ marginBottom: '0px', marginTop: '0px', paddingTop: '0px', paddingBottom: '0px' }}>
                                                <h2 style={{ marginBottom: '0px', marginTop: '0px', paddingTop: '0px', paddingBottom: '5px' }}>Learn About Your Options</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ display: 'flex', alignItems: 'stretch', marginBottom: '0px', marginTop: '0px', paddingTop: '0px' }}>
                                        {/* Front-End Card */}
                                        <div className="col-lg-4" style={{ display: 'flex' }}>
                                            <div className="single-post-item" style={{ marginBottom: '0px', backgroundColor: 'white', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                <div className="post-thumbnail" style={{ position: 'relative' }}>
                                                    <img src="/assets/images/blog/blog1.png" alt="Front-End Development" />
                                                    <div className="post-category" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                                                        <a href="" style={{ backgroundColor: '#ABFB4F', padding: '5px 15px', borderRadius: '5px', color: '#000', fontWeight: '600' }}>Technology</a>
                                                    </div>
                                                </div>
                                                <div className="post-content" style={{ padding: '10px' }}>
                                                    <div className="post-meta" style={{ marginBottom: '5px' }}>
                                                        <div className="post-date">December 4, 2025</div>
                                                    </div>
                                                    <h3 className="entry-title" style={{ fontSize: '18px', marginBottom: '5px' }}>
                                                        What is Front-End Development?
                                                    </h3>
                                                    <p style={{ marginBottom: '5px', color: '#666' }}>
                                                        Learn about the user interface and design elements that make your website beautiful and interactive.
                                                    </p>
                                                    <a href="" onClick={(e) => e.preventDefault()} className="post-read-more">
                                                        <img src="/assets/images/icon/arrow-right.svg" alt="Read more" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Back-End Card */}
                                        <div className="col-lg-4" style={{ display: 'flex' }}>
                                            <div className="single-post-item" style={{ marginBottom: '0px', backgroundColor: 'white', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                <div className="post-thumbnail" style={{ position: 'relative' }}>
                                                    <img src="/assets/images/blog/blog2.png" alt="Back-End Development" />
                                                    <div className="post-category" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                                                        <a href="" style={{ backgroundColor: '#ABFB4F', padding: '5px 15px', borderRadius: '5px', color: '#000', fontWeight: '600' }}>Technology</a>
                                                    </div>
                                                </div>
                                                <div className="post-content" style={{ padding: '10px' }}>
                                                    <div className="post-meta" style={{ marginBottom: '5px' }}>
                                                        <div className="post-date">December 4, 2025</div>
                                                    </div>
                                                    <h3 className="entry-title" style={{ fontSize: '18px', marginBottom: '5px' }}>
                                                        Understanding Back-End Services
                                                    </h3>
                                                    <p style={{ marginBottom: '5px', color: '#666' }}>
                                                        Discover how databases, servers, and APIs power your website behind the scenes.
                                                    </p>
                                                    <a href="" onClick={(e) => e.preventDefault()} className="post-read-more">
                                                        <img src="/assets/images/icon/arrow-right.svg" alt="Read more" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hosting Card */}
                                        <div className="col-lg-4" style={{ display: 'flex' }}>
                                            <div className="single-post-item" style={{ marginBottom: '0px', backgroundColor: 'white', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                <div className="post-thumbnail" style={{ position: 'relative' }}>
                                                    <img src="/assets/images/blog/blog3.png" alt="Web Hosting" />
                                                    <div className="post-category" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                                                        <a href="" style={{ backgroundColor: '#ABFB4F', padding: '5px 15px', borderRadius: '5px', color: '#000', fontWeight: '600' }}>Hosting</a>
                                                    </div>
                                                </div>
                                                <div className="post-content" style={{ padding: '10px' }}>
                                                    <div className="post-meta" style={{ marginBottom: '5px' }}>
                                                        <div className="post-date">December 4, 2025</div>
                                                    </div>
                                                    <h3 className="entry-title" style={{ fontSize: '18px', marginBottom: '5px' }}>
                                                        Web Hosting Explained Simply
                                                    </h3>
                                                    <p style={{ marginBottom: '5px', color: '#666' }}>
                                                        Understand where your website lives online and what hosting options are best for you.
                                                    </p>
                                                    <a href="" onClick={(e) => e.preventDefault()} className="post-read-more">
                                                        <img src="/assets/images/icon/arrow-right.svg" alt="Read more" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secure Solutions Section - Added between Learn About Your Options and FAQ */}
                            <SecureSolutionsSection />

                        </div>
                    )
                }

            </div>
            
            {/* FAQ Section - Full width outside container */}
            <FAQSection />
            
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Call to Action Section - Added below FAQ */}
                <CallToActionSection />
            </div>
        </div>
    );
};

export default PortfolioGridTemplate;