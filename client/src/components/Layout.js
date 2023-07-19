import React, { useState } from "react";
import "../index.css";
import SideBar from "./SideBar";
import {FaUserCircle} from 'react-icons/fa'
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Layout(props) {
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate()
  const handleToggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <div className="layout flex w-full ">
      <div className={`sidebar ${showSideBar ? 'w-60' : 'w-0'} transition-width duration-500`}>
        {showSideBar && <SideBar showSideBar={showSideBar} />}
      </div>

      <div className="w-full">
        <div className="header bg-primary h-20 w-full flex items-center justify-between">
          <GiHamburgerMenu
            onClick={handleToggleSideBar}
            color="gray"
            size={30}
            className="cursor-pointer"
          />
          <div className="mr-5 text-gray-300 flex items-center space-x-1 cursor-pointer">
           <FaUserCircle onClick={()=>navigate('/profile')} />
            <span onClick={()=>navigate('/profile')}>{JSON.parse(localStorage.getItem('Newsybit-user')).name.toUpperCase()}</span>
          </div>
        </div>
        <div className="content max-h-[85vh] overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
