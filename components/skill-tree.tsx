"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Check, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skill {
  id: string
  name: string
  category: string
  unlocked: boolean
  level: number
  maxLevel: number
}

const skills: Skill[] = [
  { id: "1", name: "React", category: "Frontend", unlocked: true, level: 5, maxLevel: 5 },
  { id: "2", name: "TypeScript", category: "Frontend", unlocked: true, level: 4, maxLevel: 5 },
  { id: "3", name: "Next.js", category: "Frontend", unlocked: true, level: 3, maxLevel: 5 },
  { id: "4", name: "Node.js", category: "Backend", unlocked: true, level: 4, maxLevel: 5 },
  { id: "5", name: "PostgreSQL", category: "Backend", unlocked: true, level: 3, maxLevel: 5 },
  { id: "6", name: "Docker", category: "DevOps", unlocked: true, level: 2, maxLevel: 5 },
  { id: "7", name: "AWS", category: "DevOps", unlocked: false, level: 0, maxLevel: 5 },
  { id: "8", name: "GraphQL", category: "Backend", unlocked: false, level: 0, maxLevel: 5 },
]

const categoryColors = {
  Frontend: "border-primary bg-primary/10 text-primary",
  Backend: "border-secondary bg-secondary/10 text-secondary",
  DevOps: "border-accent bg-accent/10 text-accent",
}

export function SkillTree() {
  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Yetenek Ağacı
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={cn(
                "relative overflow-hidden rounded-lg border-2 p-4 transition-all",
                skill.unlocked
                  ? cn(categoryColors[skill.category as keyof typeof categoryColors], "hover:scale-105")
                  : "border-muted bg-muted/20 opacity-50",
              )}
            >
              {!skill.unlocked && <Lock className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />}
              {skill.unlocked && skill.level === skill.maxLevel && (
                <Check className="absolute right-2 top-2 h-4 w-4 text-gold" />
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-foreground">{skill.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {skill.category}
                  </Badge>
                </div>

                {skill.unlocked && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Seviye</span>
                      <span className="font-bold text-foreground">
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: skill.maxLevel }).map((_, i) => (
                        <div
                          key={i}
                          className={cn("h-2 flex-1 rounded-full", i < skill.level ? "bg-current" : "bg-muted")}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
