'use client'
const The70s = ({ style, addons }: any) => {
   const scrollToNextSection = () => {
      const nextSection = document.getElementById("next-section");
      if (nextSection) {
         nextSection.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <div className="page-banner-area bgs-cover overlay text-white py-165 rpy-125 fullscreen-section" style={{ backgroundImage: `url('https://i.imgur.com/WUcHxyg.png')` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className={`${style ? "col-lg-12" : "col-xl-7 col-lg-8"}`}>
                  <div className="breadcrumb-inner text-center">
                     <img className="img-logo mb-2" src="/assets/logo.png" alt="Logo" />
                     <h4>Plongez dans un spectacle unique où tradition et modernité se rencontrent</h4>
                     <h4 className="sub-title-70s">25 Jan. 2025 | Theatre Municipal Sousse</h4>
                  </div>
               </div>
            </div>
         </div>
         <button
            type="button"
         className="call-to-action checkout-btn"
            onClick={scrollToNextSection}
         >
            Reserver vos tickets maintenant ! 🎫
         </button>
      </div>
   );
};

export default The70s;
