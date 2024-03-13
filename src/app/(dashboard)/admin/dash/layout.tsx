
import React from 'react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li>
                    <Link
                     
                     href="/admin/dash"                     
                      className="nav-link px-0 align-middle"
                    >
                      <i >

                        </i>{" "}
                      <span className="ms-1 d-none d-sm-inline text-white">Dashboard</span>{" "}
                    </Link>
                    
                  </li>
                  <li>
                    <Link
                     
                     href="/admin/dash/scanphy"                     
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 ">
                      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 4C5.11929 4 4 5.11929 4 6.5V7C4 7.55228 3.55228 8 3 8C2.44772 8 2 7.55228 2 7V6.5C2 4.01472 4.01472 2 6.5 2H7C7.55228 2 8 2.44772 8 3C8 3.55228 7.55228 4 7 4H6.5Z" fill="#fff"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.9598 6C10.294 5.99998 9.73444 5.99997 9.27657 6.03738C8.79785 6.07649 8.34289 6.16143 7.91103 6.38148C7.25247 6.71703 6.71703 7.25247 6.38148 7.91103C6.16143 8.34289 6.07649 8.79785 6.03738 9.27657C6.01958 9.49452 6.01025 9.73549 6.00536 10H4C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12H20C20.5523 12 21 11.5523 21 11C21 10.4477 20.5523 10 20 10H17.9946C17.9898 9.73549 17.9804 9.49451 17.9626 9.27657C17.9235 8.79785 17.8386 8.34289 17.6185 7.91103C17.283 7.25247 16.7475 6.71703 16.089 6.38148C15.6571 6.16143 15.2021 6.07649 14.7234 6.03738C14.2656 5.99997 13.706 5.99998 13.0402 6H10.9598ZM15.9943 10C15.99 9.7843 15.9825 9.60112 15.9693 9.43944C15.9403 9.0844 15.889 8.92194 15.8365 8.81901C15.6927 8.53677 15.4632 8.3073 15.181 8.16349C15.0781 8.11105 14.9156 8.05975 14.5606 8.03074C14.1938 8.00078 13.7166 8 13 8H11C10.2834 8 9.80615 8.00078 9.43944 8.03074C9.0844 8.05975 8.92194 8.11105 8.81901 8.16349C8.53677 8.3073 8.3073 8.53677 8.16349 8.81901C8.11105 8.92194 8.05975 9.0844 8.03074 9.43944C8.01753 9.60112 8.00999 9.7843 8.00569 10H15.9943Z" fill="#fff"/>
<path d="M14.0757 18L10.9598 18C10.2941 18 9.7344 18 9.27657 17.9626C8.79785 17.9235 8.34289 17.8386 7.91103 17.6185C7.25247 17.283 6.71703 16.7475 6.38148 16.089C6.34482 16.017 6.32528 15.9835 6.29997 15.9401C6.28429 15.9132 6.26639 15.8825 6.24083 15.8365C6.17247 15.7135 6.09846 15.5585 6.05426 15.342C6.01816 15.1651 6.00895 14.9784 6.00455 14.795C6 14.6058 6 14.3522 6 14.0159V14C6 13.4477 6.44772 13 7 13C7.55229 13 8 13.4477 8 14C8 14.3558 8.00007 14.5848 8.00397 14.7469C8.0058 14.823 8.00837 14.872 8.01047 14.9021C8.04313 14.9585 8.10631 15.0688 8.16349 15.181C8.3073 15.4632 8.53677 15.6927 8.81901 15.8365C8.92194 15.889 9.0844 15.9403 9.43944 15.9693C9.80615 15.9992 10.2834 16 11 16H14C14.5027 16 14.6376 15.9969 14.7347 15.9815C15.3765 15.8799 15.8799 15.3765 15.9815 14.7347C15.9969 14.6376 16 14.5027 16 14C16 13.4477 16.4477 13 17 13C17.5523 13 18 13.4477 18 14L18 14.0757C18.0002 14.4657 18.0003 14.7734 17.9569 15.0475C17.7197 16.5451 16.5451 17.7197 15.0475 17.9569C14.7734 18.0003 14.4657 18.0002 14.0757 18Z" fill="#fff"/>
<path d="M22 17C22 16.4477 21.5523 16 21 16C20.4477 16 20 16.4477 20 17V17.5C20 18.8807 18.8807 20 17.5 20H17C16.4477 20 16 20.4477 16 21C16 21.5523 16.4477 22 17 22H17.5C19.9853 22 22 19.9853 22 17.5V17Z" fill="#fff"/>
<path d="M16 3C16 2.44772 16.4477 2 17 2H17.5C19.9853 2 22 4.01472 22 6.5V7C22 7.55228 21.5523 8 21 8C20.4477 8 20 7.55228 20 7V6.5C20 5.11929 18.8807 4 17.5 4H17C16.4477 4 16 3.55228 16 3Z" fill="#fff"/>
<path d="M4 17C4 16.4477 3.55228 16 3 16C2.44772 16 2 16.4477 2 17V17.5C2 19.9853 4.01472 22 6.5 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55228 20 7 20H6.5C5.11929 20 4 18.8807 4 17.5V17Z" fill="#fff"/>
</svg></i>{" "}
                      <span className="ms-1 d-none d-sm-inline text-white">Scan Physical Ticket</span>{" "}
                    </Link>
                    
                  </li>
                  <li>
                    <Link
                     
                     href="/admin/dash/listeticket"                     
                      className="nav-link px-0 align-middle"
                    >
                      <i >

                        </i>{" "}
                      <span className="ms-1 d-none d-sm-inline text-white">E-Tickets Payments</span>{" "}
                    </Link>
                    
                  </li>
                  <li>
                    <Link
                     
                     href="/admin/dash/listptickets"                     
                      className="nav-link px-0 align-middle"
                    >
                      <i >

                        </i>{" "}
                      <span className="ms-1 d-none d-sm-inline text-white">Physical Tickets</span>{" "}
                    </Link>
                    
                  </li>
                  <li>
                    <Link
                     
                     href="/admin/dash/sellphy"                     
                      className="nav-link px-0 align-middle"
                    >
                      <i >

                        </i>{" "}
                      <span className="ms-1 d-none d-sm-inline text-white">SELL Physical Ticket</span>{" "}
                    </Link>
                    
                  </li>
                </ul>
              </div>
            </div>
            <div className="col py-3"> {children}</div>
          </div>
        </div>
    </>
  );
}
