"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, Eye, Trash2, Copy, Share, Clock, Users } from "lucide-react"

interface FavoriteMealCardProps {
  item: any
  onRemove: () => void
}

export function FavoriteMealCard({ item, onRemove }: FavoriteMealCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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

  const handleView = () => {
    console.log("View meal:", item.id)
  }

  const handleDuplicate = () => {
    console.log("Duplicate meal:", item.id)
  }

  const handleShare = () => {
    console.log("Share meal:", item.id)
  }

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl">{getMealIcon(item.data.type)}</span>
            <div>
              <CardTitle className="text-lg font-heading font-bold capitalize">
                {item.data.type} • {item.name}
              </CardTitle>
              <CardDescription className="mt-1">{item.description}</CardDescription>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <Eye className="h-4 w-4 mr-2" />
                View Recipe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Add to Plan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share Recipe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemove} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(item.savedAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            15 min
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />1 serving
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{item.data.totalCalories}</div>
            <div className="text-xs text-muted-foreground">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-secondary">{item.data.totalMacros.protein}g</div>
            <div className="text-xs text-muted-foreground">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-500">{item.data.totalMacros.carbs}g</div>
            <div className="text-xs text-muted-foreground">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-500">{item.data.totalMacros.fat}g</div>
            <div className="text-xs text-muted-foreground">Fat</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {item.data.ingredients.slice(0, 3).map((ingredient: any, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient.name}
              </Badge>
            ))}
            {item.data.ingredients.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.data.ingredients.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleView} className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View Recipe
          </Button>
          <Button onClick={handleDuplicate} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Add to Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
