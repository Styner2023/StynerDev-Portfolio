

import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import "./Faq.css";

const Faq = () => {
  return (
    <div className="section zubuz-section-padding2 white-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 order-lg-2">
            <div className="zubuz-default-content">
              <h2>The questions developers ask before signing up</h2>
              <p>
                Zubaze is built for developers and agencies who manage client
                websites — without the headache of hosting their code. Below
                are the questions that come up most often.
              </p>
              <p>
                Still curious about something? Reach out and we'll answer it
                directly before you ever pay a cent.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubuz-btn-wrap zubuz-faq-btn-wrap">
                  <Link className="zubuz-default-btn" to="/sign-up">
                    <span>Start Free</span>
                  </Link>
                  <Link className="zubuz-default-btn outline-btn" to="/contact-us">
                    <span>Talk to Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="zubuz-accordion-wrap zubuz-faq-accordion-wrap">
              <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Do you store my client's code?</Accordion.Header>
                  <Accordion.Body>
                    No, never. Zubaze only organizes links to your client's
                    live sites and CMS dashboards. Your code stays wherever you
                    already host it — GitHub, Netlify, Vercel, your own server.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How fast can I onboard a new client?</Accordion.Header>
                  <Accordion.Body>
                    Under five minutes. Create the client, paste in their live
                    URL and CMS link, hit invite. They land on a personalized
                    dashboard at their own custom URL — no setup on their end.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Can my clients see each other?</Accordion.Header>
                  <Accordion.Body>
                    No. Each client's dashboard is isolated — they only see
                    their own websites and project links. Logins are
                    role-based and scoped to that client's account.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Can I brand the dashboard as my agency?</Accordion.Header>
                  <Accordion.Body>
                    Yes. Add your logo, set your dashboard URL, and pick your
                    colors. Clients experience it as your studio's platform,
                    not as a Zubaze page.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
