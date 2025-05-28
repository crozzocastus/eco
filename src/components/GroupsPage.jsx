import React, { useState } from "react";
import GroupCard from "./GroupCard";
import Feed from "./Feed";

const GroupsPage = ({ groups = [], selectedGroup: selectedGroupProp, setSelectedGroup: setSelectedGroupProp }) => {
  // Permite controle externo do grupo selecionado (via props) ou local (fallback)
  const [selectedGroupLocal, setSelectedGroupLocal] = useState(null);
  const selectedGroup = selectedGroupProp !== undefined ? selectedGroupProp : selectedGroupLocal;
  const setSelectedGroup = setSelectedGroupProp || setSelectedGroupLocal;

  if (selectedGroup) {
    return (
      <div className="p-6">
        <button
          className="mb-4 px-3 py-1 rounded bg-[#388E3C] text-white text-sm"
          onClick={() => setSelectedGroup(null)}
          type="button"
        >
          ← Voltar para grupos
        </button>
        <div className="rounded-lg overflow-hidden shadow mb-6 relative">
          {selectedGroup.coverUrl && (
            <img
              src={selectedGroup.coverUrl}
              alt="Capa do grupo"
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            {selectedGroup.iconUrl && (
              <img
                src={selectedGroup.iconUrl}
                alt="Ícone do grupo"
                className="w-16 h-16 rounded-full border-4 border-white shadow"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow">{selectedGroup.name}</h2>
              <div className="text-white drop-shadow">{selectedGroup.description}</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <span className="bg-[#388E3C] text-white px-3 py-1 rounded-full text-xs">
            Participantes: {selectedGroup.participants?.length || 0}
          </span>
          <span className="ml-2 bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs">
            Criador: {selectedGroup.creator}
          </span>
        </div>
        <h3 className="font-bold mb-2" style={{ color: "#2E7D32" }}>Blogs do Grupo</h3>
        <Feed posts={selectedGroup.blogs || []} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#2E7D32" }}>Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group, idx) => (
          <div
            key={group.id || idx}
            className="cursor-pointer"
            onClick={() => setSelectedGroup(group)}
          >
            <div className="flex items-center gap-4 mb-2">
              {group.iconUrl && (
                <img
                  src={group.iconUrl}
                  alt="Ícone do grupo"
                  className="w-12 h-12 rounded-full border-2 border-[#388E3C]"
                />
              )}
              <div>
                <h4 className="font-bold text-[#212121] text-lg">{group.name}</h4>
                <p className="text-sm text-[#333333]">{group.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="bg-[#388E3C] text-white px-2 py-1 rounded-full text-xs">
                Participantes: {group.participants?.length || 0}
              </span>
              <span className="bg-[#2E7D32] text-white px-2 py-1 rounded-full text-xs">
                Criador: {group.creator}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
