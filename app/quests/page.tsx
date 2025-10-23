"use client"

import { useState } from "react"
import Link from "next/link"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Zap, TrendingUp, Users, Calendar } from "lucide-react"
import { questsData } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const rarityColors = {
  legendary: "text-legendary border-legendary/50 bg-legendary/10 hover:border-legendary",
  epic: "text-epic border-epic/50 bg-epic/10 hover:border-epic",
  rare: "text-rare border-rare/50 bg-rare/10 hover:border-rare",
  common: "text-common border-common/50 bg-common/10 hover:border-common",
}

const statusColors = {
  available: "bg-accent/20 text-accent",
  "in-progress": "bg-secondary/20 text-secondary",
  completed: "bg-green-500/20 text-green-400",
}

export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const regularQuests = questsData.filter((q) => q.type === "regular")
  const dailyQuests = questsData.filter((q) => q.type === "daily")
  const completedQuests = questsData.filter((q) => q.status === "completed")

  const getQuestsForTab = () => {
    switch (activeTab) {
      case "daily":
        return dailyQuests
      case "completed":
        return completedQuests
      default:
        return regularQuests
    }
  }

  const quests = getQuestsForTab()

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Quest Board</h1>
              <p className="mt-2 text-muted-foreground">Accept quests to gain XP and level up your skills</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-legendary">
                {questsData.filter((q) => q.rarity === "legendary").length} Legendary
              </Badge>
              <Badge variant="outline" className="text-epic">
                {questsData.filter((q) => q.rarity === "epic").length} Epic
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">Regular Quests</TabsTrigger>
              <TabsTrigger value="daily">
                <Calendar className="mr-2 h-4 w-4" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {quests.map((quest) => (
                  <Link key={quest.id} href={`/quests/${quest.id}`}>
                    <Card
                      className={cn(
                        "glass-card cursor-pointer border-2 transition-all hover:scale-[1.02]",
                        rarityColors[quest.rarity],
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-xl">{quest.title}</CardTitle>
                              <Badge className={statusColors[quest.status]}>{quest.status}</Badge>
                            </div>
                            <CardDescription className="mt-2">{quest.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="ml-2 uppercase">
                            {quest.rarity}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Zap className="h-4 w-4 text-accent" />
                              <span className="font-semibold text-accent">{quest.xp} XP</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Level {quest.minLevel}+</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{quest.deadline}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {quest.requiredSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {quest.collaborators.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <div className="flex -space-x-2">
                                {quest.collaborators.map((name, i) => (
                                  <div
                                    key={i}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-semibold text-primary-foreground"
                                  >
                                    {name[0]}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
