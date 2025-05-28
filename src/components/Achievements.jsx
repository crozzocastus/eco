import React from "react";

const Achievements = ({ achievements = [] }) => (
  <div className="mb-4">
    <h3 className="font-bold mb-2" style={{ color: "#2E7D32" }}>Achievements</h3>
    <ul className="list-disc pl-5 text-[#212121]">
      {achievements.map((ach, idx) => (
        <li key={idx}>{ach}</li>
      ))}
    </ul>
  </div>
);

export default Achievements;
