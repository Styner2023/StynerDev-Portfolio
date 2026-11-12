import FAQSection, { clientFaqs } from "../Section/Common/FAQ/FAQSection";
import FooterSectionThree from "../Section/Common/Footer-3/FooterThree";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import IntegrationSectionTwo from "../Section/Common/Integration-2/IntegrationTwo";
import Wrapper from "../Section/Common/Wrapper";
import ContentSectionTwo from "../Section/ClientLanding/Content-2/ContentTwo";
import ContentSection from "../Section/ClientLanding/Content/Content";
import FreeForYouSection from "../Section/ClientLanding/FreeForYou/FreeForYou";
import HeroSection from "../Section/ClientLanding/Hero/Hero";
import ServiceSection from "../Section/ClientLanding/Service/Service";
import StateSection from "../Section/ClientLanding/State/State";
import ClientTestimonialSection from "../Section/ClientLanding/Testimonial/Testimonial";
import CallToActionSection from "../Section/ClientLanding/CallToAction/CallToAction";

const ClientLandingPage = () => {
    return (
        <Wrapper>
            <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
            <HeroSection />
            <ServiceSection />
            <ContentSection />
            <ContentSectionTwo />
            <StateSection />
            <ClientTestimonialSection />
            <FreeForYouSection />
            <IntegrationSectionTwo />
            <FAQSection faqs={clientFaqs} />
            <CallToActionSection />
            <FooterSectionThree />
        </Wrapper>
    );
};

export default ClientLandingPage;
