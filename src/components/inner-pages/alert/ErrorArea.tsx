"use client";
import Image from "next/image"
import Link from "next/link"

import errorImg from "@/assets/svg/error.svg"
import {  useEffect } from "react"

const ErrorArea = () => {
   useEffect(() => {
      setTimeout(() => {
         window.location.href = "/70s"
      }, 10000);
   }
   )
   return (
      <div className="error-page-area pt-120 text-center">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-3 col-lg-8 col-md-10">
                     <Image src={errorImg} alt="image" style={{width:"100%",height:"30%"}}/>
                  <div className="section-title pt-55 mb-50">
                     <h2>Paiement échoué</h2>
                     <p>Votre paiement a échoué.  
                        <br/> Veuillez réessayer ou contacter le support
                        par <a href="mailto:bendhiabdali@gmail.com">email </a>ou par 
                        <a href="tel:+216 93 158 643"> téléphone.</a>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ErrorArea
