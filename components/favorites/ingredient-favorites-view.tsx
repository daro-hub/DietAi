"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ChevronDown,
  ChevronUp,
  Apple
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface IngredientItem {
  id: string
  name: string
  description?: string
  savedAt: string
  data: {
    calories: number
    protein: number
    carbs: number
    fat: number
    servingSize: string
  }
  tags?: string[]
}

export function IngredientFavoritesView() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedIngredients, setExpandedIngredients] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    loadIngredients()
  }, [])

  const loadIngredients = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockIngredients: IngredientItem[] = [
      {
        id: "1",
        name: "Greek Yogurt",
        description: "High-protein breakfast staple",
        savedAt: "2024-01-13T08:15:00Z",
        tags: ["high-protein", "breakfast", "dairy"],
        data: {
          calories: 130,
          protein: 20,
          carbs: 9,
          fat: 0,
          servingSize: "200g",
        },
      },
      {
        id: "2",
        name: "Salmon Fillet",
        description: "Rich in omega-3 fatty acids",
        savedAt: "2024-01-12T14:30:00Z",
        tags: ["high-protein", "omega-3", "fish"],
        data: {
          calories: 231,
          protein: 30,
          carbs: 0,
          fat: 15,
          servingSize: "150g",
        },
      },
      {
        id: "3",
        name: "Quinoa",
        description: "Complete protein grain",
        savedAt: "2024-01-11T10:20:00Z",
        tags: ["grain", "protein", "gluten-free"],
        data: {
          calories: 200,
          protein: 8,
          carbs: 35,
          fat: 3,
          servingSize: "80g dry",
        },
      },
      {
        id: "4",
        name: "Avocado",
        description: "Healthy fats and fiber",
        savedAt: "2024-01-10T16:45:00Z",
        tags: ["healthy-fats", "fiber", "fruit"],
        data: {
          calories: 120,
          protein: 2,
          carbs: 6,
          fat: 11,
          servingSize: "1/2 medium",
        },
      },
      {
        id: "5",
        name: "Chicken Breast",
        description: "Lean protein source",
        savedAt: "2024-01-09T12:00:00Z",
        tags: ["high-protein", "lean", "meat"],
        data: {
          calories: 250,
          protein: 30,
          carbs: 0,
          fat: 15,
          servingSize: "150g",
        },
      },
    ]

    setIngredients(mockIngredients)
    setIsLoading(false)
  }

  const toggleIngredient = (ingredientId: string) => {
    setExpandedIngredients(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }))
  }

  const getIngredientIcon = (name: string) => {
    if (name.includes("yogurt") || name.includes("yogurt")) return "🥛"
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("avocado")) return "🥑"
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
    if (name.includes("broccoli") || name.includes("broccoli")) return "🥦"
    if (name.includes("rice") || name.includes("riso")) return "🍚"
    if (name.includes("pasta")) return "🍝"
    if (name.includes("berry") || name.includes("frutti")) return "🫐"
    if (name.includes("almond") || name.includes("nut")) return "🥜"
    if (name.includes("oil")) return "🫒"
    return "🥗"
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
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

  if (ingredients.length === 0) {
    return (
      <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
        <CardContent className="p-12 text-center">
          <div className={`p-4 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-full w-fit mx-auto mb-4`}>
            <Apple className={`h-16 w-16 ${getCyclicColor(0, aiTheme.accentColors)}`} />
          </div>
          <h3 className={`font-heading font-bold text-xl mb-2 ${getCyclicColor(0, aiTheme.textColors)}`}>No Ingredients Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite ingredients to see them here.
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
      {/* Lista degli ingredienti */}
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <Card key={ingredient.id} className={`cursor-pointer ${aiTheme.aiCardHover} mx-0 bg-white border border-gray-200 relative`} onClick={() => toggleIngredient(ingredient.id)}>
            <CardContent className="py-0 px-2">
              {/* Freccia espandi */}
              <div className="absolute top-2 right-2 z-10">
                {expandedIngredients[ingredient.id] ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              <div className="flex items-center justify-between pr-8">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`text-xl flex-shrink-0 ${getCyclicColor(index, aiTheme.accentColors)}`}>
                    {getIngredientIcon(ingredient.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate text-gray-800">
                      {ingredient.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{ingredient.data.servingSize}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${getCyclicColor(index, aiTheme.accentColors)}`}>{ingredient.data.calories}</div>
                  <div className="text-xs text-muted-foreground">cal</div>
                </div>
              </div>

              {/* Expanded Ingredient Details */}
              {expandedIngredients[ingredient.id] && (
                <div className="mt-3 space-y-3">
                  {/* Macronutrients in separate cards */}
                  <div className="grid grid-cols-4 gap-1">
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{ingredient.data.calories}</div>
                      <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Cal</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{ingredient.data.carbs}g</div>
                      <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Carb</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{ingredient.data.protein}g</div>
                      <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Prot</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{ingredient.data.fat}g</div>
                      <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Grassi</div>
                    </Card>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Description:</h4>
                    <p className="text-sm text-muted-foreground">{ingredient.description}</p>
                  </div>

                  {/* Nutritional Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Nutritional Information:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Serving Size:</span>
                        <span className="font-medium">{ingredient.data.servingSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calories per serving:</span>
                        <span className="font-medium">{ingredient.data.calories} cal</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {ingredient.tags && ingredient.tags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.tags.map((tag: string) => (
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
