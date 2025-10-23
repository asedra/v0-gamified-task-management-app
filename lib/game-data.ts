export interface Player {
  id: string
  name: string
  level: number
  currentXP: number
  nextLevelXP: number
  streak: number
  title: string
  avatar: string
  gold: number
  gems: number
}

export interface Quest {
  id: string
  title: string
  description: string
  rarity: "legendary" | "epic" | "rare" | "common"
  xp: number
  minLevel: number
  requiredSkills: string[]
  deadline: string
  status: "available" | "in-progress" | "completed"
  type: "daily" | "regular"
  collaborators: string[]
  objectives: string[]
  rewards: {
    xp: number
    gold: number
    gems?: number
    items: string[]
  }
}

export interface Raid {
  id: string
  name: string
  description: string
  difficulty: "legendary" | "epic" | "rare"
  minLevel: number
  requiredSkills: string[]
  participants: Array<{
    name: string
    level: number
    skills: string[]
    avatar: string
  }>
  progress: number
  status: "active" | "completed"
  quests: Array<{
    id: string
    title: string
    status: "completed" | "in-progress" | "available" | "locked"
    xp: number
  }>
}

export interface InventoryItem {
  id: string
  name: string
  icon: string
  quantity: number
  rarity: "legendary" | "epic" | "rare" | "common"
  description: string
  type: "equipment" | "badge" | "currency" | "consumable"
  stats?: Record<string, string>
}

export interface ShopItem {
  id: string
  name: string
  icon: string
  rarity: "legendary" | "epic" | "rare" | "common"
  description: string
  type: "equipment" | "badge" | "consumable"
  price: {
    gold?: number
    gems?: number
  }
  stats?: Record<string, string>
}

// Mock player data
export const playerData: Player = {
  id: "1",
  name: "Ahmet Yılmaz",
  level: 23,
  currentXP: 3450,
  nextLevelXP: 5000,
  streak: 12,
  title: "Senior Developer",
  avatar: "/professional-avatar.png",
  gold: 2500,
  gems: 150,
}

// Mock quests data
export const questsData: Quest[] = [
  {
    id: "1",
    title: "Implement Authentication System",
    description: "Build a secure JWT-based authentication system with refresh tokens",
    rarity: "legendary",
    xp: 500,
    minLevel: 15,
    requiredSkills: ["React", "Node.js", "Security"],
    deadline: "2024-01-30",
    status: "available",
    type: "regular",
    collaborators: ["Alice", "Bob"],
    objectives: [
      "Set up JWT token generation",
      "Implement refresh token rotation",
      "Add password hashing with bcrypt",
      "Create protected route middleware",
    ],
    rewards: {
      xp: 500,
      gold: 250,
      gems: 50,
      items: ["Security Badge", "Authentication Certificate"],
    },
  },
  {
    id: "2",
    title: "Optimize Database Queries",
    description: "Improve query performance by adding indexes and optimizing joins",
    rarity: "epic",
    xp: 350,
    minLevel: 12,
    requiredSkills: ["SQL", "PostgreSQL"],
    deadline: "2024-01-25",
    status: "in-progress",
    type: "regular",
    collaborators: ["Charlie"],
    objectives: [
      "Analyze slow queries with EXPLAIN",
      "Add composite indexes",
      "Optimize N+1 queries",
      "Implement query caching",
    ],
    rewards: {
      xp: 350,
      gold: 180,
      items: ["Database Master Badge"],
    },
  },
  {
    id: "3",
    title: "İlk commit'i at",
    description: "Bugün ilk commit'ini at ve streak'ini devam ettir",
    rarity: "common",
    xp: 50,
    minLevel: 1,
    requiredSkills: ["Git"],
    deadline: "2024-01-20",
    status: "completed",
    type: "daily",
    collaborators: [],
    objectives: ["Make a commit to any repository"],
    rewards: {
      xp: 50,
      gold: 25,
      items: [],
    },
  },
  {
    id: "4",
    title: "3 code review yap",
    description: "Takım arkadaşlarının kodlarını incele ve geri bildirim ver",
    rarity: "rare",
    xp: 75,
    minLevel: 5,
    requiredSkills: ["Code Review"],
    deadline: "2024-01-20",
    status: "in-progress",
    type: "daily",
    collaborators: [],
    objectives: ["Review 3 pull requests", "Provide constructive feedback"],
    rewards: {
      xp: 75,
      gold: 40,
      items: [],
    },
  },
  {
    id: "5",
    title: "Raid Quest: E-Commerce Cart System",
    description: "Build shopping cart system for E-Commerce Platform",
    rarity: "epic",
    xp: 280,
    minLevel: 18,
    requiredSkills: ["React", "Node.js"],
    deadline: "2024-01-28",
    status: "in-progress",
    type: "regular",
    collaborators: ["Alice", "Bob", "Charlie"],
    objectives: [
      "Design cart data structure",
      "Implement add/remove items",
      "Calculate totals and discounts",
      "Persist cart state",
    ],
    rewards: {
      xp: 280,
      gold: 150,
      gems: 30,
      items: ["E-Commerce Badge"],
    },
  },
]

