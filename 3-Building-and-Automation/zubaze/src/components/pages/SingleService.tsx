import Footer from "../Section/Common/Footer/Footer";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import IntegrationSection from "../Section/Common/Integration/Integration";
import PageHeader from "../Section/Common/PageHeader/PageHeader";
import Wrapper from "../Section/Common/Wrapper";
import ContentSection from "../Section/SingleService/Content/Content";
import SupportSection from "../Section/SingleService/Support/Support";




const SingleService = () => {
  return (
    <Wrapper>
      <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
      <PageHeader title="Solution Details" />
      <SupportSection />
      <ContentSection />
      <IntegrationSection />
      <Footer />
    </Wrapper>
  );
};

export default SingleService;