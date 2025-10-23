"use client"

import { useState } from "react"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Network, BookOpen, Award, Lock } from "lucide-react"

const skillTree = [
  {
    id: 1,
    name: "Next.js",
    category: "Frontend",
    currentLevel: 3,
    maxLevel: 5,
    icon: "⚛️",
    description: "Modern React framework for production",
    trainings: [
      { id: 1, title: "Advanced Server Components", duration: "4 hours", xpCost: 200, status: "available" },
      { id: 2, title: "App Router Mastery", duration: "3 hours", xpCost: 150, status: "available" },
      { id: 3, title: "Performance Optimization", duration: "5 hours", xpCost: 250, status: "locked" },
    ],
  },
  {
    id: 2,
    name: "TypeScript",
    category: "Language",
    currentLevel: 4,
    maxLevel: 5,
    icon: "📘",
    description: "Typed superset of JavaScript",
    trainings: [
      { id: 1, title: "Advanced Types & Generics", duration: "6 hours", xpCost: 300, status: "available" },
      { id: 2, title: "Type System Deep Dive", duration: "4 hours", xpCost: 200, status: "locked" },
    ],
  },
  {
    id: 3,
    name: "PostgreSQL",
    category: "Database",
    currentLevel: 2,
    maxLevel: 5,
    icon: "🐘",
    description: "Advanced open-source relational database",
    trainings: [
      { id: 1, title: "Query Optimization", duration: "5 hours", xpCost: 250, status: "available" },
      { id: 2, title: "Advanced Indexing", duration: "4 hours", xpCost: 200, status: "available" },
      { id: 3, title: "Replication & Scaling", duration: "6 hours", xpCost: 300, status: "available" },
    ],
  },
  {
    id: 4,
    name: "AWS",
    category: "Cloud",
    currentLevel: 1,
    maxLevel: 5,
    icon: "☁️",
    description: "Amazon Web Services cloud platform",
    trainings: [
      { id: 1, title: "EC2 & Load Balancing", duration: "5 hours", xpCost: 250, status: "available" },
      { id: 2, title: "S3 & CloudFront", duration: "4 hours", xpCost: 200, status: "available" },
      { id: 3, title: "Lambda & Serverless", duration: "6 hours", xpCost: 300, status: "available" },
      { id: 4, title: "RDS & DynamoDB", duration: "5 hours", xpCost: 250, status: "locked" },
    ],
  },
  {
    id: 5,
    name: "Docker",
    category: "DevOps",
    currentLevel: 3,
    maxLevel: 5,
    icon: "🐳",
    description: "Containerization platform",
    trainings: [
      { id: 1, title: "Multi-stage Builds", duration: "3 hours", xpCost: 150, status: "available" },
      { id: 2, title: "Docker Compose Mastery", duration: "4 hours", xpCost: 200, status: "locked" },
    ],
  },
  {
    id: 6,
    name: "GraphQL",
    category: "API",
    currentLevel: 2,
    maxLevel: 5,
    icon: "🔷",
    description: "Query language for APIs",
    trainings: [
      { id: 1, title: "Schema Design Patterns", duration: "4 hours", xpCost: 200, status: "available" },
      { id: 2, title: "Resolvers & DataLoader", duration: "5 hours", xpCost: 250, status: "available" },
      { id: 3, title: "Subscriptions & Real-time", duration: "6 hours", xpCost: 300, status: "locked" },
    ],
  },
]

const categories = ["All", "Frontend", "Language", "Database", "Cloud", "DevOps", "API"]

export default function SkillTreePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSkill, setSelectedSkill] = useState<(typeof skillTree)[0] | null>(null)

  const filteredSkills =
    selectedCategory === "All" ? skillTree : skillTree.filter((skill) => skill.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Skill Tree</h1>
              <p className="mt-2 text-muted-foreground">Level up your skills through training and practice</p>
            </div>
            <Badge variant="outline" className="text-lg">
              <Network className="mr-2 h-4 w-4" />
              {skillTree.length} Skills
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => {
              const progress = (skill.currentLevel / skill.maxLevel) * 100

              return (
                <Card
                  key={skill.id}
                  className="glass-card cursor-pointer border-2 border-primary/30 transition-all hover:scale-[1.02] hover:border-primary/60"
                  onClick={() => setSelectedSkill(skill)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-2xl">
                          {skill.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{skill.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{skill.description}</p>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Level Progress</span>
                        <span className="font-semibold">
                          {skill.currentLevel}/{skill.maxLevel}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{skill.trainings.length} trainings available</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
          <DialogContent className="glass-card max-w-3xl border-2 border-primary/50">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 text-4xl">
                  {selectedSkill?.icon}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl">{selectedSkill?.name}</DialogTitle>
                  <DialogDescription className="mt-1">{selectedSkill?.description}</DialogDescription>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary">{selectedSkill?.category}</Badge>
                    <Badge variant="outline">
                      Level {selectedSkill?.currentLevel}/{selectedSkill?.maxLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="bg-primary/10">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Current Progress</span>
                    <span className="text-lg font-bold">
                      {selectedSkill?.currentLevel}/{selectedSkill?.maxLevel}
                    </span>
                  </div>
                  <Progress
                    value={((selectedSkill?.currentLevel || 0) / (selectedSkill?.maxLevel || 1)) * 100}
                    className="h-3"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Complete trainings to reach level {(selectedSkill?.currentLevel || 0) + 1}
                  </p>
                </CardContent>
              </Card>

              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <BookOpen className="h-5 w-5" />
                  Available Trainings to Level Up
                </h3>
                <div className="space-y-3">
                  {selectedSkill?.trainings.map((training) => (
                    <Card
                      key={training.id}
                      className={`border-2 ${
                        training.status === "locked"
                          ? "border-muted/50 bg-muted/10 opacity-60"
                          : "border-accent/50 bg-accent/10"
                      }`}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          {training.status === "locked" ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-accent" />
                          )}
                          <div>
                            <p className="font-medium">{training.title}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>⏱️ {training.duration}</span>
                              <span>💎 {training.xpCost} XP Cost</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          disabled={training.status === "locked"}
                          variant={training.status === "locked" ? "outline" : "default"}
                        >
                          {training.status === "locked" ? "Locked" : "Start Training"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border-gold/50 bg-gold/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-gold" />
                    <div>
                      <p className="font-semibold text-gold">Level {(selectedSkill?.currentLevel || 0) + 1} Reward</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Unlock advanced projects and earn +50 XP bonus on related quests
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
