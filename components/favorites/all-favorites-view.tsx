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
  Calendar,
  Clock,
  Target
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface FavoriteItem {
  id: string
  type: "plan" | "meal" | "ingredient"
  name: string
  description?: string
  savedAt: string
  data: any
  tags?: string[]
}

export function AllFavoritesView() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setIsLoading(true)
    // Simulate loading favorites from storage
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    const mockFavorites: FavoriteItem[] = [
      {
        id: "1",
        type: "plan",
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
        type: "meal",
        name: "Grilled Salmon with Quinoa",
        description: "High-protein dinner with omega-3 fatty acids",
        savedAt: "2024-01-14T18:45:00Z",
        tags: ["high-protein", "dinner", "salmon"],
        data: {
          type: "dinner",
          totalCalories: 520,
          totalMacros: { protein: 42, carbs: 35, fat: 18 },
          ingredients: [
            { name: "Salmon fillet", amount: "150g", calories: 231 },
            { name: "Quinoa", amount: "80g dry", calories: 312 },
            { name: "Broccoli", amount: "150g", calories: 51 },
          ],
        },
      },
      {
        id: "3",
        type: "ingredient",
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
    ]

    setFavorites(mockFavorites)
    setIsLoading(false)
  }

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const getItemIcon = (item: FavoriteItem) => {
    if (item.type === "plan") return <Calendar className="w-5 h-5" />
    if (item.type === "meal") {
      switch (item.data.type) {
        case "breakfast": return <Coffee className="w-5 h-5" />
        case "lunch": return <Utensils className="w-5 h-5" />
        case "dinner": return <Utensils className="w-5 h-5" />
        case "snacks": return <Cookie className="w-5 h-5" />
        default: return <Apple className="w-5 h-5" />
      }
    }
    if (item.type === "ingredient") return <Apple className="w-5 h-5" />
    return <Apple className="w-5 h-5" />
  }

  const getIngredientIcon = (name: string) => {
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("broccoli") || name.includes("broccoli")) return "🥦"
    if (name.includes("yogurt") || name.includes("yogurt")) return "🥛"
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className={`${aiTheme.aiCard} border border-gray-200`}>
              <CardContent className="p-0">
                <div className="animate-pulse">
                  <div className={`h-32 ${getCyclicColor(i-1, aiTheme.cardGradients)} rounded-t-lg`} />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
        <CardContent className="p-12 text-center">
          <div className={`p-4 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-full w-fit mx-auto mb-4`}>
            <Calendar className={`h-16 w-16 ${getCyclicColor(0, aiTheme.accentColors)}`} />
          </div>
          <h3 className={`font-heading font-bold text-xl mb-2 ${getCyclicColor(0, aiTheme.textColors)}`}>No Favorites Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite diet plans, meals, and ingredients to see them here.
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
      {/* Lista dei favoriti */}
      <div className="space-y-3">
        {favorites.map((item, index) => (
          <Card key={item.id} className={`cursor-pointer ${aiTheme.aiCardHover} mx-0 bg-white border border-gray-200 relative`} onClick={() => toggleItem(item.id)}>
            <CardContent className="py-0 px-2">
              {/* Freccia espandi */}
              <div className="absolute top-2 right-2 z-10">
                {expandedItems[item.id] ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              <div className="flex items-center justify-between pr-8">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`text-xl flex-shrink-0 ${getCyclicColor(index, aiTheme.accentColors)}`}>
                    {getItemIcon(item)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${getCyclicColor(index, aiTheme.accentColors)}`}>
                    {item.type === "plan" ? item.data.totalCalories : item.data.calories || item.data.totalCalories}
                  </div>
                  <div className="text-xs text-muted-foreground">cal</div>
                </div>
              </div>

              {/* Expanded Item Details */}
              {expandedItems[item.id] && (
                <div className="mt-3 space-y-3">
                  {/* Macronutrients */}
                  <div className="grid grid-cols-4 gap-1">
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>
                        {item.type === "plan" ? item.data.totalCalories : item.data.calories || item.data.totalCalories}
                      </div>
                      <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Cal</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>
                        {item.type === "plan" ? item.data.macros.carbs : item.data.totalMacros?.carbs || item.data.carbs || 0}g
                      </div>
                      <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Carb</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>
                        {item.type === "plan" ? item.data.macros.protein : item.data.totalMacros?.protein || item.data.protein || 0}g
                      </div>
                      <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Prot</div>
                    </Card>
                    <Card className={`p-1 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
                      <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>
                        {item.type === "plan" ? item.data.macros.fat : item.data.totalMacros?.fat || item.data.fat || 0}g
                      </div>
                      <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Grassi</div>
                    </Card>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Description:</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>

                  {/* Ingredients (for meals) */}
                  {item.type === "meal" && item.data.ingredients && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Ingredients:</h4>
                      {item.data.ingredients.map((ingredient: any, idx: number) => (
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
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag: string) => (
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
