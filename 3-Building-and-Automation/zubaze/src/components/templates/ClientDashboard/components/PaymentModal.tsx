import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentLinks?: {
    cashapp?: string;
    venmo?: string;
    zelle?: string;
    paypal?: string;
  };
}

const PaymentModal = ({ isOpen, onClose, paymentLinks }: PaymentModalProps) => {
  if (!isOpen) return null;

  const payments = [
    {
      name: 'CashApp',
      url: paymentLinks?.cashapp || 'https://cash.app/$StynerStiner',
      icon: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/cashapp-icon.png'
    },
    {
      name: 'Venmo',
      url: paymentLinks?.venmo || 'https://venmo.com/u/StynerDev',
      icon: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/venmo-icon.png'
    },
    {
      name: 'Zelle',
      url: paymentLinks?.zelle || '',
      icon: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/zelle-icon.png'
    },
    {
      name: 'PayPal',
      url: paymentLinks?.paypal || 'https://www.paypal.com/ncp/payment/P2RKBBHHNTRA2',
      icon: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/paypall-icon.png'
    }
  ].filter(p => p.url);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} onClick={onClose}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '10px', textAlign: 'center' }}>
            Support Your Developer
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px', textAlign: 'center' }}>
            Choose your preferred payment method
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {payments.map((payment) => (
              <a
                key={payment.name}
                href={payment.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ABFB4F';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(171, 251, 79, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img 
                  src={payment.icon} 
                  alt={payment.name}
                  style={{ width: '60px', height: '60px', marginBottom: '12px' }}
                />
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
                  {payment.name}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
