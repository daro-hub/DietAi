import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { MobileNavigation } from "@/components/mobile-navigation"
import { CurrentDietDashboard } from "@/components/diet/current-diet-dashboard"
import { aiTheme } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />

        <div className="pt-20 md:pt-24 pb-24">
          <div className="mobile-container">
            <CurrentDietDashboard />
          </div>
        </div>

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />

        {/* Bottom padding for mobile navigation */}
        <div className="h-20 md:h-0" />
      </div>
    </ProtectedRoute>
  )
}
