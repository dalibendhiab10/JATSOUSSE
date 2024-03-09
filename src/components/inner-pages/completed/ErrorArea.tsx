"use client";
import Image from "next/image";
import Link from "next/link";

import errorImg from "@/assets/svg/confirmed.svg";
import { useEffect } from "react";

const ErrorArea = () => {
  {
    useEffect(() => {
      setTimeout(() => {
        window.location.href = "/70s";
      }, 3000);
    });
    return (
      <div className="error-page-area pt-120 text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-8 col-md-10">
              <Image
                src={errorImg}
                alt="image"
                style={{ width: "100%", height: "30%" }}
              />
              <div className="section-title pt-55 mb-50">
                <h2>Paiement Reçu</h2>
                <p>
                  Votre paiement a été effectué avec succès!
                  <br /> Vous recevrez un email contenant vos Tickets.
                  <br />
                  <br /> Veuillez vérifier votre boite email!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default ErrorArea;
