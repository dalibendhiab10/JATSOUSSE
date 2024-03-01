import Link from 'next/link'

const HeaderTop = ({ style }: any) => {
   return (
      <div className={`navbar-top ${style ? "pt-30 rpt-10 navtop--two" : "pt-15 pb-10 bgc-black navtop--one"}`}>
         <div className="container">
            <div className={`navtop-inner ${style ? "bgc-gray" : ""}`}>
               <ul className="topbar-left">
                  {style ?
                     <>
                        <li><b>Call now - <Link href="callto:333-444555">333 - 444 555</Link></b></li>
                        <li>Shiloh, Hawaii 81063</li>
                     </> :
                     <>
                        <li><span>HI</span>, Good Afternoon Dude! </li>
                        <li><i className="flaticon-pin"></i> Shiloh, Hawaii 81063</li>
                     </>
                  }
               </ul>
               <ul className="topbar-right">
                  <li className="social-area">
                     <span>Follow Us - </span>
                     <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                     <Link href="#"><i className="fab fa-twitter"></i></Link>
                     <Link href="#"><i className="fab fa-pinterest-p"></i></Link>
                     <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default HeaderTop
