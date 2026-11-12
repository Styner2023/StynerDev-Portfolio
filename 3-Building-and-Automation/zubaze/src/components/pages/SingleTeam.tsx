import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import AboutSection from "../Section/SingleTeam/About/About";
import ExperienceSection from "../Section/SingleTeam/Experience/Experience";

const SingleTeam = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader title="Team Details" />
			<AboutSection />
			<ExperienceSection />
			<Footer />
		</Wrapper>
	);
};

export default SingleTeam;
