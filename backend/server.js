import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, 'users.json');
const GROUPS_FILE = path.join(__dirname, 'groups.json');
const ACTIVITIES_FILE = path.join(__dirname, 'activities.json');
const BLOGS_FILE = path.join(__dirname, 'blogs.json');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Ensure users.json and groups.json and activities.json and blogs.json exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]', 'utf-8');
}
if (!fs.existsSync(GROUPS_FILE)) {
  fs.writeFileSync(GROUPS_FILE, '[]', 'utf-8');
}
// Adiciona grupos fictícios se groups.json estiver vazio
const defaultGroups = [
  {
    id: 1,
    name: "Reciclagem Urbana",
    description: "Grupo dedicado à reciclagem em ambientes urbanos.",
    iconUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=reciclagem",
    coverUrl: "https://picsum.photos/seed/reciclagem/600/200",
    creator: "admin",
    participants: ["admin", "crozzo"],
    createdAt: "2025-01-01T10:00:00.000Z"
  },
  {
    id: 2,
    name: "Plantio Comunitário",
    description: "Grupo para organizar mutirões de plantio de árvores.",
    iconUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=plantio",
    coverUrl: "https://picsum.photos/seed/plantio/600/200",
    creator: "crozzo",
    participants: ["crozzo", "rafa"],
    createdAt: "2025-01-02T10:00:00.000Z"
  },
  {
    id: 3,
    name: "Limpeza de Praias",
    description: "Grupo focado em ações de limpeza de praias e rios.",
    iconUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=limpeza",
    coverUrl: "https://picsum.photos/seed/limpeza/600/200",
    creator: "rafa",
    participants: ["rafa", "spinn"],
    createdAt: "2025-01-03T10:00:00.000Z"
  }
];
if (!fs.existsSync(GROUPS_FILE) || fs.readFileSync(GROUPS_FILE, "utf-8").trim() === "[]") {
  fs.writeFileSync(GROUPS_FILE, JSON.stringify(defaultGroups, null, 2), "utf-8");
}
if (!fs.existsSync(ACTIVITIES_FILE)) {
  fs.writeFileSync(ACTIVITIES_FILE, '[]', 'utf-8');
}
if (!fs.existsSync(BLOGS_FILE)) {
  fs.writeFileSync(BLOGS_FILE, '[]', 'utf-8');
}

// --- USERS ---

// GET users
app.get('/api/users', (req, res) => {
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);
  res.json(users);
});

// Register user
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ success: false, error: 'Username already exists' });
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    email: email || "",
    role: "Reciclador",
    joinedAt: new Date().toISOString()
  };

  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ success: true, user: newUser });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const { password, ...userSafe } = user;
    res.json({ success: true, user: userSafe });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Update user
app.put('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const updates = req.body;
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  let users = JSON.parse(data);

  const idx = users.findIndex(u => u.username === username);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  users[idx] = { ...users[idx], ...updates };
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  res.json({ success: true, user: users[idx] });
});

// DELETE account
app.delete('/api/delete-account', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, error: "Username is required" });
  }

  const data = fs.readFileSync(USERS_FILE, "utf-8");
  let users = JSON.parse(data);

  const initialLength = users.length;
  users = users.filter(u => u.username !== username);

  if (users.length === initialLength) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  return res.json({ success: true, message: "Account deleted" });
});

// --- GROUPS ---

// GET all groups
app.get('/api/groups', (req, res) => {
  const data = fs.readFileSync(GROUPS_FILE, "utf-8");
  const groups = JSON.parse(data);
  res.json(groups);
});

// Create group
app.post('/api/groups', (req, res) => {
  const { name, description, creator, iconUrl, coverUrl } = req.body;
  if (!name || !creator) {
    return res.status(400).json({ success: false, error: "Name and creator required" });
  }
  const data = fs.readFileSync(GROUPS_FILE, "utf-8");
  const groups = JSON.parse(data);

  if (groups.find(g => g.name === name)) {
    return res.status(409).json({ success: false, error: "Group already exists" });
  }

  const newGroup = {
    id: Date.now(),
    name,
    description: description || "",
    iconUrl: iconUrl || "",
    coverUrl: coverUrl || "",
    creator,
    participants: [creator],
    createdAt: new Date().toISOString()
  };
  groups.push(newGroup);
  fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), "utf-8");
  res.json({ success: true, group: newGroup });
});

// Update group
app.put('/api/groups/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const data = fs.readFileSync(GROUPS_FILE, "utf-8");
  let groups = JSON.parse(data);

  const idx = groups.findIndex(g => String(g.id) === String(id));
  if (idx === -1) {
    return res.status(404).json({ success: false, error: "Group not found" });
  }
  groups[idx] = { ...groups[idx], ...updates };
  fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), "utf-8");
  res.json({ success: true, group: groups[idx] });
});

// Delete group
app.delete('/api/groups/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(GROUPS_FILE, "utf-8");
  let groups = JSON.parse(data);

  const initialLength = groups.length;
  groups = groups.filter(g => String(g.id) !== String(id));

  if (groups.length === initialLength) {
    return res.status(404).json({ success: false, error: "Group not found" });
  }

  fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), "utf-8");
  res.json({ success: true, message: "Group deleted" });
});

