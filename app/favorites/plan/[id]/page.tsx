import { FavoritePlanDetail } from "@/components/favorites/favorite-plan-detail"
import { MobileNavigation } from "@/components/mobile-navigation"
import { aiTheme } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data - in una app reale questo verrebbe da un database
const mockPlan = {
  id: "1",
  name: "Mediterranean Weight Loss Plan",
  description: "7-day Mediterranean diet for sustainable weight loss",
  savedAt: "2024-01-15T10:30:00Z",
  tags: ["weight-loss", "mediterranean", "7-days"],
  data: {
    duration: "1_week",
    totalCalories: 1800,
    macros: { protein: 135, carbs: 180, fat: 60 },
    days: 7,
  },
}

export default function PlanDetailPage({ params }: { params: { id: string } }) {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />
        <FavoritePlanDetail plan={mockPlan} onBack={handleBack} />
      </div>
    </ProtectedRoute>
  )
}
