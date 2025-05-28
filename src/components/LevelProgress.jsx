import React from "react";

const LEVELS = [
  { level: 1, title: "Consciente Verde", medal: "🥉 Papel" },
  { level: 2, title: "Separador de Lixo", medal: "📄 Cartão" },
  { level: 3, title: "Reciclador", medal: "🥉 Bronze" },
  { level: 4, title: "Eco-Ativista", medal: "🥈 Prata" },
  { level: 5, title: "Mestre Ecológico", medal: "🥇 Ouro" },
];

const LevelProgress = ({ level = 1, progress = 0 }) => {
  const current = LEVELS.find(l => l.level === level);
  const medalImg = `/icons/${level}medal.png`;

  return (
    <section
      className="rounded p-4 mb-4 border"
      style={{ backgroundColor: "#D5F7D2", borderColor: "#000" }}
    >
      <h3 className="font-bold mb-2" style={{ color: "#2E7D32" }}>
        Level {level}
      </h3>
      {current && (
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold text-[#212121]">{current.title}</span>
          <img src={medalImg} alt={`Medalha nível ${level}`} className="h-8 w-8 inline-block" style={{ verticalAlign: 'middle' }} />
        </div>
      )}
      <div className="w-full bg-gray-300 rounded h-3 mb-1">
        <div
          className="h-3 rounded"
          style={{ width: `${progress}%`, backgroundColor: "#66BB6A" }}
        />
      </div>
      <span className="text-xs" style={{ color: "#212121" }}>
        {progress}% completed
      </span>
    </section>
  );
};

export default LevelProgress;
