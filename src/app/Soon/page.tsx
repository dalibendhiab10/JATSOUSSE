"use client";
import Wrapper from "@/layout/Wrapper";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/Countdown"), { ssr: false });
/// dali test
const Soon = () => {
  return (
    <>
      <Wrapper>
        <div
          className="page-banner-area bgs-cover overlay text-white py-165 rpy-125  fullscreen-section"
          style={{ backgroundImage: `url('https://i.imgur.com/APg5eLQ.jpeg')` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className={`col-lg-12`}>
                <div className="breadcrumb-inner text-center">
                  <h2
                    className="page-title title-70s"
                    style={{ fontFamily: "Kashmir, sans-serif" }}
                  >
                    {" "}
                    T H E 7 0 S{" "}
                  </h2>
                  <h4 className="sub-title-70s"> E-TICKETS WILL BE AVAILABLE IN </h4>
                  <NoSSR />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default Soon;
