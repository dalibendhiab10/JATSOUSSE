"use client"
import Image, { StaticImageData } from "next/image"
import Slider from 'react-slick'

import aboutImg_1 from "@/assets/img/about/about-left1.jpg";
import aboutImg_2 from "@/assets/img/about/about-left2.jpg";
import aboutImg_3 from "@/assets/img/about/about-left3.jpg";
import aboutRightImg from "@/assets/img/about/about-right.jpg";

const about_img_data: StaticImageData[] = [aboutImg_1, aboutImg_2, aboutImg_3, aboutImg_2];

interface ContentData {
   sub_title: string;
   title: JSX.Element;
   desc: JSX.Element;
   list: string[];
}

const about_content: ContentData = {
   sub_title: "About us",
   title: (<>Welcome To Our Charity <span>Organization</span></>),
   desc: (<>Les Jeunes Artistes Tunisiens ou JAT est une association culturelle et artistique à but non lucratif, fondée à Hammamet le 1er février 2014. Sa première branche associative, JAT Sousse a été formée le 17 avril 2021 et a réussi à accueillir plus de 40 membres bénévoles et talentueux. Les membres de JAT ou les JATISTES, comme on aime les appeler, sont des jeunes artistes amateurs, passionnés par le travail associatif et la société civile.
   <br/><br/>L&apos;association vise à encadrer les jeunes artistes, affiner leurs talents, développer leurs capacités artistiques et culturelles.
      
      <br/><br/>Aussi bien de soutenir la participation et l&apos;efficacité des jeunes artistes dans la société civile et la vie publique et organiser des festivals et des événements artistiques, culturels et de citoyenneté et participer à des festivals, des concours et des compétitions artistiques, ainsi que des formations et des ateliers.
      
      <br/><br/>Au  sein  de  l’association,  on  trouve  pratiquement  tous  les  domaines  et  les  disciplines  d&apos;art  qui intéressent  les  jeunes  comme  la  musique,  la  poésie,  la  danse,  les  arts  plastiques, l&apos;audiovisuel,  la  rédaction,  le  théâtre  et  le  cinéma. 
      
      </>),
   list: [""],
}

const { sub_title, title, desc, list } = about_content;

const About = () => {

   const settings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      fade: false,
      autoplaySpeed: 2000,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 991,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 575,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 375,
            settings: {
               slidesToShow: 1,
            }
         }
      ],
   }

   return (
      <div className="about-us-two">
         <div className="container">
            <div className="row gap-100 align-items-center">
               <div className="col-xl-6">
                  <div className="about-us-content-part mb-50">
                     <div className="section-title mb-50">
                        <span className="section-title__subtitle mb-10">{sub_title}</span>
                        <h2>{title}</h2>
                     </div>
                     <p>{desc}</p>
                     <hr className="mt-40" />

                     <Slider {...settings} className="about-middle-images row">
                        {about_img_data.map((img, i) => (
                           <div key={i} className="col-lg-4">
                              <div className="about-middle-images-item">
                                 <Image src={img} alt="About" />
                              </div>
                           </div>
                        ))}
                     </Slider>
                     <hr />

                     {/* <ul className="list-style-one pt-15">
                        {list.map((li, index) => (
                           <li key={index}>{li}</li>
                        ))}
                     </ul> */}
                  </div>
               </div>
               
               <div className="col-xl-6">
                  <div className="about-us-image-part mb-65 rel">
                     <Image src={aboutRightImg} alt="About" />
                     
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default About
