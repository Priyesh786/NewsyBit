import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function SideBar(showSideBar) {
  const navigate = useNavigate();
  const menuItems = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Posted",
      path: "/posted",
    },
    {
      title: "Add News",
      path: "/add",
    },
    {
      title: "Profile",
      path: "/profile",
    },
    {
      title: "Logout",
      path: "/logout",
    },
  ];
  const logout = () => {
    localStorage.removeItem("Newsybit-user");
    navigate("/");
  };
  return (
    <div className="bg-primary h-screen flex flex-col">
      <div className="text-2xl font-bold text-gray-400 mt-5 ml-10">
        <h1 className="text-3xl font-bold text-gray-200">
          NewsyBits
        </h1>
        <span className="text-gray-300 text-sm">News Portal</span>
      </div>

      <div className="flex flex-col mt-20">
        {menuItems.map((item) => {
          return item.title !== "Logout" ? (
            <Link
              to={`${item.path}`}
              className={`py-10 pl-20 text-gray-300 hover:text-gray-700 hover:bg-gray-50 text-sm
          ${
            location.pathname.includes(item.path) &&
            "bg-[#ea580c] text-yellow-200 font-bold"
          }`}
            >
              {item.title}
            </Link>
          ) : (
            <span
              className="py-10 pl-20 text-gray-300 hover:text-gray-700 hover:bg-gray-50 text-sm cursor-pointer"
              onClick={logout}
            >
              Logout
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
