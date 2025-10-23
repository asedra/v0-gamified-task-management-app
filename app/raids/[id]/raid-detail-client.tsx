"use client"

import { useState } from "react"
import Link from "next/link"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Swords, Users, TrendingUp, CheckCircle2, Circle, Zap, Plus } from "lucide-react"
import { raidsData } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const difficultyColors = {
  legendary: "border-legendary/50 bg-legendary/10",
  epic: "border-epic/50 bg-epic/10",
  rare: "border-rare/50 bg-rare/10",
}

const questStatusColors = {
  completed: "bg-green-500/20 text-green-400 border-green-500/50",
  "in-progress": "bg-secondary/20 text-secondary border-secondary/50",
  available: "bg-accent/20 text-accent border-accent/50",
  locked: "bg-muted/20 text-muted-foreground border-muted/50",
}

export function RaidDetailClient({ id }: { id: string }) {
  const raid = raidsData.find((r) => r.id === id)
  const [isAddQuestOpen, setIsAddQuestOpen] = useState(false)
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    xp: "",
    deadline: "",
    assignees: [] as string[],
  })

  if (!raid) {
    return <div>Raid not found</div>
  }

  const handleAddQuest = () => {
    console.log("[v0] Adding new quest to raid:", newQuest)
    // Here you would add the quest to the raid
    setIsAddQuestOpen(false)
    setNewQuest({ title: "", description: "", xp: "", deadline: "", assignees: [] })
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <Link href="/raids">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Raids
            </Button>
          </Link>

          <Card className={cn("glass-card border-2", difficultyColors[raid.difficulty])}>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-foreground">
                      <Swords className="h-8 w-8" />
                      {raid.name}
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">{raid.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-4 text-lg uppercase">
                    {raid.difficulty}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-primary/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-2xl font-bold">Level {raid.minLevel}+</p>
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
                          <p className="text-2xl font-bold">{raid.participants.length} Members</p>
                          <p className="text-xs text-muted-foreground">Team Size</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {raid.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold">Team Members</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {raid.participants.map((participant, i) => (
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
                              {participant.skills.map((skill) => {
                                const isRequired = raid.requiredSkills.includes(skill)
                                return (
                                  <Badge
                                    key={skill}
                                    variant={isRequired ? "default" : "outline"}
                                    className={cn("text-xs", isRequired && "bg-accent text-accent-foreground")}
                                  >
                                    {skill}
                                  </Badge>
                                )
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Quest Progress</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{raid.progress}% Complete</span>
                      <Dialog open={isAddQuestOpen} onOpenChange={setIsAddQuestOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Quest
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card max-w-2xl border-2 border-primary/50">
                          <DialogHeader>
                            <DialogTitle>Add Quest to Raid</DialogTitle>
                            <DialogDescription>Create a new quest for this raid</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="quest-title">Quest Title</Label>
                              <Input
                                id="quest-title"
                                placeholder="Enter quest title"
                                value={newQuest.title}
                                onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quest-description">Description</Label>
                              <Textarea
                                id="quest-description"
                                placeholder="Describe the quest objectives and requirements"
                                value={newQuest.description}
                                onChange={(e) => setNewQuest({ ...newQuest, description: e.target.value })}
                                rows={4}
                              />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="quest-xp">XP Reward</Label>
                                <Input
                                  id="quest-xp"
                                  type="number"
                                  placeholder="250"
                                  value={newQuest.xp}
                                  onChange={(e) => setNewQuest({ ...newQuest, xp: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="quest-deadline">Deadline</Label>
                                <Input
                                  id="quest-deadline"
                                  type="date"
                                  value={newQuest.deadline}
                                  onChange={(e) => setNewQuest({ ...newQuest, deadline: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quest-assignees">Assign Team Members</Label>
                              <Select
                                onValueChange={(value) => {
                                  if (!newQuest.assignees.includes(value)) {
                                    setNewQuest({ ...newQuest, assignees: [...newQuest.assignees, value] })
                                  }
                                }}
                              >
                                <SelectTrigger id="quest-assignees">
                                  <SelectValue placeholder="Select team members" />
                                </SelectTrigger>
                                <SelectContent>
                                  {raid.participants.map((participant) => (
                                    <SelectItem key={participant.name} value={participant.name}>
                                      <div className="flex items-center gap-2">
                                        <span>{participant.avatar}</span>
                                        <span>{participant.name}</span>
                                        <Badge variant="outline" className="ml-2 text-xs">
                                          Lvl {participant.level}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {newQuest.assignees.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {newQuest.assignees.map((assignee) => (
                                    <Badge
                                      key={assignee}
                                      variant="secondary"
                                      className="cursor-pointer"
                                      onClick={() =>
                                        setNewQuest({
                                          ...newQuest,
                                          assignees: newQuest.assignees.filter((a) => a !== assignee),
                                        })
                                      }
                                    >
                                      {assignee} ×
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <Button className="w-full" onClick={handleAddQuest}>
                              Create Quest
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Progress value={raid.progress} className="mb-4 h-3" />
                  <div className="space-y-2">
                    {raid.quests.map((quest) => (
                      <Card key={quest.id} className={cn("border", questStatusColors[quest.status])}>
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
                  {raid.status === "completed" ? "View Rewards" : "Join Raid"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
