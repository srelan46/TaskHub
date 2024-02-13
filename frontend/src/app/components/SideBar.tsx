import React from "react";
import {UserGroupIcon,Bars3Icon,ChartBarSquareIcon,CalendarDaysIcon} from '@heroicons/react/24/solid';

function SideBar() {
    return (
        <div className="fixed inset-y-0 left-0 bg-white w-32">
            <h1 className="flex items-center justify-center text-2xl h-16 bg-purple-800 text-white font-bold">
                TaskHub
            </h1>
            <ul className="flex flex-col  text-black">
                <li className="flex justify-center items-center flex-col py-7">
                    <UserGroupIcon className="h-7 w-7 text-blue-800"/>
                        Manage
                </li>
                <li className="flex justify-center items-center flex-col py-7">
                    <Bars3Icon className="h-7 w-7 text-blue-800"/>
                        Boards
                </li>
                <li className="flex justify-center items-center flex-col py-7">
                    <CalendarDaysIcon className="h-7 w-7 text-blue-800"/>
                        Schedule
                </li>
                <li className="flex justify-center items-center flex-col py-7">
                    <ChartBarSquareIcon className="h-7 w-7 text-blue-800"/>
                        Report
                </li>
            </ul>
        </div>

    );
}

export default SideBar;