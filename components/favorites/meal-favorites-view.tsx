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
  Cookie
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface MealItem {
  id: string
  name: string
  description?: string
  savedAt: string
  data: {
    type: string
    totalCalories: number
    totalMacros: { protein: number, carbs: number, fat: number }
    ingredients: Array<{
      name: string
      amount: string
      calories: number
      macros: { protein: number, carbs: number, fat: number }
    }>
  }
  tags?: string[]
}

export function MealFavoritesView() {
  const [meals, setMeals] = useState<MealItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockMeals: MealItem[] = [
      {
        id: "1",
        name: "Grilled Salmon with Quinoa",
        description: "High-protein dinner with omega-3 fatty acids",
        savedAt: "2024-01-14T18:45:00Z",
        tags: ["high-protein", "dinner", "salmon"],
        data: {
          type: "dinner",
          totalCalories: 520,
          totalMacros: { protein: 42, carbs: 35, fat: 18 },
          ingredients: [
            { name: "Salmon fillet", amount: "150g", calories: 231, macros: { protein: 30, carbs: 0, fat: 15 } },
            { name: "Quinoa", amount: "80g dry", calories: 312, macros: { protein: 8, carbs: 35, fat: 3 } },
            { name: "Broccoli", amount: "150g", calories: 51, macros: { protein: 4, carbs: 10, fat: 0 } },
          ],
        },
      },
      {
        id: "2",
        name: "Protein Smoothie Bowl",
        description: "Post-workout breakfast with berries",
        savedAt: "2024-01-11T07:30:00Z",
        tags: ["breakfast", "smoothie", "post-workout"],
        data: {
          type: "breakfast",
          totalCalories: 380,
          totalMacros: { protein: 28, carbs: 45, fat: 8 },
          ingredients: [
            { name: "Protein powder", amount: "30g", calories: 120, macros: { protein: 20, carbs: 5, fat: 2 } },
            { name: "Banana", amount: "1 medium", calories: 105, macros: { protein: 1, carbs: 27, fat: 0 } },
            { name: "Mixed berries", amount: "100g", calories: 57, macros: { protein: 1, carbs: 14, fat: 0 } },
            { name: "Greek yogurt", amount: "100g", calories: 98, macros: { protein: 6, carbs: 4, fat: 6 } },
          ],
        },
      },
      {
        id: "3",
        name: "Chicken Curry and Rice",
        description: "Spicy and flavorful main course",
        savedAt: "2024-01-10T19:20:00Z",
        tags: ["dinner", "spicy", "curry"],
        data: {
          type: "dinner",
          totalCalories: 650,
          totalMacros: { protein: 45, carbs: 68, fat: 25 },
          ingredients: [
            { name: "Chicken breast", amount: "150g", calories: 250, macros: { protein: 30, carbs: 0, fat: 15 } },
            { name: "Basmati rice", amount: "100g", calories: 350, macros: { protein: 7, carbs: 75, fat: 1 } },
            { name: "Coconut milk", amount: "100ml", calories: 50, macros: { protein: 1, carbs: 2, fat: 5 } },
          ],
        },
      },
    ]

    setMeals(mockMeals)
    setIsLoading(false)
  }

  const toggleMeal = (mealId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }))
  }

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case "breakfast": return <Coffee className="w-5 h-5" />
      case "lunch": return <Utensils className="w-5 h-5" />
      case "dinner": return <Utensils className="w-5 h-5" />
      case "snacks": return <Cookie className="w-5 h-5" />
      default: return <Apple className="w-5 h-5" />
    }
  }

  const getIngredientIcon = (name: string) => {
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("broccoli") || name.includes("broccoli")) return "🥦"
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
    if (name.includes("rice") || name.includes("riso")) return "🍚"
    if (name.includes("yogurt") || name.includes("yogurt")) return "🥛"
    if (name.includes("berry") || name.includes("frutti")) return "🫐"
    if (name.includes("banana")) return "🍌"
    if (name.includes("coconut") || name.includes("cocco")) return "🥥"
    if (name.includes("protein") || name.includes("proteina")) return "💪"
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

  if (meals.length === 0) {
    return (
      <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
        <CardContent className="p-12 text-center">
          <div className={`p-4 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-full w-fit mx-auto mb-4`}>
            <Utensils className={`h-16 w-16 ${getCyclicColor(2, aiTheme.accentColors)}`} />
          </div>
          <h3 className={`font-heading font-bold text-xl mb-2 ${getCyclicColor(2, aiTheme.textColors)}`}>No Meals Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite meals and recipes to see them here.
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
      {/* Lista dei pasti */}
      <div className="space-y-3">
        {meals.map((meal, index) => (
          <Card key={meal.id} className={`cursor-pointer ${aiTheme.aiCardHover} mx-0 bg-white border border-gray-200 relative`} onClick={() => toggleMeal(meal.id)}>
            <CardContent className="py-0 px-2">
              {/* Freccia espandi */}
              <div className="absolute top-2 right-2 z-10">
                {expandedMeals[meal.id] ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              <div className="flex items-center justify-between pr-8">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`text-xl flex-shrink-0 ${getCyclicColor(index, aiTheme.accentColors)}`}>
                    {getMealIcon(meal.data.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate text-gray-800">
                      {meal.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">{meal.data.type}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${getCyclicColor(index, aiTheme.accentColors)}`}>{meal.data.totalCalories}</div>
                  <div className="text-xs text-muted-foreground">cal</div>
                </div>
              </div>

              {/* Expanded Meal Details */}
              {expandedMeals[meal.id] && (
                <div className="mt-3 space-y-3">
                  {/* Macronutrients in separate cards */}
                  <div className="grid grid-cols-4 gap-1">
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{meal.data.totalCalories}</div>
                      <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Cal</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{meal.data.totalMacros.carbs}g</div>
                      <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Carb</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{meal.data.totalMacros.protein}g</div>
                      <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Prot</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{meal.data.totalMacros.fat}g</div>
                      <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Grassi</div>
                    </Card>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Description:</h4>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Ingredients:</h4>
                    {meal.data.ingredients.map((ingredient, idx) => (
                      <Card key={idx} className="hover:shadow-md transition-shadow py-2 px-1">
                        <CardContent className="py-0 px-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <div className="text-lg flex-shrink-0">{getIngredientIcon(ingredient.name)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{ingredient.name}</div>
                                <div className="text-xs text-muted-foreground">{ingredient.calories} cal</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <div className="text-right">
                                <div className="font-medium text-sm">{ingredient.amount}</div>
                                <div className="text-xs text-muted-foreground">
                                  P:{ingredient.macros.protein} C:{ingredient.macros.carbs} F:{ingredient.macros.fat}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Tags */}
                  {meal.tags && meal.tags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {meal.tags.map((tag: string) => (
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
