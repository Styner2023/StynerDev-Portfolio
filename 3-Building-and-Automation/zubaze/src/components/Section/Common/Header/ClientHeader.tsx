import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser, logout, User } from "../../../../utils/auth";

const ClientHeader = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <header className="site-header site-header--menu-center zubuz-header-section white-content" id="sticky-menu" style={{ borderBottom: '1px solid #e0e0e0', zIndex: 1000 }}>
            <div className="container">
                <nav className="navbar site-navbar">
                    <div className="brand-logo">
                        <Link to="/">
                            <img src="/assets/images/logo/logo-dark.svg" alt="Zubaze" className="light-version-logo" />
                        </Link>
                    </div>

                    <div className="menu-block-wrapper">
                        <div className="menu-overlay"></div>
                        <nav className="menu-block" id="append-menu-header">
                            <div className="mobile-menu-head">
                                <div className="go-back">
                                    <i className="fa fa-angle-left"></i>
                                </div>
                                <div className="current-menu-title"></div>
                                <div className="mobile-menu-close">&times;</div>
                            </div>
                            <ul className="site-menu-main">
                                <li className="nav-item">
                                    <Link to="/client-dashboard" className="nav-link-item">
                                        My Websites
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/client-support" className="nav-link-item">
                                        Support
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
                        {user && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                marginRight: '15px'
                            }}>
                                <span style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    fontWeight: '500'
                                }}>
                                    Welcome, {user.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'none',
                                        border: '1px solid #ddd',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mobile-menu-trigger light">
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default ClientHeader;