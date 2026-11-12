"use client";
import './secure-solutions.css';

const SecureSolutionsSection = () => {
    return (
        <section className="secure-solutions-section section zubuz-section-padding">
            <div className="container">
                <div className="zubuz-section-title center">
                    <div className="tg-heading-subheading">
                        <h2>Why Support Your Developer?</h2>
                    </div>
                </div>
                
                <div className="row secure-solutions-row" style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' }}>
                    <div className="col-lg-4 col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="sofax-features-box secure-feature-item" style={{ minHeight: '200px' }}>
                            <div className="sofax-features-icon">
                                <img src="/assets/images/client-dashboard/icon1.png" alt="Pay Your Developer" />
                            </div>
                            <div className="sofax-features-content">
                                <h4>Ongoing Innovation</h4>
                                <p>Supporting your developer ensures they stay ahead of the curve with constant innovation, implementing new features and improvements that keep your platform competitive.</p>
                            </div>
                        </div>
                        <div className="sofax-features-box secure-feature-item" style={{ flex: 1 }}>
                            <div className="sofax-features-icon">
                                <img src="/assets/images/client-dashboard/icon2.png" alt="Tip Your Developer" />
                            </div>
                            <div className="sofax-features-content">
                                <h4>Priority Support</h4>
                                <p>Your contributions enable dedicated customer support and rapid response times when you need assistance, ensuring your business operations run smoothly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="sofax-features-box secure-feature-item" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
                            <img src="/assets/images/client-dashboard/3.supportyourdeveloper.png" alt="Support Your Developer" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="sofax-features-box secure-feature-item" style={{ minHeight: '200px' }}>
                            <div className="sofax-features-icon">
                                <img src="/assets/images/client-dashboard/icon3.png" alt="Gift Card" />
                            </div>
                            <div className="sofax-features-content">
                                <h4>Seamless Integration</h4>
                                <p>Your support allows your developer to integrate the tools you use, creating a cohesive ecosystem that enhances your workflow and productivity.</p>
                            </div>
                        </div>
                        <div className="sofax-features-box secure-feature-item" style={{ minHeight: '200px' }}>
                            <div className="sofax-features-icon">
                                <img src="/assets/images/client-dashboard/icon4.png" alt="Secure Payments" />
                            </div>
                            <div className="sofax-features-content">
                                <h4>Data Security & Growth</h4>
                                <p>Financial support ensures robust security measures protecting your data while providing flexible solutions that scale as your business grows.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecureSolutionsSection;