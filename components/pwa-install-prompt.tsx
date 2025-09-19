"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running as PWA
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    // Check if iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-prompt-dismissed", "true")
  }

  // Don't show if already installed, dismissed, or not supported
  if (isStandalone || localStorage.getItem("pwa-prompt-dismissed") || (!deferredPrompt && !isIOS) || !showPrompt) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border-primary/20 bg-card/95 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-sm text-card-foreground">Install DietAI</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {isIOS
                ? "Add to Home Screen for the best experience"
                : "Install our app for faster access and offline features"}
            </p>
            <div className="flex gap-2 mt-3">
              {isIOS ? (
                <Button size="sm" variant="outline" onClick={handleDismiss}>
                  Maybe Later
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={handleInstall}>
                    Install
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDismiss}>
                    Not Now
                  </Button>
                </>
              )}
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={handleDismiss} className="flex-shrink-0 h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
