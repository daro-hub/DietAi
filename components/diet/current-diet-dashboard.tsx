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

export function CurrentDietDashboard() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({})
  const [isLoading, setIsLoading] = useState(true)

  const daysOfWeek = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]

  // Mock data per la dieta attuale
  const currentDiet = {
    name: "Mediterranean Weight Loss Plan",
    totalCalories: 1800,
    macros: { protein: 135, carbs: 180, fat: 60 },
    days: 7,
    weeklyMeals: {
      monday: [
        {
          id: "breakfast-1",
          name: "Greek Yogurt with Berries",
          type: "breakfast",
          time: "8:00",
          calories: 350,
          macros: { protein: 20, carbs: 35, fat: 8 },
          ingredients: [
            { name: "Greek yogurt", amount: "200g", calories: 130, macros: { protein: 20, carbs: 9, fat: 0 } },
            { name: "Mixed berries", amount: "100g", calories: 57, macros: { protein: 1, carbs: 14, fat: 0 } },
            { name: "Honey", amount: "1 tbsp", calories: 64, macros: { protein: 0, carbs: 17, fat: 0 } },
            { name: "Almonds", amount: "15g", calories: 87, macros: { protein: 3, carbs: 3, fat: 8 } }
          ]
        },
        {
          id: "lunch-1",
          name: "Grilled Chicken Salad",
          type: "lunch",
          time: "13:00",
          calories: 450,
          macros: { protein: 35, carbs: 25, fat: 20 },
          ingredients: [
            { name: "Chicken breast", amount: "150g", calories: 250, macros: { protein: 30, carbs: 0, fat: 15 } },
            { name: "Mixed greens", amount: "100g", calories: 25, macros: { protein: 2, carbs: 5, fat: 0 } },
            { name: "Olive oil", amount: "1 tbsp", calories: 120, macros: { protein: 0, carbs: 0, fat: 14 } },
            { name: "Cherry tomatoes", amount: "100g", calories: 18, macros: { protein: 1, carbs: 4, fat: 0 } }
          ]
        },
        {
          id: "dinner-1",
          name: "Salmon with Quinoa",
          type: "dinner",
          time: "19:00",
          calories: 520,
          macros: { protein: 42, carbs: 35, fat: 18 },
          ingredients: [
            { name: "Salmon fillet", amount: "150g", calories: 231, macros: { protein: 30, carbs: 0, fat: 15 } },
            { name: "Quinoa", amount: "80g dry", calories: 312, macros: { protein: 8, carbs: 35, fat: 3 } },
            { name: "Broccoli", amount: "150g", calories: 51, macros: { protein: 4, carbs: 10, fat: 0 } }
          ]
        }
      ],
      tuesday: [
        {
          id: "breakfast-2",
          name: "Oatmeal with Banana",
          type: "breakfast",
          time: "8:00",
          calories: 320,
          macros: { protein: 12, carbs: 55, fat: 8 },
          ingredients: [
            { name: "Oats", amount: "50g", calories: 190, macros: { protein: 7, carbs: 34, fat: 4 } },
            { name: "Banana", amount: "1 medium", calories: 105, macros: { protein: 1, carbs: 27, fat: 0 } },
            { name: "Milk", amount: "200ml", calories: 100, macros: { protein: 8, carbs: 12, fat: 4 } }
          ]
        },
        {
          id: "lunch-2",
          name: "Mediterranean Wrap",
          type: "lunch",
          time: "13:00",
          calories: 480,
          macros: { protein: 25, carbs: 45, fat: 22 },
          ingredients: [
            { name: "Whole wheat tortilla", amount: "1 large", calories: 220, macros: { protein: 6, carbs: 36, fat: 6 } },
            { name: "Hummus", amount: "3 tbsp", calories: 120, macros: { protein: 4, carbs: 8, fat: 8 } },
            { name: "Cucumber", amount: "100g", calories: 16, macros: { protein: 1, carbs: 4, fat: 0 } },
            { name: "Feta cheese", amount: "30g", calories: 80, macros: { protein: 4, carbs: 1, fat: 6 } }
          ]
        },
        {
          id: "dinner-2",
          name: "Vegetable Stir-fry",
          type: "dinner",
          time: "19:00",
          calories: 380,
          macros: { protein: 18, carbs: 45, fat: 15 },
          ingredients: [
            { name: "Tofu", amount: "150g", calories: 180, macros: { protein: 15, carbs: 5, fat: 12 } },
            { name: "Mixed vegetables", amount: "200g", calories: 80, macros: { protein: 4, carbs: 16, fat: 1 } },
            { name: "Soy sauce", amount: "2 tbsp", calories: 20, macros: { protein: 2, carbs: 2, fat: 0 } },
            { name: "Sesame oil", amount: "1 tsp", calories: 40, macros: { protein: 0, carbs: 0, fat: 4 } }
          ]
        }
      ]
    }
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

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
    if (name.includes("yogurt") || name.includes("yogurt")) return "🥛"
    if (name.includes("berry") || name.includes("frutti")) return "🫐"
    if (name.includes("honey") || name.includes("miele")) return "🍯"
    if (name.includes("almond") || name.includes("mandorle")) return "🥜"
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("broccoli") || name.includes("broccoli")) return "🥦"
    if (name.includes("oat") || name.includes("avena")) return "🌾"
    if (name.includes("banana")) return "🍌"
    if (name.includes("milk") || name.includes("latte")) return "🥛"
    if (name.includes("wrap") || name.includes("tortilla")) return "🌯"
    if (name.includes("hummus")) return "🫓"
    if (name.includes("cucumber") || name.includes("cetriolo")) return "🥒"
    if (name.includes("feta") || name.includes("formaggio")) return "🧀"
    if (name.includes("tofu")) return "🧈"
    if (name.includes("vegetable") || name.includes("verdura")) return "🥬"
    if (name.includes("soy") || name.includes("salsa")) return "🍶"
    if (name.includes("sesame") || name.includes("sesamo")) return "🫒"
    if (name.includes("oil") || name.includes("olio")) return "🫒"
    return "🥗"
  }

  const getCurrentDayMeals = () => {
    const dayKeys = Object.keys(currentDiet.weeklyMeals)
    const currentDayKey = dayKeys[selectedDay]
    return currentDiet.weeklyMeals[currentDayKey as keyof typeof currentDiet.weeklyMeals] || []
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your current diet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className={`font-heading font-bold text-3xl md:text-4xl ${aiTheme.primaryGradientText}`}>My Current Diet</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          {currentDiet.name} • {currentDiet.days} days
        </p>
      </div>

      {/* Day Selector */}
      <div className="flex justify-center gap-1 mb-6 px-2">
        {daysOfWeek.map((day, index) => (
          <Button
            key={index}
            variant={selectedDay === index ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(index)}
            className={`w-10 h-8 text-xs px-2 ${
              selectedDay === index 
                ? aiTheme.aiButton 
                : `${aiTheme.aiButtonOutline} hover:${getCyclicColor(index, aiTheme.cardGradients)}`
            }`}
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Daily Totals */}
      <div className="px-3 mb-2">
        <div className="grid grid-cols-4 gap-2">
          <Card className={`p-2 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
            <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{currentDiet.totalCalories}</div>
            <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-3`}>Cal</div>
          </Card>
          <Card className={`p-2 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
            <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{currentDiet.macros.carbs}g</div>
            <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-1`}>Carb</div>
          </Card>
          <Card className={`p-2 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
            <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{currentDiet.macros.protein}g</div>
            <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-1`}>Prot</div>
          </Card>
          <Card className={`p-2 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
            <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{currentDiet.macros.fat}g</div>
            <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-1`}>Grassi</div>
          </Card>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-3 px-3 pb-24">
        {getCurrentDayMeals().map((meal, index) => (
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
                    {getMealIcon(meal.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate text-gray-800">
                      {meal.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">{meal.type}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${getCyclicColor(index, aiTheme.accentColors)}`}>{meal.calories}</div>
                  <div className="text-xs text-muted-foreground">cal</div>
                </div>
              </div>

              {/* Expanded Meal Details */}
              {expandedMeals[meal.id] && (
                <div className="mt-3 space-y-3">
                  {/* Macronutrients in separate cards */}
                  <div className="grid grid-cols-4 gap-1">
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{meal.calories}</div>
                      <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Cal</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{meal.macros.carbs}g</div>
                      <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Carb</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{meal.macros.protein}g</div>
                      <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Prot</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{meal.macros.fat}g</div>
                      <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Grassi</div>
                    </Card>
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Ingredients:</h4>
                    {meal.ingredients.map((ingredient, idx) => (
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
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}
