import { SimpleGenerateOptions } from "@/components/diet/simple-generate-options"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="mobile-container">
          <SimpleGenerateOptions />
        </div>
      </div>
    </div>
  )
}
