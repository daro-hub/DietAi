"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  X,
  Search,
  SortAsc
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FavoritePlanCard } from "./favorite-plan-card"
import { FavoriteMealCard } from "./favorite-meal-card"
import { FavoriteIngredientCard } from "./favorite-ingredient-card"

interface FavoriteItem {
  id: string
  type: "plan" | "meal" | "ingredient"
  name: string
  description?: string
  savedAt: string
  data: any
  tags?: string[]
}

interface FavoritesGridProps {
  favorites: FavoriteItem[]
  onRemove: (id: string) => void
}

const categoryConfig = {
  all: {
    title: "All Favorites",
    emoji: "💜",
    color: "bg-purple-500",
    count: 0
  },
  plan: {
    title: "Diet Plans",
    emoji: "📋",
    color: "bg-blue-500",
    count: 0
  },
  meal: {
    title: "Meals",
    emoji: "🍱",
    color: "bg-yellow-500",
    count: 0
  },
  ingredient: {
    title: "Ingredients",
    emoji: "🥗",
    color: "bg-orange-500",
    count: 0
  }
}

export function FavoritesGrid({ favorites, onRemove }: FavoritesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryConfig | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  // Calcola i conteggi per ogni categoria
  const categoryCounts = {
    all: favorites.length,
    plan: favorites.filter(item => item.type === "plan").length,
    meal: favorites.filter(item => item.type === "meal").length,
    ingredient: favorites.filter(item => item.type === "ingredient").length
  }

  // Filtra i favoriti in base alla categoria selezionata
  const getFilteredFavorites = () => {
    if (!selectedCategory) return []
    
    let filtered = selectedCategory === "all" 
      ? favorites 
      : favorites.filter(item => item.type === selectedCategory)

    // Applica filtro di ricerca
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Applica ordinamento
    return filtered.sort((a, b) => {
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
  }

  const filteredFavorites = getFilteredFavorites()

  // Se nessuna categoria è selezionata, mostra solo le statistiche
  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        {/* Statistiche rapide */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryCounts).map(([key, count], index) => {
            const config = categoryConfig[key as keyof typeof categoryConfig]
            
            return (
              <Card 
                key={key} 
                className={`border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 ${config.color} text-white`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  aspectRatio: '1 / 1'
                }}
                onClick={() => setSelectedCategory(key as keyof typeof categoryConfig)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {config.emoji}
                  </div>
                  <div className="text-lg text-white/90 font-medium">{config.title}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // Se una categoria è selezionata, mostra la vista espansa
  const config = categoryConfig[selectedCategory]

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
                onClick={() => setSelectedCategory(null)}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className={`p-2 rounded-lg ${config.color} text-white`}>
                <span className="text-2xl">{config.emoji}</span>
              </div>
              <div>
                <h1 className="font-bold text-xl">{config.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredFavorites.length} of {categoryCounts[selectedCategory]} items
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Filtri e ricerca */}
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SortAsc className="h-4 w-4 mr-2" />
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
        </div>
      </div>

      {/* Contenuto */}
      <div className="p-4 max-w-4xl mx-auto">
        {filteredFavorites.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className={`p-4 rounded-full ${config.color} w-fit mx-auto mb-4 text-white`}>
                <span className="text-5xl">{config.emoji}</span>
              </div>
              <h3 className="font-bold text-xl mb-2">No {config.title.toLowerCase()} found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "Try adjusting your search terms"
                  : `Start saving ${config.title.toLowerCase()} to see them here.`
                }
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredFavorites.map((item) => (
              <div key={item.id}>
                {item.type === "plan" && (
                  <FavoritePlanCard item={item} onRemove={() => onRemove(item.id)} />
                )}
                {item.type === "meal" && (
                  <FavoriteMealCard item={item} onRemove={() => onRemove(item.id)} />
                )}
                {item.type === "ingredient" && (
                  <FavoriteIngredientCard item={item} onRemove={() => onRemove(item.id)} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
