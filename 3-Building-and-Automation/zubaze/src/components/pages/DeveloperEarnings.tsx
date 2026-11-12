import Footer from "../Section/Common/Footer/Footer";
import Wrapper from "../Section/Common/Wrapper";
import DeveloperHeader from "../Section/Common/Header/DeveloperHeader";

const DeveloperEarnings = () => {
    return (
        <Wrapper>
            <DeveloperHeader />
            <div className="section zubuz-section-padding" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2>Earnings</h2>
                                <p>Track your income and payouts</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="zubuz-card">
                                <div className="zubuz-card-body text-center">
                                    <h3>Total Earnings</h3>
                                    <h2 className="text-primary">$12,450.00</h2>
                                    <p className="text-muted">All time earnings</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="zubuz-card">
                                <div className="zubuz-card-body text-center">
                                    <h3>Pending Payout</h3>
                                    <h2 className="text-warning">$2,300.00</h2>
                                    <p className="text-muted">Processing</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="zubuz-card">
                                <div className="zubuz-card-body text-center">
                                    <h3>This Month</h3>
                                    <h2 className="text-success">$3,200.00</h2>
                                    <p className="text-muted">November 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="zubuz-card">
                                <div className="zubuz-card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3>Payment History</h3>
                                        <div>
                                            <button className="btn btn-sm btn-outline-secondary me-2">Filter</button>
                                            <button className="btn btn-sm btn-outline-primary">Export</button>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Project</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Invoice</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Nov 15, 2023</td>
                                                    <td>E-commerce Website</td>
                                                    <td>$3,500.00</td>
                                                    <td><span className="badge bg-success">Paid</span></td>
                                                    <td><button className="btn btn-sm btn-outline-primary">Download</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Nov 10, 2023</td>
                                                    <td>Mobile App Redesign</td>
                                                    <td>$2,800.00</td>
                                                    <td><span className="badge bg-success">Paid</span></td>
                                                    <td><button className="btn btn-sm btn-outline-primary">Download</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Nov 5, 2023</td>
                                                    <td>Dashboard UI</td>
                                                    <td>$1,200.00</td>
                                                    <td><span className="badge bg-warning">Processing</span></td>
                                                    <td><button className="btn btn-sm btn-outline-primary">Download</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Oct 28, 2023</td>
                                                    <td>API Integration</td>
                                                    <td>$4,950.00</td>
                                                    <td><span className="badge bg-success">Paid</span></td>
                                                    <td><button className="btn btn-sm btn-outline-primary">Download</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default DeveloperEarnings;