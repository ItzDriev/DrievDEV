import ProjectArticle from "./ProjectArticle";
import DrievEssentialsThumbnail from "../../../assets/kokushibo.png";

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
          />
          <ProjectArticle />
          <ProjectArticle />
        </section>
      </div>
    </section>
  );
}

export default Projects;
