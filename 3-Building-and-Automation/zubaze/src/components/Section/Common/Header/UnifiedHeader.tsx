import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "../../../Ui/Logo/BrandLogo";

const UnifiedHeader = ({ logoSrc }: { logoSrc?: string }) => {
    const location = useLocation();
    const [menuOpened, setMenuOpened] = useState(false);

    const menuToggleHandler = () => {
        setMenuOpened(!menuOpened);
    };

    const closeMenuClickHandler = () => {
        setMenuOpened(false);
    };

    const menuMainClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    return (
        <>
            <div
                className="site-header site-header--menu-right dynamic-header header-main-active"
                style={{
                    position: "sticky",
                    top: "16px",
                    zIndex: 1000,
                    background: "transparent",
                    marginTop: "16px",
                    borderBottom: "none",
                }}
            >
                <div className="container">
                    <nav
                        className="navbar site-navbar"
                        style={{
                            background: "#ffffff",
                            borderRadius: "0",
                            boxShadow:
                                "0 10px 30px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)",
                            padding: "8px 24px",
                        }}
                    >
                        <BrandLogo imageSrc={logoSrc || "/assets/images/logo/logo-dark.svg"} />
                        <div className="menu-block-wrapper">
                            <div
                                className={`menu-overlay ${menuOpened ? "active" : ""}`}
                                onClick={closeMenuClickHandler}
                            ></div>
                            <nav
                                className={`menu-block ${menuOpened ? "active" : ""}`}
                                id="append-menu-header"
                            >
                                <div className="mobile-menu-head">
                                    <div className="go-back">
                                        <i className="fa fa-angle-left"></i>
                                    </div>
                                    <div className="current-menu-title"></div>
                                    <div
                                        className="mobile-menu-close"
                                        onClick={closeMenuClickHandler}
                                    >
                                        &times;
                                    </div>
                                </div>

                                <ul className="site-menu-main" onClick={menuMainClickHandler}>
                                    <li className="nav-item">
                                        <Link to="/home" className={`nav-link-item ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`}>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/about-us" className={`nav-link-item ${location.pathname === '/about-us' ? 'active' : ''}`}>
                                            About
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/developer" className={`nav-link-item ${location.pathname === '/developer' || location.pathname === '/home-2' ? 'active' : ''}`}>
                                            Developer
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/client" className={`nav-link-item ${location.pathname === '/client' || location.pathname === '/home-3' ? 'active' : ''}`}>
                                            Client
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/pricing" className={`nav-link-item ${location.pathname === '/pricing' ? 'active' : ''}`}>
                                            Pricing
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact-us" className={`nav-link-item ${location.pathname === '/contact-us' ? 'active' : ''}`}>
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
                            <Link className="zubuz-default-btn zubuz-header-btn" to="/sign-in" style={{ padding: '6px 18px', fontSize: '13px', height: 'auto', borderRadius: '0' }}>
                                <span>Login</span>
                            </Link>
                            <Link
                                className="zubuz-default-btn zubuz-header-btn"
                                to="/sign-up"
                                style={{ padding: '6px 18px', fontSize: '13px', height: 'auto', borderRadius: '0' }}
                            >
                                <span>Get Started</span>
                            </Link>
                        </div>
                        <div
                            className={`mobile-menu-trigger ${menuOpened ? "active" : ""}`}
                            onClick={menuToggleHandler}
                        >
                            <span></span>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default UnifiedHeader;
