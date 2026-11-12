
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "../../../Ui/Logo/BrandLogo";

interface HomeHeaderProps {
  logoSrc?: string;
  roundedBtn?: boolean;
}

const HomeHeader = ({ logoSrc, roundedBtn }: HomeHeaderProps) => {
  const location = useLocation();


  const [isActive, setIsActive] = useState<boolean>(false);
  const [subMenuArray, setSubMenuArray] = useState<string[]>([]);
  const [subMenuTextArray, setSubMenuTextArray] = useState<string[]>([]);
  const [scrollClassName, setScrollClassName] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollClassName("sticky-menu");
      } else {
        setScrollClassName("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const menuMainClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.innerWidth <= 991) {
      const target = e.target as HTMLElement;
      const hasChildren = target.closest(".nav-item-has-children") as HTMLElement | null;

      if (hasChildren) {
        e.preventDefault();

        const subMenu = hasChildren.querySelector(":scope > .sub-menu") as HTMLElement | null;
        const dropTrigger = hasChildren.querySelector(":scope > .drop-trigger") as HTMLElement | null;

        if (subMenu && dropTrigger) {
          // Store submenu ID and text
          const submenuId = subMenu.id;
          const menuTitle = dropTrigger.textContent || "";

          // Activate the submenu
          setSubMenuArray((prev) => [...prev, submenuId]);
          setSubMenuTextArray((prev) => [...prev, menuTitle]);

          subMenu.classList.add("active");
          subMenu.style.animation = "slideLeft 0.5s ease forwards";

          const titleElement = document.querySelector(".current-menu-title") as HTMLElement | null;
          if (titleElement) titleElement.innerHTML = menuTitle;

          const mobileMenuHead = document.querySelector(".mobile-menu-head") as HTMLElement | null;
          if (mobileMenuHead) mobileMenuHead.classList.add("active");
        }
      }
    }
  };

  const goBackClickHandler = () => {
    const lastItem = subMenuArray.slice(-1)[0];
    const lastItemText = subMenuTextArray.slice(-2)[0];

    setSubMenuArray((prev) => prev.slice(0, -1));
    setSubMenuTextArray((prev) => prev.slice(0, -1));

    if (lastItem) {
      const element = document.getElementById(lastItem);
      if (element && !element.classList.contains("nav-item-has-children")) {
        element.style.animation = "slideRight 0.5s ease forwards";
        const titleElement = document.querySelector(".current-menu-title") as HTMLElement | null;
        if (titleElement) titleElement.innerHTML = lastItemText;

        setTimeout(() => {
          element.classList.remove("active");
        }, 300);
      } else {
        const goBack = document.querySelector(".go-back") as HTMLElement | null;
        if (goBack) goBack.classList.remove("active");
      }
    }

    if (subMenuArray.length === 1) {
      const mobileMenuHead = document.querySelector(".mobile-menu-head") as HTMLElement | null;
      if (mobileMenuHead) mobileMenuHead.classList.remove("active");
    }
  };

  const menuTriggerClickHandler = () => {
    toggleMenu();
  };

  const closeMenuClickHandler = () => {
    toggleMenu();
    document.querySelectorAll(".sub-menu").forEach((submenu) => {
      submenu.classList.remove("active");
      (submenu as HTMLElement).style.animation = "";
    });

    const goBack = document.querySelector(".go-back") as HTMLElement | null;
    if (goBack) goBack.classList.remove("active");
  };



  const toggleMenu = () => {
    setIsActive((prev) => !prev);
    const overlay = document.querySelector(".menu-overlay");
    overlay?.classList.toggle("active");
  };


  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth > 991 && isActive) {
        toggleMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive]);



  return (
    <header
      className={`site-header site-header--menu-center zubuz-header-section bg-white ${scrollClassName}`}
      id="sticky-menu"
      style={{ borderBottom: '1px solid #e0e0e0', zIndex: 1000 }}
    >
      <div className="container">
        <nav className="navbar site-navbar">
          <BrandLogo imageSrc={logoSrc} />
          <div className="menu-block-wrapper">
            <div className={`menu-overlay ${isActive ? "active" : ""}`} onClick={closeMenuClickHandler}></div>
            <nav
              className={`menu-block ${isActive ? "active" : ""}`}
              id="append-menu-header"
            >
              <div className="mobile-menu-head">
                <div className="go-back" onClick={goBackClickHandler}>
                  <FaAngleLeft />
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
                  <Link to="/about-us" className={`nav-link-item ${location.pathname === '/about-us' ? 'active' : ''}`}>
                    About
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
            <Link
              className={`zubuz-default-btn zubuz-header-btn${roundedBtn ? " pill" : ""}`}
              to="sign-in"
            >
              <span>Login</span>
            </Link>
            <Link
              className={`zubuz-default-btn zubuz-header-btn${roundedBtn ? " pill" : ""}`}
              to="contact-us"
            >
              <span>Get Started</span>
            </Link>
          </div>
          <div
            className="mobile-menu-trigger light"
            onClick={menuTriggerClickHandler}
          >
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
