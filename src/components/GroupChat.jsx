import React, { useState } from "react";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    if (msg.trim()) {
      setMessages([...messages, { text: msg }]);
      setMsg("");
    }
  };

  return (
    <div className="bg-gray-100 rounded p-4 flex flex-col h-64">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((m, idx) => (
          <div key={idx} className="mb-1 text-sm bg-white rounded px-2 py-1">{m.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          className="flex-1 px-2 py-1 rounded border"
          placeholder="Digite uma mensagem..."
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default GroupChat;
