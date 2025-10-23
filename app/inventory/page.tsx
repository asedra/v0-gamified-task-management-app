"use client"

import { useState } from "react"
import { PlayerHeader } from "@/components/player-header"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Package, ShoppingCart, Award, Gem, Coins } from "lucide-react"
import { inventoryData, shopData, playerData } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const rarityColors = {
  legendary: "border-legendary bg-legendary/20 shadow-lg shadow-legendary/50",
  epic: "border-epic bg-epic/20 shadow-lg shadow-epic/50",
  rare: "border-rare bg-rare/20 shadow-lg shadow-rare/50",
  common: "border-common bg-common/20",
}

const rarityGlow = {
  legendary: "hover:shadow-legendary/70",
  epic: "hover:shadow-epic/70",
  rare: "hover:shadow-rare/70",
  common: "hover:shadow-common/50",
}

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Inventory & Shop</h1>
              <p className="mt-2 text-muted-foreground">Manage your items and purchase new equipment</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="text-gold">
                <Coins className="mr-2 h-4 w-4" />
                {playerData.gold.toLocaleString()} Gold
              </Badge>
              <Badge variant="outline" className="text-rare">
                <Gem className="mr-2 h-4 w-4" />
                {playerData.gems} Gems
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="inventory">
                <Package className="mr-2 h-4 w-4" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="shop">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="glass-card border-2 border-primary/30 lg:col-span-2">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      <h2 className="text-xl font-semibold">Your Items</h2>
                    </div>

                    <TooltipProvider>
                      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {inventoryData.map((item) => (
                          <Tooltip key={item.id}>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  "relative cursor-pointer rounded-lg border-2 p-4 transition-all",
                                  rarityColors[item.rarity],
                                  rarityGlow[item.rarity],
                                )}
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <div className="text-4xl">{item.icon}</div>
                                  <p className="mt-2 text-center text-xs font-medium">{item.name}</p>
                                  {item.quantity > 1 && (
                                    <Badge variant="outline" className="mt-1 text-xs">
                                      x{item.quantity}
                                    </Badge>
                                  )}
                                </div>
                                <Badge variant="outline" className="absolute right-1 top-1 text-[10px] uppercase">
                                  {item.rarity}
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="glass-card max-w-xs border-2 border-primary/50 p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <Badge variant="outline" className="uppercase">
                                    {item.rarity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                {item.stats && (
                                  <div className="space-y-1 text-sm">
                                    {Object.entries(item.stats).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-muted-foreground capitalize">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </TooltipProvider>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="glass-card border-2 border-primary/30">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-gold" />
                        <h2 className="text-xl font-semibold">Statistics</h2>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Items</span>
                          <span className="font-semibold">{inventoryData.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equipment</span>
                          <span className="font-semibold">
                            {inventoryData.filter((i) => i.type === "equipment").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Badges</span>
                          <span className="font-semibold">
                            {inventoryData.filter((i) => i.type === "badge").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Consumables</span>
                          <span className="font-semibold">
                            {inventoryData.filter((i) => i.type === "consumable").length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shop" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {shopData.map((item) => (
                  <Card
                    key={item.id}
                    className={cn("glass-card border-2 transition-all hover:scale-[1.02]", rarityColors[item.rarity])}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="text-5xl">{item.icon}</div>
                          <Badge variant="outline" className="uppercase">
                            {item.rarity}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        </div>

                        {item.stats && (
                          <div className="space-y-1 text-sm">
                            {Object.entries(item.stats).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 border-t border-border pt-4">
                          {item.price.gold && (
                            <Badge variant="outline" className="flex-1 justify-center gap-1 text-gold">
                              <Coins className="h-3 w-3" />
                              {item.price.gold}
                            </Badge>
                          )}
                          {item.price.gems && (
                            <Badge variant="outline" className="flex-1 justify-center gap-1 text-rare">
                              <Gem className="h-3 w-3" />
                              {item.price.gems}
                            </Badge>
                          )}
                        </div>

                        <Button className="w-full" size="sm">
                          Purchase
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
