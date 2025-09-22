import { SimpleGenerateOptions } from "@/components/diet/simple-generate-options"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function GenerateWizardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <MobileNavigation />
        <SimpleGenerateOptions />
      </div>
    </ProtectedRoute>
  )
}
