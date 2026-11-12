import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import IntegrationSectionTwo from "../Section/Common/Integration-2/IntegrationTwo";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import PricingSection from "../Section/Common/Pricing/Pricing";
import Wrapper from "../Section/Common/Wrapper";
import ServiceSection from "../Section/Service/Service/Service";



const Service = () => {
  return (
    <Wrapper>
      <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
      <PageHeader
        title="Our Solutions"
        overlayImage="/assets/images/v1/h-card2.png"
        overlayAlt="Total active client sites"
      />
      <ServiceSection />
      <PricingSection />
      <IntegrationSectionTwo />
      <Footer />
    </Wrapper>
  );
};

export default Service;