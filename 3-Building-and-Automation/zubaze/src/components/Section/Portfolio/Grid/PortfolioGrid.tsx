
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PortfolioFilterNav from "../Components/PortfolioFilterNav";
import { useAuth } from "../../../../utils/auth";
import { useProjects } from "../../../../api/hooks/useProjects";

const PortfolioGrid = () => {
  const { user } = useAuth();
  const { projects, isLoading, error } = useProjects();

  const isotopeRef = useRef<Isotope | null>(null);
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

  // Loading state
  if (isLoading) {
    return (
      <div className="section zubuz-section-padding3">
        <div className="container">
          <div className="zubuz-section-title center">
            <p>Loading your websites...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state - check for 404 (client deleted) or other errors
  if (error) {
    const errorMessage = (error as unknown as Error)?.message || String(error);
    const isDeleted = errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('Client not found');
    
    return (
      <div className="section zubuz-section-padding3">
        <div className="container">
          <div className="zubuz-section-title center">
            <h2>{isDeleted ? '🚫 Dashboard No Longer Available' : 'Error Loading Websites'}</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '16px', color: '#666' }}>
              {isDeleted 
                ? 'This client dashboard has been removed by your developer. If you believe this is an error, please contact your developer for assistance.'
                : errorMessage}
            </p>
            {!isDeleted && (
              <button 
                onClick={() => window.location.reload()}
                className="zubuz-default-btn"
                style={{ marginTop: '20px' }}
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Check if user has no projects (could mean deleted client with cached auth)
  const hasNoProjects = !projects || projects.length === 0;
  if (hasNoProjects && user) {
    console.warn('⚠️ User authenticated but has no projects - possible deleted client');
  }

  return (
    <div className="section zubuz-section-padding3 overflow-hidden">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Welcome Back</h2>
          <h3 style={{ fontSize: '24px', marginTop: '-10px', marginBottom: '10px', color: '#666' }}>
            {user?.name || 'Client'}
          </h3>
          <p>Here are all your websites. Click on any card to visit your live site or access the CMS to edit.</p>
        </div>
        <PortfolioFilterNav
          filterKey={filterKey}
          handleFilterKeyChange={handleFilterKeyChange}
        />
        <div
          className="zubuz-portfolio-column filter-container"
          id="zubuz-two-column"
        >
          {projects.length === 0 ? (
            <div className="zubuz-section-title center" style={{ padding: '40px 20px' }}>
              <h3 style={{ fontSize: '20px', color: '#666', marginBottom: '15px' }}>📭 No Websites Available</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', color: '#888' }}>
                Your dashboard currently has no websites assigned. This could mean:
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: '20px auto', 
                maxWidth: '400px', 
                textAlign: 'left',
                color: '#666',
                fontSize: '14px'
              }}>
                <li style={{ padding: '8px 0' }}>• Your developer hasn't added websites yet</li>
                <li style={{ padding: '8px 0' }}>• This dashboard may have been removed</li>
                <li style={{ padding: '8px 0' }}>• Your account needs to be set up</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
                Contact your developer for assistance.
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="filter-item ui">
                <div className="collection-grid-item zubuz-portfolio-wrap ui">
                  <div className="zubuz-portfolio-thumb">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={project.thumbnail || '/assets/images/portfolio/p_1.png'} 
                        alt={project.name} 
                        style={{ cursor: 'pointer' }} 
                      />
                    </a>
                    <div className="zubuz-portfolio-data">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <h3>{project.name}</h3>
                      </a>
                      <p>
                        {project.type} • <span style={{ color: '#10B981' }}>●</span> Online
                      </p>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <Link
                          to={`/project-details/${project.id}`}
                          className="zubuz-default-btn pill"
                          style={{ fontSize: '14px', padding: '8px 20px' }}
                        >
                          <span>View Project Details</span>
                        </Link>
                        {project.adminUrl && (
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
      </div>
    </div>
  );
};

export default PortfolioGrid;
