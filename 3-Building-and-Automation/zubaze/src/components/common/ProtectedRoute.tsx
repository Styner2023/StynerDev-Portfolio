import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredUserType?: 'client' | 'developer';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();

    // App.tsx already waited for the stored token to be validated (isLoading gate)
    if (!isAuthenticated) {
        const redirectPath = requiredUserType === 'developer' 
            ? '/developer-sign-in' 
            : '/client-sign-in';
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    // Check if user type matches required type
    if (requiredUserType && user?.type !== requiredUserType) {
        // Show error message before redirecting
        const userTypeLabel = user?.type === 'developer' ? 'Developer' : user?.type === 'client' ? 'Client' : 'Unknown';
        const requiredTypeLabel = requiredUserType === 'developer' ? 'Developer' : 'Client';
        const correctPath = user?.type === 'developer' ? '/developer-dashboard-2' : '/client-dashboard';
        
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#f9fafb'
            }}>
                <div style={{
                    maxWidth: '500px',
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🚫</span>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>
                        Access Denied
                    </h1>
                    <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '24px' }}>
                        You are logged in as a <strong>{userTypeLabel}</strong>, but this page requires <strong>{requiredTypeLabel}</strong> access.
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                        Your account ({user?.email}) is registered as a {userTypeLabel}. You cannot access the {requiredTypeLabel} dashboard with this account.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <a
                            href={correctPath}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}
                        >
                            Go to {userTypeLabel} Dashboard
                        </a>
                        <a
                            href="/"
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#e5e7eb',
                                color: '#374151',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}
                        >
                            Go to Homepage
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;