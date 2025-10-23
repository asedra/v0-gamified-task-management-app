"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Lock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { raidsData } from "@/lib/game-data"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  rarity: "gold" | "silver" | "bronze"
  type: "raid" | "general"
  raidId?: string
}

const generalAchievements: Achievement[] = [
  {
    id: "1",
    title: "İlk Kan",
    description: "İlk görevini tamamla",
    icon: "🎯",
    unlocked: true,
    rarity: "bronze",
    type: "general",
  },
  {
    id: "2",
    title: "Hız Canavarı",
    description: "10 görevi 1 haftada tamamla",
    icon: "⚡",
    unlocked: true,
    rarity: "silver",
    type: "general",
  },
  {
    id: "3",
    title: "Kod Ustası",
    description: "100 commit yap",
    icon: "👨‍💻",
    unlocked: true,
    rarity: "gold",
    type: "general",
  },
]

const rarityColors = {
  gold: "border-gold bg-gold/10 text-gold",
  silver: "border-silver bg-silver/10 text-silver",
  bronze: "border-bronze bg-bronze/10 text-bronze",
}

export function AchievementPanel() {
  const raidAchievements: Achievement[] = raidsData
    .filter((raid) => raid.status === "completed")
    .map((raid) => ({
      id: `raid-${raid.id}`,
      title: raid.name,
      description: `Completed ${raid.difficulty} raid`,
      icon: "🏆",
      unlocked: true,
      rarity: raid.difficulty === "legendary" ? "gold" : raid.difficulty === "epic" ? "silver" : "bronze",
      type: "raid" as const,
      raidId: raid.id,
    }))

  const allAchievements = [...generalAchievements, ...raidAchievements]
  const unlockedCount = allAchievements.filter((a) => a.unlocked).length

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gold" />
            Başarımlar
          </CardTitle>
          <Badge variant="secondary">
            {unlockedCount}/{allAchievements.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {allAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-2 transition-all",
                achievement.unlocked
                  ? cn(rarityColors[achievement.rarity], "hover:scale-105 pulse-glow")
                  : "border-muted bg-muted/20 opacity-50",
              )}
            >
              {!achievement.unlocked && <Lock className="absolute right-1 top-1 h-3 w-3 text-muted-foreground" />}
              {achievement.unlocked && achievement.type === "raid" && (
                <CheckCircle2 className="absolute right-1 top-1 h-3 w-3 text-green-400" />
              )}
              <div className="text-3xl">{achievement.icon}</div>
              <p className="mt-1 text-center font-semibold text-foreground text-xs leading-tight">
                {achievement.title}
              </p>
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/95 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-center text-foreground text-xs">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
