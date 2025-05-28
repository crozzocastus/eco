import React, { useState } from "react";

const Sidebar = ({
  activities = [],
  onAddActivity,
  onSelectActivity,
  onCreateGroup,
  groups = [],
  onSelectGroup
}) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [activityLoading, setActivityLoading] = useState(false);

  // Funções utilitárias para gerar ícone/capa aleatórios
  function getRandomGroupIcon() {
    const seed = Math.random().toString(36).substring(2, 10);
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
  }
  function getRandomGroupCover() {
    return `https://picsum.photos/seed/${Math.floor(Math.random() * 10000)}/600/200`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let icon = iconUrl;
    let cover = coverUrl;
    if (!icon) icon = getRandomGroupIcon();
    if (!cover) cover = getRandomGroupCover();
    setLoading(false);
    setShowGroupModal(false);
    setGroupName("");
    setGroupDesc("");
    setIconUrl("");
    setCoverUrl("");
    if (onCreateGroup) {
      onCreateGroup({
        name: groupName,
        description: groupDesc,
        iconUrl: icon,
        coverUrl: cover,
      });
    }
  };

  // Novo: handler para criar activity no backend
  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    setActivityLoading(true);
    try {
      const resp = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: activityName, description: "" }),
      });
      setActivityLoading(false);
      setShowActivityModal(false);
      setActivityName("");
      if (onAddActivity) onAddActivity();
    } catch {
      setActivityLoading(false);
      setShowActivityModal(false);
    }
  };

  return (
    <aside className="bg-white w-64 min-h-screen p-6 shadow flex flex-col gap-2 border-r" style={{ borderColor: "#BDBDBD" }}>
      {/* Groups header */}
      <div className="flex items-center justify-between mb-1 px-2 py-2 rounded font-semibold text-[#212121] text-base select-none">
        <span>Groups</span>
        <button
          className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 border-2 border-green-700 text-green-700 shadow hover:bg-green-200 hover:border-green-800 transition relative"
          title="Criar novo grupo (não é uma atividade!)"
          onClick={() => setShowGroupModal(true)}
          type="button"
          aria-label="Criar novo grupo"
        >
          +
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition">
            Criar Grupo
          </span>
        </button>
      </div>
      {/* Modal de criação de grupo */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <form
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col gap-3 border"
            style={{ borderColor: "#BDBDBD" }}
            onSubmit={handleSubmit}
          >
            <h3 className="font-bold text-lg mb-2" style={{ color: "#2E7D32" }}>Novo Grupo</h3>
            <input
              type="text"
              placeholder="Nome do grupo"
              className="px-3 py-2 border rounded"
              style={{ borderColor: "#BDBDBD" }}
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              required
            />
            <textarea
              placeholder="Descrição"
              className="px-3 py-2 border rounded"
              style={{ borderColor: "#BDBDBD" }}
              value={groupDesc}
              onChange={e => setGroupDesc(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="URL do ícone (opcional)"
              className="px-3 py-2 border rounded"
              style={{ borderColor: "#BDBDBD" }}
              value={iconUrl}
              onChange={e => setIconUrl(e.target.value)}
            />
            <input
              type="url"
              placeholder="URL do fundo/capa (opcional)"
              className="px-3 py-2 border rounded"
              style={{ borderColor: "#BDBDBD" }}
              value={coverUrl}
              onChange={e => setCoverUrl(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="flex-1 px-3 py-2 rounded bg-gray-200 text-gray-700"
                onClick={() => setShowGroupModal(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-3 py-2 rounded bg-[#388E3C] text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar"}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Lista de grupos ecológicos */}
      <ul className="mb-2 flex flex-col">
        {groups.map((group, idx) => (
          <li
            key={group.id || idx}
            className="group w-full px-2 py-2.5 rounded font-semibold text-[#388E3C] bg-white hover:bg-[#D5F7D2] transition-colors duration-200 cursor-pointer text-sm flex items-center gap-2"
            onClick={() => onSelectGroup && onSelectGroup(group)}
          >
            {group.iconUrl && (
              <img src={group.iconUrl} alt="Ícone" className="w-6 h-6 rounded-full border border-[#388E3C]" />
            )}
            <span className="text-lg">#</span>
            <span className="flex-1 ml-1">{group.name}</span>
          </li>
        ))}
      </ul>
      {/* Activities header */}
      <div className="flex items-center justify-between mb-1 px-2 py-2 rounded font-semibold text-[#212121] text-base select-none">
        <span>Activities</span>
        <button
          className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 border-2 border-green-700 text-green-700 shadow hover:bg-green-200 hover:border-green-800 transition relative"
          title="Adicionar nova hashtag pessoal (atividade)"
          onClick={() => setShowActivityModal(true)}
          type="button"
          aria-label="Adicionar nova hashtag pessoal"
        >
          +
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition">
            Nova Atividade
          </span>
        </button>
      </div>
      {/* Modal de criação de atividade (apenas campo simples) */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <form
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col gap-3 border"
            style={{ borderColor: "#BDBDBD" }}
            onSubmit={handleActivitySubmit}
          >
            <h3 className="font-bold text-lg mb-2" style={{ color: "#2E7D32" }}>Nova Atividade</h3>
            <input
              type="text"
              placeholder="Hashtag da atividade (sem #)"
              className="px-3 py-2 border rounded"
              style={{ borderColor: "#BDBDBD", color: "#000" }}
              value={activityName}
              onChange={e => setActivityName(e.target.value)}
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="flex-1 px-3 py-2 rounded bg-gray-200 text-gray-700"
                onClick={() => setShowActivityModal(false)}
                disabled={activityLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-3 py-2 rounded bg-[#388E3C] font-semibold"
                style={{ color: "#000" }}
                disabled={activityLoading}
              >
                {activityLoading ? "Criando..." : "Criar"}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Atividades do usuário */}
      <ul className="mb-1 flex flex-col">
        {activities.slice(0, 3).map((act, idx) => (
          <li
            key={idx}
            className="group w-full px-2 py-2.5 rounded font-semibold text-[#388E3C] bg-white hover:bg-[#D5F7D2] transition-colors duration-200 cursor-pointer text-sm flex items-center"
            onClick={() => onSelectActivity && onSelectActivity(act)}
          >
            <span className="text-lg">#</span>
            <span className="flex-1 ml-1">{act}</span>
          </li>
        ))}
      </ul>
      {/* Mensagem de orientação */}
      <div className="text-xs text-[#388E3C] mb-2">
        <b>Dica:</b> Grupos e atividades são diferentes.<br />
        Use "+" em <b>Groups</b> para grupos e "+" em <b>Activities</b> para hashtags/atividades.
      </div>
      {/* Nenhum outro item de menu */}
    </aside>
  );
};

export default Sidebar;
