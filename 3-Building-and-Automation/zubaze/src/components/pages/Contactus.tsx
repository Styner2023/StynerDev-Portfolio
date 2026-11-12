import FAQSection, { contactFaqs } from "../Section/Common/FAQ/FAQSection";
import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import CallUsSection from "../Section/ContactUs/CallUs/CallUsSection";
import ContactSection from "../Section/ContactUs/Contact/ContactSection";

const Contactus = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<PageHeader
				title="Get in Touch"
				subtitle="Questions about organizing your client websites, or need a hand getting set up? Send us a message and our team will get back to you quickly."
				image="/assets/images/v3/thumb-v3-01.png"
			/>
			<ContactSection />
			<CallUsSection />
			<FAQSection faqs={contactFaqs} />
			<Footer />
		</Wrapper>
	);
};

export default Contactus;
