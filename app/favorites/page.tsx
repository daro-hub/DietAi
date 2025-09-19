import { FavoritesManager } from "@/components/favorites/favorites-manager"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="mobile-container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl">My Favorites</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Your saved diet plans, meals, and ingredients all in one place
            </p>
          </div>

          <FavoritesManager />
        </div>
      </div>
    </div>
  )
}