// Mock raids data
export const raidsData: Raid[] = [
  {
    id: "1",
    name: "E-Commerce Platform Rebuild",
    description: "Complete overhaul of the legacy e-commerce system with modern tech stack",
    difficulty: "legendary",
    minLevel: 18,
    requiredSkills: ["React", "Node.js", "PostgreSQL", "AWS"],
    participants: [
      { name: "Alice Chen", level: 22, skills: ["React", "Node.js"], avatar: "AC" },
      { name: "Bob Smith", level: 20, skills: ["PostgreSQL", "AWS"], avatar: "BS" },
      { name: "Charlie Davis", level: 19, skills: ["React", "AWS"], avatar: "CD" },
      { name: "Diana Lee", level: 21, skills: ["Node.js", "PostgreSQL"], avatar: "DL" },
    ],
    progress: 45,
    status: "active",
    quests: [
      { id: "1", title: "Set up microservices architecture", status: "completed", xp: 300 },
      { id: "2", title: "Implement product catalog API", status: "completed", xp: 250 },
      { id: "3", title: "Build shopping cart system", status: "in-progress", xp: 280 },
      { id: "4", title: "Integrate payment gateway", status: "available", xp: 350 },
      { id: "5", title: "Deploy to production", status: "locked", xp: 400 },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Create cross-platform mobile app for customer engagement",
    difficulty: "epic",
    minLevel: 15,
    requiredSkills: ["React Native", "TypeScript", "Firebase"],
    participants: [
      { name: "Eve Wilson", level: 18, skills: ["React Native", "TypeScript"], avatar: "EW" },
      { name: "Frank Miller", level: 16, skills: ["Firebase", "TypeScript"], avatar: "FM" },
    ],
    progress: 100,
    status: "completed",
    quests: [
      { id: "1", title: "Design UI/UX mockups", status: "completed", xp: 200 },
      { id: "2", title: "Implement authentication", status: "completed", xp: 250 },
      { id: "3", title: "Build core features", status: "completed", xp: 300 },
      { id: "4", title: "Add push notifications", status: "completed", xp: 180 },
    ],
  },
  {
    id: "3",
    name: "AI Chatbot Integration",
    description: "Integrate AI-powered customer support chatbot",
    difficulty: "rare",
    minLevel: 12,
    requiredSkills: ["Python", "Machine Learning", "API Design"],
    participants: [
      { name: "Grace Park", level: 14, skills: ["Python", "Machine Learning"], avatar: "GP" },
      { name: "Henry Kim", level: 13, skills: ["API Design", "Python"], avatar: "HK" },
    ],
    progress: 30,
    status: "active",
    quests: [
      { id: "1", title: "Train ML model", status: "completed", xp: 220 },
      { id: "2", title: "Build API endpoints", status: "in-progress", xp: 180 },
      { id: "3", title: "Integrate with frontend", status: "available", xp: 200 },
    ],
  },
]

// Mock inventory data
export const inventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "MacBook Pro M3",
    icon: "💻",
    quantity: 1,
    rarity: "legendary",
    description: "Company-issued development laptop",
    type: "equipment",
    stats: {
      Processor: "Apple M3 Max",
      RAM: "64GB",
      Storage: "2TB SSD",
      Display: '16" Retina',
    },
  },
  {
    id: "2",
    name: "iPhone 16 Pro",
    icon: "📱",
    quantity: 1,
    rarity: "epic",
    description: "Company phone for testing",
    type: "equipment",
    stats: {
      Model: "iPhone 16 Pro",
      Storage: "512GB",
      Color: "Titanium Black",
      Condition: "New",
    },
  },
  {
    id: "3",
    name: "Security Badge",
    icon: "🛡️",
    quantity: 1,
    rarity: "legendary",
    description: "Earned from completing authentication quest",
    type: "badge",
  },
  {
    id: "4",
    name: "XP Boost",
    icon: "⚡",
    quantity: 5,
    rarity: "epic",
    description: "2x XP for 1 hour",
    type: "consumable",
  },
  {
    id: "5",
    name: "Kahve Kuponu",
    icon: "☕",
    quantity: 8,
    rarity: "common",
    description: "Ofis kafeden kullanılabilir",
    type: "consumable",
  },
]

// Mock shop data
export const shopData: ShopItem[] = [
  {
    id: "1",
    name: "Mechanical Keyboard",
    icon: "⌨️",
    rarity: "epic",
    description: "Premium mechanical keyboard for coding",
    type: "equipment",
    price: { gold: 500, gems: 50 },
    stats: {
      Type: "Mechanical",
      Switches: "Cherry MX Blue",
      RGB: "Yes",
    },
  },
  {
    id: "2",
    name: "4K Monitor",
    icon: "🖥️",
    rarity: "legendary",
    description: "Ultra HD display for productivity",
    type: "equipment",
    price: { gold: 1000, gems: 100 },
    stats: {
      Resolution: "3840x2160",
      Size: '32"',
      "Refresh Rate": "144Hz",
    },
  },
  {
    id: "3",
    name: "XP Boost Pack",
    icon: "⚡",
    rarity: "rare",
    description: "5x XP Boost potions",
    type: "consumable",
    price: { gold: 200 },
  },
  {
    id: "4",
    name: "Skill Point",
    icon: "⭐",
    rarity: "epic",
    description: "Instantly level up any skill",
    type: "consumable",
    price: { gems: 75 },
  },
  {
    id: "5",
    name: "Premium Coffee Pack",
    icon: "☕",
    rarity: "common",
    description: "10 premium coffee coupons",
    type: "consumable",
    price: { gold: 50 },
  },
  {
    id: "6",
    name: "Legendary Badge",
    icon: "👑",
    rarity: "legendary",
    description: "Exclusive legendary achievement badge",
    type: "badge",
    price: { gold: 2000, gems: 200 },
  },
]
