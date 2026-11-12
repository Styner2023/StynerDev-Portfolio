import UnifiedHeader from "../Section/Common/Header/UnifiedHeader";
import Wrapper from "../Section/Common/Wrapper";
import ResetPasswordForm from "../Section/ResetPassword/ResetPassword/ResetPassword";



const ResetPassword = () => {
  return (
    <Wrapper>
      <UnifiedHeader logoSrc="/assets/images/logo/logo-dark.svg" />
      <ResetPasswordForm />
    </Wrapper>
  );
};

export default ResetPassword;