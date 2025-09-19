"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, ChefHat, Heart, Share, Download } from "lucide-react"

interface RecipeDetailProps {
  recipe: any
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "hard":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Recipe Image */}
      <div className="relative">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Recipe Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-sm font-medium">{recipe.cookTime} min</div>
          <div className="text-xs text-muted-foreground">Cook Time</div>
        </div>
        <div className="text-center">
          <Users className="h-5 w-5 mx-auto mb-1 text-secondary" />
          <div className="text-sm font-medium">{recipe.servings} servings</div>
          <div className="text-xs text-muted-foreground">Servings</div>
        </div>
        <div className="text-center">
          <ChefHat className={`h-5 w-5 mx-auto mb-1 ${getDifficultyColor(recipe.difficulty)}`} />
          <div className="text-sm font-medium capitalize">{recipe.difficulty}</div>
          <div className="text-xs text-muted-foreground">Difficulty</div>
        </div>
      </div>

      {/* Nutrition Info */}
      <Card className="border-0 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Nutrition Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{recipe.calories}</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{recipe.macros.protein}g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{recipe.macros.carbs}g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{recipe.macros.fat}g</div>
              <div className="text-sm text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <Separator />

      {/* Ingredients */}
      <div>
        <h3 className="font-heading font-bold text-xl mb-4">Ingredients</h3>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm">{ingredient}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Instructions */}
      <div>
        <h3 className="font-heading font-bold text-xl mb-4">Instructions</h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction: string, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed pt-1">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button className="flex-1">
          <Heart className="h-4 w-4 mr-2" />
          Save Recipe
        </Button>
        <Button variant="outline">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  )
}
