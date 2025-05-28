import React from "react";

const PointsDisplay = ({ points = 0, medals = 0 }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="bg-[#FFC107] text-[#212121] px-3 py-1 rounded font-semibold">Points: {points}</div>
    <div className="bg-gray-200 text-[#212121] px-3 py-1 rounded">Medals: {medals}</div>
  </div>
);

export default PointsDisplay;
