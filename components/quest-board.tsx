"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type QuestRarity = "legendary" | "epic" | "rare" | "common"

interface Quest {
  id: string
  title: string
  description: string
  rarity: QuestRarity
  xp: number
  deadline: string
  status: "in-progress" | "review" | "completed"
  difficulty: number
  project: string
  collaborators: string[]
}

const quests: Quest[] = [
  {
    id: "1",
    title: "Yeni Ödeme Sistemi Entegrasyonu",
    description: "Stripe API ile ödeme sistemini entegre et ve test et",
    rarity: "legendary",
    xp: 500,
    deadline: "2 gün",
    status: "in-progress",
    difficulty: 5,
    project: "E-Commerce",
    collaborators: ["/diverse-group-avatars.png", "/diverse-group-avatars.png"],
  },
  {
    id: "2",
    title: "Dashboard Performans Optimizasyonu",
    description: "React Query ile veri yönetimini optimize et",
    rarity: "epic",
    xp: 350,
    deadline: "4 gün",
    status: "in-progress",
    difficulty: 4,
    project: "Admin Panel",
    collaborators: ["/diverse-group-avatars.png"],
  },
  {
    id: "3",
    title: "Kullanıcı Profil Sayfası Tasarımı",
    description: "Yeni profil sayfası UI/UX tasarımını kodla",
    rarity: "rare",
    xp: 200,
    deadline: "5 gün",
    status: "review",
    difficulty: 3,
    project: "Social App",
    collaborators: ["/diverse-group-avatars.png", "/diverse-group-avatars.png"],
  },
  {
    id: "4",
    title: "API Dokümantasyonu Güncelleme",
    description: "Swagger dokümantasyonunu güncelle ve örnekler ekle",
    rarity: "common",
    xp: 100,
    deadline: "1 hafta",
    status: "in-progress",
    difficulty: 2,
    project: "Backend",
    collaborators: [],
  },
]

const rarityConfig: Record<QuestRarity, { color: string; label: string; glow: string }> = {
  legendary: {
    color: "text-legendary border-legendary bg-legendary/10",
    label: "Efsanevi",
    glow: "shadow-[0_0_20px_rgba(255,215,0,0.3)]",
  },
  epic: { color: "text-epic border-epic bg-epic/10", label: "Epik", glow: "shadow-[0_0_20px_rgba(147,51,234,0.3)]" },
  rare: { color: "text-rare border-rare bg-rare/10", label: "Nadir", glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
  common: { color: "text-common border-common bg-common/10", label: "Sıradan", glow: "" },
}

const statusConfig = {
  "in-progress": { label: "Devam Ediyor", color: "bg-accent text-accent-foreground" },
  review: { label: "İncelemede", color: "bg-secondary text-secondary-foreground" },
  completed: { label: "Tamamlandı", color: "bg-primary text-primary-foreground" },
}

export function QuestBoard() {
  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Zap className="h-6 w-6 text-primary" />
          Görev Panosu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={cn(
              "group relative overflow-hidden rounded-lg border-2 p-4 transition-all hover:scale-[1.02]",
              rarityConfig[quest.rarity].color,
              rarityConfig[quest.rarity].glow,
            )}
          >
            {/* Rarity Badge */}
            <div className="absolute right-2 top-2">
              <Badge variant="outline" className={cn("font-semibold", rarityConfig[quest.rarity].color)}>
                {rarityConfig[quest.rarity].label}
              </Badge>
            </div>

            {/* Quest Content */}
            <div className="space-y-3">
              <div>
                <h3 className="pr-24 font-bold text-foreground text-lg">{quest.title}</h3>
                <p className="mt-1 text-muted-foreground text-sm">{quest.description}</p>
              </div>

              {/* Quest Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gold">
                  <Zap className="h-4 w-4" />
                  <span className="font-bold">+{quest.xp} XP</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{quest.deadline}</span>
                </div>

                <div className="flex items-center gap-1">{"⭐".repeat(quest.difficulty)}</div>

                <Badge variant="secondary" className="text-xs">
                  {quest.project}
                </Badge>

                <Badge className={statusConfig[quest.status].color}>{statusConfig[quest.status].label}</Badge>
              </div>

              {/* Collaborators */}
              {quest.collaborators.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {quest.collaborators.map((avatar, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={avatar || "/placeholder.svg"} />
                        <AvatarFallback>U{i + 1}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
