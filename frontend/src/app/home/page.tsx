"use client";
import React from "react";
import SideBar from "../components/SideBar"
import TopBar from "../components/Topbar";
import TaskList from "../components/TaskList";
export default function App() {
    return (
        <div>
            <TopBar />
            <SideBar />
            <h1>
                Welcome to Task Hub
            </h1>
            <TaskList/>
        </div>
    );
}