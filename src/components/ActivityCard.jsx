import React from "react";

const ActivityCard = ({ title, participants = 0, posts = 0 }) => (
  <div className="bg-white rounded shadow p-4 border" style={{ borderColor: "#BDBDBD" }}>
    <h4 className="font-bold text-[#212121]">{title || "Activity"}</h4>
    <div className="text-sm text-[#333333]">Participants: {participants}</div>
    <div className="text-sm text-[#333333]">Posts: {posts}</div>
  </div>
);

export default ActivityCard;
