'use client'
import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';

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
    <div className="d-flex flex-column gap-4">

      <h2>🌟 Megyes : Un voyage enchanteur au cœur du patrimoine tunisien ! 🎤</h2>

      <h4>Plongez dans un spectacle unique où tradition et modernité se rencontrent</h4>
      <b>📅 25 janvier 2025 – Théâtre Municipal de Sousse 🎭</b>
      <br />

      Megyes vous invite à découvrir la richesse de notre culture à travers une performance mêlant musique et arts visuels. Ce spectacle célèbre le patrimoine tunisien en revisitant nos traditions avec une touche de modernité, créant une expérience artistique inoubliable.

      Laissez-vous transporter par des mélodies envoûtantes, des chorégraphies captivantes et des décors magnifiquement mis en scène. Chaque note, chaque mouvement et chaque image raconte une histoire profondément ancrée dans l'âme de la Tunisie.
      <br />
      <b>💸 Billets à seulement 10 DT – Réservez dès maintenant pour vivre une expérience inoubliable ! 🌍❤️</b>




    </div>
  ),
  desc_2: <></>,
  desc_3: <></>,
  list: [],
};

const { title_1, title_2, desc_1, desc_2, desc_3, list } = content_data;

const EventDetailsArea = () => {
  return (
    <div className="event-details-area py-120" id="next-section">

      <div className="container">
        <div className="row gap-60">
          <div className="col-lg-8">
            <div className="event-details-content mb-65">

              <div>{desc_1}</div>
              <p>{desc_2}</p>
              <h5>{title_2}</h5>
              <p>{desc_3}</p>

            </div>

            <h5 className="widget-title">ACHETEZ VOS TICKETS EN LIGNE !</h5>
            <EventDetailsForm />
            <div className='d-flex flex-row gap-5'>

              <InstagramEmbed url="https://www.instagram.com/p/DE236Q2Ij1x/" className='mb-5' width={400} />
              <FacebookEmbed url="https://www.facebook.com/p/18uwDugcuu/" className='mb-5' width={400} height={100} />
            </div>

          </div>
          <EventDetailsSidebar />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsArea;
