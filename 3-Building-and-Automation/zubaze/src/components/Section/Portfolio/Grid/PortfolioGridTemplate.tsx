import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PortfolioFilterNavTemplate from "../Components/PortfolioFilterNavTemplate";

interface PortfolioGridTemplateProps {
    clientName: string;
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

const PortfolioGridTemplate = ({ clientName, clientProjects = [] }: PortfolioGridTemplateProps) => {
    const isotopeRef = useRef<{ arrange: (options: { filter: string }) => void } | null>(null);
    const [filterKey, setFilterKey] = useState<string>("*");

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

    // Default projects if none provided
    const defaultProjects = [
        {
            id: "1",
            name: "My E-commerce Store",
            url: "https://your-ecommerce-site.com",
            adminUrl: "https://your-ecommerce-site.com/admin",
            thumbnail: "/assets/images/portfolio/p_1.png",
            type: "ui branding",
            status: "Online",
            lastUpdated: "2 days ago"
        },
        {
            id: "2",
            name: "My Portfolio",
            url: "https://your-portfolio-site.com",
            adminUrl: "https://your-portfolio-site.com/cms",
            thumbnail: "/assets/images/portfolio/p_2.png",
            type: "ui website",
            status: "Online",
            lastUpdated: "1 week ago"
        },
        {
            id: "3",
            name: "Business Website",
            url: "https://your-business-site.com",
            adminUrl: "https://your-business-site.com/admin",
            thumbnail: "/assets/images/portfolio/p_3.png",
            type: "ui",
            status: "Online",
            lastUpdated: "3 days ago"
        },
        {
            id: "4",
            name: "My Blog",
            url: "https://your-blog-site.com",
            adminUrl: "https://your-blog-site.com/wp-admin",
            thumbnail: "/assets/images/portfolio/p_4.png",
            type: "ui branding website",
            status: "Online",
            lastUpdated: "5 days ago"
        }
    ];

    const projectsToShow = clientProjects.length > 0 ? clientProjects : defaultProjects;

    return (
        <div className="section zubuz-section-padding3 overflow-hidden">
            <div className="container">
                <div className="zubuz-section-title center">
                    <h2>Welcome Back</h2>
                    <h3 style={{ fontSize: '24px', marginTop: '-10px', marginBottom: '10px', color: '#666' }}>
                        {clientName}
                    </h3>
                    <p>Here are all your websites. Click on any card to visit your live site or access the CMS to edit.</p>
                </div>
                <PortfolioFilterNavTemplate
                    filterKey={filterKey}
                    handleFilterKeyChange={handleFilterKeyChange}
                />
                <div
                    className="zubuz-portfolio-column filter-container"
                    id="zubaz-two-column"
                >
                    {projectsToShow.map((project) => (
                        <div key={project.id} className={`filter-item ${project.type}`}>
                            <div className={`collection-grid-item zubaz-portfolio-wrap ${project.type}`}>
                                <div className="zubaz-portfolio-thumb">
                                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                                        <img src={project.thumbnail} alt={project.name} style={{ cursor: 'pointer' }} />
                                    </a>
                                    <div className="zubaz-portfolio-data">
                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                            <h3>{project.name}</h3>
                                        </a>
                                        <p>Live Website • <span style={{ color: '#10B981' }}>●</span> {project.status} • Last updated {project.lastUpdated}</p>
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                            <Link
                                                to={`/project-details/${project.type.split(' ')[0]}`}
                                                className="zubuz-default-btn pill"
                                                style={{ fontSize: '14px', padding: '8px 20px' }}
                                            >
                                                <span>View Project Details</span>
                                            </Link>
                                            <a
                                                className="zubaz-portfolio-icon"
                                                href={project.adminUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Edit Website"
                                            >
                                                <img src="/assets/images/portfolio/arrow-right.svg" alt="Edit" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioGridTemplate;