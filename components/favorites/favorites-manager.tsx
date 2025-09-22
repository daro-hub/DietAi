"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { FavoritesGrid } from "./favorites-grid"
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

interface FavoritesManagerProps {
  filterType?: "plan" | "meal" | "ingredient" | "all"
}

export function FavoritesManager({ filterType = "all" }: FavoritesManagerProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      {
        id: "4",
        type: "plan",
        name: "Muscle Building Bulk Plan",
        description: "High-calories plan for muscle growth",
        savedAt: "2024-01-12T14:20:00Z",
        tags: ["muscle-building", "bulk", "high-calorie"],
        data: {
          duration: "2_weeks",
          totalCalories: 2800,
          macros: { protein: 210, carbs: 350, fat: 93 },
          days: 14,
        },
      },
      {
        id: "5",
        type: "meal",
        name: "Protein Smoothie Bowl",
        description: "Post-workout breakfast with berries",
        savedAt: "2024-01-11T07:30:00Z",
        tags: ["breakfast", "smoothie", "post-workout"],
        data: {
          type: "breakfast",
          totalCalories: 380,
          totalMacros: { protein: 28, carbs: 45, fat: 8 },
          ingredients: [
            { name: "Protein powder", amount: "30g", calories: 120 },
            { name: "Banana", amount: "1 medium", calories: 105 },
            { name: "Mixed berries", amount: "100g", calories: 57 },
          ],
        },
      },
    ]

    setFavorites(mockFavorites)
    setIsLoading(false)
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  // Filtra i favoriti in base al tipo
  const getFilteredFavorites = () => {
    if (filterType === "all") return favorites
    return favorites.filter(item => item.type === filterType)
  }

  const filteredFavorites = getFilteredFavorites()

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

  if (filteredFavorites.length === 0) {
    return (
      <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
        <CardContent className="p-12 text-center">
          <div className={`p-4 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-full w-fit mx-auto mb-4`}>
            <Heart className={`h-16 w-16 ${getCyclicColor(0, aiTheme.accentColors)}`} />
          </div>
          <h3 className={`font-heading font-bold text-xl mb-2 ${getCyclicColor(0, aiTheme.textColors)}`}>
            No {filterType === "all" ? "Favorites" : filterType === "plan" ? "Diet Plans" : filterType === "meal" ? "Meals" : "Ingredients"} Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite {filterType === "all" ? "diet plans, meals, and ingredients" : filterType === "plan" ? "diet plans" : filterType === "meal" ? "meals" : "ingredients"} to see them here.
          </p>
          <Button asChild className={aiTheme.aiButton}>
            <a href="/generate">Generate Your First Plan</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return <FavoritesGrid favorites={filteredFavorites} onRemove={removeFavorite} />
}