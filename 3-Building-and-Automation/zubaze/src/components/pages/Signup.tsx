import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import Wrapper from "../Section/Common/Wrapper";
import SignUpForm from "../Section/SingUp/SignUp/SignUp";

interface SignupProps {
  userType?: 'client' | 'developer';
}

const Signup = ({ userType }: SignupProps) => {
	return (
		<Wrapper>
			<UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
			<SignUpForm userType={userType} />
		</Wrapper>
	);
};

export default Signup;
