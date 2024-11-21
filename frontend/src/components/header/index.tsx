import { headerText } from "@/common/constant";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    localStorage.removeItem("jwtToken");

    navigate(headerText.loginLink);
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-semibold text-white cursor-pointer">
            <span>{headerText.logo}</span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => navigate(headerText.homeLink)}
              className="text-white hover:text-blue-600"
            >
              {headerText.home}
            </button>

            <button
              onClick={() => navigate(headerText.aboutLink)}
              className="text-white hover:text-blue-600"
            >
              {headerText.aboutUs}
            </button>

            <button
              onClick={() => navigate(headerText.ticketListLink)}
              className="text-white hover:text-blue-600"
            >
              {headerText.ticketList}
            </button>

            <button
              className="text-white hover:text-red-600"
              onClick={handleLogout}
            >
              {headerText.logOut}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
