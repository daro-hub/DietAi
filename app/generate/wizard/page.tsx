import { SimpleGenerateOptions } from "@/components/diet/simple-generate-options"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function GenerateWizardPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />
      <SimpleGenerateOptions />
    </div>
  )
}
