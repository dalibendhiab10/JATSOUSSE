import Image from "next/image";

import eventDetailsThumb from "@/assets/img/events/event-details.jpg";
import EventDetailsForm from "@/components/forms/EventDetailsForm";
import EventDetailsSidebar from "./EventDetailsSidebar";

interface ContentType {
  title_1: string;
  title_2: string;
  desc_1: JSX.Element;
  desc_2: JSX.Element;
  desc_3: JSX.Element;
  list: string[];
}

const content_data: ContentType = {
  title_1: "THE 70's : A Symphony Of Decades",
  title_2: "",
  desc_1: (
    <>

        The 70s, aura lieu en mars 2024 au théâtre municipal de Sousse. C’est la
        deuxième étape du projet. L&apos;Association des Jeunes Artistes
        Tunisiens va célébrer cette période flamboyante avec un spectacle rétro.

      <br />
      <br />

        Plongez dans une expérience sensorielle inoubliable où la musique
        emblématique des années 70 résonnera dans une atmosphère soigneusement
        arrangée.

    </>
  ),
  desc_2: <></>,
  desc_3: <></>,
  list: [],
};

const { title_1, title_2, desc_1, desc_2, desc_3, list } = content_data;

const EventDetailsArea = () => {
  return (
    <div className="event-details-area py-120">
      <div className="container">
        <div className="row gap-60">
          <div className="col-lg-8">
            <div className="event-details-content mb-65">
              {/* <div className="details-image mb-30">
                <Image src={eventDetailsThumb} alt="image" />
              </div> */}
              {/* <h3 className="title">{title_1}</h3> */}
              <p>{desc_1}</p>
              <p>{desc_2}</p>
              <h5>{title_2}</h5>
              <p>{desc_3}</p>
              {/* <ul className="list-style-two">
                {list.map((li, index) => (
                  <li key={index}>{li}</li>
                ))}
              </ul> */}
            </div>
            
            <h5 className="widget-title">ACHETEZ VOS TICKETS !</h5>
            <EventDetailsForm />
          </div>
          <EventDetailsSidebar />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsArea;
