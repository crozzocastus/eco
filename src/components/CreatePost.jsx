import React, { useState } from "react";
import ActivityTag from "./ActivityTag";
import GroupTag from "./GroupTag";

const CreatePost = ({ onCreate }) => {
  const [text, setText] = useState("");
  // Extrai hashtags do texto da descrição
  const hashtags = (text.match(/#(\w+[\wÀ-ÿ]*)/g) || []).map(tag => tag.replace('#', ''));

  return (
    <form className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-4 border" style={{ borderColor: "#BDBDBD" }}>
      <h2 className="text-xl font-bold mb-2" style={{ color: "#2E7D32" }}>Create Post</h2>
      <textarea
        placeholder="What do you want to share?"
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full px-3 py-2 border rounded text-[#212121] bg-[#F0F0F0]"
        style={{ borderColor: "#BDBDBD" }}
      />
      {/* Exibe hashtags extraídas da descrição */}
      <div className="flex gap-2 flex-wrap">
        {hashtags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-[#66BB6A] text-white px-2 py-1 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="px-4 py-2 rounded font-semibold"
        style={{ backgroundColor: "#66BB6A", color: "#fff" }}
        onClick={() => onCreate && onCreate({ text })}
      >
        Publish
      </button>
    </form>
  );
};

export default CreatePost;
