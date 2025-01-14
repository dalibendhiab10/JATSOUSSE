
const The70s = ({ style,addons }: any) => {
   return (
      <div className="page-banner-area bgs-cover overlay text-white py-165 rpy-125  fullscreen-section" style={{ backgroundImage: `url('https://i.imgur.com/WUcHxyg.png')`  }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className={`${style ? "col-lg-12" : "col-xl-7 col-lg-8"}`}>
                  <div className="breadcrumb-inner text-center">
                  <img className="img-logo " src="/assets/logo.png"/> 
                  <h4 className="sub-title-70s"> 25 Jan. 2025 | Theatre Municipal Sousse</h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default The70s
