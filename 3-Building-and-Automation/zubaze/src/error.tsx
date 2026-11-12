import Footer from "./components/Section/Common/Footer/Footer";
import UnifiedHeader from "./components/Section/Common/Header/UnifiedHeader";
import Wrapper from "./components/Section/Common/Wrapper";
import ErrosSection from "./components/Section/Erros/ErrosSection";

const NotFound = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<ErrosSection />
			<Footer />
		</Wrapper>
	);
};

export default NotFound;
