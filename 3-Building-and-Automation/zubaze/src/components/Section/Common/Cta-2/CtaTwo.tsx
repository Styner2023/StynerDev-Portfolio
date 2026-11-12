import { useNavigate } from "react-router-dom";

const CtaTwo = () => {
  const navigate = useNavigate();
  return (
    <div className="zubuz-cta-section2">
      <div className="container">
        <div
          className="zubuz-cta-wrap"
          style={{ backgroundImage: "url(/assets/images/v2/cta-bg.png)" }}
        >
          <div className="zubuz-cta-content">
            <h2>Ready to organize your client websites?</h2>
            <div className="zubuz-subscribe-two">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/sign-up");
                }}
              >
                <input type="email" placeholder="Enter your email to get started" />
                <button
                  className="zubuz-default-btn zubuz-subscription-btn two"
                  id="zubuz-subscription-btn"
                  type="submit"
                >
                  <span>Sign Up Free</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaTwo;
