import React, { useState, useRef } from "react";
import Logo from "./Logo";

const LEVELS = [
  { level: 1, medal: "/icons/1medal.png" },
  { level: 2, medal: "/icons/2medal.png" },
  { level: 3, medal: "/icons/3medal.png" },
  { level: 4, medal: "/icons/4medal.png" },
  { level: 5, medal: "/icons/5medal.png" },
];

const Navbar = ({ onProfileClick, user, onMyBlog, onHome, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Fecha o menu ao clicar fora
  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const userLevel = user?.level || 1;
  const medalSrc = LEVELS.find(l => l.level === userLevel)?.medal || LEVELS[0].medal;

  return (
    <nav className="pl-12 pr-6 py-3 flex justify-between items-center shadow" style={{ backgroundColor: "#D5F7D2", color: "#4B8663" }}>
      <div className="flex items-center">
        <Logo size="small" className="mr-6" />
        <span className="font-bold text-xl">EcoApp</span>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="space-x-6">
          <a
            href="/"
            style={{ color: "#4B8663" }}
            className="hover:underline hover:text-[#81C784]"
            onClick={e => { e.preventDefault(); onHome && onHome(); }}
          >
            Home
          </a>
          <a
            href="/profile"
            style={{ color: "#4B8663" }}
            className="hover:underline hover:text-[#81C784]"
            onClick={e => { e.preventDefault(); onMyBlog && onMyBlog(); }}
          >
            My Blog
          </a>
          <a
            href="/activities"
            style={{ color: "#4B8663" }}
            className="hover:underline hover:text-[#81C784]"
            onClick={e => { e.preventDefault(); onHome && onHome('activities'); }}
          >
            Activities
          </a>
          <a
            href="/groups"
            style={{ color: "#4B8663" }}
            className="hover:underline hover:text-[#81C784]"
            onClick={e => { e.preventDefault(); onHome && onHome('groups'); }}
          >
            Groups
          </a>
        </div>
      </div>
      <div className="flex items-center ml-4 relative" ref={menuRef}>
        {/* Notificação ao lado do avatar */}
        <img
          src="/icons/notif-icon.png"
          alt="Notificações"
          className="w-3.5 h-3.5 mr-2"
          style={{ display: "inline-block" }}
        />
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="focus:outline-none"
          title="Menu do usuário"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-[#388E3C] flex items-center justify-center relative">
            {user?.avatarUrl
              ? <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              : <span className="text-[#2E7D32] font-bold text-lg">{user?.name?.[0] || "U"}</span>
            }
            {/* Medalha do nível */}
            <img
              src={medalSrc}
              alt={`Medalha nível ${userLevel}`}
              className="absolute left-[-8px] bottom-[-8px] w-6 h-6 border-2 border-white rounded-full shadow"
              style={{
                background: "#fff",
                zIndex: 2,
              }}
            />
          </div>
        </button>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 14px)", // espaço entre ícone e menu
              left: "50%",
              transform: "translateX(-50%)",
              minWidth: 180,
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* Triângulo apontando para o avatar */}
            <div
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "10px solid #fff",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))",
                zIndex: 51,
              }}
            />
            <div
              className="bg-white rounded-xl shadow-lg border flex flex-col py-3 px-2"
              style={{
                borderColor: "#E0E0E0",
                boxShadow: "0 8px 24px 0 rgba(44,62,80,0.10), 0 1.5px 4px 0 rgba(44,62,80,0.08)",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 8,
                paddingRight: 8,
                minWidth: 180,
              }}
            >
              <button
                className="px-4 py-2 text-left rounded-lg hover:bg-[#D5F7D2] text-[#212121] transition-colors"
                onClick={() => { setMenuOpen(false); onProfileClick && onProfileClick(); }}
                type="button"
                style={{ fontWeight: 500, fontSize: 15 }}
              >
                Editar Perfil
              </button>
              <button
                className="px-4 py-2 text-left rounded-lg hover:bg-[#D5F7D2] text-[#212121] transition-colors"
                onClick={() => { setMenuOpen(false); onLogout && onLogout(); }}
                type="button"
                style={{ fontWeight: 500, fontSize: 15 }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