// Add user to group
app.post('/api/groups/:id/add-user', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  if (!username) return res.status(400).json({ success: false, error: "Username required" });

  const data = fs.readFileSync(GROUPS_FILE, "utf-8");
  let groups = JSON.parse(data);

  const idx = groups.findIndex(g => String(g.id) === String(id));
  if (idx === -1) return res.status(404).json({ success: false, error: "Group not found" });

  if (!groups[idx].participants.includes(username)) {
    groups[idx].participants.push(username);
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), "utf-8");
  }
  res.json({ success: true, group: groups[idx] });
});

// Remove user from group
app.post('/api/groups/:id/remove-user', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  if (!username) return res.status(400).json({ success: false, error: "Username required" });

  const data = fs.readFileSync(GROUPS_FILE, "utf-8");
  let groups = JSON.parse(data);

  const idx = groups.findIndex(g => String(g.id) === String(id));
  if (idx === -1) return res.status(404).json({ success: false, error: "Group not found" });

  groups[idx].participants = groups[idx].participants.filter(u => u !== username);
  fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), "utf-8");
  res.json({ success: true, group: groups[idx] });
});

// --- ACTIVITIES ---

// GET all activities
app.get('/api/activities', (req, res) => {
  const data = fs.readFileSync(ACTIVITIES_FILE, "utf-8");
  const activities = JSON.parse(data);
  res.json(activities);
});

// Create activity
app.post('/api/activities', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: "Title required" });
  }
  const data = fs.readFileSync(ACTIVITIES_FILE, "utf-8");
  const activities = JSON.parse(data);

  // Checagem case-insensitive
  if (activities.find(a => a.title?.toLowerCase() === title.toLowerCase())) {
    return res.status(409).json({ success: false, error: "Activity already exists" });
  }

  const newActivity = {
    id: Date.now(),
    title,
    description: description || "",
    participants: 0,
    posts: 0,
    createdAt: new Date().toISOString()
  };
  activities.push(newActivity);
  fs.writeFileSync(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");
  res.json({ success: true, activity: newActivity });
});

// Update activity
app.put('/api/activities/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const data = fs.readFileSync(ACTIVITIES_FILE, "utf-8");
  let activities = JSON.parse(data);

  const idx = activities.findIndex(a => String(a.id) === String(id));
  if (idx === -1) {
    return res.status(404).json({ success: false, error: "Activity not found" });
  }
  activities[idx] = { ...activities[idx], ...updates };
  fs.writeFileSync(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");
  res.json({ success: true, activity: activities[idx] });
});

// Delete activity
app.delete('/api/activities/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(ACTIVITIES_FILE, "utf-8");
  let activities = JSON.parse(data);

  const initialLength = activities.length;
  activities = activities.filter(a => String(a.id) !== String(id));

  if (activities.length === initialLength) {
    return res.status(404).json({ success: false, error: "Activity not found" });
  }

  fs.writeFileSync(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");
  res.json({ success: true, message: "Activity deleted" });
});

// --- BLOGS ---

// GET all blogs
app.get('/api/blogs', (req, res) => {
  const data = fs.readFileSync(BLOGS_FILE, "utf-8");
  const blogs = JSON.parse(data);
  res.json(blogs);
});

// Create blog
app.post('/api/blogs', (req, res) => {
  const blog = req.body;
  if (!blog || !blog.user || !blog.description) {
    return res.status(400).json({ success: false, error: "Missing blog data" });
  }
  const data = fs.readFileSync(BLOGS_FILE, "utf-8");
  const blogs = JSON.parse(data);

  const newBlog = {
    id: Date.now(),
    ...blog,
    createdAt: new Date().toISOString()
  };
  blogs.push(newBlog);
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
  res.json({ success: true, blog: newBlog });
});

// Update blog
app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const data = fs.readFileSync(BLOGS_FILE, "utf-8");
  let blogs = JSON.parse(data);

  const idx = blogs.findIndex(b => String(b.id) === String(id));
  if (idx === -1) {
    return res.status(404).json({ success: false, error: "Blog not found" });
  }
  blogs[idx] = { ...blogs[idx], ...updates };
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
  res.json({ success: true, blog: blogs[idx] });
});

// Delete blog
app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(BLOGS_FILE, "utf-8");
  let blogs = JSON.parse(data);

  const initialLength = blogs.length;
  blogs = blogs.filter(b => String(b.id) !== String(id));

  if (blogs.length === initialLength) {
    return res.status(404).json({ success: false, error: "Blog not found" });
  }

  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
  res.json({ success: true, message: "Blog deleted" });
});

// --- USER ACTIVITY RANKING ---

app.get('/api/user-activity-ranking', (req, res) => {
  // Exemplo: cada atividade pode ter posts, cada post tem um autor (username)
  // Aqui, vamos supor que cada atividade tem um array "posts" com { username }
  // Se não houver posts em activities.json, adapte para buscar de outro local

  const activitiesData = fs.readFileSync(ACTIVITIES_FILE, "utf-8");
  const activities = JSON.parse(activitiesData);

  // Mapeia username => contagem de posts
  const userCounts = {};
  activities.forEach(activity => {
    if (Array.isArray(activity.postsList)) {
      activity.postsList.forEach(post => {
        if (post.username) {
          userCounts[post.username] = (userCounts[post.username] || 0) + 1;
        }
      });
    }
  });

  // Se não houver postsList nas atividades, retorne lista vazia
  if (Object.keys(userCounts).length === 0) {
    return res.json([]);
  }

  // Ordena por produtividade (maior número de posts)
  const ranking = Object.entries(userCounts)
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count);

  res.json(ranking);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});