"use client";
import React from "react";
import SideBar from "../components/SideBar"
import TopBar from "../components/Topbar";
import TaskList from "../components/TaskList";
import BoardList from "../components/BoardList";
import Lists from "../components/List";
export default function App() {
    return (
        <div>
            <TopBar />
            <SideBar />
            <BoardList/>
            <Lists />
            <TaskList/>
        </div>
    );
}