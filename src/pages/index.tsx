import React from "react";
import About from "../components/About";
import AboutTeam from "../components/AboutTeam"

function Page() {
  return (
      <div>
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-40">Together we can make a difference.</h1>
      </div>
    </div>
    <About />
    <AboutTeam />
    </div>
  );
}

export default Page;