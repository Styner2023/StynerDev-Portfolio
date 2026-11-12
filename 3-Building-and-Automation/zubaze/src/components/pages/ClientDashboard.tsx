import Footer from "../Section/Common/Footer/Footer";
import Wrapper from "../Section/Common/Wrapper";
import PortfolioGrid from "../Section/Portfolio/Grid/PortfolioGrid";
import ClientHeader from "../Section/Common/Header/ClientHeader";

const ClientDashboard = () => {
    return (
        <Wrapper>
            <ClientHeader />
            <div className="section zubuz-section-padding" style={{ paddingTop: '120px' }}>
                <PortfolioGrid />
            </div>
            <Footer />
        </Wrapper>
    );
};

export default ClientDashboard;