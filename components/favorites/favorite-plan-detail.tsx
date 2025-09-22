"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Coffee,
  Apple,
  Utensils,
  Cookie,
  Calendar,
  Clock,
  Target
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface FavoritePlanDetailProps {
  plan: any
  onBack: () => void
}

export function FavoritePlanDetail({ plan, onBack }: FavoritePlanDetailProps) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({})

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

  // Dati pasti per ogni giorno della settimana (simile alla pagina review)
  const weeklyMeals = {
    0: [ // Lunedì
      { 
        id: "breakfast", 
        name: "Breakfast", 
        time: "7:00 AM", 
        calories: 520, 
        macros: { protein: 28, carbs: 45, fat: 22, fiber: 8 }, 
        recipe: "Pollo al Curry e Riso",
        ingredients: [
          { id: "chicken", name: "Petto di Pollo", amount: "150g", calories: 250, macros: { protein: 30, carbs: 0, fat: 15, fiber: 0 } },
          { id: "rice", name: "Riso Basmati", amount: "80g", calories: 200, macros: { protein: 4, carbs: 45, fat: 0, fiber: 1 } },
          { id: "coconut-milk", name: "Latte di Cocco", amount: "100ml", calories: 70, macros: { protein: 1, carbs: 2, fat: 7, fiber: 0 } }
        ]
      },
      { 
        id: "lunch", 
        name: "Lunch", 
        time: "12:30 PM", 
        calories: 680, 
        macros: { protein: 45, carbs: 52, fat: 28, fiber: 12 }, 
        recipe: "Insalata di Quinoa e Salmone",
        ingredients: [
          { id: "salmon", name: "Salmone", amount: "120g", calories: 300, macros: { protein: 35, carbs: 0, fat: 18, fiber: 0 } },
          { id: "quinoa", name: "Quinoa", amount: "60g", calories: 200, macros: { protein: 8, carbs: 35, fat: 3, fiber: 5 } },
          { id: "avocado", name: "Avocado", amount: "1/2", calories: 120, macros: { protein: 2, carbs: 6, fat: 11, fiber: 5 } },
          { id: "spinach", name: "Spinaci", amount: "50g", calories: 12, macros: { protein: 1, carbs: 2, fat: 0, fiber: 1 } }
        ]
      },
      { 
        id: "dinner", 
        name: "Dinner", 
        time: "7:00 PM", 
        calories: 650, 
        macros: { protein: 42, carbs: 68, fat: 25, fiber: 10 }, 
        recipe: "Pasta Integrale con Verdure",
        ingredients: [
          { id: "pasta", name: "Pasta Integrale", amount: "100g", calories: 350, macros: { protein: 12, carbs: 70, fat: 2, fiber: 8 } },
          { id: "zucchini", name: "Zucchine", amount: "150g", calories: 25, macros: { protein: 2, carbs: 5, fat: 0, fiber: 2 } },
          { id: "tomatoes", name: "Pomodori", amount: "100g", calories: 20, macros: { protein: 1, carbs: 4, fat: 0, fiber: 1 } },
          { id: "olive-oil", name: "Olio d'Oliva", amount: "1 cucchiaio", calories: 120, macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 } }
        ]
      },
      { 
        id: "snacks", 
        name: "Snacks", 
        time: "3:00 PM", 
        calories: 300, 
        macros: { protein: 25, carbs: 50, fat: 20, fiber: 5 }, 
        recipe: "Yogurt Greco con Frutti di Bosco",
        ingredients: [
          { id: "greek-yogurt", name: "Yogurt Greco", amount: "200g", calories: 150, macros: { protein: 20, carbs: 8, fat: 0, fiber: 0 } },
          { id: "berries", name: "Frutti di Bosco", amount: "100g", calories: 50, macros: { protein: 1, carbs: 12, fat: 0, fiber: 4 } },
          { id: "honey", name: "Miele", amount: "1 cucchiaino", calories: 20, macros: { protein: 0, carbs: 5, fat: 0, fiber: 0 } },
          { id: "almonds", name: "Mandorle", amount: "15g", calories: 80, macros: { protein: 3, carbs: 3, fat: 7, fiber: 2 } }
        ]
      }
    ],
    // Aggiungi altri giorni se necessario
    1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  }

  const toggleMeal = (mealId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
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

  return (
    <div className="fixed inset-0 bg-background z-50">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className={`p-2 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-lg`}>
                <Calendar className={`h-6 w-6 ${getCyclicColor(1, aiTheme.accentColors)}`} />
              </div>
              <div>
                <h1 className={`font-bold text-xl ${getCyclicColor(1, aiTheme.textColors)}`}>{plan.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </div>
          </div>

          {/* Plan Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className={`p-3 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{plan.data.totalCalories}</div>
              <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70`}>Calorie</div>
            </div>
            <div className={`p-3 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{plan.data.macros.protein}g</div>
              <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70`}>Proteine</div>
            </div>
            <div className={`p-3 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{plan.data.macros.carbs}g</div>
              <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70`}>Carboidrati</div>
            </div>
            <div className={`p-3 ${getCyclicColor(3, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{plan.data.macros.fat}g</div>
              <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70`}>Grassi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-4xl mx-auto">
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
              <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{plan.data.totalCalories}</div>
              <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-1`}>Cal</div>
            </Card>
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
              <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{plan.data.macros.carbs}g</div>
              <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-1`}>Carb</div>
            </Card>
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
              <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{plan.data.macros.protein}g</div>
              <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-1`}>Prot</div>
            </Card>
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
              <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{plan.data.macros.fat}g</div>
              <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-1`}>Grassi</div>
            </Card>
          </div>
        </div>

        {/* Meals List */}
        <div className="space-y-3 px-3 pb-24">
          {weeklyMeals[selectedDay as keyof typeof weeklyMeals].map((meal, index) => {
            return (
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
                      {getMealIcon(meal.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold truncate text-gray-800">
                        {meal.recipe}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">{meal.name}</p>
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
                      {meal.ingredients?.map((ingredient) => (
                        <Card key={ingredient.id} className="hover:shadow-md transition-shadow py-2 px-1">
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
                      )) || (
                        <div className="text-center text-muted-foreground text-sm py-4">
                          Ingredienti non disponibili per questo pasto
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
