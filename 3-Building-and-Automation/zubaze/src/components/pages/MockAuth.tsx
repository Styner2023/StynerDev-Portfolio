import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';

const MockAuth = ({ userType }: { userType: 'developer' | 'client' }) => {
    const navigate = useNavigate();

    const handleMockLogin = () => {
        // Create mock user
        // No localStorage - Auth0 only

        // Redirect to appropriate dashboard
        const dashboardUrl = userType === 'developer' ? '/developer-dashboard-2' : '/client-dashboard';
        navigate(dashboardUrl);
    };

    const currentUser = getCurrentUser();
    if (currentUser) {
        const dashboardUrl = currentUser.type === 'developer' ? '/developer-dashboard-2' : '/client-dashboard';
        navigate(dashboardUrl, { replace: true });
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {userType === 'developer' ? 'Developer' : 'Client'} Login
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Temporary mock authentication - Auth0 will be restored later
                    </p>
                </div>

                <button
                    onClick={handleMockLogin}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign In as Test {userType === 'developer' ? 'Developer' : 'Client'}
                </button>

                <div className="text-center text-sm text-gray-500">
                    This bypasses Auth0 to let you test your site immediately
                </div>
            </div>
        </div>
    );
};

export default MockAuth;