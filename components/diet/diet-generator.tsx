"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Wand2, RefreshCw, Settings } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"
import { DietPlan } from "./diet-plan"
import { GenerationSettings } from "./generation-settings"

interface GenerationParams {
  goal: string
  duration: string
  customPrompt: string
  includeSnacks: boolean
  mealComplexity: string
}

export function DietGenerator() {
  const { user } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)
  const [params, setParams] = useState<GenerationParams>({
    goal: user?.preferences?.goal || "lose_weight",
    duration: "1_week",
    customPrompt: "",
    includeSnacks: true,
    mealComplexity: "moderate",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock generated diet plan
      const mockPlan = {
        id: Date.now().toString(),
        title: "Personalized Weight Loss Plan",
        description: "A balanced 7-day meal plan designed for sustainable weight loss",
        duration: params.duration,
        totalCalories: 1800,
        macros: {
          protein: 135, // grams
          carbs: 180,
          fat: 60,
        },
        days: generateMockDays(),
        createdAt: new Date().toISOString(),
      }

      setGeneratedPlan(mockPlan)
    } catch (error) {
      console.error("Generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMockDays = () => {
    const days = []
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    for (let i = 0; i < 7; i++) {
      days.push({
        day: dayNames[i],
        meals: [
          {
            type: "breakfast",
            name: "Greek Yogurt Parfait",
            ingredients: [
              { name: "Greek yogurt", amount: "200g", calories: 130, protein: 20, carbs: 9, fat: 0 },
              { name: "Mixed berries", amount: "100g", calories: 57, protein: 1, carbs: 14, fat: 0 },
              { name: "Granola", amount: "30g", calories: 134, protein: 3, carbs: 18, fat: 6 },
              { name: "Honey", amount: "15g", calories: 46, protein: 0, carbs: 12, fat: 0 },
            ],
            totalCalories: 367,
            totalMacros: { protein: 24, carbs: 53, fat: 6 },
          },
          {
            type: "lunch",
            name: "Grilled Chicken Salad",
            ingredients: [
              { name: "Chicken breast", amount: "150g", calories: 231, protein: 43, carbs: 0, fat: 5 },
              { name: "Mixed greens", amount: "100g", calories: 20, protein: 2, carbs: 4, fat: 0 },
              { name: "Cherry tomatoes", amount: "100g", calories: 18, protein: 1, carbs: 4, fat: 0 },
              { name: "Cucumber", amount: "50g", calories: 8, protein: 0, carbs: 2, fat: 0 },
              { name: "Olive oil", amount: "15ml", calories: 119, protein: 0, carbs: 0, fat: 14 },
            ],
            totalCalories: 396,
            totalMacros: { protein: 46, carbs: 10, fat: 19 },
          },
          {
            type: "dinner",
            name: "Baked Salmon with Quinoa",
            ingredients: [
              { name: "Salmon fillet", amount: "150g", calories: 231, protein: 31, carbs: 0, fat: 11 },
              { name: "Quinoa", amount: "80g dry", calories: 312, protein: 12, carbs: 57, fat: 5 },
              { name: "Broccoli", amount: "150g", calories: 51, protein: 5, carbs: 10, fat: 1 },
              { name: "Lemon", amount: "1 piece", calories: 17, protein: 1, carbs: 5, fat: 0 },
            ],
            totalCalories: 611,
            totalMacros: { protein: 49, carbs: 72, fat: 17 },
          },
        ],
      })
    }

    return days
  }

  if (generatedPlan) {
    return <DietPlan plan={generatedPlan} onBack={() => setGeneratedPlan(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Quick Generation */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Generate
          </CardTitle>
          <CardDescription>Generate a diet plan based on your profile and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Goal</Label>
              <Select value={params.goal} onValueChange={(value) => setParams((prev) => ({ ...prev, goal: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                  <SelectItem value="maintain_weight">Maintain Weight</SelectItem>
                  <SelectItem value="gain_weight">Gain Weight</SelectItem>
                  <SelectItem value="build_muscle">Build Muscle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Select
                value={params.duration}
                onValueChange={(value) => setParams((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_day">1 Day</SelectItem>
                  <SelectItem value="3_days">3 Days</SelectItem>
                  <SelectItem value="1_week">1 Week</SelectItem>
                  <SelectItem value="2_weeks">2 Weeks</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full h-12 text-base font-medium">
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating Your Plan...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5 mr-2" />
                Generate Diet Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Custom Generation */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-secondary" />
            Custom Generation
          </CardTitle>
          <CardDescription>Add specific requirements or preferences for your diet plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Additional Requirements</Label>
            <Textarea
              id="custom-prompt"
              placeholder="e.g., I want high-protein meals, avoid dairy, include Mediterranean dishes..."
              value={params.customPrompt}
              onChange={(e) => setParams((prev) => ({ ...prev, customPrompt: e.target.value }))}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Advanced Settings
            </Button>

            <Button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-2">
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Custom Plan
                </>
              )}
            </Button>
          </div>

          {showSettings && <GenerationSettings params={params} onUpdate={setParams} />}
        </CardContent>
      </Card>

      {/* User Preferences Summary */}
      {user?.preferences && (
        <Card className="border-0 bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Your Profile</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{user.preferences.goal?.replace("_", " ")}</Badge>
                  {user.preferences.dietaryRestrictions?.map((restriction) => (
                    <Badge key={restriction} variant="secondary" className="text-xs">
                      {restriction}
                    </Badge>
                  ))}
                  {user.preferences.allergies?.map((allergy) => (
                    <Badge key={allergy} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  These preferences will be automatically included in your generated plans.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
