import { RecipesExplorer } from "@/components/recipes/recipes-explorer"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="mobile-container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl">Recipe Library</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover healthy recipes and cooking tips to enhance your nutrition journey
            </p>
          </div>

          <RecipesExplorer />
        </div>
      </div>
    </div>
  )
}
