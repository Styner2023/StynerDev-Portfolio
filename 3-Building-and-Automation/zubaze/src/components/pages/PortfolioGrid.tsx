import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import PortfolioGrid from "../Section/Portfolio/Grid/PortfolioGrid";

const Portfolio = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader title="Portfolio Grid" />
			<PortfolioGrid />
			<Footer />
		</Wrapper>
	);
};

export default Portfolio;
