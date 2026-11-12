import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuthContext } from "./auth/AuthProvider";
import LandingPage from "./components/pages/LandingPage";
import DeveloperLandingPage from "./components/pages/DeveloperLandingPage";
import ClientLandingPage from "./components/pages/ClientLandingPage";
import Aboutus from "./components/pages/Aboutus";
import Pricing from "./components/pages/Pricing";
import Service from "./components/pages/Service";
import SingleService from "./components/pages/SingleService";
import Team from "./components/pages/Team";
import SingleTeam from "./components/pages/SingleTeam";
import Career from "./components/pages/Career";
import SingleCareer from "./components/pages/SingleCareer";
import Contactus from "./components/pages/Contactus";
import Faq from "./components/pages/Faq";
import NotFound from "./error";
import Integrations from "./components/pages/Integrations";
import ComingSoon from "./components/pages/ComingSoon";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import ResetPassword from "./components/pages/ResetPassword";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ClientDashboard from "./components/pages/ClientDashboard";
import DeveloperDashboard2 from "./components/pages/DeveloperDashboard2";
import DeveloperProjects from "./components/pages/DeveloperProjects";
import DeveloperEarnings from "./components/pages/DeveloperEarnings";
import ClientSupport from "./components/pages/ClientSupport";
import ProjectDetails from "./components/pages/ProjectDetails";
import DashboardTest from "./components/pages/DashboardTest";
import TestDashboard from "./components/pages/TestDashboard";
import DashboardFixTest from "./components/pages/DashboardFixTest";
import DfinityStorageDemo from "./components/pages/DfinityStorageDemo";
import DynamicClientDashboard from "./components/pages/DynamicClientDashboard";
import DynamicProjectDetails from "./components/pages/DynamicProjectDetails";
import DfinityTest from "./components/pages/DfinityTest";
import DeveloperPaymentSettings from "./components/pages/DeveloperPaymentSettings";
import ScrollToTopButton from "./components/Section/Common/ScrollToTopButton";
import SSOCallback from "./components/pages/SSOCallback";

const router = createBrowserRouter([
	{ path: "/", element: <LandingPage /> },
	{ path: "/home", element: <LandingPage /> },
	{ path: "/developer", element: <DeveloperLandingPage /> },
	{ path: "/client", element: <ClientLandingPage /> },
	{ path: "/about-us", element: <Aboutus /> },
	{ path: "/pricing", element: <Pricing /> },
	{ path: "/client-support", element: <ClientSupport /> },
	{ path: "/service", element: <Service /> },
	{ path: "/single-service", element: <SingleService /> },
	{ path: "/team", element: <Team /> },
	{ path: "/single-team", element: <SingleTeam /> },
	{ path: "/career", element: <Career /> },
	{ path: "/single-career", element: <SingleCareer /> },
	{ path: "/portfolio-grid", element: <ProtectedRoute requiredUserType="client"><ClientDashboard /></ProtectedRoute> },
	{ path: "/client-dashboard/:clientUrl/project/:projectId", element: <DynamicProjectDetails /> },
	{ path: "/client-dashboard/:clientUrl", element: <DynamicClientDashboard /> },
	{ path: "/client-dashboard", element: <ProtectedRoute requiredUserType="client"><ClientDashboard /></ProtectedRoute> },
	{ path: "/developer-dashboard-2", element: <Navigate to="/developer-dashboard" replace /> },
	{ path: "/developer-dashboard", element: <ProtectedRoute requiredUserType="developer"><DeveloperDashboard2 /></ProtectedRoute> },
	{ path: "/projects", element: <ProtectedRoute requiredUserType="developer"><DeveloperProjects /></ProtectedRoute> },
	{ path: "/earnings", element: <ProtectedRoute requiredUserType="developer"><DeveloperEarnings /></ProtectedRoute> },
	{ path: "/payment-settings", element: <ProtectedRoute requiredUserType="developer"><DeveloperPaymentSettings /></ProtectedRoute> },
	{ path: "/client-support", element: <ProtectedRoute requiredUserType="client"><ClientSupport /></ProtectedRoute> },
	{ path: "/project-details/:projectId", element: <ProtectedRoute requiredUserType="client"><ProjectDetails /></ProtectedRoute> },
	{ path: "/contact-us", element: <Contactus /> },
	{ path: "/faq", element: <Faq /> },
	{ path: "/integrations", element: <Integrations /> },
	{ path: "/sign-in", element: <Signin userType="developer" /> },
	{ path: "/developer-sign-in", element: <Signin userType="developer" /> },
	{ path: "/client-sign-in", element: <Signin userType="client" /> },
	{ path: "/sign-up", element: <Signup userType="developer" /> },
	{ path: "/developer-sign-up", element: <Signup userType="developer" /> },
	{ path: "/client-sign-up", element: <Signup userType="client" /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/coming-soon", element: <ComingSoon /> },
	{ path: "/dashboard-test", element: <DashboardTest /> },
	{ path: "/test-dashboard", element: <TestDashboard /> },
	{ path: "/dashboard-fix-test", element: <DashboardFixTest /> },
	{ path: "/dfinity-test", element: <DfinityTest /> },
	{ path: "/dfinity-storage", element: <DfinityStorageDemo /> },
	{ path: "/sso-callback", element: <SSOCallback /> },
	{ path: "/auth-callback", element: <SSOCallback /> },

	{ path: "*", element: <NotFound /> },
]);

// Full page spinner component
const FullPageSpinner = () => (
	<div style={{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		gap: '1rem'
	}}>
		<div className="spinner"></div>
		<p>Loading...</p>
	</div>
);

function App() {
	const { isLoading } = useAuthContext();

	// Global loader - stays true until the stored token is validated on boot
	if (isLoading) return <FullPageSpinner />;

	return (
		<>
			<RouterProvider router={router} />
			<ScrollToTopButton />
		</>
	);
}

export default App;
