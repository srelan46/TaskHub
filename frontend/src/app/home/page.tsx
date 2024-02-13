"use client";
import React from "react";
import TaskList from "../components/taskList";
import SideBar from "../components/SideBar"
export default function App() {
    return (
        <div>
            <SideBar />
            <h1>
                Welcome to Task Hub
            </h1>
            <TaskList/>
        </div>
    );
}