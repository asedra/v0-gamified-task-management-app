"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Zap } from "lucide-react"
import { questsData } from "@/lib/game-data"

export function DailyQuests() {
  const dailyQuests = questsData.filter((q) => q.type === "daily")

  const completedCount = dailyQuests.filter((q) => q.status === "completed").length
  const totalXP = dailyQuests.reduce((sum, q) => sum + (q.status === "completed" ? q.xp : 0), 0)

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Günlük Görevler
          </CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3 text-gold" />+{totalXP} XP
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {dailyQuests.map((quest) => (
          <div
            key={quest.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-3 transition-all hover:bg-card"
          >
            <Checkbox checked={quest.status === "completed"} className="h-5 w-5" />
            <div className="flex-1">
              <p className={quest.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"}>
                {quest.title}
              </p>
              <p className="text-xs text-muted-foreground">{quest.description}</p>
            </div>
            <Badge variant="outline" className="gap-1 text-gold">
              <Zap className="h-3 w-3" />+{quest.xp}
            </Badge>
          </div>
        ))}
        <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-primary">
              {completedCount}/{dailyQuests.length}
            </span>{" "}
            görev tamamlandı
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
