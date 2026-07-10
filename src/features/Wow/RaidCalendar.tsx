import { useEffect, useState } from "react";
import FetchRaidData from "./backend/FetchRaidData";
import type { RaidData } from "./types/CustomRaidTypes";
import Navbar from "../../layouts/Navigation/Navbar";
import CalendarHeader from "./components/CalendarHeader";
import CalendarHeaderSingle from "./components/CalendarHeaderSingle";
import CalendarSettings from "./components/CalendarSettings";
import useTitle from "../../hooks/useTitle";
import Popup from "../../components/Popup";

function RaidCalendar() {
  const [raids, setRaids] = useState<RaidData[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [helpShown, setHelpShown] = useState(false);

  useTitle("Raid Calendar");

  type RaidNode = {
    startTimestamp: number;
    element: React.ReactNode;
  };

  //Robust handling of dates (Makes it so people formatting dates like morons can use the website too)
  // Parses a date string in "YYYY-MM-DD" or "DD.MM.YYYY" into a Date at 00:00 CET (UTC+1)
  function parseRaidDateToCET(dateString: string) {
    let year: number, month: number, day: number;

    if (dateString.includes(".")) {
      // Format: "DD.MM.YYYY"
      const parts = dateString.split(".");
      if (parts.length !== 3) return new Date(NaN);
      [day, month, year] = parts.map(Number);
    } else if (dateString.includes("-")) {
      // Format: "YYYY-MM-DD"
      const parts = dateString.split("-");
      if (parts.length !== 3) return new Date(NaN);
      [year, month, day] = parts.map(Number);
    } else if (dateString.includes("/")) {
      // Format: "DD/MM/YYYY"
      const parts = dateString.split("/");
      if (parts.length !== 3) return new Date(NaN);
      [day, month, year] = parts.map(Number);
    } else {
      console.error("Unsupported date format:", dateString);
      return new Date(NaN);
    }

    // Month is 0-indexed in JS, 01:00 UTC = 00:00 CET
    return new Date(Date.UTC(year, month - 1, day, 1, 0, 0));
  }

  const [dayBuckets, setDayBuckets] = useState<React.ReactNode[][]>(
    //Creates an array with length 7 that initially has 7 undefined values but the 2nd argument "()=>[]" is a map function that remaps the 7 "undefined" to empty arrays
    //It essentially goes from [undefined, undefined, undefined, undefined, undefined, undefined, undefined] to [[],[],[],[],[],[],[]]
    Array.from({ length: 7 }, () => []),
  );

  function constructRaidElements() {
    const buckets: RaidNode[][] = [[], [], [], [], [], [], []];
    const iconClassName =
      " h-10 rounded-3xl relative right-0 border-2 border-red-500";
    //Object containing key:value pairs where the key is a string and the values are react elements
    const classIcons = {
      Tank: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/ability_warrior_defensivestance.jpg"
          alt="Tank Icon"
          className={iconClassName}
        />
      ),
      Warrior: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg"
          alt="Warrior Class Icon"
          className={iconClassName}
        />
      ),
      Druid: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg"
          alt="Druid Class Icon"
          className={iconClassName}
        />
      ),
      Paladin: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg"
          alt="Paladin Icon"
          className={iconClassName}
        />
      ),
      Rogue: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg"
          alt="Rogue Class Icon"
          className={iconClassName}
        />
      ),
      Hunter: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg"
          alt="Hunter Class Icon"
          className={iconClassName}
        />
      ),
      Priest: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg"
          alt="Priest Class Icon"
          className={iconClassName}
        />
      ),
      Mage: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg"
          alt="Mage Class Icon"
          className={iconClassName}
        />
      ),
      Warlock: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg"
          alt="Warlock Class Icon"
          className={iconClassName}
        />
      ),
      Shaman: (
        <img
          src="https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg"
          alt="Warlock Class Icon"
          className={iconClassName}
        />
      ),
    };

    raids.forEach((raid, index) => {
      const raidDropDown: React.ReactNode = (
        <section key={index} className="w-[96%] text-white">
          <details
            className="bg-slate-900 mt-2 rounded-md"
            onToggle={(e) => {
              const el = e.currentTarget;
              if (!el.open) {
                setTimeout(() => {
                  el.classList.add("rounded-md");
                }, 200);
              } else {
                el.classList.remove("rounded-md");
                el.classList.add("rounded-t-md");
              }
            }}
          >
            <summary className="select-none">
              <span className="flex justify-between items-center pr-2 pl-[0.7rem] text-[1rem] details-span">
                <span className="details-span">
                  <i className="mr-2 fa-caret-right fa-solid"></i>
                  <h1>
                    {raid.title
                      .replace(
                        /\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|1ST)\b|\d+/gi,
                        "",
                      )
                      .trim() +
                      " " +
                      raid.startTime.substring(0, 5)}
                  </h1>
                </span>
                {classIcons[raid.className as keyof typeof classIcons]}
              </span>
            </summary>
          </details>
          <div className="bg-(--navBG) rounded-b-md content">
            <span className="flex justify-center items-center">
              <p className="text-xl">{raid.className}</p>
            </span>
            <p>{raid.name}</p>
            <p>{raid.specName}</p>
          </div>
        </section>
      );

      const raidDate = parseRaidDateToCET(raid.startDate).getTime();

      const today = new Date();
      const todayString = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      const todayDate = parseRaidDateToCET(todayString).getTime();

      const diffDays = Math.floor(
        (raidDate - todayDate) / (1000 * 60 * 60 * 24),
      );

      console.log("raidDate:", raidDate);
      console.log("todayDate:", todayDate);
      console.log("diffDays:", diffDays);

      if (diffDays >= 0 && diffDays < 7) {
        console.log("Inside Bucket Logic");
        console.log("Raid Dropdown element: ", raidDropDown);
        //The {} treats means it's one object that looks like this {startTimestamp, element} that is being pushed
        buckets[diffDays].push({
          //Converts ex. "2026-01-03 19:30", hence startDate and startTime, to miliseconds since jan 1st 1970
          startTimestamp: new Date(
            `${raid.startDate} ${raid.startTime}`,
          ).getTime(),
          element: raidDropDown,
        });
      }
    });
    console.log(buckets);
    //Sort each based on starttime
    const sortedDays = buckets.map((day) =>
      day
        .sort((a, b) => a.startTimestamp - b.startTimestamp)
        .map((item) => item.element),
    );

    setDayBuckets(sortedDays);
  }

  //Will only execute once a change is detected in apiKey
  useEffect(() => {
    (async () => {
      if (apiKey === "") return;
      const raids: RaidData[] = await FetchRaidData(apiKey);
      setRaids(raids);
    })();
  }, [apiKey]);

  useEffect(() => {
    constructRaidElements();
  }, [raids]);

  const days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <main className="bg-(--mainBG) bg-aurora min-h-screen h-auto">
      <Navbar />
      <CalendarSettings
        setApiKey={setApiKey}
        apiKey={apiKey}
        setHelpShown={setHelpShown}
        helpShown={helpShown}
      />
      {/* Container for the whole calendar */}
      <div className="px-10 md:px-6 pb-5 md:pb-0">
        {/* The Grid */}
        <div className="hidden md:grid grid-cols-7 grid-rows-[repeat(2,max-content)] shadow-[0px_0px_10px_5px] shadow-red-500/60 mt-4 border-2 border-red-500 rounded-3xl overflow-hidden text-center">
          <CalendarHeader days={days} />
          {/* Iterates over each bucket containing raids and creates a div for each day if the bucket has something in it we iterate 
          over that bucket and display the raid elements within that div and if the bucket it empty we display "No Raids" */}
          {dayBuckets.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center min-h-[70vh]  border-red-500 ${
                index % 2 === 0 ? "bg-(--alternating1)" : "bg-(--alternating2)"
              } ${
                index === 0 || index === 6
                  ? index === 6
                    ? "border-l"
                    : "border-r"
                  : "border-x"
              }`}
            >
              {day.length > 0 ? (
                day.map((e) => e)
              ) : (
                <p className="text-white">No Raids</p>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-1 grid-rows-[repeat(14,max-content)] shadow-[0px_0px_10px_5px] shadow-red-500/60 mt-4 border-2 border-red-500 rounded-3xl overflow-hidden text-center">
          {dayBuckets.map((day, index) => (
            <>
              <CalendarHeaderSingle day={days[index]} index={index} />
              <div
                key={index}
                className={`flex flex-col items-center min-h-[40vh]  border-red-500 ${index % 2 === 0 ? "bg-(--alternating1)" : "bg-(--alternating2)"}`}
              >
                {day.length > 0 ? (
                  day.map((e) => e)
                ) : (
                  <p className="text-white">No Raids</p>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      {helpShown && (
        <Popup setHelpShown={setHelpShown} title="How to get your API key">
          <ol className="px-5 list-decimal">
            <li>Open a DM with the RaidHelper bot</li>
            <li>
              If you already have an api key, then run
              <br />
              /usersettings apikey show
            </li>
            <li>
              To create a new API key run
              <br />
              /usersettings apikey refresh
            </li>
            <li>Copy the API key and paste it into the field at the top</li>
            <li>Press ENTER</li>
          </ol>
        </Popup>
      )}
    </main>
  );
}

export default RaidCalendar;
