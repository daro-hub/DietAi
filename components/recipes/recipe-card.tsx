"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Clock, Users, Heart, Eye, ChefHat, Sparkles } from "lucide-react"
import { RecipeDetail } from "./recipe-detail"
import { useFavorites } from "@/components/favorites/favorites-context"

interface RecipeCardProps {
  recipe: any
  featured?: boolean
}

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const { addFavorite, isFavorite } = useFavorites()

  const handleSaveToFavorites = () => {
    addFavorite({
      type: "meal",
      name: recipe.title,
      description: recipe.description,
      data: {
        type: recipe.category,
        totalCalories: recipe.calories,
        totalMacros: recipe.macros,
        ingredients: recipe.ingredients.map((ingredient: string, index: number) => ({
          name: ingredient,
          amount: "as needed",
          calories: Math.round(recipe.calories / recipe.ingredients.length),
        })),
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        instructions: recipe.instructions,
      },
      tags: recipe.tags,
    })
  }

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
    <Card
      className={`border-0 shadow-sm hover:shadow-md transition-shadow ${featured ? "ring-2 ring-primary/20" : ""}`}
    >
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-primary/90 text-primary-foreground">
            <Sparkles className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      <div className="relative">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleSaveToFavorites}
            disabled={isFavorite(recipe.id)}
          >
            <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-heading font-bold line-clamp-2">{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {recipe.cookTime} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {recipe.servings} servings
          </div>
          <div className={`flex items-center gap-1 ${getDifficultyColor(recipe.difficulty)}`}>
            <ChefHat className="h-3 w-3" />
            {recipe.difficulty}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-sm font-bold text-primary">{recipe.calories}</div>
            <div className="text-xs text-muted-foreground">cal</div>
          </div>
          <div>
            <div className="text-sm font-bold text-secondary">{recipe.macros.protein}g</div>
            <div className="text-xs text-muted-foreground">protein</div>
          </div>
          <div>
            <div className="text-sm font-bold text-blue-500">{recipe.macros.carbs}g</div>
            <div className="text-xs text-muted-foreground">carbs</div>
          </div>
          <div>
            <div className="text-sm font-bold text-orange-500">{recipe.macros.fat}g</div>
            <div className="text-xs text-muted-foreground">fat</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>

        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading font-bold text-2xl">{recipe.title}</DialogTitle>
              <DialogDescription>{recipe.description}</DialogDescription>
            </DialogHeader>
            <RecipeDetail recipe={recipe} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
