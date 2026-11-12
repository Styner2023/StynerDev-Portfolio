import Wrapper from "../../Section/Common/Wrapper";
import ClientHeaderTemplate from "./components/ClientHeaderTemplate";
import PortfolioGridTemplate from "./components/PortfolioGridTemplate";
import FooterTemplate from "./components/FooterTemplate";

interface ClientDashboardTemplateProps {
    clientName: string;
    dashboardUrl?: string;
    isAuthenticated?: boolean; // Add authentication status
    developerId?: string;
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

const ClientDashboardTemplate = ({ clientName, dashboardUrl, isAuthenticated = false, developerId, clientProjects = [] }: ClientDashboardTemplateProps) => {
    return (
        <Wrapper>
            <ClientHeaderTemplate clientName={clientName} dashboardUrl={dashboardUrl} developerId={developerId} />
            <div className="section zubuz-section-padding" style={{ paddingTop: '120px', paddingBottom: '0' }}>
                <PortfolioGridTemplate 
                    clientName={clientName} 
                    dashboardUrl={dashboardUrl} 
                    isAuthenticated={isAuthenticated}
                    clientProjects={clientProjects} 
                />
            </div>
            <FooterTemplate />
        </Wrapper>
    );
};

export default ClientDashboardTemplate;