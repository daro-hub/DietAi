import { FavoriteIngredientDetail } from "@/components/favorites/favorite-ingredient-detail"
import { MobileNavigation } from "@/components/mobile-navigation"
import { aiTheme } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data - in una app reale questo verrebbe da un database
const mockIngredient = {
  id: "3",
  name: "Greek Yogurt",
  description: "High-protein breakfast staple",
  savedAt: "2024-01-13T08:15:00Z",
  tags: ["high-protein", "breakfast", "dairy"],
  data: {
    calories: 130,
    protein: 20,
    carbs: 9,
    fat: 0,
    servingSize: "200g",
  },
}

export default function IngredientDetailPage({ params }: { params: { id: string } }) {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />
        <FavoriteIngredientDetail ingredient={mockIngredient} onBack={handleBack} />
      </div>
    </ProtectedRoute>
  )
}
