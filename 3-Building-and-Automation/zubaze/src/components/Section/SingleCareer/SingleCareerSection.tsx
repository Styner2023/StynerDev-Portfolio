import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleCareerSection = () => {
  const [searchParams] = useSearchParams();
  const [jobTitle, setJobTitle] = useState("Product Designer");
  const [jobLocation, setJobLocation] = useState("Remote");

  useEffect(() => {
    const title = searchParams.get('job');
    const location = searchParams.get('location');

    if (title) setJobTitle(decodeURIComponent(title));
    if (location) setJobLocation(decodeURIComponent(location));
  }, [searchParams]);

  return (
    <div className="section zubuz-section-padding2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="zubuz-career-details-content">
              <h1 style={{ marginBottom: '20px', color: '#2332dd' }}>{jobTitle}</h1>
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '30px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <span style={{ fontWeight: '600', color: '#495057' }}>
                  📍 {jobLocation}
                </span>
                <span style={{ fontWeight: '600', color: '#495057' }}>
                  💼 Full-Time
                </span>
                <span style={{ fontWeight: '600', color: '#495057' }}>
                  💰 $50K-$80K
                </span>
              </div>

              <h2>Job description:</h2>
              <p>
                Join our dynamic team as a {jobTitle}! You'll play a key role in shaping innovative
                solutions that make a real impact. Using cutting-edge technologies and creative thinking,
                you'll work on exciting projects that challenge and inspire you.
              </p>
              <p>
                We're looking for someone who is passionate about their craft and eager to grow with us.
                You'll collaborate with talented professionals, contribute to meaningful projects, and
                have opportunities for continuous learning and development.
              </p>
              <img src="/assets/images/team/career-details-thumb.png" alt="" />
              <h3>Position requirements:</h3>
              <p>
                We believe in hiring great people and providing them with the tools and environment
                they need to succeed. The ideal candidate will bring both technical expertise and
                a collaborative spirit to our team.
              </p>
            </div>
            <div className="zubuz-position-requirement">
              <div className="zubuz-position-requirement-item">
                <span>1. Education:</span>
                <p>
                  Bachelor's degree in a relevant field or equivalent practical experience.
                  We value both formal education and hands-on learning.
                </p>
              </div>
              <div className="zubuz-position-requirement-item">
                <span>2. Experience:</span>
                <p>
                  Proven experience in your field with a portfolio demonstrating your skills and accomplishments.
                </p>
                <p>
                  Proficiency in relevant tools and technologies for the {jobTitle} role.
                </p>
              </div>
              <div className="zubuz-position-requirement-item">
                <span>3. Problem-Solving Skills:</span>
                <p>
                  Strong analytical thinking and the ability to tackle complex challenges with creative solutions.
                </p>
              </div>
              <div className="zubuz-position-requirement-item">
                <span>4. Team Collaboration:</span>
                <p>
                  Excellent communication skills and ability to work effectively with diverse teams
                  and stakeholders.
                </p>
              </div>
              <div className="zubuz-position-requirement-item">
                <span>5. Growth Mindset:</span>
                <p>
                  Enthusiasm for learning new technologies and methodologies. We encourage
                  continuous professional development.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="zubuz-job-role">
              <h3>{jobTitle}</h3>
              <ul>
                <li>
                  <img src="/assets/images/icon/map3.svg" alt="" /> {jobLocation}
                </li>
                <li>
                  <img src="/assets/images/icon/briefcase.svg" alt="" /> Full-Time,
                  Salary: $50K-$80K
                </li>
              </ul>
              <span className="zubuz-default-btn outline-btn">
                <span>Position not open</span>
              </span>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a
                  href="/career"
                  style={{
                    color: '#2332dd',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  ← Back to all jobs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCareerSection;
