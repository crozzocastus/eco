import React, { useState, useRef } from "react";

const ECO_ROLES = [
  "Reciclador",
  "Coletor",
  "Reflorestador",
  "Educador Ambiental",
  "Voluntário",
  "Pesquisador",
  "Mobilizador",
  "Compostador",
  "Guardião das Águas",
  "Agrofloresteiro",
  "Outro"
];

const EditProfile = ({ user = {}, onSave, onDeleteAccount }) => {
  const [name, setName] = useState(user.name || "");
  const [description, setDescription] = useState(user.description || "");
  const [role, setRole] = useState(user.role || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const fileInputRef = useRef();

  const handleAvatarChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = ev => setAvatarUrl(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-2" style={{ color: "#000" }}>Edit Profile</h2>
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-[#388E3C] flex items-center justify-center relative">
          {avatarUrl
            ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            : <span className="text-[#2E7D32] font-bold text-3xl">{name?.[0] || "U"}</span>
          }
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-[#388E3C] text-white rounded-full p-1 border border-white shadow"
            style={{ fontSize: 14 }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            title="Trocar avatar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        style={{ borderColor: "#000", color: "#000" }}
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        style={{ borderColor: "#000", color: "#000" }}
      >
        <option value="" disabled>
          Selecione seu papel ecológico
        </option>
        {ECO_ROLES.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        style={{ borderColor: "#000", color: "#000" }}
      />
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded border border-black border-solid"
        style={{ color: "#fff", backgroundColor: "#4CAF50" }}
        onClick={() => onSave && onSave({ name, description, role, avatarUrl })}
      >
        Save
      </button>
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded border border-black border-solid"
        style={{ color: "#fff", backgroundColor: "#a83246", margin: "10px" }}
        onClick={async () => {
          try {
            const response = await fetch("/api/delete-account", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ username: user.username }) 
            });

            const result = await response.json();
            if (result.success) {
              alert("Account deleted.");
              if (onDeleteAccount) onDeleteAccount();
            } else {
              alert("Failed to delete account: " + result.error);
            }
          } catch (err) {
            console.error(err);
            alert("Error deleting account.");
          }
        }}
      >
      Delete Account
      </button>

    </form>
  );
};

export default EditProfile;
