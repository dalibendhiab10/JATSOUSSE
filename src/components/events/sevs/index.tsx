import The70s from "@/components/common/the70s"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import Brand from "@/components/common/Brand"
import EventDetailsArea from "./EventDetailsArea"

const Sevs = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main>
            <The70s  />
            <EventDetailsArea/>
            <Brand style={true} />
         </main>
         {/* <FooterOne /> */}
      </>
   )
}

export default Sevs;
