import Breadcrumb from "@/components/common/Breadcrumb"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import Volunteer from "@/components/homes/home-one/Volunteer"
import VolunteerTwo from "@/components/homes/home-two/Volunteer"
import VolunteerThree from "@/components/homes/home-three/Volunteer"

const Volunteers = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Breadcrumb page_title="Our Volinteers" page_list="Volinteers" style={false} />
            <Volunteer style={false} />
            <VolunteerTwo style={false} />
            <VolunteerThree style={false} />
         </main>
         <FooterOne />
      </>
   )
}

export default Volunteers;
