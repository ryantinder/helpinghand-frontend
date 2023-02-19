import React from "react";
import About from "../components/About";
import AboutTeam from "../components/AboutTeam"

function Page() {
    return (
      
        <div className="animate-fadeIn scroll-smooth">
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-6 sm:py-12 shadow-md">
                <div className="animate-float-fastest">
                    <div className="absolute inset-auto h-60 w-60 -translate-x-8 translate-y-16 scale-50 rounded-full bg-gradient-to-br from-green-300 via-blue-400 to-green-200 sm:translate-x-20 sm:translate-y-28 sm:scale-100"></div>
                </div>

                <div className="animate-float-fast scale-50 sm:scale-100">
                    <div className="absolute inset-auto h-60 w-60 -translate-x-56 -translate-y-16 scale-50 rounded-full bg-gradient-to-tr from-blue-300 via-purple-300 to-yellow-100 sm:-translate-x-80 sm:-translate-y-28 sm:scale-100"></div>
                </div>

                <div className="animate-float-slow scale-50 sm:scale-100">
                <div className="text-center">
                    <h1 className="text-8xl font-bold mb-40">Together we can make a difference.</h1>
                </div>
                </div>
            </div>
            <About />
            <AboutTeam />
        </div>
    );
}

export default Page;