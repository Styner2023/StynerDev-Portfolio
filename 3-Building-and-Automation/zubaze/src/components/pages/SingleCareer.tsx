import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import SingleCareerSection from "../Section/SingleCareer/SingleCareerSection";
import { useSearchParams } from "react-router-dom";

const SingleCareer = () => {
	const [searchParams] = useSearchParams();
	const jobTitle = searchParams.get('job') || 'Career Details';

	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader title={`${decodeURIComponent(jobTitle)} - Job Details`} />
			<SingleCareerSection />
			<Footer />
		</Wrapper>
	);
};

export default SingleCareer;
