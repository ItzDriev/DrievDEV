import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { GithubIcon } from "../../../components/icons/SidebarIcons";
import { getProject } from "../backend/fetchGitHubInfo";
import Popup from "../../../components/Popup";

interface ProjectArticleProps {
  title?: string;
  description?: string;
  thumbnail?: string;
  thumbnailZoom?: number;
  thumbnailPosition?: string;
  githubUrl?: string;
  renderReadmeHtml?: boolean;
}

function ProjectArticle({
  title = "Project Title",
  description,
  thumbnail,
  thumbnailZoom = 1,
  thumbnailPosition = "center",
  githubUrl,
  renderReadmeHtml = false,
}: ProjectArticleProps) {
  const [repoDescription, setRepoDescription] = useState<string>();
  const [readme, setReadme] = useState<string | null>(null);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    async function loadProject() {
      if (!githubUrl) return;

      // Extract owner/repo from the GitHub URL (pathname starts with "/", so drop the empty first segment)
      const [owner, repo] = new URL(githubUrl).pathname
        .split("/")
        .filter(Boolean);
      if (!owner || !repo) return;

      try {
        const project = await getProject(owner, repo);
        setRepoDescription(project.description ?? description);
        setReadme(project.readme);
      } catch (error) {
        console.error(`Failed to load GitHub project ${owner}/${repo}:`, error);
      }
    }

    loadProject();
  }, [githubUrl, description]);

  return (
    <>
      <article className="z-2 group relative flex flex-col bg-(--navBG) hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] border-2 border-red-500/40 hover:border-red-500 rounded-xl w-[30%] h-72 overflow-hidden transition-all duration-300">
        <div className="relative bg-black/40 w-full h-32 overflow-hidden shrink-0">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              // Allows me to zoom the picture through the properties
              style={
                {
                  "--thumb-zoom": thumbnailZoom,
                  objectPosition: thumbnailPosition,
                } as React.CSSProperties
              }
              className="w-full h-full object-contain scale-[var(--thumb-zoom)] group-hover:scale-[calc(var(--thumb-zoom)*1.05)] transition-transform duration-300"
            />
          ) : (
            <div className="flex justify-center items-center bg-(--mainBGAccent) w-full h-full text-gray-500 text-sm">
              No preview
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 px-4 py-3 min-h-0">
          <h3 className="font-semibold text-white text-lg truncate">{title}</h3>
          {repoDescription && (
            <p className="mt-1 text-gray-400 text-sm line-clamp-2">
              {repoDescription}
            </p>
          )}
        </div>

        <div className="flex bg-black/30 border-red-500/30 border-t w-full h-12 shrink-0">
          <button
            onClick={() => setPopupShown(true)}
            className={`flex justify-center items-center gap-2 hover:bg-red-500/20 font-medium text-white text-sm transition-colors duration-200 cursor-pointer ${
              githubUrl ? "w-1/2 border-red-500/30 border-r" : "w-full"
            }`}
          >
            Check Out
          </button>
          {githubUrl && (
            <Link
              to={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 hover:bg-red-500/20 w-1/2 font-medium text-white text-sm transition-colors duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </Link>
          )}
        </div>
      </article>

      {popupShown && (
        <Popup setHelpShown={setPopupShown} title={title} className="max-w-5xl">
          {thumbnail && (
            <div className="mb-3 rounded-md w-full h-40 overflow-hidden shrink-0">
              <img
                src={thumbnail}
                alt={title}
                style={
                  {
                    "--thumb-zoom": thumbnailZoom,
                    objectPosition: thumbnailPosition,
                  } as React.CSSProperties
                }
                className="w-full h-full object-contain scale-[var(--thumb-zoom)]"
              />
            </div>
          )}
          {!readme && repoDescription && (
            <p className="mb-4 text-gray-300">{repoDescription}</p>
          )}
          {readme && (
            <div className="prose-pre:bg-black/40 prose-invert mb-4 max-w-none prose-code:text-red-300 prose prose-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={
                  renderReadmeHtml ? [rehypeRaw, rehypeSanitize] : []
                }
                remarkRehypeOptions={
                  renderReadmeHtml ? { allowDangerousHtml: true } : undefined
                }
              >
                {readme}
              </ReactMarkdown>
            </div>
          )}
          <Link
            to={githubUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 bg-red-500/20 hover:bg-red-500/30 py-2 rounded-md font-medium text-white transition-colors duration-200"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </Link>
        </Popup>
      )}
    </>
  );
}

export default ProjectArticle;
