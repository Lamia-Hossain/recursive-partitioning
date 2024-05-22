import React, { useState } from "react";
import "./App.css";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
];

// Function to get a random color
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// Component for a partition
const Partition = ({ level, removePartition }) => {
  const [isSplit, setIsSplit] = useState(false);
  const [splitType, setSplitType] = useState(null);
  const [color, setColor] = useState(getRandomColor());
  const [childrenColors, setChildrenColors] = useState([
    getRandomColor(),
    getRandomColor(),
  ]);

  const handleSplit = (type) => {
    setIsSplit(true);
    setSplitType(type);
    setChildrenColors([getRandomColor(), getRandomColor()]);
  };

  const handleRemove = () => {
    setIsSplit(false);
    setSplitType(null);
  };

  if (isSplit) {
    return (
      <div
        className={`flex ${
          splitType === "H" ? "flex-col" : "flex-row"
        } h-full w-full`}
      >
        <Partition key={0} level={level + 1} removePartition={handleRemove} />
        <Partition key={1} level={level + 1} removePartition={handleRemove} />
      </div>
    );
  }

  return (
    <div
      className={`relative ${color} flex items-center justify-center w-full h-full`}
    >
      <button
        onClick={() => handleSplit("V")}
        className="absolute top-2 left-2 p-2 bg-white text-black rounded"
      >
        V
      </button>
      <button
        onClick={() => handleSplit("H")}
        className="absolute top-2 left-12 p-2 bg-white text-black rounded"
      >
        H
      </button>
      {level > 0 && (
        <button
          onClick={removePartition}
          className="absolute top-2 right-2 p-2 bg-white text-black rounded"
        >
          -
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="w-screen h-screen">
      <Partition level={0} removePartition={null} />
    </div>
  );
}

export default App;
