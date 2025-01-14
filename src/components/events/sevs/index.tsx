import The70s from "@/components/common/the70s"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import Brand from "@/components/common/Brand"
import EventDetailsArea from "./EventDetailsArea"
import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper"

const Sevs = () => {
   return (
      <>

         {/* <HeaderOne /> */}
         <GoogleCaptchaWrapper>
         <main>
         
            <The70s  />
            <EventDetailsArea/>
            
         </main>
         </GoogleCaptchaWrapper>
         {/* <FooterOne /> */}
      </>
   )
}

export default Sevs;
