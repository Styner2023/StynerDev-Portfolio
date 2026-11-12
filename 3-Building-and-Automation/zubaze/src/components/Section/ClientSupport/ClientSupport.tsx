import { useState, useEffect } from "react";
import { getCurrentUser, User } from "../../../utils/auth";

const ClientSupportSection = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    return (
        <div className="section zubuz-section-padding3">
            <div className="container">
                {/* Breadcrumb */}
                <div style={{
                    marginBottom: '30px',
                    fontSize: '16px',
                    fontWeight: '500',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <a href="/client-dashboard" style={{
                        color: '#ffffff',
                        backgroundColor: '#2332dd',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '16px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(35, 50, 221, 0.2)'
                    }}>Dashboard</a>
                    <span style={{
                        color: '#2332dd',
                        fontSize: '18px',
                        fontWeight: '600'
                    }}>→</span>
                    <span style={{
                        color: '#2332dd',
                        backgroundColor: 'rgba(35, 50, 221, 0.1)',
                        fontWeight: '600',
                        fontSize: '16px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '2px solid #2332dd'
                    }}>Support</span>
                </div>

                <div className="zubuz-section-title center">
                    <h2>Hi {user?.name}, How Can We Help?</h2>
                    <p>Get support for your websites and dashboard</p>
                </div>

                <div className="row" style={{ marginTop: '60px' }}>
                    {/* Quick Help Cards */}
                    <div className="col-lg-4 col-md-6">
                        <div className="zubuz-iconbox-wrap-left" style={{ marginBottom: '40px' }}>
                            <div className="zubuz-iconbox-icon">
                                <img src="/assets/images/icon/icon-1.svg" alt="" />
                            </div>
                            <div className="zubuz-iconbox-data">
                                <h3>Website Access Issues</h3>
                                <p>Can't access your website or CMS? We'll help you get back in quickly.</p>
                                <a href="mailto:support@zubaze.com?subject=Website Access Issue">Get Help →</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="zubuz-iconbox-wrap-left" style={{ marginBottom: '40px' }}>
                            <div className="zubuz-iconbox-icon">
                                <img src="/assets/images/icon/icon-2.svg" alt="" />
                            </div>
                            <div className="zubuz-iconbox-data">
                                <h3>Dashboard Questions</h3>
                                <p>Need help navigating your dashboard or finding specific features?</p>
                                <a href="mailto:support@zubaze.com?subject=Dashboard Question">Ask Us →</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="zubuz-iconbox-wrap-left" style={{ marginBottom: '40px' }}>
                            <div className="zubuz-iconbox-icon">
                                <img src="/assets/images/icon/icon-3.svg" alt="" />
                            </div>
                            <div className="zubuz-iconbox-data">
                                <h3>Request Changes</h3>
                                <p>Want to update your website information or request new features?</p>
                                <a href="mailto:support@zubaze.com?subject=Change Request">Request →</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="row" style={{ marginTop: '60px' }}>
                    <div className="col-lg-8 offset-lg-2">
                        <div className="zubuz-account-wrap">
                            <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Send us a Message</h3>
                            <form action="https://formsubmit.co/support@zubaze.com" method="POST">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="zubuz-account-field">
                                            <label>Your Name</label>
                                            <input type="text" name="name" placeholder={user?.name || "Enter your name"} defaultValue={user?.name || ""} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="zubuz-account-field">
                                            <label>Email Address</label>
                                            <input type="email" name="email" placeholder={user?.email || "Enter your email"} defaultValue={user?.email || ""} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="zubuz-account-field">
                                    <label>Subject</label>
                                    <select name="_subject" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} required>
                                        <option>Website Access Issue</option>
                                        <option>Dashboard Question</option>
                                        <option>Request Changes</option>
                                        <option>Technical Support</option>
                                        <option>General Inquiry</option>
                                    </select>
                                </div>
                                <div className="zubuz-account-field">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Please describe your issue or question in detail..."
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                                        required
                                    ></textarea>
                                </div>
                                <input type="hidden" name="_next" value="https://app.zubaze.com/client-dashboard" />
                                <input type="hidden" name="_captcha" value="false" />
                                <button id="zubuz-account-btn" type="submit" style={{ width: '100%' }}>
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="row" style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
                    <div className="col-lg-12 text-center">
                        <h4 style={{ marginBottom: '20px' }}>Quick Actions</h4>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <a href="/client-dashboard" className="zubuz-default-btn outline-btn">
                                <span>← Back to Dashboard</span>
                            </a>
                            <a href="mailto:support@zubaze.com" className="zubuz-default-btn">
                                <span>Email Support</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientSupportSection;