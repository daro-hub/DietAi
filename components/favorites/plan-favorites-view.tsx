"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ChevronDown,
  ChevronUp,
  Coffee,
  Apple,
  Utensils,
  Cookie,
  Calendar
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface PlanItem {
  id: string
  name: string
  description?: string
  savedAt: string
  data: {
    duration: string
    totalCalories: number
    macros: { protein: number, carbs: number, fat: number }
    days: number
  }
  tags?: string[]
}

export function PlanFavoritesView() {
  const [plans, setPlans] = useState<PlanItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedPlans, setExpandedPlans] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockPlans: PlanItem[] = [
      {
        id: "1",
        name: "Mediterranean Weight Loss Plan",
        description: "7-day Mediterranean diet for sustainable weight loss",
        savedAt: "2024-01-15T10:30:00Z",
        tags: ["weight-loss", "mediterranean", "7-days"],
        data: {
          duration: "1_week",
          totalCalories: 1800,
          macros: { protein: 135, carbs: 180, fat: 60 },
          days: 7,
        },
      },
      {
        id: "2",
        name: "Muscle Building Bulk Plan",
        description: "High-calories plan for muscle growth",
        savedAt: "2024-01-12T14:20:00Z",
        tags: ["muscle-building", "bulk", "high-calorie"],
        data: {
          duration: "2_weeks",
          totalCalories: 2800,
          macros: { protein: 210, carbs: 350, fat: 93 },
          days: 14,
        },
      },
      {
        id: "3",
        name: "Keto Diet Plan",
        description: "Low-carb, high-fat ketogenic diet",
        savedAt: "2024-01-10T09:15:00Z",
        tags: ["keto", "low-carb", "high-fat"],
        data: {
          duration: "1_week",
          totalCalories: 1600,
          macros: { protein: 120, carbs: 20, fat: 130 },
          days: 7,
        },
      },
    ]

    setPlans(mockPlans)
    setIsLoading(false)
  }

  const togglePlan = (planId: string) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }))
  }

  const getMealIcon = (mealId: string) => {
    switch (mealId) {
      case "breakfast": return <Coffee className="w-5 h-5" />
      case "lunch": return <Utensils className="w-5 h-5" />
      case "dinner": return <Utensils className="w-5 h-5" />
      case "snacks": return <Cookie className="w-5 h-5" />
      default: return <Apple className="w-5 h-5" />
    }
  }

  const getIngredientIcon = (name: string) => {
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("rice") || name.includes("riso")) return "🍚"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("pasta")) return "🍝"
    if (name.includes("yogurt") || name.includes("yogurt")) return "🥛"
    if (name.includes("berry") || name.includes("frutti")) return "🫐"
    if (name.includes("almond") || name.includes("nut")) return "🥜"
    if (name.includes("oil")) return "🫒"
    return "🥗"
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className={`${aiTheme.aiCard} border border-gray-200`}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
        <CardContent className="p-12 text-center">
          <div className={`p-4 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-full w-fit mx-auto mb-4`}>
            <Calendar className={`h-16 w-16 ${getCyclicColor(1, aiTheme.accentColors)}`} />
          </div>
          <h3 className={`font-heading font-bold text-xl mb-2 ${getCyclicColor(1, aiTheme.textColors)}`}>No Diet Plans Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite diet plans to see them here.
          </p>
          <Button asChild className={aiTheme.aiButton}>
            <a href="/generate">Generate Your First Plan</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Lista dei piani dietetici */}
      <div className="space-y-3">
        {plans.map((plan, index) => (
          <Card key={plan.id} className={`cursor-pointer ${aiTheme.aiCardHover} mx-0 bg-white border border-gray-200 relative`} onClick={() => togglePlan(plan.id)}>
            <CardContent className="py-0 px-2">
              {/* Freccia espandi */}
              <div className="absolute top-2 right-2 z-10">
                {expandedPlans[plan.id] ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              <div className="flex items-center justify-between pr-8">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`text-xl flex-shrink-0 ${getCyclicColor(index, aiTheme.accentColors)}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate text-gray-800">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plan.data.days} days</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${getCyclicColor(index, aiTheme.accentColors)}`}>{plan.data.totalCalories}</div>
                  <div className="text-xs text-muted-foreground">cal/day</div>
                </div>
              </div>

              {/* Expanded Plan Details */}
              {expandedPlans[plan.id] && (
                <div className="mt-3 space-y-3">
                  {/* Macronutrients in separate cards */}
                  <div className="grid grid-cols-4 gap-1">
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{plan.data.totalCalories}</div>
                      <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Cal</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{plan.data.macros.carbs}g</div>
                      <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Carb</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{plan.data.macros.protein}g</div>
                      <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Prot</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{plan.data.macros.fat}g</div>
                      <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Grassi</div>
                    </Card>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Description:</h4>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  {/* Plan Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Plan Information:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{plan.data.days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Calories:</span>
                        <span className="font-medium">{plan.data.totalCalories} cal</span>
                      </div>
                    </div>
                  </div>

                  {/* Sample Meals */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Sample Meals:</h4>
                    <div className="space-y-2">
                      {[
                        { name: "Breakfast", recipe: "Greek Yogurt with Berries", calories: 350 },
                        { name: "Lunch", recipe: "Grilled Chicken Salad", calories: 450 },
                        { name: "Dinner", recipe: "Salmon with Quinoa", calories: 520 },
                        { name: "Snack", recipe: "Mixed Nuts", calories: 200 },
                      ].map((meal, idx) => (
                        <Card key={idx} className="hover:shadow-md transition-shadow py-2 px-1">
                          <CardContent className="py-0 px-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <div className="text-lg flex-shrink-0">{getMealIcon(meal.name.toLowerCase())}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">{meal.recipe}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{meal.name}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="text-right">
                                  <div className="font-medium text-sm">{meal.calories} cal</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {plan.tags && plan.tags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.tags.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
