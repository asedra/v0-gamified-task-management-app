"use client"

import { useState } from "react"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Scroll, Swords, Package, Plus, Edit, Trash2 } from "lucide-react"
import { questsData, raidsData, inventoryData, shopData } from "@/lib/game-data"
import Link from "next/link"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("quests")

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-4xl font-bold text-foreground">
                <Shield className="h-10 w-10 text-gold" />
                Admin Panel
              </h1>
              <p className="mt-2 text-muted-foreground">Manage quests, raids, inventory, and shop items</p>
            </div>
            <Badge variant="outline" className="text-lg text-gold">
              <Shield className="mr-2 h-4 w-4" />
              Administrator
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="quests">
                <Scroll className="mr-2 h-4 w-4" />
                Quests
              </TabsTrigger>
              <TabsTrigger value="raids">
                <Swords className="mr-2 h-4 w-4" />
                Raids
              </TabsTrigger>
              <TabsTrigger value="inventory">
                <Package className="mr-2 h-4 w-4" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="shop">
                <Package className="mr-2 h-4 w-4" />
                Shop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quests" className="mt-6">
              <Card className="glass-card border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Scroll className="h-5 w-5" />
                      Quest Management
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Quest
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card max-w-2xl border-2 border-primary/50">
                        <DialogHeader>
                          <DialogTitle>Create New Quest</DialogTitle>
                          <DialogDescription>Add a new quest to the system</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="quest-title">Title</Label>
                              <Input id="quest-title" placeholder="Quest title" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quest-rarity">Rarity</Label>
                              <Select>
                                <SelectTrigger id="quest-rarity">
                                  <SelectValue placeholder="Select rarity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="legendary">Legendary</SelectItem>
                                  <SelectItem value="epic">Epic</SelectItem>
                                  <SelectItem value="rare">Rare</SelectItem>
                                  <SelectItem value="common">Common</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quest-description">Description</Label>
                            <Textarea id="quest-description" placeholder="Quest description" />
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="quest-xp">XP Reward</Label>
                              <Input id="quest-xp" type="number" placeholder="500" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quest-level">Min Level</Label>
                              <Input id="quest-level" type="number" placeholder="15" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quest-type">Type</Label>
                              <Select>
                                <SelectTrigger id="quest-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="regular">Regular</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button className="w-full">Create Quest</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {questsData.map((quest) => (
                      <Card key={quest.id} className="border-2 border-border">
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{quest.title}</h3>
                              <Badge variant="outline" className="uppercase">
                                {quest.rarity}
                              </Badge>
                              <Badge variant="secondary">{quest.type}</Badge>
                              <Badge>{quest.status}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{quest.description}</p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>XP: {quest.xp}</span>
                              <span>Level: {quest.minLevel}+</span>
                              <span>Skills: {quest.requiredSkills.join(", ")}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="raids" className="mt-6">
              <Card className="glass-card border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Swords className="h-5 w-5" />
                      Raid Management
                    </CardTitle>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Raid
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {raidsData.map((raid) => (
                      <Card key={raid.id} className="border-2 border-border">
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{raid.name}</h3>
                              <Badge variant="outline" className="uppercase">
                                {raid.difficulty}
                              </Badge>
                              <Badge>{raid.status}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{raid.description}</p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>Level: {raid.minLevel}+</span>
                              <span>Members: {raid.participants.length}</span>
                              <span>Progress: {raid.progress}%</span>
                              <span>Quests: {raid.quests.length}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/raids/${raid.id}`}>
                              <Button variant="outline" size="sm">
                                <Swords className="mr-2 h-4 w-4" />
                                Manage Quests
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="mt-6">
              <Card className="glass-card border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Inventory Management
                    </CardTitle>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {inventoryData.map((item) => (
                      <Card key={item.id} className="border-2 border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{item.icon}</div>
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant="outline" className="mt-1 text-xs uppercase">
                                  {item.rarity}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shop" className="mt-6">
              <Card className="glass-card border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Shop Management
                    </CardTitle>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Shop Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {shopData.map((item) => (
                      <Card key={item.id} className="border-2 border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{item.icon}</div>
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant="outline" className="mt-1 text-xs uppercase">
                                  {item.rarity}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                          <div className="mt-2 flex gap-2">
                            {item.price.gold && <Badge variant="outline">💰 {item.price.gold}</Badge>}
                            {item.price.gems && <Badge variant="outline">💎 {item.price.gems}</Badge>}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
