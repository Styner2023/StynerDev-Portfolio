import CtaThree from "../Section/Common/Cta-3/CtaThree";
import FAQSection, { pricingFaqs } from "../Section/Common/FAQ/FAQSection";
import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import PricingSection from "../Section/Common/Pricing/Pricing";
import Wrapper from "../Section/Common/Wrapper";

const Pricing = () => {
  return (
    <Wrapper>
      <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
      <PageHeader
        title="Pricing Plans"
        overlayImage="/assets/images/v1/card1.png"
        overlayAlt="Client site and CMS panel activity chart"
      />
      <PricingSection />
      <FAQSection faqs={pricingFaqs} />
      <CtaThree
        title="Ready to organize your client websites?"
        btnText="Start Free"
        btnLink="/sign-up"
        image="/assets/images/v1/cta-mocup.png"
        imageAlt="Zubaze mobile app setting up a client account"
      />
      <Footer />
    </Wrapper>
  );
};

export default Pricing;
