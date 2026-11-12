import CtaThree from "../Section/Common/Cta-3/CtaThree";
import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import TeamSection from "../Section/Team/Team/Team";

const Team = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader title="Our Team" />
			<TeamSection />
			<CtaThree
				title="You want to join our amazing team"
				btnText="Join Our Team"
			/>
			<Footer />
		</Wrapper>
	);
};

export default Team;
