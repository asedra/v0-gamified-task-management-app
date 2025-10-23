"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { inventoryData } from "@/lib/game-data"

const rarityColors = {
  legendary: "border-legendary bg-legendary/10",
  epic: "border-epic bg-epic/10",
  rare: "border-rare bg-rare/10",
  common: "border-common bg-common/10",
}

export function InventoryPanel() {
  // Show only first 6 items on dashboard
  const displayItems = inventoryData.slice(0, 6)

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-accent" />
          Envanter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative flex flex-col items-center rounded-lg border-2 p-4 transition-all hover:scale-105",
                rarityColors[item.rarity],
              )}
            >
              <div className="text-4xl">{item.icon}</div>
              <h4 className="mt-2 text-center font-semibold text-foreground text-sm">{item.name}</h4>
              {item.quantity > 1 && (
                <Badge variant="outline" className="mt-1 text-xs">
                  x{item.quantity}
                </Badge>
              )}

              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/95 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-center text-foreground text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
