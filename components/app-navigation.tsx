"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Scroll, Swords, Network, Package, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/quests", label: "Quests", icon: Scroll },
  { href: "/raids", label: "Raids", icon: Swords },
  { href: "/skill-tree", label: "Skill Tree", icon: Network },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/admin", label: "Admin", icon: Shield },
]

export function AppNavigation() {
  const pathname = usePathname()

  return (
    <nav className="glass-card sticky top-4 z-50 mb-6 rounded-xl border border-border/50 p-2">
      <div className="flex items-center justify-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
