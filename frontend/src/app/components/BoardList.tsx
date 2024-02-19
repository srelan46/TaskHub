import React, { useState, useEffect } from "react";
import { Board } from "../types/board";

const dropdownStyle = {
  width: '10%',
  padding: '8px 16px',
  fontSize: '16px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  appearance: 'none',
  background: 'white',
  color: '#333',
  textAlignLast: 'center',
};

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://localhost:5000/boards",{
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }
        const data: Board[] = await response.json();
        setBoards(data);
        if (data.length > 0) {
          setSelectedBoard(data[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoard(event.target.value);
  };

  return (
    <div className="pt-20 pl-36">
      <select value={selectedBoard} onChange={handleBoardChange} style={dropdownStyle as any}>
        {boards.map((board) => (
          <option key={board.id} value={board.id.toString()} >
            {board.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardList;
