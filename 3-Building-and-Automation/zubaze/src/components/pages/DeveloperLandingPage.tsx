import CtaTwo from "../Section/Common/Cta-2/CtaTwo";
import FooterTwo from "../Section/Common/Footer-2/FooterTwo";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import IntegrationSection from "../Section/Common/Integration/Integration";
import PricingSection from "../Section/Common/Pricing/Pricing";
import Wrapper from "../Section/Common/Wrapper";
import BrandSection from "../Section/DeveloperLanding/Brand/Brand";
import ComparisonSection from "../Section/DeveloperLanding/Comparison/Comparison";
import ContentSectionOne from "../Section/DeveloperLanding/Content/ContentOne";
import ContentSectionTwo from "../Section/DeveloperLanding/Content/ContentTwo";
import FeatureSection from "../Section/DeveloperLanding/Feature/Feature";
import HeroSection from "../Section/DeveloperLanding/Hero/Hero";
import HowItWorks from "../Section/DeveloperLanding/HowItWorks/HowItWorks";
import SecuritySection from "../Section/DeveloperLanding/Security/Security";
import TestimonialSection from "../Section/DeveloperLanding/Testimonial/Testimonial";

const DeveloperLandingPage = () => {
    return (
        <Wrapper>
            <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
            <HeroSection />
            <BrandSection />
            <ContentSectionOne />
            <HowItWorks />
            <FeatureSection />
            <SecuritySection />
            <ContentSectionTwo />
            <TestimonialSection />
            <ComparisonSection />
            <PricingSection />
            <IntegrationSection />
            <CtaTwo />
            <FooterTwo />
        </Wrapper>
    );
};

export default DeveloperLandingPage;
