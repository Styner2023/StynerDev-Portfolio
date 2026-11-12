import { useState } from 'react';
import { useDfinity } from '../../hooks/useDfinity';
import { checkStorageHealth } from '../../services/dfinityStorage';

const DfinityTest = () => {
    const [status, setStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { testConnection, isStorageEnabled } = useDfinity();

    const handleTestConnection = async () => {
        setIsLoading(true);
        setStatus('Testing DFINITY connection...');

        try {
            const success = await testConnection();
            if (success) {
                setStatus('✅ DFINITY connection successful!');
            } else {
                setStatus('❌ DFINITY connection failed');
            }
        } catch (error) {
            setStatus(`❌ Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHealthCheck = async () => {
        setIsLoading(true);
        setStatus('Checking DFINITY backend health...');

        try {
            const health = await checkStorageHealth();
            setStatus(`✅ DFINITY backend is healthy: ${JSON.stringify(health)}`);
        } catch (error) {
            setStatus(`❌ Health check failed: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            margin: '20px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3>🧪 DFINITY Backend Test</h3>

            <div style={{ marginBottom: '15px' }}>
                <strong>Storage Mode:</strong> 🌐 Pure DFINITY
            </div>

            <div style={{ marginBottom: '15px' }}>
                <button
                    onClick={handleTestConnection}
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#2953E8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Testing...' : 'Test Connection'}
                </button>

                <button
                    onClick={handleHealthCheck}
                    disabled={isLoading || !isStorageEnabled()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isStorageEnabled() ? '#10B981' : '#9CA3AF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: (isLoading || !isStorageEnabled()) ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Checking...' : 'Check Health'}
                </button>
            </div>

            {status && (
                <div style={{
                    padding: '10px',
                    backgroundColor: status.includes('✅') ? '#D1FAE5' : '#FEE2E2',
                    border: `1px solid ${status.includes('✅') ? '#10B981' : '#EF4444'}`,
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    {status}
                </div>
            )}

            <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
                <strong>Instructions:</strong>
                <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    <li>Set <code>VITE_USE_DFINITY_STORAGE=true</code> in .env to enable DFINITY storage</li>
                    <li>Start local DFINITY replica: <code>dfx start</code></li>
                    <li>Deploy canister: <code>dfx deploy</code></li>
                    <li>Test connection to verify backend is running</li>
                    <li>Check DFINITY backend health</li>
                </ol>
            </div>
        </div>
    );
};

export default DfinityTest;