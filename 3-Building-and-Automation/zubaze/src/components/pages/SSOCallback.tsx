import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

/**
 * Legacy route from the old Auth0 redirect flow. Custom auth no longer uses a
 * redirect round-trip, so this just sends people to the right place.
 */
const SSOCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isClient } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isClient ? "/client-dashboard" : "/developer-dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isClient, navigate]);

  return null;
};

export default SSOCallback;
