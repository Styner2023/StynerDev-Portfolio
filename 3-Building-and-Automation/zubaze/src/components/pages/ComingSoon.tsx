import ComingSoonSection from "../Section/ComingSoon/ComingSoonSection";
import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import Wrapper from "../Section/Common/Wrapper";

const ComingSoon = () => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<ComingSoonSection />
		</Wrapper>
	);
};

export default ComingSoon;
