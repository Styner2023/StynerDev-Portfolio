import FooterTemplate from "../Section/Common/Footer/FooterTemplate";
import Wrapper from "../Section/Common/Wrapper";
import ClientHeaderTemplate from "../templates/ClientDashboard/components/ClientHeaderTemplate";
import PortfolioGridTemplate from "../Section/Portfolio/Grid/PortfolioGridTemplate";

interface ClientDashboardTemplateProps {
    clientName: string;
    dashboardUrl?: string;
    clientProjects?: Array<{
        id: string;
        name: string;
        url: string;
        adminUrl: string;
        thumbnail: string;
        type: string;
        status: string;
        lastUpdated: string;
    }>;
}

const ClientDashboardTemplate = ({ clientName, dashboardUrl, clientProjects = [] }: ClientDashboardTemplateProps) => {
    return (
        <Wrapper>
            <ClientHeaderTemplate clientName={clientName} dashboardUrl={dashboardUrl} />
            <div style={{ height: '3px', backgroundColor: '#000', margin: '20px auto', width: '90%' }}></div>
            <div className="section zubuz-section-padding" style={{ paddingTop: '120px' }}>
                <PortfolioGridTemplate clientName={clientName} clientProjects={clientProjects} />
            </div>
            <FooterTemplate />
        </Wrapper>
    );
};

export default ClientDashboardTemplate;