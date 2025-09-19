"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChefHat, Sparkles, TrendingUp, BookOpen } from "lucide-react"
import { RecipeCard } from "./recipe-card"
import { NutritionTips } from "./nutrition-tips"
import { CookingGuides } from "./cooking-guides"

interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: number
  servings: number
  difficulty: "easy" | "medium" | "hard"
  category: string
  tags: string[]
  calories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  ingredients: string[]
  instructions: string[]
  featured?: boolean
}

export function RecipesExplorer() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRecipes()
  }, [])

  const loadRecipes = async () => {
    setIsLoading(true)
    // Simulate loading recipes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockRecipes: Recipe[] = [
      {
        id: "1",
        title: "Mediterranean Quinoa Bowl",
        description: "A nutritious bowl packed with protein, healthy fats, and fresh vegetables",
        image: "/mediterranean-quinoa-bowl-healthy-colorful.jpg",
        cookTime: 25,
        servings: 2,
        difficulty: "easy",
        category: "lunch",
        tags: ["mediterranean", "vegetarian", "high-protein", "gluten-free"],
        calories: 420,
        macros: { protein: 18, carbs: 45, fat: 16 },
        ingredients: [
          "1 cup quinoa",
          "2 cups vegetable broth",
          "1 cucumber, diced",
          "1 cup cherry tomatoes",
          "1/2 red onion, sliced",
          "1/4 cup kalamata olives",
          "1/4 cup feta cheese",
          "2 tbsp olive oil",
          "1 lemon, juiced",
          "Fresh herbs (parsley, mint)",
        ],
        instructions: [
          "Cook quinoa in vegetable broth according to package instructions",
          "Let quinoa cool completely",
          "Dice cucumber and halve cherry tomatoes",
          "Slice red onion thinly",
          "Combine quinoa with vegetables in a large bowl",
          "Whisk olive oil and lemon juice for dressing",
          "Toss everything together and top with feta and herbs",
          "Season with salt and pepper to taste",
        ],
        featured: true,
      },
      {
        id: "2",
        title: "Protein-Packed Smoothie Bowl",
        description: "A delicious breakfast bowl with berries, protein powder, and healthy toppings",
        image: "/protein-smoothie-bowl-berries-granola-colorful.jpg",
        cookTime: 10,
        servings: 1,
        difficulty: "easy",
        category: "breakfast",
        tags: ["smoothie", "high-protein", "antioxidants", "quick"],
        calories: 380,
        macros: { protein: 28, carbs: 42, fat: 8 },
        ingredients: [
          "1 frozen banana",
          "1/2 cup frozen mixed berries",
          "1 scoop vanilla protein powder",
          "1/2 cup almond milk",
          "1 tbsp almond butter",
          "1 tbsp chia seeds",
          "Fresh berries for topping",
          "2 tbsp granola",
          "Coconut flakes",
        ],
        instructions: [
          "Add frozen fruits, protein powder, and almond milk to blender",
          "Blend until smooth and thick",
          "Pour into a bowl",
          "Top with fresh berries, granola, chia seeds, and coconut",
          "Drizzle with almond butter if desired",
          "Serve immediately",
        ],
        featured: true,
      },
      {
        id: "3",
        title: "Grilled Salmon with Asparagus",
        description: "Omega-3 rich salmon with perfectly grilled asparagus and lemon",
        image: "/grilled-salmon-asparagus-lemon-healthy-dinner.jpg",
        cookTime: 20,
        servings: 2,
        difficulty: "medium",
        category: "dinner",
        tags: ["seafood", "low-carb", "omega-3", "keto-friendly"],
        calories: 320,
        macros: { protein: 35, carbs: 8, fat: 16 },
        ingredients: [
          "2 salmon fillets (6oz each)",
          "1 lb asparagus, trimmed",
          "2 tbsp olive oil",
          "1 lemon, sliced",
          "2 cloves garlic, minced",
          "Salt and pepper",
          "Fresh dill",
          "Lemon wedges for serving",
        ],
        instructions: [
          "Preheat grill to medium-high heat",
          "Season salmon with salt, pepper, and dill",
          "Toss asparagus with olive oil, garlic, salt, and pepper",
          "Grill salmon 4-5 minutes per side",
          "Grill asparagus 8-10 minutes, turning occasionally",
          "Serve with lemon wedges and fresh herbs",
        ],
        featured: false,
      },
      {
        id: "4",
        title: "Chickpea Buddha Bowl",
        description: "Plant-based protein bowl with roasted chickpeas and tahini dressing",
        image: "/chickpea-buddha-bowl-tahini-vegetables-colorful.jpg",
        cookTime: 35,
        servings: 2,
        difficulty: "easy",
        category: "lunch",
        tags: ["vegan", "plant-based", "high-fiber", "mediterranean"],
        calories: 450,
        macros: { protein: 16, carbs: 58, fat: 18 },
        ingredients: [
          "1 can chickpeas, drained",
          "2 cups mixed greens",
          "1 cup roasted sweet potato",
          "1/2 avocado, sliced",
          "1/4 cup red cabbage, shredded",
          "2 tbsp tahini",
          "1 tbsp lemon juice",
          "1 tsp maple syrup",
          "Pumpkin seeds for topping",
        ],
        instructions: [
          "Roast chickpeas with spices at 400°F for 20 minutes",
          "Roast sweet potato cubes until tender",
          "Whisk tahini, lemon juice, and maple syrup for dressing",
          "Arrange greens in bowls",
          "Top with chickpeas, sweet potato, avocado, and cabbage",
          "Drizzle with tahini dressing",
          "Sprinkle with pumpkin seeds",
        ],
        featured: false,
      },
      {
        id: "5",
        title: "Overnight Oats with Berries",
        description: "Make-ahead breakfast with oats, chia seeds, and fresh berries",
        image: "/overnight-oats-berries-chia-seeds-healthy-breakfas.jpg",
        cookTime: 5,
        servings: 1,
        difficulty: "easy",
        category: "breakfast",
        tags: ["make-ahead", "fiber-rich", "antioxidants", "no-cook"],
        calories: 320,
        macros: { protein: 12, carbs: 52, fat: 8 },
        ingredients: [
          "1/2 cup rolled oats",
          "1/2 cup almond milk",
          "1 tbsp chia seeds",
          "1 tbsp maple syrup",
          "1/2 tsp vanilla extract",
          "1/4 cup mixed berries",
          "1 tbsp almond butter",
          "Chopped nuts for topping",
        ],
        instructions: [
          "Mix oats, almond milk, chia seeds, maple syrup, and vanilla",
          "Stir well and refrigerate overnight",
          "In the morning, stir and add more milk if needed",
          "Top with berries, almond butter, and nuts",
          "Enjoy cold or warm slightly",
        ],
        featured: false,
      },
      {
        id: "6",
        title: "Turkey and Veggie Meatballs",
        description: "Lean protein meatballs packed with hidden vegetables",
        image: "/turkey-meatballs-vegetables-healthy-dinner.jpg",
        cookTime: 30,
        servings: 4,
        difficulty: "medium",
        category: "dinner",
        tags: ["high-protein", "hidden-veggies", "meal-prep", "kid-friendly"],
        calories: 280,
        macros: { protein: 32, carbs: 12, fat: 12 },
        ingredients: [
          "1 lb ground turkey",
          "1/2 cup grated zucchini",
          "1/4 cup grated carrot",
          "1/4 cup breadcrumbs",
          "1 egg",
          "2 cloves garlic, minced",
          "1 tsp Italian seasoning",
          "Salt and pepper",
          "Marinara sauce for serving",
        ],
        instructions: [
          "Preheat oven to 400°F",
          "Mix all ingredients except marinara in a bowl",
          "Form into 20 meatballs",
          "Place on lined baking sheet",
          "Bake 20-25 minutes until cooked through",
          "Serve with marinara sauce and vegetables",
        ],
        featured: false,
      },
    ]

    setRecipes(mockRecipes)
    setIsLoading(false)
  }

  const categories = ["all", "breakfast", "lunch", "dinner", "snacks"]
  const difficulties = ["all", "easy", "medium", "hard"]

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      case "cookTime":
        return a.cookTime - b.cookTime
      case "calories":
        return a.calories - b.calories
      case "name":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const featuredRecipes = recipes.filter((recipe) => recipe.featured)

  return (
    <div className="space-y-8">
      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-heading font-bold text-2xl">Featured Recipes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} featured />
            ))}
          </div>
        </section>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="recipes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recipes" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Recipes
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Nutrition Tips
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Cooking Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recipes" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="cookTime">Cook Time</SelectItem>
                      <SelectItem value="calories">Calories</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipe Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-32 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl mb-2">No Recipes Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more recipes.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tips">
          <NutritionTips />
        </TabsContent>

        <TabsContent value="guides">
          <CookingGuides />
        </TabsContent>
      </Tabs>
    </div>
  )
}
