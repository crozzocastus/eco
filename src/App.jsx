import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar'
import DailyGoals from './components/DailyGoals'
import LevelProgress from './components/LevelProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EditProfile from './components/EditProfile'
import ProfilePage from './components/ProfilePage'
import ScrollToTopButton from './components/ScrollToTopButton'
import CreatePost from './components/CreatePost'
import GroupsPage from './components/GroupsPage'
import ActivitiesPage from './components/ActivitiesPage'

const ECO_EMOJIS = [
  { label: "Like", emoji: "❤️" },
  { label: "Thumbs Up", emoji: "👍" },
  { label: "Tree", emoji: "🌳" },
  { label: "Leaf", emoji: "🍃" },
  { label: "Recycle", emoji: "♻️" },
  { label: "Sun", emoji: "🌞" },
];

// Função utilitária para gerar um ícone aleatório para grupo (usando DiceBear estilo 'shapes', SVG)
function getRandomGroupIcon() {
  // Usa DiceBear 'shapes' para ícones mais modernos e coloridos
  const seed = Math.random().toString(36).substring(2, 10);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
}

// Função utilitária para gerar uma imagem de capa aleatória (usando Lorem Picsum)
function getRandomGroupCover() {
  // Usa Lorem Picsum para uma imagem de natureza aleatória
  return `https://picsum.photos/seed/${Math.floor(Math.random() * 10000)}/600/200`;
}

