import { FavoriteMealDetail } from "@/components/favorites/favorite-meal-detail"
import { MobileNavigation } from "@/components/mobile-navigation"
import { aiTheme } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data - in una app reale questo verrebbe da un database
const mockMeal = {
  id: "2",
  name: "Grilled Salmon with Quinoa",
  description: "High-protein dinner with omega-3 fatty acids",
  savedAt: "2024-01-14T18:45:00Z",
  tags: ["high-protein", "dinner", "salmon"],
  data: {
    type: "dinner",
    totalCalories: 520,
    totalMacros: { protein: 42, carbs: 35, fat: 18 },
    ingredients: [
      { name: "Salmon fillet", amount: "150g", calories: 231 },
      { name: "Quinoa", amount: "80g dry", calories: 312 },
      { name: "Broccoli", amount: "150g", calories: 51 },
    ],
  },
}

export default function MealDetailPage({ params }: { params: { id: string } }) {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />
        <FavoriteMealDetail meal={mockMeal} onBack={handleBack} />
      </div>
    </ProtectedRoute>
  )
}
