import type { RaidEvent } from "../types/CustomRaidTypes";

async function FetchRaidData(apiKey: string) {
  const res = await fetch(
    `https://raid-helper.xyz/api/v4/users/${apiKey}/events`,
  );

  const relevantData: RaidEvent[] = await res.json();

  const futureRaids = relevantData
    .filter((raid) => {
      const now = Date.now() / 1000;
      return raid.signUps[0].className !== "Absence" && raid.startTime > now;
    })
    .sort((a, b) => a.startTime - b.startTime);

  const remappedFutureRaids = futureRaids.map((raid) => ({
    leaderName: raid.leaderName,
    startTime: new Date(raid.startTime * 1000).toLocaleTimeString(),
    startDate: new Date(raid.startTime * 1000).toLocaleDateString(),
    title: raid.title,
    className: raid.signUps[0].className,
    name: raid.signUps[0].name,
    specName: raid.signUps[0].specName,
  }));
  console.log(remappedFutureRaids);
  return remappedFutureRaids;
}

export default FetchRaidData;
