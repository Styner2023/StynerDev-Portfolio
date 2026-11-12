import '../client-sections.css';

const FaqSection = () => {
  return (
    <div className="section zubuz-section-padding3 zubuz-faq-section-bg">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div
          className="zubuz-accordion-wrap zubuz-accordion-wrap2"
          id="zubuz-accordion"
        >
          <div className="zubuz-accordion-item open">
            <div className="zubuz-accordion-header">
              <p>
                Q: Why should I donate or tip my developer?
              </p>
              <div className="zubuz-active-icon">
                <img src="/assets/images/v3/plus.png" alt="" />
              </div>
              <div className="zubuz-inactive-icon">
                <img src="/assets/images/v3/minus.png" alt="" />
              </div>
            </div>
            <div className="zubuz-accordion-body">
              <p>
                Supporting your developer ensures continuous innovation and improvements to your platform. Your contributions enable them to dedicate time to implementing new features, fixing issues promptly, and staying ahead of industry trends to keep your business competitive.
              </p>
            </div>
          </div>
          <div className="zubuz-accordion-item">
            <div className="zubuz-accordion-header">
              <p>Q: What benefits do I get from financially supporting my developer?</p>
              <div className="zubuz-active-icon">
                <img src="/assets/images/v3/plus.png" alt="" />
              </div>
              <div className="zubuz-inactive-icon">
                <img src="/assets/images/v3/minus.png" alt="" />
              </div>
            </div>
            <div className="zubuz-accordion-body">
              <p>
                When you support your developer through payments, tips, or donations, you receive priority support, faster response times, and dedicated attention to your specific needs. Your investment ensures your platform receives the maintenance and upgrades it deserves to run smoothly.
              </p>
            </div>
          </div>

          <div className="zubuz-accordion-item">
            <div className="zubuz-accordion-header">
              <p>
                Q: How does my support help with platform security and integrations?
              </p>
              <div className="zubuz-active-icon">
                <img src="/assets/images/v3/plus.png" alt="" />
              </div>
              <div className="zubuz-inactive-icon">
                <img src="/assets/images/v3/minus.png" alt="" />
              </div>
            </div>
            <div className="zubuz-accordion-body">
              <p>
                Your financial support enables your developer to implement robust security measures, perform regular security audits, and integrate the tools you use daily. This creates a secure, cohesive ecosystem that protects your data and enhances your workflow efficiency.
              </p>
            </div>
          </div>

          <div className="zubuz-accordion-item">
            <div className="zubuz-accordion-header">
              <p>Q: Will supporting my developer help my business grow?</p>
              <div className="zubuz-active-icon">
                <img src="/assets/images/v3/plus.png" alt="" />
              </div>
              <div className="zubuz-inactive-icon">
                <img src="/assets/images/v3/minus.png" alt="" />
              </div>
            </div>
            <div className="zubuz-accordion-body">
              <p>
                Absolutely! Your support allows your developer to build scalable solutions that grow with your business. They can implement flexible features, optimize performance, and ensure your platform adapts to your evolving needs without limitations.
              </p>
            </div>
          </div>

          <div className="zubuz-accordion-item">
            <div className="zubuz-accordion-header">
              <p>
                Q: How do tips and donations make a difference?
              </p>
              <div className="zubuz-active-icon plus">
                <img src="/assets/images/v3/plus.png" alt="" />
              </div>
              <div className="zubuz-inactive-icon">
                <img src="/assets/images/v3/minus.png" alt="" />
              </div>
            </div>
            <div className="zubuz-accordion-body">
              <p>
                Every contribution, whether a payment, tip, or donation, directly funds ongoing development, maintenance, and support. This ensures your developer can continue creating amazing solutions, responding quickly to issues, and keeping your platform at peak performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
