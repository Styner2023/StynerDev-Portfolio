import Footer from "../Section/Common/Footer/Footer";
import Wrapper from "../Section/Common/Wrapper";
import DeveloperHeader from "../Section/Common/Header/DeveloperHeader";

const DeveloperProjects = () => {
    return (
        <Wrapper>
            <DeveloperHeader />
            <div className="section zubuz-section-padding" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2>My Projects</h2>
                                <p>Manage all your projects in one place</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="zubuz-card">
                                <div className="zubuz-card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3>Active Projects</h3>
                                        <button className="zubuz-default-btn">Create New Project</button>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Project Name</th>
                                                    <th>Client</th>
                                                    <th>Status</th>
                                                    <th>Deadline</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>E-commerce Website</td>
                                                    <td>Tech Solutions Inc.</td>
                                                    <td><span className="badge bg-success">In Progress</span></td>
                                                    <td>Dec 15, 2023</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2">View</button>
                                                        <button className="btn btn-sm btn-outline-secondary">Edit</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile App Redesign</td>
                                                    <td>Creative Agency</td>
                                                    <td><span className="badge bg-warning">Review</span></td>
                                                    <td>Nov 30, 2023</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2">View</button>
                                                        <button className="btn btn-sm btn-outline-secondary">Edit</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Dashboard UI</td>
                                                    <td>StartupXYZ</td>
                                                    <td><span className="badge bg-info">Pending</span></td>
                                                    <td>Jan 10, 2024</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2">View</button>
                                                        <button className="btn btn-sm btn-outline-secondary">Edit</button>
                                                    </td>
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

export default DeveloperProjects;