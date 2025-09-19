"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, RefreshCw, Download, Share, MoreHorizontal } from "lucide-react"
import { MealCard } from "./meal-card"
import { MacroChart } from "./macro-chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DietPlanProps {
  plan: any
  onBack: () => void
}

export function DietPlan({ plan, onBack }: DietPlanProps) {
  const [activeDay, setActiveDay] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  const handleSavePlan = async () => {
    setIsSaving(true)
    // Simulate saving to favorites
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleRegeneratePlan = () => {
    // Regenerate entire plan
    onBack()
  }

  const currentDay = plan.days[activeDay]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Generator
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSavePlan} disabled={isSaving}>
              <Heart className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save to Favorites"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="h-4 w-4 mr-2" />
              Share Plan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRegeneratePlan}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Plan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Plan Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-heading font-bold text-2xl">{plan.title}</CardTitle>
              <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {plan.duration.replace("_", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{plan.totalCalories}</div>
              <div className="text-sm text-muted-foreground">Daily Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{plan.macros.protein}g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{plan.macros.carbs}g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{plan.macros.fat}g</div>
              <div className="text-sm text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Tabs */}
      <Tabs value={activeDay.toString()} onValueChange={(value) => setActiveDay(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-7">
          {plan.days.map((day: any, index: number) => (
            <TabsTrigger key={index} value={index.toString()} className="text-xs">
              {day.day.slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {plan.days.map((day: any, index: number) => (
          <TabsContent key={index} value={index.toString()} className="space-y-6">
            {/* Day Overview */}
            <Card className="border-0 bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl">{day.day}</h3>
                  <div className="text-sm text-muted-foreground">
                    {day.meals.reduce((total: number, meal: any) => total + meal.totalCalories, 0)} calories
                  </div>
                </div>
                <MacroChart
                  macros={{
                    protein: day.meals.reduce((total: number, meal: any) => total + meal.totalMacros.protein, 0),
                    carbs: day.meals.reduce((total: number, meal: any) => total + meal.totalMacros.carbs, 0),
                    fat: day.meals.reduce((total: number, meal: any) => total + meal.totalMacros.fat, 0),
                  }}
                />
              </CardContent>
            </Card>

            {/* Meals */}
            <div className="space-y-4">
              {day.meals.map((meal: any, mealIndex: number) => (
                <MealCard
                  key={mealIndex}
                  meal={meal}
                  onRegenerate={() => {
                    // Handle meal regeneration
                    console.log("Regenerate meal:", meal.name)
                  }}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
