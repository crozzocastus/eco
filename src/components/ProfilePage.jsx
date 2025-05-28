import React from "react";
import LevelProgress from "./LevelProgress";
import PointsDisplay from "./PointsDisplay";
import Achievements from "./Achievements";
import "tailwindcss";
import Feed from "./Feed";
import GroupCard from "./GroupCard";

const ProfilePage = ({ user = {}, posts = [], groups = [], onEditProfile }) => (
  <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow" style={{ color: "#212121" }}>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden border-2 border-[#388E3C] flex items-center justify-center">
        {user.avatarUrl
          ? <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          : <span className="text-[#2E7D32] font-bold text-3xl">{user?.name?.[0] || "U"}</span>
        }
      </div>
      <div>
        <h2 className="text-xl font-bold">{user.name || "User"}</h2>
        <p className="text-sm text-[#388E3C] font-semibold">
          {user.role || "Eco Role"}
        </p>
        <p className="text-[#333333]">{user.description || "User description"}</p>
        <p className="text-xs text-gray-500 mt-1">
          Joined: {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "Unknown"}
        </p>
        <button
          className="mt-2 px-2 py-1 rounded bg-[#4CAF50] text-black text-sm border border-black border-solid hover:bg-[#45A049] transition-colors"
          style={{ color: "#fff", backgroundColor: "#4CAF50" }}
          onClick={onEditProfile}
        >
          Edit Profile
        </button>
      </div>
    </div>
    <LevelProgress level={user.level} progress={user.progress} />
    <PointsDisplay points={user.points} medals={user.medals} />
    <Achievements achievements={user.achievements} />
    <div className="mt-6">
      <h3 className="font-bold mb-2" style={{ color: "#2E7D32" }}>My Groups</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group, idx) => (
          <GroupCard key={idx} {...group} />
        ))}
      </div>
    </div>
    <div className="mt-6">
      <h3 className="font-bold mb-2" style={{ color: "#2E7D32" }}>My Posts</h3>
      <Feed posts={posts} currentUser={user.name} />
    </div>
  </div>
);

export default ProfilePage;
