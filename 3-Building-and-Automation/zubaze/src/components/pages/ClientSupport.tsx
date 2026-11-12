import { FaTwitter, FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Wrapper from "../Section/Common/Wrapper";
import ClientHeaderTemplate from "../templates/ClientDashboard/components/ClientHeaderTemplate";
import FooterTemplate from "../templates/ClientDashboard/components/FooterTemplate";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

const PAYMENT_ICONS = {
    cashapp: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/cashapp-icon.png',
    venmo: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/venmo-icon.png',
    zelle: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/zelle-icon.png',
    paypal: 'https://pub-e7093cbeb65d450895246d1b3d1b7fc9.r2.dev/payment-icon-links/paypall-icon.png'
};

const ClientSupport = () => {
    const [searchParams] = useSearchParams();
    const dashboardUrl = searchParams.get('dashboard') || undefined;
    const developerId = searchParams.get('developerId') || undefined;
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [paymentLinks, setPaymentLinks] = useState<any>(null);
    const [loadingPayments, setLoadingPayments] = useState(true);

    useEffect(() => {
        if (developerId) {
            fetch(`${API_URL}/payment-settings/${developerId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.ok && data.settings) {
                        setPaymentLinks(data.settings);
                    }
                })
                .catch(err => console.error('Error loading payment settings:', err))
                .finally(() => setLoadingPayments(false));
        } else {
            setLoadingPayments(false);
        }
    }, [developerId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Support message submitted:', formData);
        alert(`Thank you ${formData.name}! Your message has been sent to your developer. They'll get back to you soon.`);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <Wrapper>
            <ClientHeaderTemplate clientName="Client" dashboardUrl={dashboardUrl} />
            <div className="section zubuz-section-padding2 white-bg" style={{ paddingTop: '160px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="zubuz-default-content m-right">
                                <h2>Get in Touch with Your Developer</h2>
                                <p>
                                    Have questions about your websites? Need to request updates or changes? 
                                    Your developer is here to help you. Send a message and they'll respond 
                                    within 24-48 hours.
                                </p>
                                <div className="zubuz-extara-mt">
                                    <div className="zubuz-iconbox-wrap-left d-block">
                                        <div className="zubuz-iconbox-data data-small">
                                            <span>Response Time:</span>
                                            <p>Typically within 24-48 hours during business days.</p>
                                        </div>
                                    </div>
                                    <div className="zubuz-iconbox-wrap-left d-block">
                                        <div className="zubuz-iconbox-data data-small">
                                            <span>Rate Your Experience:</span>
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <img 
                                                        key={star}
                                                        src="/assets/images/icon/star-green.svg" 
                                                        alt="star rating"
                                                        style={{ 
                                                            width: '24px', 
                                                            height: '24px',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {paymentLinks && !loadingPayments && (Object.values(paymentLinks).some(link => link)) && (
                                        <div className="zubuz-iconbox-wrap-left d-block">
                                            <div className="zubuz-iconbox-data data-small">
                                                <span>Support Your Developer:</span>
                                                <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                                                    {paymentLinks.cashapp && (
                                                        <a href={paymentLinks.cashapp} target="_blank" rel="noopener noreferrer">
                                                            <img 
                                                                src={PAYMENT_ICONS.cashapp} 
                                                                alt="CashApp"
                                                                style={{ width: '48px', height: '48px', cursor: 'pointer', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    )}
                                                    {paymentLinks.venmo && (
                                                        <a href={paymentLinks.venmo} target="_blank" rel="noopener noreferrer">
                                                            <img 
                                                                src={PAYMENT_ICONS.venmo} 
                                                                alt="Venmo"
                                                                style={{ width: '48px', height: '48px', cursor: 'pointer', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    )}
                                                    {paymentLinks.zelle && (
                                                        <div title={`Zelle: ${paymentLinks.zelle}`}>
                                                            <img 
                                                                src={PAYMENT_ICONS.zelle} 
                                                                alt="Zelle"
                                                                style={{ width: '48px', height: '48px', cursor: 'pointer', borderRadius: '8px' }}
                                                            />
                                                        </div>
                                                    )}
                                                    {paymentLinks.paypal && (
                                                        <a href={paymentLinks.paypal} target="_blank" rel="noopener noreferrer">
                                                            <img 
                                                                src={PAYMENT_ICONS.paypal} 
                                                                alt="PayPal"
                                                                style={{ width: '48px', height: '48px', cursor: 'pointer', borderRadius: '8px' }}
                                                            />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="zubuz-iconbox-wrap-left d-block">
                                        <div className="zubuz-iconbox-data data-small">
                                            <span>Social Media:</span>
                                            <div className="zubuz-social-icon social-box">
                                                <ul>
                                                    <li>
                                                        <Link to="https://twitter.com/">
                                                            <FaTwitter />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://facebook.com/">
                                                            <FaFacebookF />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://www.linkedin.com/">
                                                            <FaLinkedin />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://github.com/">
                                                            <FaGithub />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="zubuz-form-wrap">
                                <h3>Send a message to your developer</h3>
                                {submitted && (
                                    <div style={{ 
                                        padding: '15px', 
                                        backgroundColor: '#d4edda', 
                                        color: '#155724', 
                                        borderRadius: '6px', 
                                        marginBottom: '20px',
                                        border: '1px solid #c3e6cb'
                                    }}>
                                        ✓ Your message has been sent successfully! Your developer will respond soon.
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="zubuz-main-form">
                                                <input 
                                                    type="text" 
                                                    placeholder="Your Name*" 
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="zubuz-main-form">
                                                <input 
                                                    type="email" 
                                                    placeholder="Email Address*" 
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="zubuz-main-form">
                                        <input 
                                            type="text" 
                                            placeholder="Subject*" 
                                            value={formData.subject}
                                            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="zubuz-main-form">
                                        <textarea
                                            name="textarea"
                                            placeholder="Tell your developer how they can help you with your websites..."
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            required
                                        ></textarea>
                                    </div>
                                    <button id="zubuz-submit-btn" type="submit">
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterTemplate />
        </Wrapper>
    );
};

export default ClientSupport;