import "./Comparison.css";

type Cell = "yes" | "no" | "partial";

type Row = {
  capability: string;
  zubaze: Cell;
  docs: Cell;
  email: Cell;
};

const rows: Row[] = [
  { capability: "Each client sees only their own sites", zubaze: "yes", docs: "no", email: "no" },
  { capability: "One-click client invite, no account to create", zubaze: "yes", docs: "no", email: "partial" },
  { capability: "White-label portal with your own brand", zubaze: "yes", docs: "no", email: "no" },
  { capability: "Live site, CMS & admin links in one place", zubaze: "yes", docs: "partial", email: "no" },
  { capability: "Update a link once — clients always see current", zubaze: "yes", docs: "partial", email: "no" },
  { capability: "Secure sign-in (Auth0), not a shared password", zubaze: "yes", docs: "no", email: "no" },
  { capability: "Stays organized past 10+ active clients", zubaze: "yes", docs: "no", email: "no" },
];

const Mark = ({ value }: { value: Cell }) => {
  if (value === "yes") {
    return (
      <span className="zubuz-compare-yes">
        <img src="/assets/images/v2/check2.png" alt="Yes" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="zubuz-compare-partial" title="Possible, with manual upkeep">
        ◐
      </span>
    );
  }
  return (
    <span className="zubuz-compare-no" title="No">
      —
    </span>
  );
};

const ComparisonSection = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>You're not switching from a competitor — you're escaping the spreadsheet</h2>
          <p>
            Most developers track client sites in a doc, a Notion page, or a
            thread of "what was that login again?" emails. Here's how that holds
            up against Zubaze.
          </p>
        </div>
        <div className="zubuz-compare-wrap">
          <table className="zubuz-compare-table">
            <thead>
              <tr>
                <th>What you actually need</th>
                <th className="zubuz-compare-col-zubaze">Zubaze</th>
                <th>Spreadsheet / Notion doc</th>
                <th>Shared email &amp; password docs</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.capability}>
                  <td>{row.capability}</td>
                  <td className="zubuz-compare-col-zubaze">
                    <Mark value={row.zubaze} />
                  </td>
                  <td>
                    <Mark value={row.docs} />
                  </td>
                  <td>
                    <Mark value={row.email} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="zubuz-compare-note">
          <span className="zubuz-compare-partial">◐</span> Possible, but only with manual upkeep every time something changes.
        </p>
      </div>
    </div>
  );
};

export default ComparisonSection;
