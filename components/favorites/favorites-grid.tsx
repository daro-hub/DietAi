"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calendar,
  Utensils,
  Apple,
  Heart
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

interface FavoritesGridProps {
  favorites: FavoriteItem[]
  onRemove: (id: string) => void
}

const categoryConfig = {
  all: {
    title: "All",
    icon: Heart,
    color: getCyclicColor(5, aiTheme.cardGradients),
    accentColor: getCyclicColor(5, aiTheme.accentColors),
    textColor: getCyclicColor(5, aiTheme.textColors),
    count: 0
  },
  plan: {
    title: "Diet Plans",
    icon: Calendar,
    color: getCyclicColor(1, aiTheme.cardGradients),
    accentColor: getCyclicColor(1, aiTheme.accentColors),
    textColor: getCyclicColor(1, aiTheme.textColors),
    count: 0
  },
  meal: {
    title: "Meals",
    icon: Utensils,
    color: getCyclicColor(2, aiTheme.cardGradients),
    accentColor: getCyclicColor(2, aiTheme.accentColors),
    textColor: getCyclicColor(2, aiTheme.textColors),
    count: 0
  },
  ingredient: {
    title: "Ingredients",
    icon: Apple,
    color: getCyclicColor(0, aiTheme.cardGradients),
    accentColor: getCyclicColor(0, aiTheme.accentColors),
    textColor: getCyclicColor(0, aiTheme.textColors),
    count: 0
  }
}

export function FavoritesGrid({ favorites, onRemove }: FavoritesGridProps) {
  // Calcola i conteggi per ogni categoria
  const categoryCounts = {
    all: favorites.length,
    plan: favorites.filter(item => item.type === "plan").length,
    meal: favorites.filter(item => item.type === "meal").length,
    ingredient: favorites.filter(item => item.type === "ingredient").length
  }

  return (
    <div className="space-y-6">
      {/* Statistiche rapide */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(categoryCounts).map(([key, count], index) => {
          const config = categoryConfig[key as keyof typeof categoryConfig]
          
          return (
            <Card 
              key={key} 
              className={`${config.color} border border-gray-200 cursor-pointer group hover:scale-105 transition-all duration-300 shadow-lg`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                aspectRatio: '1 / 1'
              }}
              onClick={() => window.location.href = `/favorites/${key}`}
            >
              <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  {React.createElement(config.icon, { className: `h-8 w-8 ${config.accentColor} group-hover:scale-110 transition-transform duration-300` })}
                </div>
                <div className={`text-lg font-medium ${config.textColor}`}>{config.title}</div>
                <div className={`text-sm ${config.textColor} opacity-70`}>{count} items</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
