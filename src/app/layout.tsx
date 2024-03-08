import "../styles/index.scss";
import { DM_Sans, Nunito_Sans, Pacifico } from "next/font/google";
import "semantic-ui-css/semantic.min.css";

const body = DM_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--base-font",
});

const heading = Nunito_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--heading-font",
});

const script = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--script-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="JAT SOUSSE - THE 70S " />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta property="og:title" content="JAT SOUSSE" />
        <meta property="og:site_name" content="JAT SOUSSE" />
        <meta property="og:url" content="jatsousse.com" />
        <meta
          property="og:description"
          content="Les Jeunes Artistes Tunisiens ou JAT est une association culturelle et artistique à but non lucratif, fondée à Hammamet le 1er février 2014. Sa première branche associative, JAT Sousse a été formée le 17 avril 2021 et a réussi à accueillir plus de 40 membres bénévoles et talentueux. Les membres de JAT ou les JATISTES, comme on aime les appeler, sont des jeunes artistes amateurs, passionnés par le travail associatif et la société civile.

L'association vise à encadrer les jeunes artistes, affiner leurs talents, développer leurs capacités artistiques et culturelles.
Aussi bien de soutenir la participation et l'efficacité des jeunes artistes dans la société civile et la vie publique et organiser des festivals et des événements artistiques, culturels et de citoyenneté et participer à des festivals, des concours et des compétitions artistiques, ainsi que des formations et des ateliers.

Au  sein  de  l’association,  on  trouve  pratiquement  tous  les  domaines  et  les  disciplines  d'art  qui intéressent  les  jeunes  comme  la  musique,  la  poésie,  la  danse,  les  arts  plastiques, l'audiovisuel,  la  rédaction,  le  théâtre  et  le  cinéma"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/a67V47y.png" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={` ${body.variable} ${heading.variable} ${script.variable} `}
      >
        <div className="wrapper">{children}</div>
      </body>
    </html>
  );
}
