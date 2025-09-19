import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Target, Heart, BookOpen, ArrowRight, Zap, Shield, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      {/* Hero Section */}
      <section className="pt-20 md:pt-32 pb-16">
        <div className="mobile-container">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Nutrition
            </div>

            <h1 className="font-heading font-bold text-4xl md:text-6xl text-balance leading-tight">
              Personalized Nutrition
              <span className="text-primary block">Made Simple</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Generate custom diet plans tailored to your goals, preferences, and lifestyle. Track macros, save
              favorites, and discover healthy recipes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/generate" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate My Diet
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Link href="/recipes">Explore Recipes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="mobile-container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">Everything You Need</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Powerful features to help you achieve your nutrition goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Goal-Based Plans</h3>
                <p className="text-muted-foreground">
                  Whether you want to lose weight, gain muscle, or maintain your current physique, we create plans that
                  match your specific goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Smart Regeneration</h3>
                <p className="text-muted-foreground">
                  Don't like a meal or ingredient? Regenerate individual items or entire plans with a single tap.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Save Favorites</h3>
                <p className="text-muted-foreground">
                  Love a particular meal or diet plan? Save it to your favorites for quick access anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Recipe Library</h3>
                <p className="text-muted-foreground">
                  Discover new recipes and cooking tips to make your nutrition journey more enjoyable and sustainable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Macro Tracking</h3>
                <p className="text-muted-foreground">
                  Get detailed breakdowns of proteins, carbs, and fats for every meal and ingredient.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Mobile First</h3>
                <p className="text-muted-foreground">
                  Designed for mobile with PWA support. Install the app for offline access and a native experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mobile-container">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Ready to Transform Your Nutrition?</h2>
              <p className="text-lg text-primary-foreground/90 mb-8 text-pretty">
                Join thousands of users who have already improved their health with DietAI
              </p>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/generate" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Start Your Journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 md:h-0" />
    </div>
  )
}
