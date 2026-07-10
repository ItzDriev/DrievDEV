import ProjectArticle from "./ProjectArticle";
import DrievEssentialsThumbnail from "../../../assets/kokushibo.png";
import Brogrss from "../../../assets/Brogress2.png";
import AntonSquare from "../../../assets/AntonMonkeySquare.png";

function Projects() {
  return (
    <section className="bg-(--mainBGAccent) w-full h-auto">
      <div className="flex flex-col items-center min-h-screen text-white">
        <h1 className="mt-10 text-6xl">Projects</h1>
        <section className="flex justify-between m-10 w-[70%]">
          <ProjectArticle
            title="Driev's Essentials"
            githubUrl="https://github.com/ItzDriev/Driev-s-Essentials"
            thumbnail={DrievEssentialsThumbnail}
            thumbnailZoom={1.5}
          />
          <ProjectArticle
            title="Brogress"
            githubUrl="https://github.com/Flurry2005/Brogress"
            thumbnail={Brogrss}
            thumbnailPosition="center"
            renderReadmeHtml
          />
          <ProjectArticle
            title="DrievDEV"
            thumbnail={AntonSquare}
            thumbnailZoom={1.2}
            githubUrl="https://github.com/ItzDriev/DrievDEV"
          />
        </section>
      </div>
    </section>
  );
}

export default Projects;
