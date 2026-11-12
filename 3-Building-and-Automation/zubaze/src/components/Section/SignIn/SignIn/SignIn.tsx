import { useState, FormEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../auth/AuthProvider";
import "./SignIn.css";

interface SignInFormProps {
  userType?: "client" | "developer";
}

const SignInForm = ({ userType: propUserType }: SignInFormProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const dashboardUrl = searchParams.get("dashboard");
  const isFromClientDashboard = !!dashboardUrl;
  const userType = isFromClientDashboard
    ? "client"
    : propUserType ||
      (searchParams.get("type") as "client" | "developer") ||
      "client";

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
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) {
      navigate(destination(), { replace: true });
    } else {
      setError(result.error || "Sign in failed.");
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
                  to="/developer-sign-in"
                  className={`zubuz-auth-toggle-btn${userType === "developer" ? " active" : ""}`}
                >
                  Developer
                </Link>
                <Link
                  to="/client-sign-in"
                  className={`zubuz-auth-toggle-btn${userType === "client" ? " active" : ""}`}
                >
                  Client
                </Link>
              </div>
            )}

            {isFromClientDashboard && (
              <div className="zubuz-auth-locked">
                <p>
                  🔒 You're signing in as a <strong>Client</strong> to access your dashboard
                </p>
              </div>
            )}

            <div className="zubuz-section-title center">
              <h2 className="h3">
                Welcome Back {userType === "client" ? "Client" : "Developer"}
              </h2>
              <p>
                Sign in to access your{" "}
                {userType === "client" ? "website dashboard" : "developer tools"}
              </p>
            </div>

            <div className="zubuz-account-wrap">
              <form className="zubuz-auth-form" onSubmit={handleSubmit}>
                {error && <div className="zubuz-auth-error">{error}</div>}

                <div className="zubuz-auth-field">
                  <label htmlFor="signin-email">Email address</label>
                  <input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="zubuz-auth-field">
                  <label htmlFor="signin-password">Password</label>
                  <input
                    id="signin-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  id="zubuz-account-btn"
                  type="submit"
                  className="zubuz-auth-btn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Signing in…" : "Sign in"}</span>
                </button>
              </form>

              <div className="zubuz-account-bottom">
                <p>
                  Not a member yet?{" "}
                  <Link
                    to={`/sign-up?type=${userType}${dashboardUrl ? `&dashboard=${dashboardUrl}` : ""}`}
                  >
                    Sign up here
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

export default SignInForm;
