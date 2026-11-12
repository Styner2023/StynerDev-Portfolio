import { useState, useEffect } from 'react';
import { useCurrentUser } from '../../utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const PAYMENT_ICONS = {
  cashapp: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/cashapp-icon.png',
  venmo: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/venmo-icon.png',
  zelle: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/zelle-icon.png',
  paypal: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/paypall-icon.png'
};

const DeveloperPaymentSettings = () => {
  const user = useCurrentUser();
  const [paymentLinks, setPaymentLinks] = useState({
    cashapp: '',
    venmo: '',
    zelle: '',
    paypal: ''
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`${API_URL}/api/payment-settings/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok && data.settings) {
            setPaymentLinks(data.settings);
          }
        })
        .catch(err => console.error('Error loading payment settings:', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/api/payment-settings/${user?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentLinks)
      });
      const data = await response.json();
      if (data.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving payment settings:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px', scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #e5e7eb;
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>
          Payment Settings
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
          Configure your payment links so clients can support you directly
        </p>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              <img src={PAYMENT_ICONS.cashapp} alt="CashApp" style={{ width: '32px', height: '32px' }} />
              CashApp Link
            </label>
            <input
              type="text"
              value={paymentLinks.cashapp}
              onChange={(e) => setPaymentLinks({ ...paymentLinks, cashapp: e.target.value })}
              placeholder="https://cash.app/$YourUsername"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              <img src={PAYMENT_ICONS.venmo} alt="Venmo" style={{ width: '32px', height: '32px' }} />
              Venmo Link
            </label>
            <input
              type="text"
              value={paymentLinks.venmo}
              onChange={(e) => setPaymentLinks({ ...paymentLinks, venmo: e.target.value })}
              placeholder="https://venmo.com/u/YourUsername"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              <img src={PAYMENT_ICONS.zelle} alt="Zelle" style={{ width: '32px', height: '32px' }} />
              Zelle (Email or Phone)
            </label>
            <input
              type="text"
              value={paymentLinks.zelle}
              onChange={(e) => setPaymentLinks({ ...paymentLinks, zelle: e.target.value })}
              placeholder="your@email.com or phone number"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              <img src={PAYMENT_ICONS.paypal} alt="PayPal" style={{ width: '32px', height: '32px' }} />
              PayPal Link
            </label>
            <input
              type="text"
              value={paymentLinks.paypal}
              onChange={(e) => setPaymentLinks({ ...paymentLinks, paypal: e.target.value })}
              placeholder="https://www.paypal.com/..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <button
            onClick={handleSave}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '14px 24px',
              backgroundColor: '#ABFB4F',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              display: 'block',
              margin: '0 auto',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {saved ? '✓ Saved!' : 'Save Payment Links'}
          </button>

          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.6' }}>
              These payment links will be shown to your clients when they click the "Support" button in their dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPaymentSettings;
