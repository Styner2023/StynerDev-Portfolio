import CtaThree from "../Section/Common/Cta-3/CtaThree";
import FAQSection from "../Section/Common/FAQ/FAQSection";
import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";

const Faq = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader title=" Faq" />
			<FAQSection />
			<CtaThree title="Still, you have any questions?" btnText="Contact Us" />
			<Footer />
		</Wrapper>
	);
};

export default Faq;
