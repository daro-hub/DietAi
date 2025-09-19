"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FavoriteItem {
  id: string
  type: "plan" | "meal" | "ingredient"
  name: string
  description?: string
  savedAt: string
  data: any
  tags?: string[]
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: Omit<FavoriteItem, "id" | "savedAt">) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  getFavoritesByType: (type: "plan" | "meal" | "ingredient") => FavoriteItem[]
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("dietai-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const saveFavorites = (newFavorites: FavoriteItem[]) => {
    setFavorites(newFavorites)
    localStorage.setItem("dietai-favorites", JSON.stringify(newFavorites))
  }

  const addFavorite = (item: Omit<FavoriteItem, "id" | "savedAt">) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
    }

    const newFavorites = [...favorites, newFavorite]
    saveFavorites(newFavorites)
  }

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((item) => item.id !== id)
    saveFavorites(newFavorites)
  }

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  const getFavoritesByType = (type: "plan" | "meal" | "ingredient") => {
    return favorites.filter((item) => item.type === type)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavoritesByType,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
