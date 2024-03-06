import Image from "next/image"
import Link from "next/link"

import errorImg from "@/assets/svg/404.svg"

const ErrorArea = () => {
   return (
      <div className="error-page-area pt-120 text-center">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-3 col-lg-8 col-md-10">
                     <Image src={errorImg} alt="image" style={{width:"100%",height:"30%"}}/>
                  <div className="section-title pt-55 mb-50">
                     <h2>Opps! This page not fund</h2>
                     <p>Page does not fund or some other error occured. Go to our Home page</p>
                  </div>
                  <Link href="/70s" className="cr-btn">Go to home page</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ErrorArea
