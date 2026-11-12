 
import { FaTwitter, FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <div className="section zubuz-section-padding2 white-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="zubuz-default-content m-right">
              <h2>Get in Touch with Zubaze</h2>
              <p>
                Have questions about organizing your client websites? Need help
                setting up your dashboard? Our team is here to help you get started
                with Zubaze and streamline your workflow.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubuz-iconbox-wrap-left d-block">
                  <div className="zubuz-iconbox-data data-small">
                    <span>Office Location:</span>
                    <p>San Francisco, California</p>
                  </div>
                </div>
                <div className="zubuz-iconbox-wrap-left d-block">
                  <div className="zubuz-iconbox-data data-small">
                    <span>Social Media:</span>
                    <div className="zubuz-social-icon social-box">
                      <ul>
                        <li>
                          <Link to="https://twitter.com/">
                            <FaTwitter />
                          </Link>
                        </li>
                        <li>
                          <Link to="https://facebook.com/">
                            <FaFacebookF />
                          </Link>
                        </li>
                        <li>
                          <Link to="https://www.linkedin.com/">
                            <FaLinkedin />
                          </Link>
                        </li>
                        <li>
                          <Link to="https://github.com/">
                            <FaGithub />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="zubuz-form-wrap">
              <h3>Send us a message</h3>
              <form action="https://formsubmit.co/contact@zubaze.com" method="POST">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="zubuz-main-form">
                      <input type="text" name="name" placeholder="Your Name*" required />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="zubuz-main-form">
                      <input type="email" name="email" placeholder="Email Address*" required />
                    </div>
                  </div>
                </div>
                <div className="zubuz-main-form">
                  <input type="text" name="_subject" placeholder="Subject" required />
                </div>
                <div className="zubuz-main-form">
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you organize your client websites..."
                    required
                  ></textarea>
                </div>
                <input type="hidden" name="_next" value="https://app.zubaze.com" />
                <input type="hidden" name="_captcha" value="false" />
                <button id="zubuz-submit-btn" type="submit">
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
