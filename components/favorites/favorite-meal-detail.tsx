"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Utensils,
  Clock,
  Target
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface FavoriteMealDetailProps {
  meal: any
  onBack: () => void
}

export function FavoriteMealDetail({ meal, onBack }: FavoriteMealDetailProps) {
  const [expanded, setExpanded] = useState(false)

  const getIngredientIcon = (name: string) => {
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("broccoli") || name.includes("broccoli")) return "🥦"
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
    if (name.includes("rice") || name.includes("riso")) return "🍚"
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
              <div className={`p-2 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-lg`}>
                <Utensils className={`h-6 w-6 ${getCyclicColor(2, aiTheme.accentColors)}`} />
              </div>
              <div>
                <h1 className={`font-bold text-xl ${getCyclicColor(2, aiTheme.textColors)}`}>{meal.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {meal.description}
                </p>
              </div>
            </div>
          </div>

          {/* Meal Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className={`p-3 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{meal.data.totalCalories}</div>
              <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70`}>Calorie</div>
            </div>
            <div className={`p-3 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{meal.data.totalMacros.protein}g</div>
              <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70`}>Proteine</div>
            </div>
            <div className={`p-3 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{meal.data.totalMacros.carbs}g</div>
              <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70`}>Carboidrati</div>
            </div>
            <div className={`p-3 ${getCyclicColor(3, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{meal.data.totalMacros.fat}g</div>
              <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70`}>Grassi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-4xl mx-auto">
        {/* Meal Type and Time */}
        <div className="mb-6">
          <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-lg`}>
                    <Utensils className={`h-5 w-5 ${getCyclicColor(2, aiTheme.accentColors)}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg ${getCyclicColor(2, aiTheme.textColors)}`}>
                      {meal.data.type.charAt(0).toUpperCase() + meal.data.type.slice(1)}
                    </h3>
                    <p className="text-sm text-muted-foreground">Tipo di pasto</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tempo di preparazione: 30 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${getCyclicColor(2, aiTheme.textColors)}`}>Ingredienti</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className={aiTheme.aiButtonOutline}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Nascondi Dettagli
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Mostra Dettagli
                </>
              )}
            </Button>
          </div>

          <div className="space-y-3">
            {meal.data.ingredients.map((ingredient: any, index: number) => (
              <Card key={index} className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">
                        {getIngredientIcon(ingredient.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base">{ingredient.name}</div>
                        <div className="text-sm text-muted-foreground">{ingredient.amount}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>
                        {ingredient.calories} cal
                      </div>
                    </div>
                  </div>

                  {expanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>
                            {Math.round(ingredient.calories * 0.3)}g
                          </div>
                          <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70`}>Proteine</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>
                            {Math.round(ingredient.calories * 0.5)}g
                          </div>
                          <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70`}>Carboidrati</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>
                            {Math.round(ingredient.calories * 0.2)}g
                          </div>
                          <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70`}>Grassi</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-3 ${getCyclicColor(2, aiTheme.textColors)}`}>Tag</h3>
          <div className="flex flex-wrap gap-2">
            {meal.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
