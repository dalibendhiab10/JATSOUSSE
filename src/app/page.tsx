import HomeTwo from "@/components/homes/home-two";
import Wrapper from "@/layout/Wrapper";
import { redirect } from 'next/navigation'

export const metadata = {
  title: "JAT SOUSSE | Accueil",
};
const index = () => {
  return redirect('/Soon') 

}

export default index