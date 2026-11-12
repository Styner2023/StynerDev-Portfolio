"use client";

import Accordion from "react-bootstrap/Accordion";

const FAQSection = () => {
    return (
        <div className="section zubuz-section-padding2" style={{ backgroundColor: '#F8F9FA', width: '100%' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="zubuz-section-title center">
                    <h2>Frequently Asked Questions</h2>
                </div>
                <div className="zubuz-accordion-wrap zubuz-accordion-wrap2" style={{ maxWidth: '100%', margin: '0 auto' }}>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                Q: Why should I donate or tip my developer?
                            </Accordion.Header>
                            <Accordion.Body>
                                Supporting your developer ensures continuous innovation and improvements to your platform. Your contributions enable them to dedicate time to implementing new features, fixing issues promptly, and staying ahead of industry trends to keep your business competitive.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Q: What benefits do I get from financially supporting my developer?
                            </Accordion.Header>
                            <Accordion.Body>
                                When you support your developer through payments, tips, or donations, you receive priority support, faster response times, and dedicated attention to your specific needs. Your investment ensures your platform receives the maintenance and upgrades it deserves to run smoothly.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                Q: How does my support help with platform security and integrations?
                            </Accordion.Header>
                            <Accordion.Body>
                                Your financial support enables your developer to implement robust security measures, perform regular security audits, and integrate the tools you use daily. This creates a secure, cohesive ecosystem that protects your data and enhances your workflow efficiency.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                Q: Will supporting my developer help my business grow?
                            </Accordion.Header>
                            <Accordion.Body>
                                Absolutely! Your support allows your developer to build scalable solutions that grow with your business. They can implement flexible features, optimize performance, and ensure your platform adapts to your evolving needs without limitations.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                Q: How do tips and donations make a difference?
                            </Accordion.Header>
                            <Accordion.Body>
                                Every contribution, whether a payment, tip, or donation, directly funds ongoing development, maintenance, and support. This ensures your developer can continue creating amazing solutions, responding quickly to issues, and keeping your platform at peak performance.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
