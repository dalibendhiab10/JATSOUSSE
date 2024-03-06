
const The70s = ({ style,addons }: any) => {
   return (
      <div className="page-banner-area bgs-cover overlay text-white py-165 rpy-125  fullscreen-section" style={{ backgroundImage: `url('https://i.imgur.com/APg5eLQ.jpeg')`  }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className={`${style ? "col-lg-12" : "col-xl-7 col-lg-8"}`}>
                  <div className="breadcrumb-inner text-center">
                  <h2 className="page-title title-70s" style={{ fontFamily: 'Kashmir, sans-serif' }}> T H E 7 0 S </h2>
                  <h4 className="sub-title-70s"> A SYMPHONY OF DECADES</h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default The70s
