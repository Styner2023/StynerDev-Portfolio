// Pure DFINITY Storage Demo - Production storage status
import React from 'react';
import { useDfinityStorage } from '../../hooks/useDfinityStorage';
import { checkStorageHealth } from '../../services/dfinityStorage';
import { logDfinityData } from '../../utils/dfinityManager';

const DfinityStorageDemo: React.FC = () => {
    const { projects, clients, status, refreshData } = useDfinityStorage();
    const [healthStatus, setHealthStatus] = React.useState<string>('');

    const handleHealthCheck = async () => {
        setHealthStatus('Checking DFINITY health...');
        try {
            const health = await checkStorageHealth();
            setHealthStatus(`Health Check: ${JSON.stringify(health)}`);
            logDfinityData();
        } catch (error) {
            setHealthStatus(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const getStatusColor = () => {
        if (status.error) return '#dc3545';
        if (status.isDfinityConnected) return '#28a745';
        return '#ffc107';
    };

    const getStatusText = () => {
        if (status.error) return `Error: ${status.error}`;
        if (status.isDfinityConnected) return 'DFINITY Connected';
        return 'Connecting to DFINITY...';
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>🌐 Pure DFINITY Storage</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Zubaze is now running on pure DFINITY Internet Computer storage. No localStorage dependency.
            </p>

            {/* Status Panel */}
            <div style={{
                background: '#f8f9fa',
                border: `2px solid ${getStatusColor()}`,
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <h3 style={{ margin: '0 0 10px 0', color: getStatusColor() }}>
                    {getStatusText()}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                    <div>
                        <strong>Storage Type:</strong><br />
                        <span style={{ color: '#28a745' }}>DFINITY Internet Computer</span>
                    </div>
                    <div>
                        <strong>Projects:</strong><br />
                        {projects.length}
                    </div>
                    <div>
                        <strong>Clients:</strong><br />
                        {clients.length}
                    </div>
                    <div>
                        <strong>Status:</strong><br />
                        {status.isLoading ? '⏳ Loading...' : '✅ Ready'}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button
                    onClick={handleHealthCheck}
                    style={{
                        padding: '10px 20px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Check DFINITY Health
                </button>

                <button
                    onClick={refreshData}
                    style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Refresh Data
                </button>
            </div>

            {/* Health Status */}
            {healthStatus && (
                <div style={{
                    background: healthStatus.includes('failed') ? '#f8d7da' : '#d4edda',
                    border: `1px solid ${healthStatus.includes('failed') ? '#f5c6cb' : '#c3e6cb'}`,
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '20px',
                    color: healthStatus.includes('failed') ? '#721c24' : '#155724'
                }}>
                    {healthStatus}
                </div>
            )}

            {/* Data Display */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Projects */}
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                    <h4>📁 Projects ({projects.length})</h4>
                    {projects.length === 0 ? (
                        <p style={{ color: '#666' }}>No projects found in DFINITY storage</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {projects.slice(0, 5).map(project => (
                                <li key={project.id} style={{
                                    background: 'white',
                                    margin: '5px 0',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}>
                                    <strong>{project.name}</strong><br />
                                    <span style={{ color: '#666' }}>{project.url}</span>
                                </li>
                            ))}
                            {projects.length > 5 && (
                                <li style={{ color: '#666', fontStyle: 'italic' }}>
                                    ... and {projects.length - 5} more
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Clients */}
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                    <h4>👥 Clients ({clients.length})</h4>
                    {clients.length === 0 ? (
                        <p style={{ color: '#666' }}>No clients found in DFINITY storage</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {clients.slice(0, 5).map(client => (
                                <li key={client.id} style={{
                                    background: 'white',
                                    margin: '5px 0',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}>
                                    <strong>{client.name}</strong><br />
                                    <span style={{ color: '#666' }}>{client.email}</span>
                                </li>
                            ))}
                            {clients.length > 5 && (
                                <li style={{ color: '#666', fontStyle: 'italic' }}>
                                    ... and {clients.length - 5} more
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {/* Technical Details */}
            <div style={{
                background: '#e9ecef',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px',
                fontSize: '14px'
            }}>
                <h4>🔧 Technical Details</h4>
                <ul>
                    <li><strong>Backend:</strong> DFINITY Internet Computer Motoko Canister</li>
                    <li><strong>Storage:</strong> Persistent stable memory</li>
                    <li><strong>Authentication:</strong> Auth0 React SDK</li>
                    <li><strong>Data Format:</strong> Native DFINITY types with frontend conversion</li>
                    <li><strong>No localStorage:</strong> Pure cloud storage implementation</li>
                </ul>
            </div>
        </div>
    );
};

export default DfinityStorageDemo;