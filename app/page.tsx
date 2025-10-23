import { PlayerHeader } from "@/components/player-header"
import { QuestBoard } from "@/components/quest-board"
import { DailyQuests } from "@/components/daily-quests"
import { AchievementPanel } from "@/components/achievement-panel"
import { LeaderboardWidget } from "@/components/leaderboard-widget"
import { SkillTree } from "@/components/skill-tree"
import { InventoryPanel } from "@/components/inventory-panel"
import { AppNavigation } from "@/components/app-navigation"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1920px]">
        <PlayerHeader />
        <AppNavigation />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <QuestBoard />
            <DailyQuests />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <AchievementPanel />
            <LeaderboardWidget />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SkillTree />
          <InventoryPanel />
        </div>
      </div>
    </div>
  )
}
