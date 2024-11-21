import { aboutUsText } from "@/common/constant";
import { Header } from "@/components";
import React from "react";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  return (
    <>
      <Header />
      <div
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/assets/train1.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="w-full max-w-3xl bg-black bg-opacity-90 text-white p-8 rounded-xl shadow-xl">
            <h1 className="text-4xl font-bold text-center mb-4">
              {aboutUsText.aboutUs}
            </h1>
            <p className="text-xl text-center mb-8">{aboutUsText.welcome} </p>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {aboutUsText.ourMission}
              </h2>
              <p className="text-lg">{aboutUsText.ourMissionDetail}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {aboutUsText.ourHistory}
              </h2>
              <p className="text-lg">{aboutUsText.ourHistoryDetails}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {aboutUsText.ourTeam}
              </h2>
              <p className="text-lg">{aboutUsText.ourTeamDetails}</p>
            </div>

            <Link
              to={aboutUsText.homeLink}
              className="block text-center py-2 px-6 mt-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              {aboutUsText.goToBack}{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
