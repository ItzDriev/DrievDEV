import ReturnToHomePage from "./ReturnToHomePage.tsx";

function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full h-screen bg-aurora">
      <h2 className="text-white text-3xl">404, Return</h2>
      <ReturnToHomePage />
    </div>
  );
}

export default NotFoundPage;
