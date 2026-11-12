
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./FooterThree.css";

const FooterSectionThree = () => {
  return (
    <footer className="zubuz-footer-section dark-bg">
      <div className="zubuz-footer-extra-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="zubuz-footer-extra-title">
                <h2>Your websites, all in one simple dashboard</h2>
              </div>
              <div className="zubuz-extara-mt">
                <Link className="zubuz-default-btn pill" to="/client-sign-in">
                  <span>Client Login</span>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div className="zubuz-cta-thumb">
                <img
                  src="/assets/images/v1/cta-mocup.png"
                  alt="Zubaze client dashboard on mobile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="zubuz-footer-top">
          <div className="row">
            <div className="col-xl-4 col-lg-12">
              <div className="zubuz-footer-textarea light">
                <Link to="/">
                  <img src="/assets/images/logo/logo-white.svg" alt="Zubaze" />
                </Link>
                <p>
                  Your organized workspace for client website access —
                  no code storage, just clean dashboards.
                </p>
                <div className="zubuz-social-icon social-box social-box-white">
                  <ul>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/" target="_blank">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/" target="_blank">
                        <FaGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="zubuz-footer-menu light extar-margin">
                <div className="zubuz-footer-title light">
                  <p>Navigation</p>
                </div>
                <ul>
                  <li>
                    <Link to="/developer">Developer</Link>
                  </li>
                  <li>
                    <Link to="/client">Client</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-md-4">
              <div className="zubuz-footer-menu light">
                <div className="zubuz-footer-title light">
                  <p>Quick links</p>
                </div>
                <ul>
                  <li>
                    <Link to="/client-sign-in">Client Login</Link>
                  </li>
                  <li>
                    <Link to="/developer-sign-in">Developer Login</Link>
                  </li>
                  <li>
                    <Link to="/client-support">Support</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="zubuz-footer-menu light info extar-margin">
                <div className="zubuz-footer-title light">
                  <p>Contact us</p>
                </div>
                <ul>
                  <li>
                    <Link to="tel:+13412192601">
                      <img src="/assets/images/icon/call.svg" alt="" />
                      (341) 219-2601
                    </Link>
                  </li>
                  <li>
                    <Link to="mailto:contact@zubaze.com">
                      <img src="/assets/images/icon/email.svg" alt="" />
                      contact@zubaze.com
                    </Link>
                  </li>
                  <li>
                    <span className="zubuz-footer-address">
                      <img src="/assets/images/icon/map.svg" alt="" />
                      San Francisco, California
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="zubuz-footer-bottom center light">
          <div className="zubuz-copywright">
            <p>Zubaze &copy;Copyright {new Date().getFullYear()}, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSectionThree;
