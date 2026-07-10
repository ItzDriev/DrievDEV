function CalendarHeader({ day, index }: { day: Date; index: number }) {
  return (
    <span
      key={index}
      role="term"
      aria-details="pure-css"
      className={`bg-(--navBG) text-white border-red-500 border-b-2  ${
        index === 0 ? "border-t-0" : "border-t-2"
      }`}
    >
      <h1 className="text-shadow-lg font-bold text-xl">
        {day.toLocaleDateString()}
      </h1>
      <h2 className="text-shadow-md text-lg">
        {day.toLocaleDateString("en-US", { weekday: "long" })}
      </h2>
    </span>
  );
}

export default CalendarHeader;
