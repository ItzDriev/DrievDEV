function CalendarHeader({ days }: { days: Date[] }) {
  return (
    <>
      {days.map((date, index) => (
        <span
          key={index}
          role="term"
          aria-details="pure-css"
          className={`bg-(--navBG) text-white border-red-500 border-b-2 ${
            index === 0 || index === 6
              ? index === 6
                ? "border-l"
                : "border-r"
              : "border-x"
          }`}
        >
          <h1 className="text-shadow-lg font-bold text-xl">
            {date.toLocaleDateString()}
          </h1>
          <h2 className="text-shadow-md text-lg">
            {date.toLocaleDateString("en-US", { weekday: "long" })}
          </h2>
        </span>
      ))}
    </>
  );
}

export default CalendarHeader;
