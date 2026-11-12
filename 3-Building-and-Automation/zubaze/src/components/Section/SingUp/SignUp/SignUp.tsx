import { useState, FormEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../auth/AuthProvider";
import "../../SignIn/SignIn/SignIn.css";

interface SignUpFormProps {
  userType?: "client" | "developer";
}

const SignUpForm = ({ userType: propUserType }: SignUpFormProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signup } = useAuthContext();

  const dashboardUrl = searchParams.get("dashboard");
  const isFromClientDashboard = !!dashboardUrl;
  const userType = isFromClientDashboard
    ? "client"
    : propUserType ||
      (searchParams.get("type") as "client" | "developer") ||
      "client";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const destination = () => {
    if (dashboardUrl) return `/client-dashboard/${dashboardUrl}`;
    return userType === "client" ? "/client-dashboard" : "/developer-dashboard";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSubmitting(true);
    const result = await signup({ email, password, name, userType });
    setSubmitting(false);
    if (result.ok) {
      navigate(destination(), { replace: true });
    } else {
      setError(result.error || "Sign up failed.");
    }
  };

  return (
    <div className="section zubuz-extra-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-7 col-md-9">
            {!isFromClientDashboard && (
              <div className="zubuz-auth-toggle">
                <Link
                  to="/developer-sign-up"
                  className={`zubuz-auth-toggle-btn${userType === "developer" ? " active" : ""}`}
                >
                  Developer
                </Link>
                <Link
                  to="/client-sign-up"
                  className={`zubuz-auth-toggle-btn${userType === "client" ? " active" : ""}`}
                >
                  Client
                </Link>
              </div>
            )}

            {isFromClientDashboard && (
              <div className="zubuz-auth-locked">
                <p>
                  🔒 You're signing up as a <strong>Client</strong> to access your dashboard
                </p>
              </div>
            )}

            <div className="zubuz-section-title center">
              <h2 className="h3">
                Create {userType === "client" ? "Client" : "Developer"} Account
              </h2>
              <p>
                Get started with your{" "}
                {userType === "client" ? "website dashboard" : "developer tools"}
              </p>
            </div>

            <div className="zubuz-account-wrap">
              <form className="zubuz-auth-form" onSubmit={handleSubmit}>
                {error && <div className="zubuz-auth-error">{error}</div>}

                <div className="zubuz-auth-field">
                  <label htmlFor="signup-name">Full name</label>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="zubuz-auth-field">
                  <label htmlFor="signup-email">Email address</label>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="zubuz-auth-field">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>

                <button
                  id="zubuz-account-btn"
                  type="submit"
                  className="zubuz-auth-btn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Creating account…" : "Create account"}</span>
                </button>
              </form>

              <div className="zubuz-account-bottom">
                <p>
                  Already have an account?{" "}
                  <Link
                    to={`/sign-in?type=${userType}${dashboardUrl ? `&dashboard=${dashboardUrl}` : ""}`}
                  >
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
