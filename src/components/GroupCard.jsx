import React from "react";

const GroupCard = ({ name, description, creator, participants = 0 }) => (
  <div className="bg-white rounded shadow p-4 border" style={{ borderColor: "#388E3C" }}>
    <h4 className="font-bold text-[#212121]">{name || "Group"}</h4>
    <p className="text-sm text-[#333333]">{description}</p>
    <div className="text-xs text-[#388E3C] mt-2">Creator: {creator}</div>
    <div className="text-xs text-[#333333]">Participants: {participants}</div>
  </div>
);

export default GroupCard;
