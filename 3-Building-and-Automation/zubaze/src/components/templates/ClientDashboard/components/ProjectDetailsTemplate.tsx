import { useState } from "react";
import { Link } from "react-router-dom";

interface ProjectDetailsTemplateProps {
    projectData: {
        id: string;
        name: string;
        thumbnail: string;
        siteUrl: string;
        adminUrl: string;
        developer: string;
        status: string;
        deadline: string;
        notes: Array<{
            date: string;
            title: string;
            message: string;
        }>;
        tasks: Array<{
            task: string;
            status: string;
            dueDate: string;
        }>;
        clientScore: {
            responseTime: number;
            tasksCompleted: number;
            totalTasks: number;
            averageResponseDays: number;
        };
    };
    dashboardUrl?: string;
}

const ProjectDetailsTemplate = ({ projectData, dashboardUrl }: ProjectDetailsTemplateProps) => {
    const [overallRating, setOverallRating] = useState(0);
    const [designRating, setDesignRating] = useState(0);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [timelineRating, setTimelineRating] = useState(0);

    const getScoreColor = (score: number) => {
        if (score >= 85) return '#10B981';
        if (score >= 70) return '#F59E0B';
        if (score >= 50) return '#F97316';
        return '#EF4444';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 85) return 'Excellent Performance! You respond quickly to developer requests. Keep up the great work!';
        if (score >= 70) return 'Good Performance! You generally respond well to developer requests. There\'s room for improvement.';
        if (score >= 50) return 'Poor Performance! Your response time needs significant improvement to meet expectations.';
        return 'Critical! Immediate improvement needed in responding to developer requests.';
    };

    const StarRating = ({ rating, setRating, size = 20 }: { rating: number; setRating: (rating: number) => void; size?: number }) => {
        const [hoverRating, setHoverRating] = useState(0);

        return (
            <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <div
                        key={star}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            cursor: 'pointer',
                            backgroundColor: (hoverRating >= star || rating >= star) ? '#FABB04' : '#D1D5DB',
                            maskImage: `url(/assets/images/icon/star-icons/001-star.png)`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(/assets/images/icon/star-icons/001-star.png)`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            transition: 'background-color 0.2s ease'
                        }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="section zubuz-section-padding" style={{ paddingTop: '120px' }}>
                <div className="container">
                    {dashboardUrl && (
                        <div style={{ marginBottom: '30px' }}>
                            <Link to={`/client-dashboard/${dashboardUrl}`} className="zubuz-default-btn outline-btn pill">
                                <span>← Back to Dashboard</span>
                            </Link>
                        </div>
                    )}

                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>{projectData.name}</h1>
                        <p style={{ fontSize: '18px', color: '#666' }}>
                            Developer: <strong>{projectData.developer}</strong> •
                            Status: <span style={{ color: '#10B981', fontWeight: 'bold' }}> {projectData.status}</span> •
                            Deadline: <strong>{projectData.deadline}</strong>
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '28px', marginBottom: '25px' }}>Developer Notes & Updates</h2>
                                {projectData.notes.map((note, index) => (
                                    <div key={index} style={{
                                        borderLeft: '4px solid #2332dd',
                                        paddingLeft: '20px',
                                        marginBottom: '25px',
                                        paddingBottom: '20px',
                                        borderBottom: index !== projectData.notes.length - 1 ? '1px solid #eee' : 'none'
                                    }}>
                                        <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>{note.date}</div>
                                        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{note.title}</h3>
                                        <p style={{ color: '#555', lineHeight: '1.6' }}>{note.message}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Send Message to Developer</h2>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <textarea
                                            placeholder="Type your message or question here..."
                                            style={{
                                                width: '100%',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '16px',
                                                minHeight: '120px',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="zubuz-default-btn">
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Quick Actions</h3>
                                <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                                    <a href={projectData.siteUrl} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={projectData.thumbnail}
                                            alt={projectData.name}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                                cursor: 'pointer',
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                                            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                        />
                                    </a>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                                    <a
                                        href={projectData.siteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="zubuz-default-btn pill outline-btn"
                                        style={{ textAlign: 'center', flex: '1', fontSize: '13px', padding: '10px 15px' }}
                                    >
                                        <span>Visit Live Site</span>
                                    </a>
                                    <a
                                        href={projectData.adminUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="zubuz-default-btn pill"
                                        style={{ textAlign: 'center', flex: '1', fontSize: '13px', padding: '10px 15px' }}
                                    >
                                        <span>Edit Website</span>
                                    </a>
                                </div>
                            </div>

                            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                                <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Project Tasks</h3>
                                {projectData.tasks.map((task, index) => (
                                    <div key={index} style={{
                                        marginBottom: '15px',
                                        paddingBottom: '15px',
                                        borderBottom: index !== projectData.tasks.length - 1 ? '1px solid #eee' : 'none'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <strong style={{ fontSize: '15px' }}>{task.task}</strong>
                                            <span style={{
                                                fontSize: '12px',
                                                padding: '3px 10px',
                                                borderRadius: '12px',
                                                background: task.status === 'Completed' ? '#D1FAE5' :
                                                    task.status === 'In Progress' ? '#FEF3C7' : '#FEE2E2',
                                                color: task.status === 'Completed' ? '#065F46' :
                                                    task.status === 'In Progress' ? '#92400E' : '#991B1B'
                                            }}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>Due: {task.dueDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section" style={{ background: 'white', padding: '40px 0 20px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1 style={{
                            fontSize: '70px',
                            fontWeight: '700',
                            color: 'var(--heading-color)',
                            fontFamily: 'Raleway, sans-serif',
                            marginBottom: '20px',
                            lineHeight: '1.1'
                        }}>
                            Project Actions
                        </h1>
                        <p style={{
                            fontSize: '21px',
                            color: 'var(--body-color)',
                            maxWidth: '950px',
                            margin: '0 auto',
                            lineHeight: '30px'
                        }}>
                            Manage your project feedback, ratings, and track your collaboration performance
                        </p>
                    </div>
                </div>
            </div>

            <div className="section" style={{ background: 'white', padding: '60px 0' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <img src={projectData.thumbnail} alt="Project screenshot" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div style={{ padding: '0 40px' }}>
                                <h2 style={{ fontSize: '28px', marginBottom: '10px', fontWeight: '600' }}>Submit Feedback</h2>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '30px' }}>
                                    Share your thoughts about the current design, features, or any changes you'd like.
                                </p>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Feedback Type</label>
                                        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #E5E7EB', fontSize: '15px' }}>
                                            <option>Design Feedback</option>
                                            <option>Content Review</option>
                                            <option>Design Request</option>
                                            <option>Feature Request</option>
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Your Feedback</label>
                                        <textarea
                                            placeholder="Type your feedback here..."
                                            style={{
                                                width: '100%',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '2px solid #E5E7EB',
                                                fontSize: '15px',
                                                minHeight: '150px',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="zubuz-default-btn" style={{ padding: '12px 30px', background: '#2332dd' }}>
                                        <span>Submit Feedback</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section" style={{ background: '#FAFAFA', padding: '60px 0' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <img src={projectData.thumbnail} alt="Project screenshot" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div style={{ padding: '0 40px' }}>
                                <h2 style={{ fontSize: '28px', marginBottom: '10px', fontWeight: '600' }}>Rate This Project</h2>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '30px' }}>
                                    How would you rate the work on this project so far?
                                </p>
                                <div style={{ background: 'white', padding: '25px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #E5E7EB' }}>
                                    <p style={{ fontSize: '14px', marginBottom: '15px', fontWeight: '600', color: '#333' }}>Overall Rating</p>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                        <StarRating rating={overallRating} setRating={setOverallRating} size={36} />
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#999', marginTop: '10px', textAlign: 'center' }}>
                                        {overallRating > 0 ? `You rated: ${overallRating}/5 stars` : 'Click to rate'}
                                    </p>
                                </div>
                                <h4 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '600' }}>Rate Different Aspects:</h4>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '15px', fontWeight: '500' }}>Design Quality</span>
                                        <StarRating rating={designRating} setRating={setDesignRating} size={20} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '15px', fontWeight: '500' }}>Communication</span>
                                        <StarRating rating={communicationRating} setRating={setCommunicationRating} size={20} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '15px', fontWeight: '500' }}>Timeline</span>
                                        <StarRating rating={timelineRating} setRating={setTimelineRating} size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section" style={{ background: 'white', padding: '60px 0' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <img src={projectData.thumbnail} alt="Project screenshot" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div style={{ padding: '0 40px' }}>
                                <h2 style={{ fontSize: '28px', marginBottom: '10px', fontWeight: '600', color: '#333' }}>Your Response Score</h2>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>
                                    This score shows how well you respond to developer requests and complete assigned tasks.
                                </p>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #E5E7EB' }}>
                                    <div style={{
                                        textAlign: 'center',
                                        marginBottom: '20px',
                                        padding: '15px',
                                        backgroundColor: 'white',
                                        borderRadius: '6px',
                                        border: `1px solid ${getScoreColor(projectData.clientScore.responseTime)}`
                                    }}>
                                        <p style={{
                                            fontSize: '14px',
                                            color: getScoreColor(projectData.clientScore.responseTime),
                                            marginBottom: '0',
                                            fontWeight: '500'
                                        }}>
                                            {getScoreMessage(projectData.clientScore.responseTime)}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: getScoreColor(projectData.clientScore.responseTime),
                                                maskImage: 'url(/assets/images/icon/circular-icon/circle-icon.png)',
                                                maskSize: 'contain',
                                                maskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                                WebkitMaskImage: 'url(/assets/images/icon/circular-icon/circle-icon.png)',
                                                WebkitMaskSize: 'contain',
                                                WebkitMaskRepeat: 'no-repeat',
                                                WebkitMaskPosition: 'center'
                                            }}></div>
                                            <div style={{
                                                fontSize: '64px',
                                                fontWeight: 'bold',
                                                color: getScoreColor(projectData.clientScore.responseTime),
                                                lineHeight: '1'
                                            }}>
                                                {projectData.clientScore.responseTime}
                                            </div>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: getScoreColor(projectData.clientScore.responseTime),
                                                maskImage: 'url(/assets/images/icon/circular-icon/circle-icon.png)',
                                                maskSize: 'contain',
                                                maskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                                WebkitMaskImage: 'url(/assets/images/icon/circular-icon/circle-icon.png)',
                                                WebkitMaskSize: 'contain',
                                                WebkitMaskRepeat: 'no-repeat',
                                                WebkitMaskPosition: 'center'
                                            }}></div>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#333', marginTop: '5px' }}>out of 100</p>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '14px', color: '#333' }}>Tasks Completed</span>
                                            <strong style={{ fontSize: '14px', color: '#333' }}>{projectData.clientScore.tasksCompleted} / {projectData.clientScore.totalTasks}</strong>
                                        </div>
                                        <div style={{ background: '#E5E7EB', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                background: getScoreColor(projectData.clientScore.responseTime),
                                                height: '100%',
                                                width: `${(projectData.clientScore.tasksCompleted / projectData.clientScore.totalTasks) * 100}%`
                                            }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '14px', color: '#333' }}>Avg. Response Time</span>
                                            <strong style={{ fontSize: '14px', color: '#333' }}>{projectData.clientScore.averageResponseDays} days</strong>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px' }}>Average time to respond to developer requests</p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            paddingTop: '15px',
                                            borderTop: '1px solid #E5E7EB',
                                            flexWrap: 'wrap'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: '#10B981',
                                                    mask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain',
                                                    WebkitMask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain'
                                                }}></div>
                                                <span style={{ fontSize: '11px', color: '#333' }}>Excellent (85-100)</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: '#F59E0B',
                                                    mask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain',
                                                    WebkitMask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain'
                                                }}></div>
                                                <span style={{ fontSize: '11px', color: '#333' }}>Good (70-84)</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: '#F97316',
                                                    mask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain',
                                                    WebkitMask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain'
                                                }}></div>
                                                <span style={{ fontSize: '11px', color: '#333' }}>Poor (50-69)</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: '#EF4444',
                                                    mask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain',
                                                    WebkitMask: 'url(/assets/images/icon/circular-icon/circle-icon.png) no-repeat center / contain'
                                                }}></div>
                                                <span style={{ fontSize: '11px', color: '#333' }}>Critical (0-49)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailsTemplate;
