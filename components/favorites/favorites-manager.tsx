"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Search, Filter, Calendar, Utensils, Apple } from "lucide-react"
import { FavoritePlanCard } from "./favorite-plan-card"
import { FavoriteMealCard } from "./favorite-meal-card"
import { FavoriteIngredientCard } from "./favorite-ingredient-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FavoriteItem {
  id: string
  type: "plan" | "meal" | "ingredient"
  name: string
  description?: string
  savedAt: string
  data: any
  tags?: string[]
}

export function FavoritesManager() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
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
        description: "High-calorie plan for muscle growth",
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

  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = filterBy === "all" || item.type === filterBy

    return matchesSearch && matchesFilter
  })

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
      case "oldest":
        return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const groupedFavorites = {
    plan: sortedFavorites.filter((item) => item.type === "plan"),
    meal: sortedFavorites.filter((item) => item.type === "meal"),
    ingredient: sortedFavorites.filter((item) => item.type === "ingredient"),
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-bold text-xl mb-2">No Favorites Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite diet plans, meals, and ingredients to see them here.
          </p>
          <Button asChild>
            <a href="/generate">Generate Your First Plan</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="plan">Plans</SelectItem>
                  <SelectItem value="meal">Meals</SelectItem>
                  <SelectItem value="ingredient">Ingredients</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 bg-primary/5">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{groupedFavorites.plan.length}</div>
            <div className="text-sm text-muted-foreground">Diet Plans</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-secondary/5">
          <CardContent className="p-4 text-center">
            <Utensils className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">{groupedFavorites.meal.length}</div>
            <div className="text-sm text-muted-foreground">Meals</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-orange-500/5">
          <CardContent className="p-4 text-center">
            <Apple className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-500">{groupedFavorites.ingredient.length}</div>
            <div className="text-sm text-muted-foreground">Ingredients</div>
          </CardContent>
        </Card>
      </div>

      {/* Favorites Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({sortedFavorites.length})</TabsTrigger>
          <TabsTrigger value="plans">Plans ({groupedFavorites.plan.length})</TabsTrigger>
          <TabsTrigger value="meals">Meals ({groupedFavorites.meal.length})</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients ({groupedFavorites.ingredient.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {sortedFavorites.map((item) => (
            <div key={item.id}>
              {item.type === "plan" && <FavoritePlanCard item={item} onRemove={() => removeFavorite(item.id)} />}
              {item.type === "meal" && <FavoriteMealCard item={item} onRemove={() => removeFavorite(item.id)} />}
              {item.type === "ingredient" && (
                <FavoriteIngredientCard item={item} onRemove={() => removeFavorite(item.id)} />
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          {groupedFavorites.plan.map((item) => (
            <FavoritePlanCard key={item.id} item={item} onRemove={() => removeFavorite(item.id)} />
          ))}
        </TabsContent>

        <TabsContent value="meals" className="space-y-4">
          {groupedFavorites.meal.map((item) => (
            <FavoriteMealCard key={item.id} item={item} onRemove={() => removeFavorite(item.id)} />
          ))}
        </TabsContent>

        <TabsContent value="ingredients" className="space-y-4">
          {groupedFavorites.ingredient.map((item) => (
            <FavoriteIngredientCard key={item.id} item={item} onRemove={() => removeFavorite(item.id)} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
