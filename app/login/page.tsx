import { LoginForm } from "@/components/auth/login-form"
import { MobileNavigation } from "@/components/mobile-navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      {/* Header */}
      <div className="pt-20 md:pt-8 pb-8">
        <div className="mobile-container">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Login Form */}
      <div className="mobile-container pb-24">
        <LoginForm />
      </div>
    </div>
  )
}
