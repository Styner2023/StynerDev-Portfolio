import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import Wrapper from "../Section/Common/Wrapper";
import SignInForm from "../Section/SignIn/SignIn/SignIn";

interface SigninProps {
  userType?: 'client' | 'developer';
}

const Signin = ({ userType }: SigninProps) => {
  return (
    <Wrapper>
      <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
      <SignInForm userType={userType} />
    </Wrapper>
  );
};

export default Signin;