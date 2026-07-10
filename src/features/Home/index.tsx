import Home from "./components/Home";
import Navbar from "../../layouts/Navigation/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "../../layouts/Navigation/Footer";
import Projects from "./components/Projects";
import { useState } from "react";
function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <main className="bg-(--mainBG) w-full h-auto z-10">
      <Navbar />
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <div className="z-1 relative flex flex-col">
        <div className="z-1 absolute inset-0 bg-aurora pointer-events-none"></div>
        <div className="flex w-full h-auto">
          <div
            className={`relative z-19 flex flex-col bg-(--navBG) border-red-500 border-r shrink-0 transition-all duration-300 ${
              collapsed ? "w-20" : "w-64"
            }`}
          ></div>
          <div className="flex flex-col flex-1 min-w-0">
            <Home />
            <Projects />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default HomePage;
