"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Apple,
  Target,
  Scale,
  Zap
} from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface FavoriteIngredientDetailProps {
  ingredient: any
  onBack: () => void
}

export function FavoriteIngredientDetail({ ingredient, onBack }: FavoriteIngredientDetailProps) {
  const getIngredientIcon = (name: string) => {
    if (name.includes("yogurt") || name.includes("yogurt")) return "🥛"
    if (name.includes("chicken") || name.includes("pollo")) return "🐔"
    if (name.includes("salmon") || name.includes("salmone")) return "🐟"
    if (name.includes("rice") || name.includes("riso")) return "🍚"
    if (name.includes("quinoa")) return "🌾"
    if (name.includes("pasta")) return "🍝"
    if (name.includes("berry") || name.includes("frutti")) return "🫐"
    if (name.includes("almond") || name.includes("nut")) return "🥜"
    if (name.includes("oil")) return "🫒"
    if (name.includes("broccoli") || name.includes("broccoli")) return "🥦"
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
              <div className={`p-2 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-lg`}>
                <Apple className={`h-6 w-6 ${getCyclicColor(0, aiTheme.accentColors)}`} />
              </div>
              <div>
                <h1 className={`font-bold text-xl ${getCyclicColor(0, aiTheme.textColors)}`}>{ingredient.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {ingredient.description}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredient Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className={`p-3 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{ingredient.data.calories}</div>
              <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70`}>Calorie per {ingredient.data.servingSize}</div>
            </div>
            <div className={`p-3 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{ingredient.data.protein}g</div>
              <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70`}>Proteine</div>
            </div>
            <div className={`p-3 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{ingredient.data.carbs}g</div>
              <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70`}>Carboidrati</div>
            </div>
            <div className={`p-3 ${getCyclicColor(3, aiTheme.cardGradients)} rounded-lg text-center`}>
              <div className={`text-lg font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{ingredient.data.fat}g</div>
              <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70`}>Grassi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-4xl mx-auto">
        {/* Main Ingredient Card */}
        <div className="mb-6">
          <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">
                {getIngredientIcon(ingredient.name)}
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${getCyclicColor(0, aiTheme.textColors)}`}>
                {ingredient.name}
              </h2>
              <p className="text-muted-foreground mb-4">{ingredient.description}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Scale className="h-4 w-4" />
                <span>Porzione: {ingredient.data.servingSize}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nutritional Information */}
        <div className="space-y-6">
          <h3 className={`text-xl font-bold ${getCyclicColor(0, aiTheme.textColors)}`}>Informazioni Nutrizionali</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Macronutrients */}
            <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
              <CardContent className="p-6">
                <h4 className={`font-semibold text-lg mb-4 ${getCyclicColor(0, aiTheme.textColors)}`}>Macronutrienti</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Proteine</span>
                    <span className={`font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{ingredient.data.protein}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Carboidrati</span>
                    <span className={`font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{ingredient.data.carbs}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Grassi</span>
                    <span className={`font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{ingredient.data.fat}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Benefits */}
            <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
              <CardContent className="p-6">
                <h4 className={`font-semibold text-lg mb-4 ${getCyclicColor(0, aiTheme.textColors)}`}>Benefici per la Salute</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`h-4 w-4 ${getCyclicColor(0, aiTheme.accentColors)}`} />
                    <span className="text-sm">Alto contenuto proteico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className={`h-4 w-4 ${getCyclicColor(1, aiTheme.accentColors)}`} />
                    <span className="text-sm">Ideale per la colazione</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Apple className={`h-4 w-4 ${getCyclicColor(2, aiTheme.accentColors)}`} />
                    <span className="text-sm">Fonte di calcio</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Tips */}
          <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
            <CardContent className="p-6">
              <h4 className={`font-semibold text-lg mb-4 ${getCyclicColor(0, aiTheme.textColors)}`}>Consigli d'Uso</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Perfetto per la colazione con frutta fresca</p>
                <p>• Ottimo come base per smoothie proteici</p>
                <p>• Ideale come snack pomeridiano</p>
                <p>• Può essere usato in ricette dolci e salate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tags */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-3 ${getCyclicColor(0, aiTheme.textColors)}`}>Tag</h3>
          <div className="flex flex-wrap gap-2">
            {ingredient.tags?.map((tag: string) => (
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
