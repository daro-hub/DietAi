import { MobileNavigation } from "@/components/mobile-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, FileText, Heart } from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="mobile-container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl">Generate Your Diet</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Create your personalized nutrition plan in just a few steps
            </p>
          </div>

          <div className="space-y-6">
            {/* Quick Generation */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Quick Generation</CardTitle>
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
                <Button asChild className="w-full">
                  <Link href="/generate/wizard">
                    Start Quick Generation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

          {/* Advanced Generation */}
          <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute -top-2 left-4 z-10">
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                Recommended
              </span>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Advanced Generation</CardTitle>
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
              <Button asChild className="w-full">
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
            <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms create personalized nutrition plans
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-full w-fit mx-auto">
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold">Detailed Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive macronutrient breakdown and meal planning
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 bg-green-500/10 rounded-full w-fit mx-auto">
                  <Heart className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold">Easy Management</h3>
                <p className="text-sm text-muted-foreground">
                  Save, modify, and track your diet plans effortlessly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}