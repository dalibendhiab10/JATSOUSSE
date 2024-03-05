import Image from "next/image";
import Link from "next/link";

import ppcomingEventImg_1 from "@/assets/img/widgets/event1.jpg";
import ppcomingEventImg_2 from "@/assets/img/widgets/event2.jpg";
import EventDetailsForm from "@/components/forms/EventDetailsForm";

const EventDetailsSidebar = () => {
  return (
    <div className="col-lg-4">
      <div className="main-sidebar event-sidebar rmt-75">
        <div className="widget widget-event-info">
          {/* <h5 className="widget-title">Event Info</h5> */}
          <ul>
            <li>
              <div className="icon">
                <i className="fa fa-calendar-alt"></i>
              </div>{" "}
              <div className="content" style={{ color: "black" }}>
                <h6>Date & Heures</h6>
                <span>31 december,2022 11:00am - 3:00pm</span>
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="fa fa-map-marker-alt"></i>
              </div>{" "}
              <div className="content">
                <h6>Location</h6>
                <span style={{ color: "black" }}>
                  Théâtre Municipal de Sousse , Ave Habib Bourguiba, Sousse
                </span>
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="fa fa-phone-alt"></i>
              </div>{" "}
              <div className="content">
                <h6>Infoline</h6>
                <span style={{ color: "black" }}>
                  93 158 643 <br />
                  93 158 643 <br />
                  93 158 643 <br />
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* <div className="widget widget-upcoming-event">
          <h5 className="widget-title">Acheter Vos tickets</h5>
          <EventDetailsForm />
        </div> */}

        <div className="widget widget_location">
          <h5 className="widget-title">Event Location</h5>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12939.062455537358!2d10.6408565!3d35.830226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13027574e7ebb9f5%3A0x458904ab4e53366b!2sMunicipal%20Theater%20of%20Sousse!5e0!3m2!1sen!2stn!4v1709029468096!5m2!1sen!2stn"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSidebar;
