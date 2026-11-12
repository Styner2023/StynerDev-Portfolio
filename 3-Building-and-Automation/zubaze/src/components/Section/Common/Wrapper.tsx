import { useEffect } from "react";
import BackToTop from "./BackToTop";
import WOW from "wow.js";  


const Wrapper = ({ children }: any) => {

  useEffect(() => {
    // Initialize WOW.js for animations
    const wow = new WOW({ live: false });
    wow.init();
  }, []);
 
  return (
    <>  
      {children}
      <BackToTop /> 
    </>
  );
};

export default Wrapper;
 