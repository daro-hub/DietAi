import { PlanFavoritesView } from "@/components/favorites/plan-favorites-view"
import { MobileNavigation } from "@/components/mobile-navigation"
import { aiTheme } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function PlanFavoritesPage() {
  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />

        <div className="pt-20 md:pt-24 pb-24">
          <div className="mobile-container">
            <div className="text-center space-y-4 mb-8">
              <h1 className={`font-heading font-bold text-3xl md:text-4xl ${aiTheme.primaryGradientText}`}>Diet Plans</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Your saved diet plans and nutrition programs
              </p>
            </div>

            <PlanFavoritesView />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
