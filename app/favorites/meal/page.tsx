import { MealFavoritesView } from "@/components/favorites/meal-favorites-view"
import { MobileNavigation } from "@/components/mobile-navigation"
import { aiTheme } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function MealFavoritesPage() {
  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />

        <div className="pt-20 md:pt-24 pb-24">
          <div className="mobile-container">
            <div className="text-center space-y-4 mb-8">
              <h1 className={`font-heading font-bold text-3xl md:text-4xl ${aiTheme.primaryGradientText}`}>Meals</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Your favorite meals and recipes
              </p>
            </div>

            <MealFavoritesView />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
