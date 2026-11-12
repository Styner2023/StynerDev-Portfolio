import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <a
                    className="scrollToTop"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToTop();
                    }}
                    style={{
                        position: "fixed",
                        bottom: "30px",
                        right: "30px",
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#0000FF",
                        color: "#fff",
                        borderRadius: "50%",
                        border: "2px dashed #0000FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        boxShadow: "0 4px 15px rgba(0, 0, 255, 0.3)",
                        zIndex: 1000,
                        transition: "all 0.4s ease-in-out",
                        fontSize: "20px",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#ABFB4F";
                        e.currentTarget.style.borderColor = "#ABFB4F";
                        e.currentTarget.style.color = "#000";
                        e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(171, 251, 79, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#0000FF";
                        e.currentTarget.style.borderColor = "#0000FF";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 255, 0.3)";
                    }}
                >
                    <FaArrowUp />
                </a>
            )}
        </>
    );
};

export default ScrollToTopButton;