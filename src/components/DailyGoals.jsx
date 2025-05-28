import React from "react";

const DailyGoals = ({ goals = [], progress = 0 }) => (
  <section
    className="rounded p-4 mb-6 border"
    style={{ backgroundColor: "#D5F7D2", borderColor: "#000" }}
  >
    <h3 className="font-bold mb-2" style={{ color: "#2E7D32" }}>Daily Goals</h3>
    <ul className="list-disc pl-5 mb-2 text-[#212121]">
      {goals.map((goal, idx) => (
        <li key={idx}>{goal}</li>
      ))}
    </ul>
    <div className="w-full bg-gray-300 rounded h-3">
      <div className="h-3 rounded" style={{ width: `${progress}%`, backgroundColor: "#66BB6A" }} />
    </div>
    <span className="text-xs" style={{ color: "#212121" }}>{progress}% completed</span>
  </section>
);

export default DailyGoals;
