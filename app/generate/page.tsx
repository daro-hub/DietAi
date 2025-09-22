import { MobileNavigation } from "@/components/mobile-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, FileText, Heart } from "lucide-react"
import Link from "next/link"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function GeneratePage() {
  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${aiTheme.primaryGradientBg}`}>
        <MobileNavigation />

        <div className="pt-20 md:pt-24 pb-24">
          <div className="mobile-container">
            <div className="text-center space-y-4 mb-8">
              <h1 className={`font-heading font-bold text-3xl md:text-4xl ${aiTheme.primaryGradientText}`}>Generate Your Diet</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Create your personalized nutrition plan in just a few steps
              </p>
            </div>

            <div className="space-y-6">
              {/* Quick Generation */}
              <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-lg`}>
                      <Sparkles className={`h-6 w-6 ${getCyclicColor(0, aiTheme.accentColors)}`} />
                    </div>
                    <div>
                      <CardTitle className={getCyclicColor(0, aiTheme.textColors)}>Quick Generation</CardTitle>
                      <CardDescription>
                        Get a diet plan instantly with AI-powered recommendations
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Answer a few quick questions and get your personalized diet plan in seconds.
                  </p>
                  <Button asChild className={`w-full ${aiTheme.aiButton}`}>
                    <Link href="/generate/wizard">
                      Start Quick Generation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Advanced Generation */}
              <Card className={`relative ${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                  <span className={`${aiTheme.primaryGradient} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    Recommended
                  </span>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-lg`}>
                      <FileText className={`h-6 w-6 ${getCyclicColor(1, aiTheme.accentColors)}`} />
                    </div>
                    <div>
                      <CardTitle className={getCyclicColor(1, aiTheme.textColors)}>Advanced Generation</CardTitle>
                      <CardDescription>
                        Detailed questionnaire for precise customization
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete a comprehensive assessment for the most tailored diet plan.
                  </p>
                  <Button asChild className={`w-full ${aiTheme.aiButton}`}>
                    <Link href="/generate/wizard?mode=advanced">
                      Start Advanced Generation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="mt-12">
              <h2 className={`text-2xl font-bold text-center mb-8 ${aiTheme.primaryGradientText}`}>Why Choose Our Generator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className={`p-3 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-full w-fit mx-auto`}>
                    <Sparkles className={`h-8 w-8 ${getCyclicColor(0, aiTheme.accentColors)}`} />
                  </div>
                  <h3 className={`font-semibold ${getCyclicColor(0, aiTheme.textColors)}`}>AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms create personalized nutrition plans
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className={`p-3 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-full w-fit mx-auto`}>
                    <FileText className={`h-8 w-8 ${getCyclicColor(1, aiTheme.accentColors)}`} />
                  </div>
                  <h3 className={`font-semibold ${getCyclicColor(1, aiTheme.textColors)}`}>Detailed Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive macronutrient breakdown and meal planning
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className={`p-3 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-full w-fit mx-auto`}>
                    <Heart className={`h-8 w-8 ${getCyclicColor(2, aiTheme.accentColors)}`} />
                  </div>
                  <h3 className={`font-semibold ${getCyclicColor(2, aiTheme.textColors)}`}>Easy Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Save, modify, and track your diet plans effortlessly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}