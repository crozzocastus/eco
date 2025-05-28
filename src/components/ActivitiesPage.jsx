import React, { useState } from "react";
import ActivityCard from "./ActivityCard";
import SearchBar from "./SearchBar";

const ActivitiesPage = ({ activities = [] }) => {
  const [search, setSearch] = useState("");
  const filtered = activities.filter(
    a => a.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#2E7D32" }}>Activities</h2>
      <div className="mb-2 text-xs text-[#388E3C]">
        Use o botão "+ Nova Atividade" para criar atividades. Para grupos, use o "+" na seção Groups da barra lateral.
      </div>
      <SearchBar onSearch={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {filtered.map((activity, idx) => (
          <ActivityCard key={activity.id || idx} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
