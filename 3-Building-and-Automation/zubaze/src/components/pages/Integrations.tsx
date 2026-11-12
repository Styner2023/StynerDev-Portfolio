import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import IntegrationSection from "../Section/Integrations/Integration/Integration";

const Integrations = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader title="Integrations" />
			<IntegrationSection />
			<Footer />
		</Wrapper>
	);
};

export default Integrations;
