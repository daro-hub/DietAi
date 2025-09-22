"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getLocalStorageItem } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Check,
  X,
  RefreshCw,
  Edit,
  Coffee,
  Apple,
  Utensils,
  Cookie
} from "lucide-react"

export function DietReview() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Load form data from localStorage
    const savedData = getLocalStorageItem("dietai-generated-plan")
    if (savedData) {
      setFormData(savedData)
    } else {
      // If no data, redirect back to wizard
      router.push("/generate/wizard")
    }
  }, [router])

  const toggleMeal = (mealId: string) => {
    setExpandedMeals((prev) => ({ ...prev, [mealId]: !prev[mealId] }))
  }

  const getMealIcon = (mealId: string) => {
    switch (mealId) {
      case "breakfast": return <Coffee className="w-6 h-6" />
      case "lunch": return <Utensils className="w-6 h-6" />
      case "dinner": return <Utensils className="w-6 h-6" />
      case "snacks": return <Cookie className="w-6 h-6" />
      default: return <Apple className="w-6 h-6" />
    }
  }

  const getIngredientIcon = (ingredientName: string) => {
    const name = ingredientName.toLowerCase()
    if (name.includes("oats") || name.includes("cereal")) return "🌾"
    if (name.includes("banana") || name.includes("berry")) return "🍌"
    if (name.includes("chicken") || name.includes("meat")) return "🍗"
    if (name.includes("salmon") || name.includes("fish")) return "🐟"
    if (name.includes("quinoa") || name.includes("rice")) return "🌾"
    if (name.includes("broccoli") || name.includes("vegetable")) return "🥦"
    if (name.includes("avocado")) return "🥑"
    if (name.includes("yogurt")) return "🥛"
    if (name.includes("almond") || name.includes("nut")) return "🥜"
    if (name.includes("oil")) return "🫒"
    return "🥗"
  }

  const exampleDiet = {
    totalCalories: 2150,
    totalMacros: { protein: 140, carbs: 215, fat: 95, fiber: 35 },
    meals: [
      {
        id: "breakfast",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 520,
        macros: { protein: 28, carbs: 45, fat: 22, fiber: 8 },
        ingredients: [
          {
            id: "oats",
            name: "Rolled Oats",
            amount: "60g",
            calories: 220,
            macros: { protein: 8, carbs: 40, fat: 4, fiber: 6 },
          },
          {
            id: "banana",
            name: "Banana",
            amount: "1 medium",
            calories: 105,
            macros: { protein: 1, carbs: 27, fat: 0, fiber: 3 },
          },
          {
            id: "almonds",
            name: "Almonds",
            amount: "20g",
            calories: 115,
            macros: { protein: 4, carbs: 4, fat: 10, fiber: 2 },
          },
          {
            id: "milk",
            name: "Almond Milk",
            amount: "200ml",
            calories: 80,
            macros: { protein: 3, carbs: 8, fat: 3, fiber: 1 },
          },
        ],
      },
      {
        id: "lunch",
        name: "Lunch",
        time: "12:30 PM",
        calories: 680,
        macros: { protein: 45, carbs: 52, fat: 28, fiber: 12 },
        ingredients: [
          {
            id: "chicken",
            name: "Grilled Chicken Breast",
            amount: "150g",
            calories: 280,
            macros: { protein: 35, carbs: 0, fat: 8, fiber: 0 },
          },
          {
            id: "quinoa",
            name: "Quinoa",
            amount: "80g dry",
            calories: 220,
            macros: { protein: 8, carbs: 40, fat: 4, fiber: 5 },
          },
          {
            id: "broccoli",
            name: "Broccoli",
            amount: "150g",
            calories: 51,
            macros: { protein: 5, carbs: 10, fat: 1, fiber: 5 },
          },
          {
            id: "avocado",
            name: "Avocado",
            amount: "1/2 medium",
            calories: 129,
            macros: { protein: 2, carbs: 7, fat: 12, fiber: 2 },
          },
        ],
      },
      {
        id: "dinner",
        name: "Dinner",
        time: "7:00 PM",
        calories: 650,
        macros: { protein: 42, carbs: 68, fat: 25, fiber: 10 },
        ingredients: [
          {
            id: "salmon",
            name: "Baked Salmon",
            amount: "150g",
            calories: 280,
            macros: { protein: 35, carbs: 0, fat: 15, fiber: 0 },
          },
          {
            id: "sweet-potato",
            name: "Sweet Potato",
            amount: "200g",
            calories: 180,
            macros: { protein: 4, carbs: 42, fat: 0, fiber: 6 },
          },
          {
            id: "spinach",
            name: "Spinach Salad",
            amount: "100g",
            calories: 23,
            macros: { protein: 3, carbs: 4, fat: 0, fiber: 2 },
          },
          {
            id: "olive-oil",
            name: "Olive Oil",
            amount: "1 tbsp",
            calories: 120,
            macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 },
          },
        ],
      },
      {
        id: "snacks",
        name: "Snacks",
        time: "3:00 PM",
        calories: 300,
        macros: { protein: 25, carbs: 50, fat: 20, fiber: 5 },
        ingredients: [
          {
            id: "greek-yogurt",
            name: "Greek Yogurt",
            amount: "200g",
            calories: 130,
            macros: { protein: 20, carbs: 9, fat: 0, fiber: 0 },
          },
          {
            id: "berries",
            name: "Mixed Berries",
            amount: "100g",
            calories: 60,
            macros: { protein: 1, carbs: 14, fat: 0, fiber: 6 },
          },
          {
            id: "walnuts",
            name: "Walnuts",
            amount: "15g",
            calories: 100,
            macros: { protein: 2, carbs: 2, fat: 10, fiber: 1 },
          },
        ],
      },
    ],
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your diet plan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-4xl mx-auto">
        {/* Title and Description */}
        <div className="text-center p-4 pt-6">
          <h1 className="text-2xl font-bold mb-2">Your Diet Plan</h1>
          <p className="text-muted-foreground">
            {formData.age ? `${formData.age}y, ${formData.weight}kg, ${formData.height}m, ${formData.gender}` : 'Personalized nutrition plan'}
          </p>
        </div>

        {/* Meals List - Mobile optimized */}
        <div className="space-y-3 px-3 pb-4">
          {exampleDiet.meals.map((meal) => (
            <Card key={meal.id} className="cursor-pointer hover:shadow-md transition-shadow mx-0" onClick={() => toggleMeal(meal.id)}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-xl flex-shrink-0">
                      {getMealIcon(meal.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold truncate">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-primary">{meal.calories}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                </div>

                {/* Expanded Meal Details */}
                {expandedMeals[meal.id] && (
                  <div className="mt-3 space-y-3">
                    {/* Macronutrients in separate cards */}
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{meal.calories}</div>
                          <div className="text-xs text-muted-foreground">Calories</div>
                        </div>
                      </Card>
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold">{meal.macros.protein}g</div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </div>
                      </Card>
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold">{meal.macros.carbs}g</div>
                          <div className="text-xs text-muted-foreground">Carbs</div>
                        </div>
                      </Card>
                      <Card className="p-2">
                        <div className="text-sm font-bold">{meal.macros.fat}g</div>
                        <div className="text-xs text-muted-foreground">Fat</div>
                      </Card>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Ingredients:</h4>
                      {meal.ingredients.map((ingredient) => (
                        <Card key={ingredient.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-2">
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
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Totals - At bottom */}
        <div className="px-3 pb-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-base">Daily Totals</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-lg font-bold text-primary">{exampleDiet.totalCalories}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.fat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.fiber}g</div>
                  <div className="text-xs text-muted-foreground">Fiber</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{Math.round(exampleDiet.totalCalories * 0.25)}g</div>
                  <div className="text-xs text-muted-foreground">Sugar</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex gap-3 bg-background/95 backdrop-blur-sm border rounded-2xl p-2 shadow-lg">
            <Button
              size="sm"
              className="w-12 h-12 rounded-xl"
              onClick={() => {
                // Accept action
                console.log("Accept diet plan")
                router.push("/generate/review")
              }}
            >
              <Check className="w-5 h-5" />
            </Button>
            
            <Button
              size="sm"
              variant="destructive"
              className="w-12 h-12 rounded-xl"
              onClick={() => {
                // Reject action
                console.log("Reject diet plan")
                router.push("/generate/wizard")
              }}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-xl"
              onClick={() => {
                // Regenerate action
                console.log("Regenerate diet plan")
                router.push("/generate/wizard")
              }}
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-xl"
              onClick={() => {
                // Modify action
                console.log("Modify diet plan")
                router.push("/generate/wizard")
              }}
            >
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
