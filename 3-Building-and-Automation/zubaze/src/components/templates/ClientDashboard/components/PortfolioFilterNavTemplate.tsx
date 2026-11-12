interface PortfolioFilterNavTemplateProps {
  filterKey: string;
  handleFilterKeyChange: (key: string) => () => void;
}

const PortfolioFilterNavTemplate = ({ filterKey, handleFilterKeyChange }: PortfolioFilterNavTemplateProps) => {
  return (
    <div className="zubuz-portfolio-menu" style={{ marginBottom: '40px', position: 'relative' }}>
      {/* Shape decoration pointing to All Sites button */}
      <img
        src="/assets/images/v1/shape.png"
        alt=""
        className="hero-shape-arrow"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '5%',
          width: '200px',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'float-left-right 6s ease-in-out infinite'
        }}
      />
      <style>{`
        @media (max-width: 767px) {
          .hero-shape-arrow {
            display: none !important;
          }
        }
      `}</style>
      <ul
        id="watch-filter-gallery"
        className="option-set clear-both"
        data-option-key="filter"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <li
          className={filterKey === "*" ? "active" : ""}
          onClick={handleFilterKeyChange("*")}
        >
          All Sites
        </li>
        <li
          className={filterKey === "branding" ? "active" : ""}
          onClick={handleFilterKeyChange("branding")}
        >
          E-commerce
        </li>
        <li
          className={filterKey === "ui" ? "active" : ""}
          onClick={handleFilterKeyChange("ui")}
        >
          Business
        </li>
        <li
          className={filterKey === "website" ? "active" : ""}
          onClick={handleFilterKeyChange("website")}
        >
          Personal
        </li>
      </ul>
    </div>
  );
};

export default PortfolioFilterNavTemplate;