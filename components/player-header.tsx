"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Star, Trophy, Zap } from "lucide-react"

export function PlayerHeader() {
  const playerData = {
    name: "Ahmet Yılmaz",
    level: 23,
    currentXP: 3450,
    nextLevelXP: 5000,
    streak: 12,
    title: "Senior Developer",
    avatar: "/professional-avatar.png",
  }

  const xpPercentage = (playerData.currentXP / playerData.nextLevelXP) * 100

  return (
    <div className="glass-card glow-effect rounded-xl p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Avatar & Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-primary ring-4 ring-primary/20">
              <AvatarImage src={playerData.avatar || "/placeholder.svg"} alt={playerData.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {playerData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-background font-bold text-sm">
              {playerData.level}
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">{playerData.name}</h1>
            <p className="text-muted-foreground text-sm">{playerData.title}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" />
                Level {playerData.level}
              </Badge>
              <Badge variant="outline" className="gap-1 border-legendary text-legendary">
                <Flame className="h-3 w-3" />
                {playerData.streak} Gün Streak
              </Badge>
            </div>
          </div>
        </div>

        {/* Right: XP Progress */}
        <div className="flex-1 space-y-2 md:max-w-md">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Deneyim Puanı</span>
            <span className="font-mono font-semibold text-primary">
              {playerData.currentXP.toLocaleString()} / {playerData.nextLevelXP.toLocaleString()} XP
            </span>
          </div>
          <div className="relative">
            <Progress value={xpPercentage} className="h-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground drop-shadow-lg">{Math.round(xpPercentage)}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-accent" />
              Bir sonraki seviyeye {playerData.nextLevelXP - playerData.currentXP} XP
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-gold" />
              Sıralama: #7
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
