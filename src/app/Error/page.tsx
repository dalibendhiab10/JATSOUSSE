import NotFound from "@/components/inner-pages/alert";
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