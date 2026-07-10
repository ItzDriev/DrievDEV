import { useEffect, useState } from "react";

const TWITCH_CHANNEL = "drievtv";
const POLL_INTERVAL_MS = 60_000;

function useTwitchLiveStatus() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkLiveStatus() {
      try {
        const res = await fetch(
          `https://decapi.me/twitch/uptime/${TWITCH_CHANNEL}`,
        );
        const text = (await res.text()).trim().toLowerCase();
        if (!cancelled) {
          setIsLive(text.length > 0 && !text.includes("offline"));
        }
      } catch {
        if (!cancelled) setIsLive(false);
      }
    }

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return isLive;
}

export default useTwitchLiveStatus;
