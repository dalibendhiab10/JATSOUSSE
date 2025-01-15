// import HomeTwo from "@/components/homes/home-two";
// import Wrapper from "@/layout/Wrapper";
// import { redirect } from 'next/navigation'
import Sevs from "@/components/events/sevs";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "JAT SOUSSE | Accueil",
};
const index = () => {
  return (
    <Wrapper>
       <Sevs />
    </Wrapper>
 )

}

export default index