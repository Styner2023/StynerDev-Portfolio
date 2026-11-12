import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../utils/auth";
import PaymentModal from "./PaymentModal";
import { useApiClient } from "../../../../api/client";

interface ClientHeaderTemplateProps {
    clientName?: string;
    dashboardUrl?: string;
    developerId?: string;
}

const ClientHeaderTemplate = ({ clientName, dashboardUrl, developerId }: ClientHeaderTemplateProps) => {
    const { isAuthenticated, user, logout } = useAuth();
    const api = useApiClient();
    const [menuOpened, setMenuOpened] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentLinks, setPaymentLinks] = useState<any>(null);

    const menuToggleHandler = () => {
        setMenuOpened(!menuOpened);
    };

    const closeMenuClickHandler = () => {
        setMenuOpened(false);
    };

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        if (developerId) {
            api.publicGet(`/payment-settings/${developerId}`)
                .then(res => res.ok && setPaymentLinks(res.data))
                .catch(() => {});
        }
    }, [developerId]);

    const displayName = clientName || user?.name || 'Client';
    const dashboardLink = dashboardUrl ? `/client-dashboard/${dashboardUrl}` : '/client-dashboard';
    const location = useLocation();

    return (
        <>
            <style>{`
                .client-dashboard-header {
                    position: sticky !important;
                    top: 0 !important;
                    z-index: 9999 !important;
                    background-color: #ffffff !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.08) !important;
                    padding: 0.5rem 0 !important;
                }
                .client-dashboard-header .container {
                    max-width: 1400px !important;
                    padding: 0 2rem !important;
                }
                .client-dashboard-header .navbar.site-navbar {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    gap: 2rem !important;
                    padding: 0.5rem 0 !important;
                }
                .client-dashboard-header .brand-logo img {
                    height: 36px !important;
                }
                .client-dashboard-header .menu-block-wrapper {
                    flex: 1 !important;
                    display: flex !important;
                    justify-content: center !important;
                }
                .client-dashboard-header .site-menu-main {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 2.5rem !important;
                    list-style: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .client-dashboard-header .site-menu-main > li {
                    display: inline-block !important;
                }
                .client-dashboard-header .nav-link-item {
                    font-size: 18px !important;
                    font-weight: 600 !important;
                    color: #1a1a1a !important;
                    text-decoration: none !important;
                    padding: 8px 0 !important;
                    transition: all 0.3s ease !important;
                    white-space: nowrap !important;
                    position: relative !important;
                    border-bottom: 3px solid transparent !important;
                }
                .client-dashboard-header .nav-link-item:hover {
                    color: #2563eb !important;
                }
                .client-dashboard-header .nav-link-item.active {
                    color: #1a1a1a !important;
                    font-weight: 600 !important;
                    border-bottom-color: #ABFB4F !important;
                }
                .client-dashboard-header .header-btn-l1 {
                    display: flex !important;
                    align-items: center !important;
                    gap: 12px !important;
                    flex-shrink: 0 !important;
                }
                .client-dashboard-header .zubuz-header-btn {
                    padding: 10px 20px !important;
                    font-size: 0.95rem !important;
                    font-weight: 500 !important;
                    border-radius: 8px !important;
                    transition: all 0.2s ease !important;
                }
                @media (max-width: 991px) {
                    .client-dashboard-header .site-menu-main {
                        gap: 1.5rem !important;
                    }
                    .client-dashboard-header .nav-link-item {
                        font-size: 0.95rem !important;
                    }
                }
                @media (max-width: 767px) {
                    .mobile-only-logout { display: block !important; }
                    .header-btn-l1 { display: none !important; }
                    .menu-block-wrapper { display: none !important; }
                    .mobile-menu-trigger { display: block !important; }
                }
                @media (min-width: 768px) {
                    .mobile-menu-trigger { display: none !important; }
                    .mobile-menu-head { display: none !important; }
                    .menu-overlay { display: none !important; }
                    .mobile-only-logout { display: none !important; }
                    .client-dashboard-header .menu-block {
                        position: static !important;
                        transform: none !important;
                        width: auto !important;
                        background: transparent !important;
                        display: block !important;
                        box-shadow: none !important;
                    }
                }
            `}</style>
            <header className="site-header site-header--menu-center zubuz-header-section white-content client-dashboard-header" id="client-sticky-menu">
                <div className="container">
                <nav className="navbar site-navbar">
                    <div className="brand-logo">
                        <Link to="/">
                            <img src="/assets/images/logo/logo-dark.svg" alt="Zubaze" className="light-version-logo" />
                        </Link>
                    </div>

                    <div className="menu-block-wrapper">
                        <div className={`menu-overlay ${menuOpened ? "active" : ""}`} onClick={closeMenuClickHandler}></div>
                        <nav className={`menu-block ${menuOpened ? "active" : ""}`} id="append-menu-header">
                            <div className="mobile-menu-head">
                                <div className="go-back">
                                    <i className="fa fa-angle-left"></i>
                                </div>
                                <div className="current-menu-title"></div>
                                <div className="mobile-menu-close" onClick={closeMenuClickHandler}>&times;</div>
                            </div>
                            <ul className="site-menu-main">
                                {isAuthenticated && (
                                    <>
                                        <li className="nav-item">
                                            <Link to={dashboardLink} className={`nav-link-item ${location.pathname.includes('/client-dashboard') && !location.pathname.includes('blog') && !location.pathname.includes('support') ? 'active' : ''}`} onClick={closeMenuClickHandler}>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/blog-latest-updates?dashboard=${dashboardUrl || ''}`} className={`nav-link-item ${location.pathname.includes('/blog-latest-updates') ? 'active' : ''}`} onClick={closeMenuClickHandler}>
                                                Updates
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/blog-collaboration-score?dashboard=${dashboardUrl || ''}`} className={`nav-link-item ${location.pathname.includes('/blog-collaboration-score') ? 'active' : ''}`} onClick={closeMenuClickHandler}>
                                                Collaboration
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/blog-website-ratings?dashboard=${dashboardUrl || ''}`} className={`nav-link-item ${location.pathname.includes('/blog-website-ratings') ? 'active' : ''}`} onClick={closeMenuClickHandler}>
                                                Ratings
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/client-support?dashboard=${dashboardUrl || ''}`} className={`nav-link-item ${location.pathname.includes('/client-support') ? 'active' : ''}`} onClick={closeMenuClickHandler}>
                                                Contact
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <>
                                        <li className="nav-item d-block d-xs-none">
                                            <Link to={`/client-sign-in?dashboard=${dashboardUrl || ''}`} className="nav-link-item" onClick={closeMenuClickHandler}>
                                                Sign In
                                            </Link>
                                        </li>
                                        <li className="nav-item d-block d-xs-none">
                                            <Link to={`/client-sign-up?dashboard=${dashboardUrl || ''}`} className="nav-link-item" onClick={closeMenuClickHandler}>
                                                Sign Up
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>



                    {isAuthenticated && (
                        <div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex" style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                            <button
                                onClick={() => setPaymentModalOpen(true)}
                                className="zubuz-default-btn zubuz-header-btn pill"
                                style={{ border: 'none', cursor: 'pointer' }}
                            >
                                <span>Support Dev</span>
                            </button>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                                className="zubuz-default-btn zubuz-header-btn pill"
                            >
                                <span>Logout</span>
                            </a>
                        </div>
                    )}

                    <div className={`mobile-menu-trigger light ${menuOpened ? "active" : ""}`} onClick={menuToggleHandler}>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
        <PaymentModal 
            isOpen={paymentModalOpen} 
            onClose={() => setPaymentModalOpen(false)}
            paymentLinks={paymentLinks}
        />
        </>
    );
};

export default ClientHeaderTemplate;