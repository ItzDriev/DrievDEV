import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useTwitchLiveStatus from "../../../hooks/useTwitchLiveStatus";
import AntonSquare from "../../../assets/AntonMonkeySquare.png";
import TwitchOffline from "../../../assets/STREAM_OFFLINE.png";
import { TwitchWordmarkIcon } from "./TwitchIcon";
//import AntonRound from "../../../assets/AntonMonkeyRound.png";

const TWITCH_URL = "https://www.twitch.tv/drievtv";

function Home() {
  useTitle("Home");
  const isLive = useTwitchLiveStatus();
  const parent = import.meta.env.DEV ? "localhost" : "driev.dev";
  const twitchSrc = `https://player.twitch.tv/?channel=drievtv&parent=${parent}`;
  //const twitchChatSrc = `https://www.twitch.tv/embed/drievtv/chat?parent=${parent}`;
  return (
    <section className="flex bg-(--mainBG) w-full h-[calc(100vh-4rem)]">
      <section className="flex flex-col justify-center items-center w-1/2">
        <img
          src={AntonSquare}
          alt=""
          className="z-2 border-2 border-red-500 rounded-[10%] w-[39%]"
        />
        <p className="z-2 text-white text-center">
          <span className="font-medium text-[2.5rem]">
            Hello, I'm Anton 'Driev' Andersson
          </span>
          <br />
          <span className="text-[1.3rem]">
            I'm a Software Engineering Student and WoW Enthusiast
          </span>
        </p>
      </section>

      <section className="flex justify-center items-center p-4 w-1/2 min-w-0">
        {isLive ? (
          <iframe
            src={twitchSrc}
            allowFullScreen
            className="z-10 relative border-2 border-red-500 rounded-4xl w-full max-w-[700px] aspect-[5/3] animate-border"
          />
        ) : (
          <div className="z-2 relative border-2 border-red-500 rounded-4xl w-full max-w-[700px] aspect-[5/3] overflow-hidden">
            <img
              src={TwitchOffline}
              alt="Stream offline"
              className="w-full h-full object-cover"
            />
            <div className="right-0 bottom-0 left-0 z-20 absolute flex justify-end items-center bg-gradient-to-t from-black/80 to-transparent px-4 h-[10%]">
              <Link to={TWITCH_URL} target="_blank" rel="noopener noreferrer">
                <TwitchWordmarkIcon className="w-16 h-4 text-white hover:text-purple-400 transition-colors" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default Home;
