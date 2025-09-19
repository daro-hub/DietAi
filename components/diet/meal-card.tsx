"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RefreshCw, ChevronDown, ChevronUp, Clock, Users } from "lucide-react"

interface MealCardProps {
  meal: any
  onRegenerate: () => void
}

export function MealCard({ meal, onRegenerate }: MealCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onRegenerate()
    setIsRegenerating(false)
  }

  const getMealIcon = (type: string) => {
    switch (type) {
      case "breakfast":
        return "🌅"
      case "lunch":
        return "☀️"
      case "dinner":
        return "🌙"
      case "snack":
        return "🍎"
      default:
        return "🍽️"
    }
  }

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getMealIcon(meal.type)}</span>
              <div>
                <CardTitle className="text-lg capitalize">{meal.type}</CardTitle>
                <CardDescription className="font-medium text-foreground">{meal.name}</CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {meal.totalCalories} cal
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              15 min
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />1 serving
            </div>
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">
                P: {meal.totalMacros.protein}g • C: {meal.totalMacros.carbs}g • F: {meal.totalMacros.fat}g
              </span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Ingredients:</h4>
              <div className="space-y-2">
                {meal.ingredients.map((ingredient: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{ingredient.name}</div>
                      <div className="text-xs text-muted-foreground">{ingredient.amount}</div>
                    </div>
                    <div className="text-right text-xs space-y-1">
                      <div className="font-medium">{ingredient.calories} cal</div>
                      <div className="text-muted-foreground">
                        P:{ingredient.protein}g C:{ingredient.carbs}g F:{ingredient.fat}g
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-6 w-6 p-0"
                      onClick={() => {
                        // Handle ingredient regeneration
                        console.log("Regenerate ingredient:", ingredient.name)
                      }}
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
