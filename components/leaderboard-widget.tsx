"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  xp: number
  level: number
  isCurrentUser?: boolean
}

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Zeynep Kaya", avatar: "/diverse-group-avatars.png", xp: 8500, level: 28 },
  { rank: 2, name: "Mehmet Demir", avatar: "/diverse-group-avatars.png", xp: 7200, level: 26 },
  { rank: 3, name: "Ayşe Yıldız", avatar: "/diverse-group-avatars.png", xp: 6800, level: 25 },
  { rank: 4, name: "Can Öztürk", avatar: "/diverse-group-avatars.png", xp: 5900, level: 24 },
  { rank: 5, name: "Elif Şahin", avatar: "/diverse-group-avatars.png", xp: 5200, level: 23 },
  { rank: 6, name: "Burak Arslan", avatar: "/diverse-group-avatars.png", xp: 4800, level: 23 },
  { rank: 7, name: "Ahmet Yılmaz", avatar: "/diverse-group-avatars.png", xp: 3450, level: 23, isCurrentUser: true },
]

const rankColors = {
  1: "text-gold",
  2: "text-silver",
  3: "text-bronze",
}

export function LeaderboardWidget() {
  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gold" />
          Liderlik Tablosu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 transition-all",
              entry.isCurrentUser ? "border-primary bg-primary/10" : "border-border bg-card/50 hover:bg-card",
            )}
          >
            <div
              className={cn(
                "w-6 text-center font-bold",
                rankColors[entry.rank as keyof typeof rankColors] || "text-muted-foreground",
              )}
            >
              {entry.rank}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={entry.avatar || "/placeholder.svg"} />
              <AvatarFallback>{entry.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{entry.name}</p>
              <p className="text-muted-foreground text-xs">{entry.xp.toLocaleString()} XP</p>
            </div>
            <Badge variant="outline" className="text-xs">
              Lvl {entry.level}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