function App() {
  const [page, setPage] = useState('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [user, setUser] = useState({
    name: "User",
    role: "Reciclador",
    joinedAt: "2023-01-10",
    avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  })
  const [userPosts, setUserPosts] = useState([
    {
      user: "User",
      description: "Meu primeiro post! #Reciclagem #Plantio #Compostagem",
      mediaUrl: "",
      activities: ["Reciclagem", "Plantio", "Compostagem"],
      groups: ["Grupo 1"],
      userRole: "Reciclador",
      userJoinedAt: "2023-01-10",
      userAvatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
      likes: randomLikes(),
    },
    {
      user: "User",
      description: "Outro post! #Plantio #Limpeza #Reutilização",
      mediaUrl: "",
      activities: ["Plantio", "Limpeza", "Reutilização"],
      groups: ["Grupo 2"],
      userRole: "Reciclador",
      userJoinedAt: "2023-01-10",
      userAvatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
      likes: randomLikes(),
    }
  ]);
  const [userGroups, setUserGroups] = useState([]);
  const [activities, setActivities] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/groups')
        .then(res => res.json())
        .then(setUserGroups)
        .catch(() => setUserGroups([]));
      fetch('/api/activities')
        .then(res => res.json())
        .then(setActivities)
        .catch(() => setActivities([]));
      fetch('/api/blogs')
        .then(res => res.json())
        .then(data => {
          setBlogs(data);
          // Filtra posts do usuário autenticado
          setUserPosts(data.filter(post => post.username === user.username));
          setHomePosts(data);
        })
        .catch(() => {
          setBlogs([]);
          setUserPosts([]);
          setHomePosts([]);
        });
    }
  // Adicione user.username como dependência para garantir atualização correta ao logar
  }, [isAuthenticated, user.username]);

  // Estado para hashtags personalizadas do usuário
  const [customActivities, setCustomActivities] = useState([]);

  // Estado para grupo selecionado na página de grupos
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Não é mais necessário efeito para mouse/cursor
  }, []);

  // Função utilitária para gerar contagens aleatórias de curtidas por emoji
  function randomLikes() {
    const likes = {};
    ECO_EMOJIS.forEach(e => {
      likes[e.emoji] = Math.floor(Math.random() * 20);
    });
    return likes;
  }

  // Publicações fictícias para a Home
  const [homePosts, setHomePosts] = useState([
    {
      user: "Alice",
      mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      description: "Plantando árvores é uma das melhores formas de ajudar o planeta! #Plantio #Reflorestamento",
      activities: ["Plantio", "Reflorestamento"],
      userRole: "Reflorestadora",
      userJoinedAt: "2022-09-15",
      userAvatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      likes: randomLikes(),
    },
    {
      user: "Bob",
      mediaUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      description: "Você sabia que reciclar ajuda a reduzir a poluição? #Reciclagem #EducaçãoAmbiental",
      activities: ["Reciclagem", "Educação Ambiental"],
      userRole: "Coletor",
      userJoinedAt: "2023-03-21",
      userAvatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      likes: randomLikes(),
    },
    {
      user: "Carol",
      mediaUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      description: "Junte-se à nossa limpeza de praia neste fim de semana! 🌊 #Limpeza #Voluntariado",
      activities: ["Limpeza", "Voluntariado"],
      userRole: "Voluntária",
      userJoinedAt: "2022-12-05",
      userAvatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      likes: randomLikes(),
    },
    {
      user: "David",
      mediaUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
      description: "Trocar sacolas plásticas por reutilizáveis faz muita diferença. #Reutilização #ConsumoConsciente",
      activities: ["Reutilização", "Consumo Consciente"],
      userRole: "Educador Ambiental",
      userJoinedAt: "2021-07-30",
      userAvatarUrl: "https://randomuser.me/api/portraits/men/44.jpg",
      likes: randomLikes(),
    },
  ]);

  // Estado para atividade filtrada
  const [filteredActivity, setFilteredActivity] = useState(null);

  // Autenticação real via API
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(u => ({
      ...u,
      username: userData.username, // <-- Adicione esta linha
      name: userData.username || userData.name || "User",
      role: userData.role || "Reciclador",
      email: userData.email || "",
    }));
    setPage('home');
  };

  // Registro real via API
  const handleSignUp = (userData) => {
    setIsAuthenticated(true);
    setUser(u => ({
      ...u,
      username: userData.username, // <-- Adicione esta linha
      name: userData.username || userData.name || "User",
      role: userData.role || "Reciclador",
      email: userData.email || "",
    }));
    setPage('home');
  };

  const handleProfileSave = (data) => {
    setUser({ ...user, ...data })
    setShowEditProfile(false)
  }

  const handleAvatarUpload = (avatarUrl) => {
    setUser({ ...user, avatarUrl });
    // Atualiza avatar nos posts do usuário
    setUserPosts(posts =>
      posts.map(post => ({ ...post, userAvatarUrl: avatarUrl }))
    );
  };

  // Atualize o handler para navegação
  const handleNav = (target) => {
    if (target === 'activities') setPage('activities');
    else if (target === 'groups') {
      setSelectedGroup(null); // <-- Sempre limpa seleção ao clicar em Groups
      setPage('groups');
    }
    else setPage('home');
  };

  // Função para adicionar novo post/blog
  const handleCreatePost = async ({ text }) => {
    // Extrai hashtags como atividades
    const activitiesFromText = (text.match(/#(\w+[\wÀ-ÿ]*)/g) || []).map(tag => tag.replace('#', ''));
    if (!activitiesFromText.length) {
      alert("Adicione pelo menos uma hashtag (#) na descrição para definir a atividade do post.");
      return;
    }

    // Garante que cada hashtag está registrada como activity no backend
    for (const act of activitiesFromText) {
      if (!activities.some(a => a.title?.toLowerCase() === act.toLowerCase())) {
        try {
          await fetch('/api/activities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: act, description: "" }),
          });
        } catch {}
      }
    }
    // Atualiza lista de activities após possíveis criações
    fetch('/api/activities')
      .then(res => res.json())
      .then(setActivities)
      .catch(() => {});

    const newPost = {
      user: user.name,
      username: user.username,
      description: text,
      mediaUrl: '',
      activities: activitiesFromText,
      groups: [],
      userRole: user.role,
      userJoinedAt: user.joinedAt,
      userAvatarUrl: user.avatarUrl,
      likes: randomLikes(),
    };
    try {
      const resp = await fetch('/api/blogs', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        // Atualize todos os feeds a partir do backend para garantir consistência
        fetch('/api/blogs')
          .then(res => res.json())
          .then(data => {
            setBlogs(data);
            setUserPosts(data.filter(post => post.username === user.username));
            setHomePosts(data);
          });
        setShowCreatePost(false);
      } else {
        alert(data.error || "Erro ao criar post");
      }
    } catch {
      alert("Erro de conexão com o servidor");
    }
  };

  // Função utilitária para extrair as 3 principais atividades do usuário + customizadas
  function getTopUserActivities() {
    const freq = {};
    userPosts.forEach(post => {
      (post.activities || []).forEach(act => {
        freq[act] = (freq[act] || 0) + 1;
      });
    });
    // Adiciona customActivities ao topo
    customActivities.forEach(act => {
      freq[act] = (freq[act] || 0) + 1000; // Garante que customizadas aparecem primeiro
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([act]) => act);
  }

  const handleAddActivity = () => {
    const newActivity = prompt('Digite o nome da nova hashtag (sem #):');
    if (newActivity) {
      // Evita duplicidade
      setCustomActivities(prev => prev.includes(newActivity) ? prev : [newActivity, ...prev]);
    }
  };

  // Função para selecionar atividade
  const handleSelectActivity = (activity) => {
    setFilteredActivity(activity);
    setPage('home'); // Garante que está na home ao filtrar
  };

  // Função para adicionar novo grupo
  const handleCreateGroup = async (groupData) => {
    // groupData: { name, description, iconUrl, coverUrl }
    const { name, description, iconUrl, coverUrl } = groupData || {};
    if (!name) return;
    try {
      const resp = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          iconUrl,
          coverUrl,
          creator: user.username
        }),
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        setUserGroups(groups => [...groups, data.group]);
      } else {
        alert(data.error || "Erro ao criar grupo");
      }
    } catch {
      alert("Erro de conexão com o servidor");
    }
  };

  // Função para criar nova atividade
  const handleCreateActivity = async () => {
    const title = prompt('Nome da nova atividade:');
    if (!title) return;
    const description = prompt('Descrição da atividade:') || '';
    try {
      const resp = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        setActivities(acts => [...acts, data.activity]);
      } else {
        alert(data.error || "Erro ao criar atividade");
      }
    } catch {
      alert("Erro de conexão com o servidor");
    }
  };

  // Handler para clicar em grupo na sidebar
  const handleSidebarGroupClick = (group) => {
    setPage('groups');
    setSelectedGroup(group);
  };

  // Handler de logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage('login');
    // Opcional: limpar user, posts, etc.
  };

  // Handler para deletar conta
  const handleDeleteAccount = () => {
    handleLogout();
    // Opcional: limpar outros estados se necessário
  };

  if (!isAuthenticated) {
    if (page === 'login') {
      return (
        <LoginPage
          onLogin={handleLogin}
          onGoToSignUp={() => setPage('signup')}
        />
      )
    }
    if (page === 'signup') {
      return (
        <SignUpPage
          onSignUp={handleSignUp}
          onGoToLogin={() => setPage('login')}
        />
      )
    }
  }

  if (showEditProfile) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col">
        <Navbar
          user={user}
          onProfileClick={() => setShowEditProfile(false)}
          onMyBlog={() => setPage('myblog')}
          onHome={handleNav}
          onLogout={handleLogout}
        />
        <ScrollToTopButton />
        <div className="flex w-full flex-1">
          <Sidebar activities={getTopUserActivities()} onAddActivity={handleAddActivity} onSelectActivity={handleSelectActivity} />
          <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
            <EditProfile user={user} onSave={handleProfileSave} onDeleteAccount={handleDeleteAccount} />
          </main>
          <aside className="w-full md:w-80 flex flex-col gap-4">
            <DailyGoals goals={['Goal 1', 'Goal 2']} progress={60} />
            <LevelProgress level={2} progress={60} />
          </aside>
        </div>
        <Footer />
      </div>
    )
  }

  // Wrapper para manter sidebar e aside fixos em todas as páginas do dashboard
  const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        user={user}
        onProfileClick={() => setShowEditProfile(true)}
        onMyBlog={() => setPage('myblog')}
        onHome={handleNav}
        onLogout={handleLogout}
      />
      <ScrollToTopButton />
      <div className="flex w-full flex-1">
        <Sidebar
          activities={getTopUserActivities()}
          onAddActivity={handleAddActivity}
          onSelectActivity={handleSelectActivity}
          onCreateGroup={handleCreateGroup}
          groups={userGroups}
          onSelectGroup={handleSidebarGroupClick}
        />
        <main className="flex-1 flex flex-col items-center justify-start p-2 sm:p-6 bg-gray-50 relative">
          {/* Botão de adicionar post agora fixo no canto inferior direito, quadrado */}
          <button
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-xl bg-green-100 border-4 border-green-700 text-green-700 shadow-lg hover:bg-green-200 hover:border-green-800 transition"
            title="Adicionar novo blog"
            onClick={() => setShowCreatePost(true)}
            aria-label="Adicionar novo blog"
            type="button"
            style={{ aspectRatio: "1 / 1", padding: 0 }}
          >
            <img src="/icons/add-icon.png" alt="Adicionar" className="w-10 h-10" />
          </button>
          {/* Modal de criação de post */}
          {showCreatePost && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="relative w-full max-w-lg mx-auto">
                <button
                  className="absolute top-2 right-2 text-gray-600 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                  onClick={() => setShowCreatePost(false)}
                  aria-label="Fechar"
                  type="button"
                >
                  ×
                </button>
                <CreatePost onCreate={handleCreatePost} />
              </div>
            </div>
          )}
          {children}
        </main>
        <aside className="w-full md:w-80 flex flex-col gap-4">
          <DailyGoals goals={['Goal 1', 'Goal 2']} progress={60} />
          <LevelProgress level={2} progress={60} />
        </aside>
      </div>
      <Footer />
    </div>
  );

  if (page === 'myblog') {
    return (
      <DashboardLayout>
        <ProfilePage
          user={user}
          posts={userPosts}
          groups={userGroups}
          onEditProfile={() => setShowEditProfile(true)}
        />
      </DashboardLayout>
    )
  }

  if (page === 'activities') {
    return (
      <DashboardLayout>
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#2E7D32" }}>Activities</h2>
          <button
            className="mb-4 px-3 py-1 rounded bg-[#388E3C] text-white text-sm"
            onClick={handleCreateActivity}
            type="button"
          >
            + Nova Atividade
          </button>
          {/* Sempre exibe todas as atividades do backend */}
          <ActivitiesPage activities={activities} />
        </div>
      </DashboardLayout>
    )
  }

  if (page === 'groups') {
    return (
      <DashboardLayout>
        <GroupsPage groups={userGroups} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
      </DashboardLayout>
    )
  }

  // Página inicial (Home)
  return (
    <DashboardLayout>
      {filteredActivity && (
        <div className="w-full max-w-2xl mx-auto mb-4 flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-[#D5F7D2] text-[#2E7D32] font-semibold text-sm">
            Filtrando por: <span className="font-bold">#{filteredActivity}</span>
          </span>
          <button
            className="ml-2 px-2 py-1 rounded bg-[#388E3C] text-white text-xs hover:bg-[#2E7D32]"
            onClick={() => setFilteredActivity(null)}
            type="button"
          >
            Limpar filtro
          </button>
        </div>
      )}
      <Feed
        posts={filteredActivity
          ? homePosts.filter(post => (post.activities || []).includes(filteredActivity))
          : homePosts}
        currentUser={user.name}
        onSelectActivity={handleSelectActivity}
      />
    </DashboardLayout>
  )
}

export default App