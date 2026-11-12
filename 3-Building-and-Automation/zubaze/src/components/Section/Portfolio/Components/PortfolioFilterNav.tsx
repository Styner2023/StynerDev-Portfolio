interface PortfolioFilterNavProps {
  filterKey: string;
  handleFilterKeyChange: (key: string) => () => void;
}

const PortfolioFilterNav = ({ filterKey, handleFilterKeyChange }: PortfolioFilterNavProps) => {
  return (
    <div className="zubuz-portfolio-menu">
      <ul
        id="watch-filter-gallery"
        className="option-set clear-both"
        data-option-key="filter"
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

export default PortfolioFilterNav;
