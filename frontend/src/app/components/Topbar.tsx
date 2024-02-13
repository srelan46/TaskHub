import React from "react";
import { MagnifyingGlassIcon,AtSymbolIcon,BellIcon,UserCircleIcon } from "@heroicons/react/24/solid";

function TopBar() {
  return (
    <div className="h-16 pl-40 fixed bg-gradient-to-r from-purple-400 to-blue-500 w-full flex items-center justify-between">
      <div className="flex px-5 items-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        <input type="text" placeholder="Search for Tasks ..." className="bg-transparent border-0 text-white placeholder-gray-200
        outline-none focus:ring-0 text-lg"/>
      </div>
      <div className="flex space-x-5">
        <AtSymbolIcon className="w-7 h-7 text-white"/>
        <BellIcon className="w-7 h-7 text-white"/>
        <div className="flex items-center text-white">
            <h3> John Doe</h3>
            <UserCircleIcon className="h-7"/>
        </div>
      </div>
    </div>
  );
}

export default TopBar