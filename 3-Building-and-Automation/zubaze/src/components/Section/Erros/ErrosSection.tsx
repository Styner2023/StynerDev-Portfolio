import { Link } from "react-router-dom";

 
const ErrosSection = () => {
  return (
    <div className="section zubuz-extra-section" style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      alignItems: 'center',
      paddingTop: '80px',
      paddingBottom: '80px'
    }}>
      <div className="container">
        <div className="zubuz-errors-wrap" style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div className="zubuz-errors-thumb" style={{ marginBottom: '60px' }}>
            <img 
              src="/assets/images/about/404.png" 
              alt="404 Not Found" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                display: 'block',
                margin: '0 auto'
              }} 
            />
          </div>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '30px',
            lineHeight: '1.2'
          }}>
            Oops! Looks like you took a wrong turn
          </h2>
          <div className="zubuz-extara-mt" style={{ marginTop: '40px' }}>
            <Link 
              className="zubuz-default-btn" 
              to="/"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: '#2332dd',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(35, 50, 221, 0.3)'
              }}
            >
              <span>Back To Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrosSection;
