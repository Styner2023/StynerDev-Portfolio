import Cta from "../Section/Common/Cta/Cta";
import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PricingSection from "../Section/Common/Pricing/Pricing";
import TestimonialSection from "../Section/Common/Testimonial/Testimonial";
import Wrapper from "../Section/Common/Wrapper";
import BrandSection from "../Section/Landing/Brand/Brand";
import ContentSectionOne from "../Section/Landing/Content/ContentOne";
import ContentSectionTwo from "../Section/Landing/Content/ContentTwo";
import Faq from "../Section/Landing/Faq/Faq";
import FeatureSection from "../Section/Landing/Feature/Feature";
import HeroSection from "../Section/Landing/Hero/HeroSection";

const LandingPage = () => {
    return (
        <Wrapper>
            <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
            <HeroSection />
            <BrandSection />
            <ContentSectionOne />
            <ContentSectionTwo />
            <FeatureSection />
            <PricingSection />
            <TestimonialSection />
            <Faq />
            <Cta />
            <Footer />
        </Wrapper>
    );
};

export default LandingPage;
