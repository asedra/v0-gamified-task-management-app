import Link from "next/link"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Zap, TrendingUp, Clock, Users, CheckCircle2, Circle, Award } from "lucide-react"
import { questsData } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const rarityColors = {
  legendary: "text-legendary border-legendary/50 bg-legendary/10",
  epic: "text-epic border-epic/50 bg-epic/10",
  rare: "text-rare border-rare/50 bg-rare/10",
  common: "text-common border-common/50 bg-common/10",
}

export default async function QuestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const quest = questsData.find((q) => q.id === id)

  if (!quest) {
    return <div>Quest not found</div>
  }

  const completedObjectives = Math.floor(quest.objectives.length * 0.6)

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <Link href="/quests">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quests
            </Button>
          </Link>

          <Card className={cn("glass-card border-2", rarityColors[quest.rarity])}>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground">{quest.title}</h1>
                    <p className="mt-2 text-lg text-muted-foreground">{quest.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-4 text-lg uppercase">
                    {quest.rarity}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <Card className="bg-accent/10">
                    <CardContent className="p-4 text-center">
                      <Zap className="mx-auto h-8 w-8 text-accent" />
                      <p className="mt-2 text-2xl font-bold text-accent">{quest.rewards.xp}</p>
                      <p className="text-xs text-muted-foreground">XP Reward</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gold/10">
                    <CardContent className="p-4 text-center">
                      <div className="mx-auto h-8 w-8 text-3xl">💰</div>
                      <p className="mt-2 text-2xl font-bold text-gold">{quest.rewards.gold}</p>
                      <p className="text-xs text-muted-foreground">Gold</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/10">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="mx-auto h-8 w-8 text-primary" />
                      <p className="mt-2 text-2xl font-bold text-primary">Lvl {quest.minLevel}+</p>
                      <p className="text-xs text-muted-foreground">Min Level</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/10">
                    <CardContent className="p-4 text-center">
                      <Clock className="mx-auto h-8 w-8 text-secondary" />
                      <p className="mt-2 text-lg font-bold text-secondary">{quest.deadline}</p>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {quest.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Quest Objectives</h3>
                    <span className="text-sm text-muted-foreground">
                      {completedObjectives}/{quest.objectives.length} Completed
                    </span>
                  </div>
                  <Progress value={(completedObjectives / quest.objectives.length) * 100} className="mb-4 h-2" />
                  <div className="space-y-2">
                    {quest.objectives.map((objective, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-3">
                        {i < completedObjectives ? (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-400" />
                        ) : (
                          <Circle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        )}
                        <span className={i < completedObjectives ? "text-muted-foreground line-through" : ""}>
                          {objective}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {quest.collaborators.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Collaborators</h3>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div className="flex gap-2">
                        {quest.collaborators.map((name, i) => (
                          <div
                            key={i}
                            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-primary text-sm font-semibold text-primary-foreground"
                          >
                            {name[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Card className="border-gold/50 bg-gold/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-gold" />
                      <div className="flex-1">
                        <p className="font-semibold text-gold">Quest Rewards</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {quest.rewards.items.map((item) => (
                            <Badge key={item} variant="outline" className="border-gold text-gold">
                              {item}
                            </Badge>
                          ))}
                          {quest.rewards.gems && (
                            <Badge variant="outline" className="border-epic text-epic">
                              💎 {quest.rewards.gems} Gems
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  {quest.status === "available" && (
                    <Button className="flex-1" size="lg">
                      Accept Quest
                    </Button>
                  )}
                  {quest.status === "in-progress" && (
                    <>
                      <Button className="flex-1" size="lg">
                        Continue Quest
                      </Button>
                      <Button variant="outline" size="lg">
                        Abandon
                      </Button>
                    </>
                  )}
                  {quest.status === "completed" && (
                    <Button className="flex-1" size="lg" disabled>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Completed
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
