import { Link } from "react-router-dom";
import useTwitchLiveStatus from "../../../hooks/useTwitchLiveStatus";

import {
  TwitchIcon,
  GithubIcon,
  YoutubeIcon,
  DiscordIcon,
  ChevronIcon,
} from "../../../components/icons/SidebarIcons";
import TypewriterText from "./TypeWriterText";

const TWITCH_URL = "https://www.twitch.tv/drievtv";

interface SidebarProps {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
}

function Sidebar({ setCollapsed, collapsed }: SidebarProps) {
  const isLive = useTwitchLiveStatus();

  const statusLabel = isLive ? "Online" : "Offline";

  const linkStyle = `flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-red-500 transition-colors duration-200 ${
    collapsed ? "justify-center gap-0" : "gap-3"
  }`;
  const liveLinkStyle = `flex items-center bg-red-500/15 hover:bg-red-500/25 px-4 py-3 border border-red-500 rounded-lg font-semibold text-red-400 transition-colors duration-200 ${
    collapsed ? "justify-center gap-0" : "gap-3"
  }`;

  return (
    <aside
      className={`fixed z-20 flex flex-col bg-(--navBG) border-red-500 border-r h-[calc(100vh-4rem)] shrink-0 transition-all  duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="top-1/2 -right-3 z-10 absolute flex justify-center items-center bg-(--navBG) hover:bg-red-500 hover:text-white border border-red-500 rounded-full w-6 h-6 text-red-500 -translate-y-1/2 transition-colors duration-200 cursor-pointer"
      >
        <ChevronIcon
          className={`w-4 h-4 transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className={`pt-6 pb-4 ${collapsed ? "px-0" : "px-6"}`}>
        {collapsed ? (
          <div
            className="relative flex justify-center items-center bg-white/5 mx-auto rounded-full w-10 h-10"
            title={`Socials — Status: ${statusLabel}`}
          >
            <span className="font-bold text-white text-lg">S</span>
            <span
              className={`right-0 bottom-0 absolute border-2 border-(--navBG) rounded-full w-3 h-3 ${
                isLive ? "bg-green-500" : "bg-gray-500"
              }`}
            />
          </div>
        ) : (
          <>
            <h2 className="font-bold text-white text-2xl">
              <TypewriterText text="Socials" active={!collapsed} />
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLive ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              <TypewriterText
                text={`Status: ${statusLabel}`}
                active={!collapsed}
                className={`text-sm ${
                  isLive ? "text-green-400" : "text-gray-400"
                }`}
              />
            </div>
          </>
        )}
      </div>

      <nav className="flex flex-col gap-1 px-3">
        <Link
          to={TWITCH_URL}
          target="_blank"
          title="Twitch"
          className={isLive ? liveLinkStyle : linkStyle}
        >
          <span className="relative flex shrink-0">
            <TwitchIcon className="w-5 h-5" />
            {isLive && collapsed && (
              <span className="-top-1 -right-1 absolute bg-red-500 rounded-full w-2 h-2 animate-pulse" />
            )}
          </span>
          <TypewriterText
            text={isLive ? "Live Now" : "Twitch"}
            active={!collapsed}
          />
        </Link>
        <Link
          to={"https://www.youtube.com/@ItzDriev"}
          target="_blank"
          title="YouTube"
          className={linkStyle}
        >
          <YoutubeIcon className="w-5 h-5 shrink-0" />
          <TypewriterText text="YouTube" active={!collapsed} />
        </Link>
        <Link
          to={"https://discord.gg/7WCy87XQw"}
          target="_blank"
          title="Discord"
          className={linkStyle}
        >
          <DiscordIcon className="w-5 h-5 shrink-0" />
          <TypewriterText text="Discord" active={!collapsed} />
        </Link>
        <Link
          to={"https://github.com/ItzDriev"}
          target="_blank"
          title="GitHub"
          className={linkStyle}
        >
          <GithubIcon className="w-5 h-5 shrink-0" />
          <TypewriterText text="GitHub" active={!collapsed} />
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
