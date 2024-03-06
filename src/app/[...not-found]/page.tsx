import NotFound from "@/components/inner-pages/error";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "ERROR || JAT SOUSSE",
};
const index = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default index