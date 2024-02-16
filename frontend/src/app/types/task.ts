import React from "react";

export type taskDetail = {
    id: number;
    title: string;
    username: string;
    description: string;
    due_date: Date;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
}