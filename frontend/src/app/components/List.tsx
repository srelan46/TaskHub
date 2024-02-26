import React, { useEffect, useState } from "react";
import { List as ListType } from "../types/list";
import { useBoardContext } from "../contexts/BoardContext";

const Lists: React.FC = () => {
  const [lists, setLists] = useState<ListType[]>([]);
  let boardId = useBoardContext();

  useEffect(() => {
    const fetchLists = async () => {
      if (boardId == null) {
        boardId=2;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/boards/${boardId}/lists`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }
        const data: ListType[] = await response.json();
        setLists(data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchLists();
  }, [boardId]);
  return (
    <div className="ml-36 mt-4 flex gap-16 p-6 min-w-64">
      {lists.map((list) => (
        <div
          key={list.id}
          className=" bg-white rounded-lg shadow-slate-400  p-10"
        >
          <h3 className="mb-16 text-black">{list.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Lists;
