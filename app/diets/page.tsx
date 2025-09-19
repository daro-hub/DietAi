import { MobileNavigation } from "@/components/mobile-navigation"
import { DietsExplorer } from "@/components/diets/diets-explorer"

export default function DietsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="mobile-container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl">Explore Diet Types</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover the most popular and effective diet approaches
            </p>
          </div>

          <DietsExplorer />
        </div>
      </div>
    </div>
  )
}
