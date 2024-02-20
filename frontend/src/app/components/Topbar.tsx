import React, { use, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  AtSymbolIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { User } from "../types/user";

const TopBar: React.FC = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:5000/current_user", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="h-16 pl-40 fixed bg-gradient-to-r from-purple-400 to-blue-500 w-full flex items-center justify-between">
      <div className="flex px-5 items-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search for Tasks ..."
          className="bg-transparent border-0 text-white placeholder-gray-200
        outline-none focus:ring-0 text-lg"
        />
      </div>
      <div className="flex space-x-5">
        <AtSymbolIcon className="w-7 h-7 text-white" />
        <BellIcon className="w-7 h-7 text-white" />
        <div className="flex items-center text-white ">
          <h3 className="mr-2">{user?.first_name}</h3>
          <h3>{user?.last_name}</h3>
          <UserCircleIcon className="h-7" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
