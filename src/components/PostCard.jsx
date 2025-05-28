import React, { useState, useRef } from "react";

const ECO_EMOJIS = [
  { label: "Like", emoji: "❤️" },
  { label: "Thumbs Up", emoji: "👍" },
  { label: "Tree", emoji: "🌳" },
  { label: "Leaf", emoji: "🍃" },
  { label: "Recycle", emoji: "♻️" },
  { label: "Sun", emoji: "🌞" },
];

const PostCard = ({
  user,
  mediaUrl,
  description,
  onLike,
  onComment,
  userRole,
  userJoinedAt,
  userAvatarUrl,
  likes: likesProp,
  setLikes: setLikesProp,
  currentUser,
  activities = [],
  onSelectActivity,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(ECO_EMOJIS[0].emoji);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emojiBarActive, setEmojiBarActive] = useState(false);
  const [likes, setLikes] = useState(likesProp || ECO_EMOJIS.reduce((acc, e) => { acc[e.emoji] = 0; return acc; }, {}));
  const holdTimeout = useRef();
  const [explodingEmojis, setExplodingEmojis] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const commentInputRef = useRef();

  // Novo estado: emoji curtido pelo usuário (null se não curtiu ainda)
  const [userLikedEmoji, setUserLikedEmoji] = useState(null);

  // Show emoji bar on long press
  const handleMainEmojiMouseDown = (e) => {
    if (userLikedEmoji) return;
    holdTimeout.current = setTimeout(() => {
      setShowEmojis(true);
      setEmojiBarActive(true);
    }, 350);
  };

  // Clique simples: curte ou descurte
  const handleMainEmojiMouseUp = (e) => {
    clearTimeout(holdTimeout.current);
    if (!showEmojis) {
      if (userLikedEmoji) {
        // Desfaz o like
        setLikes(prev => ({
          ...prev,
          [userLikedEmoji]: Math.max((prev[userLikedEmoji] || 1) - 1, 0)
        }));
        if (setLikesProp) setLikesProp(prev => ({
          ...prev,
          [userLikedEmoji]: Math.max((prev[userLikedEmoji] || 1) - 1, 0)
        }));
        setUserLikedEmoji(null);
        setSelectedEmoji(ECO_EMOJIS[0].emoji);
        if (onLike) onLike(null);
      } else {
        handleEmojiSelect(selectedEmoji);
      }
    }
  };

  const handleMainEmojiMouseLeave = () => {
    clearTimeout(holdTimeout.current);
  };

  // Permite curtir apenas uma vez, mas pode escolher o emoji na primeira vez
  const handleEmojiSelect = (emoji) => {
    if (userLikedEmoji) return;
    setSelectedEmoji(emoji);
    setShowEmojis(false);
    setEmojiBarActive(false);
    setUserLikedEmoji(emoji);
    setLikes(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    if (setLikesProp) setLikesProp(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    if (onLike) onLike(emoji);
    // Efeito de explosão de emojis
    const burst = Array.from({ length: 12 }, () => {
      const e = ECO_EMOJIS[Math.floor(Math.random() * ECO_EMOJIS.length)].emoji;
      const angle = Math.random() * 2 * Math.PI;
      const distance = 60 + Math.random() * 30;
      return {
        emoji: e,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        id: Math.random().toString(36).slice(2) + Date.now(),
      };
    });
    setExplodingEmojis(burst);
    setTimeout(() => setExplodingEmojis([]), 700);
  };

  const handleCloseEmojiBar = () => {
    setShowEmojis(false);
    setEmojiBarActive(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, user: currentUser || "User" }]);
      setNewComment("");
    }
  };

  // Função para transformar hashtags em botões clicáveis
  function renderDescriptionWithHashtags(text) {
    if (!text) return null;
    // Regex para encontrar hashtags (ex: #Reciclagem)
    const regex = /(#\w+[\wÀ-ÿ]*)/g;
    const parts = text.split(regex);
    return parts.map((part, idx) => {
      if (regex.test(part)) {
        const tag = part.replace('#', '');
        return (
          <button
            key={idx}
            className="text-[#2E7D32] font-bold hover:underline hover:text-[#388E3C] focus:outline-none"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            onClick={() => onSelectActivity && onSelectActivity(tag)}
            type="button"
          >
            {part}
          </button>
        );
      }
      return part;
    });
  }

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2 border max-w-full sm:max-w-md mx-auto w-full sm:p-6 sm:gap-4" style={{ borderColor: "#BDBDBD" }}>
      <div className="flex items-center gap-2 mb-2 flex-wrap sm:flex-nowrap">
        <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          {userAvatarUrl
            ? <img src={userAvatarUrl} alt="Profile" className="w-full h-full object-cover" />
            : <span className="text-[#2E7D32] font-bold text-base sm:text-lg">{user?.[0] || "U"}</span>
          }
        </div>
        <div>
          <span className="font-semibold text-[#212121] text-base sm:text-lg">{user || "User"}</span>
          <div className="text-xs text-[#388E3C]">{userRole || "Eco Role"}</div>
          <div className="text-xs text-gray-500">
            Joined: {userJoinedAt ? new Date(userJoinedAt).toLocaleDateString() : "Unknown"}
          </div>
        </div>
      </div>
      {mediaUrl && (
        <img src={mediaUrl} alt="Post media" className="w-full rounded mb-2 max-h-60 object-cover sm:max-h-80" />
      )}
      <p className="text-[#212121] text-sm sm:text-base break-words">
        {renderDescriptionWithHashtags(description)}
      </p>
      <div className="flex gap-2 mt-2 flex-wrap items-center relative">
        <div
          className={`px-2 py-1 rounded text-lg border transition bg-white border-[#BDBDBD] hover:bg-[#D5F7D2] cursor-pointer select-none min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0`}
          title={userLikedEmoji ? "Clique para desfazer o like" : "Like"}
          style={{ position: "relative", zIndex: 10, overflow: 'visible', opacity: userLikedEmoji ? 0.9 : 1 }}
          onMouseDown={handleMainEmojiMouseDown}
          onMouseUp={handleMainEmojiMouseUp}
          onMouseLeave={handleMainEmojiMouseLeave}
          onTouchStart={handleMainEmojiMouseDown}
          onTouchEnd={handleMainEmojiMouseUp}
        >
          {userLikedEmoji ? userLikedEmoji : selectedEmoji}
          {/* Emojis explodindo */}
          {explodingEmojis.map(({ emoji, x, y, id }) => (
            <span
              key={id}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.5)` ,
                pointerEvents: 'none',
                opacity: 0,
                animation: 'emoji-burst 0.7s linear',
                fontSize: 28,
                zIndex: 100,
              }}
            >
              {emoji}
            </span>
          ))}
          {showEmojis && emojiBarActive && !userLikedEmoji && (
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-12 sm:bottom-10 flex gap-1 sm:gap-2 bg-white border border-[#BDBDBD] rounded-full px-2 sm:px-3 py-2 shadow-lg z-50"
              style={{ minWidth: 0 }}
            >
              {ECO_EMOJIS.map(({ emoji, label }) => (
                <button
                  key={emoji}
                  className={`text-xl sm:text-2xl px-1 py-1 rounded-full transition ${
                    selectedEmoji === emoji ? "ring-2 ring-[#2E7D32]" : ""
                  }`}
                  style={{ background: selectedEmoji === emoji ? "#D5F7D2" : "transparent" }}
                  onClick={e => {
                    e.stopPropagation();
                    handleEmojiSelect(emoji);
                  }}
                  tabIndex={-1}
                  aria-label={label}
                  type="button"
                  disabled={!!userLikedEmoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="hover:underline hover:text-[#2E7D32] text-[#2E7D32] ml-2 text-sm sm:text-base"
          onClick={() => {
            setShowComments((v) => {
              const next = !v;
              setTimeout(() => {
                if (next && commentInputRef.current) commentInputRef.current.focus();
              }, 50);
              return next;
            });
          }}
          type="button"
        >
          Comentários
        </button>
      </div>
      {/* Exibir contagens de curtidas por emoji */}
      <div className="flex gap-2 mt-1 items-center flex-wrap text-base sm:text-lg">
        {ECO_EMOJIS.map(({ emoji }) => (
          <span key={emoji} className="flex items-center">
            {emoji} <span className="ml-1 text-xs sm:text-sm text-[#388E3C]">{likes[emoji] || 0}</span>
          </span>
        ))}
      </div>
      {/* Seção de comentários */}
      {showComments && (
        <div className="mt-3 border-t pt-2">
          <div className="mb-2 flex flex-col sm:flex-row gap-2">
            <input
              ref={commentInputRef}
              className="border rounded px-2 py-1 w-full mb-1 sm:mb-0 text-sm sm:text-base"
              style={{ borderColor: '#000', color: '#000' }}
              placeholder="Write your comment here"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <button
              className="bg-[#2E7D32] text-white px-3 py-1 rounded text-xs sm:text-sm mt-1 sm:mt-0"
              onClick={handleAddComment}
              type="button"
            >
              Comentar
            </button>
          </div>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            {comments.length === 0 && (
              <span className="text-gray-500 text-xs sm:text-sm">Nenhum comentário ainda.</span>
            )}
            {comments.map((c, idx) => (
              <div key={idx} className="bg-gray-100 rounded px-2 py-1 text-xs sm:text-sm" style={{ color: '#000' }}>
                <span className="font-semibold" style={{ color: '#000' }}>{c.user}: </span>{c.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;

/*
@keyframes emoji-burst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1.5);
  }
}
*/
