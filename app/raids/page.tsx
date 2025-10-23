"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { useState } from "react"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Swords, Users, TrendingUp, CheckCircle2, Circle, Zap } from "lucide-react"
import { raidsData } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const difficultyColors = {
  legendary: "border-legendary/50 bg-legendary/10 hover:border-legendary",
  epic: "border-epic/50 bg-epic/10 hover:border-epic",
  rare: "border-rare/50 bg-rare/10 hover:border-rare",
}

const questStatusColors = {
  completed: "bg-green-500/20 text-green-400 border-green-500/50",
  "in-progress": "bg-secondary/20 text-secondary border-secondary/50",
  available: "bg-accent/20 text-accent border-accent/50",
  locked: "bg-muted/20 text-muted-foreground border-muted/50",
}

export default function RaidsPage() {
  const [selectedRaid, setSelectedRaid] = useState<(typeof raidsData)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("active")

  const activeRaids = raidsData.filter((r) => r.status === "active")
  const completedRaids = raidsData.filter((r) => r.status === "completed")

  const raids = activeTab === "active" ? activeRaids : completedRaids

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Raid Missions</h1>
              <p className="mt-2 text-muted-foreground">Team up with others to complete epic projects</p>
            </div>
            <Badge variant="outline" className="text-lg">
              <Swords className="mr-2 h-4 w-4" />
              {raidsData.length} Total Raids
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">
                <Swords className="mr-2 h-4 w-4" />
                Active Raids
              </TabsTrigger>
              <TabsTrigger value="completed">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {raids.map((raid) => (
                  <Link key={raid.id} href={`/raids/${raid.id}`}>
                    <Card
                      className={cn(
                        "glass-card cursor-pointer border-2 transition-all hover:scale-[1.02]",
                        difficultyColors[raid.difficulty],
                      )}
                      onClick={() => setSelectedRaid(raid)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Swords className="h-5 w-5" />
                              <CardTitle className="text-xl">{raid.name}</CardTitle>
                            </div>
                            <CardDescription className="mt-2">{raid.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="ml-2 uppercase">
                            {raid.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Level {raid.minLevel}+</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{raid.participants.length} Members</span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{raid.progress}%</span>
                          </div>
                          <Progress value={raid.progress} className="h-2" />
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {raid.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex -space-x-3">
                          {raid.participants.map((participant, i) => (
                            <div
                              key={i}
                              className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-semibold text-primary-foreground"
                              title={`${participant.name} - Level ${participant.level}`}
                            >
                              {participant.avatar}
                              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold">
                                {participant.level}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={!!selectedRaid} onOpenChange={() => setSelectedRaid(null)}>
          <DialogContent className="glass-card max-w-4xl border-2 border-primary/50">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-2 text-2xl">
                    <Swords className="h-6 w-6" />
                    {selectedRaid?.name}
                  </DialogTitle>
                  <DialogDescription className="mt-2">{selectedRaid?.description}</DialogDescription>
                </div>
                <Badge variant="outline" className="uppercase">
                  {selectedRaid?.difficulty}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">Level {selectedRaid?.minLevel}+</p>
                        <p className="text-xs text-muted-foreground">Minimum Level</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-accent/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-accent" />
                      <div>
                        <p className="text-2xl font-bold">{selectedRaid?.participants.length} Members</p>
                        <p className="text-xs text-muted-foreground">Team Size</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRaid?.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Team Members</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedRaid?.participants.map((participant, i) => (
                    <Card key={i} className="bg-card/50">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                          {participant.avatar}
                          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold">
                            {participant.level}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{participant.name}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {participant.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">Quest Progress</h3>
                  <span className="text-sm text-muted-foreground">{selectedRaid?.progress}% Complete</span>
                </div>
                <Progress value={selectedRaid?.progress} className="mb-4 h-3" />
                <div className="space-y-2">
                  {selectedRaid?.quests.map((quest) => (
                    <Card
                      key={quest.id}
                      className={`border ${questStatusColors[quest.status as keyof typeof questStatusColors]}`}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          {quest.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                          ) : quest.status === "locked" ? (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                          <div>
                            <p className="font-medium">{quest.title}</p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <Zap className="h-3 w-3" />
                              <span>{quest.xp} XP</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="uppercase">
                          {quest.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg">
                Join Raid
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
