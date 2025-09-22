"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getLocalStorageItem } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"
import { 
  ArrowLeft,
  Check,
  X,
  RefreshCw,
  Edit,
  Coffee,
  Apple,
  Utensils,
  Cookie,
  ChevronDown,
  ChevronUp
} from "lucide-react"

export function DietReview() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({})
  const [selectedDay, setSelectedDay] = useState(0) // 0 = Monday
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false)
  const [showMealRegenerateDialog, setShowMealRegenerateDialog] = useState<string | null>(null)

  useEffect(() => {
    // Load form data from localStorage
    const savedData = getLocalStorageItem("dietai-generated-plan")
    if (savedData) {
      setFormData(savedData)
    } else {
      // If no data, redirect back to wizard
      router.push("/generate/wizard")
    }
  }, [router])

  const toggleMeal = (mealId: string) => {
    setExpandedMeals((prev) => ({ ...prev, [mealId]: !prev[mealId] }))
  }

  const getMealIcon = (mealId: string) => {
    switch (mealId) {
      case "breakfast": return <Coffee className="w-6 h-6" />
      case "lunch": return <Utensils className="w-6 h-6" />
      case "dinner": return <Utensils className="w-6 h-6" />
      case "snacks": return <Cookie className="w-6 h-6" />
      default: return <Apple className="w-6 h-6" />
    }
  }

  const getIngredientIcon = (ingredientName: string) => {
    const name = ingredientName.toLowerCase()
    if (name.includes("oats") || name.includes("cereal")) return "🌾"
    if (name.includes("banana") || name.includes("berry")) return "🍌"
    if (name.includes("chicken") || name.includes("meat")) return "🍗"
    if (name.includes("salmon") || name.includes("fish")) return "🐟"
    if (name.includes("quinoa") || name.includes("rice")) return "🌾"
    if (name.includes("broccoli") || name.includes("vegetable")) return "🥦"
    if (name.includes("avocado")) return "🥑"
    if (name.includes("yogurt")) return "🥛"
    if (name.includes("almond") || name.includes("nut")) return "🥜"
    if (name.includes("oil")) return "🫒"
    return "🥗"
  }

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

  // Dati pasti per ogni giorno della settimana
  const weeklyMeals = {
    0: [ // Lunedì
      { 
        id: "breakfast", 
        name: "Breakfast", 
        time: "7:00 AM", 
        calories: 520, 
        macros: { protein: 28, carbs: 45, fat: 22, fiber: 8 }, 
        recipe: "Pollo al Curry e Riso",
        ingredients: [
          { id: "chicken", name: "Petto di Pollo", amount: "150g", calories: 250, macros: { protein: 30, carbs: 0, fat: 15, fiber: 0 } },
          { id: "rice", name: "Riso Basmati", amount: "80g", calories: 200, macros: { protein: 4, carbs: 45, fat: 0, fiber: 1 } },
          { id: "coconut-milk", name: "Latte di Cocco", amount: "100ml", calories: 70, macros: { protein: 1, carbs: 2, fat: 7, fiber: 0 } }
        ]
      },
      { 
        id: "lunch", 
        name: "Lunch", 
        time: "12:30 PM", 
        calories: 680, 
        macros: { protein: 45, carbs: 52, fat: 28, fiber: 12 }, 
        recipe: "Insalata di Quinoa e Salmone",
        ingredients: [
          { id: "salmon", name: "Salmone", amount: "120g", calories: 300, macros: { protein: 35, carbs: 0, fat: 18, fiber: 0 } },
          { id: "quinoa", name: "Quinoa", amount: "60g", calories: 200, macros: { protein: 8, carbs: 35, fat: 3, fiber: 5 } },
          { id: "avocado", name: "Avocado", amount: "1/2", calories: 120, macros: { protein: 2, carbs: 6, fat: 11, fiber: 5 } },
          { id: "spinach", name: "Spinaci", amount: "50g", calories: 12, macros: { protein: 1, carbs: 2, fat: 0, fiber: 1 } }
        ]
      },
      { 
        id: "dinner", 
        name: "Dinner", 
        time: "7:00 PM", 
        calories: 650, 
        macros: { protein: 42, carbs: 68, fat: 25, fiber: 10 }, 
        recipe: "Pasta Integrale con Verdure",
        ingredients: [
          { id: "pasta", name: "Pasta Integrale", amount: "100g", calories: 350, macros: { protein: 12, carbs: 70, fat: 2, fiber: 8 } },
          { id: "zucchini", name: "Zucchine", amount: "150g", calories: 25, macros: { protein: 2, carbs: 5, fat: 0, fiber: 2 } },
          { id: "tomatoes", name: "Pomodori", amount: "100g", calories: 20, macros: { protein: 1, carbs: 4, fat: 0, fiber: 1 } },
          { id: "olive-oil", name: "Olio d'Oliva", amount: "1 cucchiaio", calories: 120, macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 } }
        ]
      },
      { 
        id: "snacks", 
        name: "Snacks", 
        time: "3:00 PM", 
        calories: 300, 
        macros: { protein: 25, carbs: 50, fat: 20, fiber: 5 }, 
        recipe: "Yogurt Greco con Frutti di Bosco",
        ingredients: [
          { id: "greek-yogurt", name: "Yogurt Greco", amount: "200g", calories: 150, macros: { protein: 20, carbs: 8, fat: 0, fiber: 0 } },
          { id: "berries", name: "Frutti di Bosco", amount: "100g", calories: 50, macros: { protein: 1, carbs: 12, fat: 0, fiber: 4 } },
          { id: "honey", name: "Miele", amount: "1 cucchiaino", calories: 20, macros: { protein: 0, carbs: 5, fat: 0, fiber: 0 } },
          { id: "almonds", name: "Mandorle", amount: "15g", calories: 80, macros: { protein: 3, carbs: 3, fat: 7, fiber: 2 } }
        ]
      }
    ],
    1: [ // Martedì
      { id: "breakfast", name: "Breakfast", time: "7:00 AM", calories: 480, macros: { protein: 25, carbs: 42, fat: 20, fiber: 7 }, recipe: "Avena con Frutti di Bosco", ingredients: [
        { id: "oats", name: "Fiocchi d'Avena", amount: "50g", calories: 200, macros: { protein: 8, carbs: 35, fat: 4, fiber: 5 } },
        { id: "berries", name: "Frutti di Bosco", amount: "80g", calories: 40, macros: { protein: 1, carbs: 10, fat: 0, fiber: 3 } },
        { id: "milk", name: "Latte", amount: "200ml", calories: 100, macros: { protein: 8, carbs: 12, fat: 3, fiber: 0 } }
      ]},
      { id: "lunch", name: "Lunch", time: "12:30 PM", calories: 720, macros: { protein: 48, carbs: 58, fat: 30, fiber: 14 }, recipe: "Pollo Grigliato con Patate", ingredients: [
        { id: "chicken", name: "Petto di Pollo", amount: "180g", calories: 300, macros: { protein: 36, carbs: 0, fat: 18, fiber: 0 } },
        { id: "potatoes", name: "Patate", amount: "200g", calories: 160, macros: { protein: 4, carbs: 36, fat: 0, fiber: 4 } },
        { id: "olive-oil", name: "Olio d'Oliva", amount: "1 cucchiaio", calories: 120, macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 } }
      ]},
      { id: "dinner", name: "Dinner", time: "7:00 PM", calories: 580, macros: { protein: 38, carbs: 55, fat: 22, fiber: 8 }, recipe: "Salmone al Forno con Riso", ingredients: [
        { id: "salmon", name: "Salmone", amount: "150g", calories: 350, macros: { protein: 40, carbs: 0, fat: 20, fiber: 0 } },
        { id: "rice", name: "Riso", amount: "80g", calories: 200, macros: { protein: 4, carbs: 45, fat: 0, fiber: 1 } }
      ]},
      { id: "snacks", name: "Snacks", time: "3:00 PM", calories: 280, macros: { protein: 22, carbs: 45, fat: 18, fiber: 4 }, recipe: "Frutta Secca e Mandorle", ingredients: [
        { id: "nuts", name: "Frutta Secca", amount: "30g", calories: 180, macros: { protein: 6, carbs: 8, fat: 15, fiber: 3 } },
        { id: "almonds", name: "Mandorle", amount: "20g", calories: 100, macros: { protein: 4, carbs: 4, fat: 9, fiber: 2 } }
      ]}
    ],
    2: [ // Mercoledì
      { id: "breakfast", name: "Breakfast", time: "7:00 AM", calories: 540, macros: { protein: 30, carbs: 48, fat: 24, fiber: 9 }, recipe: "Pancakes Proteici", ingredients: [
        { id: "protein-powder", name: "Proteine in Polvere", amount: "30g", calories: 120, macros: { protein: 24, carbs: 2, fat: 1, fiber: 0 } },
        { id: "eggs", name: "Uova", amount: "2", calories: 140, macros: { protein: 12, carbs: 1, fat: 10, fiber: 0 } },
        { id: "banana", name: "Banana", amount: "1", calories: 100, macros: { protein: 1, carbs: 25, fat: 0, fiber: 3 } }
      ]},
      { id: "lunch", name: "Lunch", time: "12:30 PM", calories: 650, macros: { protein: 42, carbs: 50, fat: 26, fiber: 11 }, recipe: "Bowl di Buddha con Tofu", ingredients: [
        { id: "tofu", name: "Tofu", amount: "150g", calories: 200, macros: { protein: 20, carbs: 5, fat: 12, fiber: 2 } },
        { id: "quinoa", name: "Quinoa", amount: "60g", calories: 200, macros: { protein: 8, carbs: 35, fat: 3, fiber: 5 } },
        { id: "vegetables", name: "Verdure Miste", amount: "100g", calories: 50, macros: { protein: 2, carbs: 10, fat: 0, fiber: 4 } }
      ]},
      { id: "dinner", name: "Dinner", time: "7:00 PM", calories: 620, macros: { protein: 40, carbs: 62, fat: 24, fiber: 9 }, recipe: "Pesce Spada con Verdure", ingredients: [
        { id: "swordfish", name: "Pesce Spada", amount: "150g", calories: 300, macros: { protein: 35, carbs: 0, fat: 18, fiber: 0 } },
        { id: "vegetables", name: "Verdure", amount: "200g", calories: 50, macros: { protein: 3, carbs: 10, fat: 0, fiber: 4 } },
        { id: "olive-oil", name: "Olio d'Oliva", amount: "1 cucchiaio", calories: 120, macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 } }
      ]},
      { id: "snacks", name: "Snacks", time: "3:00 PM", calories: 320, macros: { protein: 28, carbs: 48, fat: 22, fiber: 6 }, recipe: "Smoothie Verde", ingredients: [
        { id: "spinach", name: "Spinaci", amount: "50g", calories: 12, macros: { protein: 2, carbs: 2, fat: 0, fiber: 1 } },
        { id: "banana", name: "Banana", amount: "1", calories: 100, macros: { protein: 1, carbs: 25, fat: 0, fiber: 3 } },
        { id: "protein-powder", name: "Proteine", amount: "25g", calories: 100, macros: { protein: 20, carbs: 2, fat: 1, fiber: 0 } }
      ]}
    ],
    3: [ // Giovedì
      { id: "breakfast", name: "Breakfast", time: "7:00 AM", calories: 500, macros: { protein: 26, carbs: 44, fat: 21, fiber: 8 }, recipe: "Toast Avocado e Uova", ingredients: [
        { id: "bread", name: "Pane Integrale", amount: "2 fette", calories: 160, macros: { protein: 8, carbs: 30, fat: 2, fiber: 4 } },
        { id: "avocado", name: "Avocado", amount: "1/2", calories: 120, macros: { protein: 2, carbs: 6, fat: 11, fiber: 5 } },
        { id: "eggs", name: "Uova", amount: "2", calories: 140, macros: { protein: 12, carbs: 1, fat: 10, fiber: 0 } }
      ]},
      { id: "lunch", name: "Lunch", time: "12:30 PM", calories: 700, macros: { protein: 46, carbs: 56, fat: 28, fiber: 13 }, recipe: "Insalata di Tonno e Legumi", ingredients: [
        { id: "tuna", name: "Tonno", amount: "120g", calories: 200, macros: { protein: 40, carbs: 0, fat: 5, fiber: 0 } },
        { id: "legumes", name: "Legumi", amount: "100g", calories: 120, macros: { protein: 8, carbs: 20, fat: 1, fiber: 8 } },
        { id: "vegetables", name: "Verdure", amount: "150g", calories: 30, macros: { protein: 2, carbs: 6, fat: 0, fiber: 3 } }
      ]},
      { id: "dinner", name: "Dinner", time: "7:00 PM", calories: 590, macros: { protein: 36, carbs: 58, fat: 23, fiber: 10 }, recipe: "Risotto ai Funghi", ingredients: [
        { id: "rice", name: "Riso Arborio", amount: "80g", calories: 280, macros: { protein: 6, carbs: 60, fat: 1, fiber: 2 } },
        { id: "mushrooms", name: "Funghi", amount: "100g", calories: 25, macros: { protein: 3, carbs: 4, fat: 0, fiber: 2 } },
        { id: "parmesan", name: "Parmigiano", amount: "30g", calories: 120, macros: { protein: 10, carbs: 1, fat: 8, fiber: 0 } }
      ]},
      { id: "snacks", name: "Snacks", time: "3:00 PM", calories: 290, macros: { protein: 24, carbs: 46, fat: 19, fiber: 5 }, recipe: "Barretta Proteica", ingredients: [
        { id: "protein-bar", name: "Barretta Proteica", amount: "1", calories: 200, macros: { protein: 20, carbs: 20, fat: 8, fiber: 3 } },
        { id: "nuts", name: "Frutta Secca", amount: "20g", calories: 90, macros: { protein: 2, carbs: 4, fat: 8, fiber: 1 } }
      ]}
    ],
    4: [ // Venerdì
      { id: "breakfast", name: "Breakfast", time: "7:00 AM", calories: 520, macros: { protein: 28, carbs: 45, fat: 22, fiber: 8 }, recipe: "Frullato Proteico", ingredients: [
        { id: "protein-powder", name: "Proteine", amount: "30g", calories: 120, macros: { protein: 24, carbs: 2, fat: 1, fiber: 0 } },
        { id: "milk", name: "Latte", amount: "250ml", calories: 125, macros: { protein: 8, carbs: 12, fat: 4, fiber: 0 } },
        { id: "banana", name: "Banana", amount: "1", calories: 100, macros: { protein: 1, carbs: 25, fat: 0, fiber: 3 } }
      ]},
      { id: "lunch", name: "Lunch", time: "12:30 PM", calories: 680, macros: { protein: 45, carbs: 52, fat: 28, fiber: 12 }, recipe: "Pizza Margherita Integrale", ingredients: [
        { id: "pizza-dough", name: "Impasto Integrale", amount: "150g", calories: 300, macros: { protein: 12, carbs: 60, fat: 2, fiber: 8 } },
        { id: "mozzarella", name: "Mozzarella", amount: "100g", calories: 250, macros: { protein: 20, carbs: 2, fat: 18, fiber: 0 } },
        { id: "tomatoes", name: "Pomodori", amount: "100g", calories: 20, macros: { protein: 1, carbs: 4, fat: 0, fiber: 1 } }
      ]},
      { id: "dinner", name: "Dinner", time: "7:00 PM", calories: 650, macros: { protein: 42, carbs: 68, fat: 25, fiber: 10 }, recipe: "Bistecca con Patate Dolci", ingredients: [
        { id: "steak", name: "Bistecca", amount: "200g", calories: 400, macros: { protein: 40, carbs: 0, fat: 24, fiber: 0 } },
        { id: "sweet-potatoes", name: "Patate Dolci", amount: "200g", calories: 180, macros: { protein: 4, carbs: 40, fat: 0, fiber: 6 } },
        { id: "olive-oil", name: "Olio d'Oliva", amount: "1 cucchiaio", calories: 120, macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 } }
      ]},
      { id: "snacks", name: "Snacks", time: "3:00 PM", calories: 300, macros: { protein: 25, carbs: 50, fat: 20, fiber: 5 }, recipe: "Gelato Proteico", ingredients: [
        { id: "protein-ice-cream", name: "Gelato Proteico", amount: "150g", calories: 200, macros: { protein: 20, carbs: 25, fat: 5, fiber: 2 } },
        { id: "berries", name: "Frutti di Bosco", amount: "50g", calories: 25, macros: { protein: 0, carbs: 6, fat: 0, fiber: 2 } }
      ]}
    ],
    5: [ // Sabato
      { id: "breakfast", name: "Breakfast", time: "7:00 AM", calories: 560, macros: { protein: 32, carbs: 50, fat: 26, fiber: 10 }, recipe: "Waffles con Sciroppo d'Acero", ingredients: [
        { id: "waffle-mix", name: "Mix Waffles", amount: "100g", calories: 300, macros: { protein: 8, carbs: 45, fat: 8, fiber: 3 } },
        { id: "maple-syrup", name: "Sciroppo d'Acero", amount: "2 cucchiai", calories: 100, macros: { protein: 0, carbs: 25, fat: 0, fiber: 0 } },
        { id: "butter", name: "Burro", amount: "1 cucchiaio", calories: 100, macros: { protein: 0, carbs: 0, fat: 11, fiber: 0 } }
      ]},
      { id: "lunch", name: "Lunch", time: "12:30 PM", calories: 750, macros: { protein: 50, carbs: 60, fat: 32, fiber: 15 }, recipe: "Hamburger di Pollo", ingredients: [
        { id: "chicken-patty", name: "Hamburger di Pollo", amount: "150g", calories: 300, macros: { protein: 35, carbs: 5, fat: 15, fiber: 0 } },
        { id: "bun", name: "Panino", amount: "1", calories: 200, macros: { protein: 6, carbs: 40, fat: 2, fiber: 2 } },
        { id: "vegetables", name: "Verdure", amount: "100g", calories: 50, macros: { protein: 2, carbs: 10, fat: 0, fiber: 4 } }
      ]},
      { id: "dinner", name: "Dinner", time: "7:00 PM", calories: 680, macros: { protein: 44, carbs: 70, fat: 28, fiber: 12 }, recipe: "Lasagne Vegetali", ingredients: [
        { id: "pasta-sheets", name: "Fogli di Pasta", amount: "100g", calories: 350, macros: { protein: 12, carbs: 70, fat: 2, fiber: 3 } },
        { id: "vegetables", name: "Verdure Miste", amount: "200g", calories: 50, macros: { protein: 3, carbs: 10, fat: 0, fiber: 4 } },
        { id: "cheese", name: "Formaggio", amount: "80g", calories: 280, macros: { protein: 20, carbs: 2, fat: 22, fiber: 0 } }
      ]},
      { id: "snacks", name: "Snacks", time: "3:00 PM", calories: 340, macros: { protein: 30, carbs: 52, fat: 24, fiber: 7 }, recipe: "Chips di Cavolo", ingredients: [
        { id: "kale", name: "Cavolo Nero", amount: "100g", calories: 50, macros: { protein: 3, carbs: 10, fat: 0, fiber: 4 } },
        { id: "olive-oil", name: "Olio d'Oliva", amount: "1 cucchiaio", calories: 120, macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 } },
        { id: "nuts", name: "Frutta Secca", amount: "30g", calories: 180, macros: { protein: 6, carbs: 8, fat: 15, fiber: 3 } }
      ]}
    ],
    6: [ // Domenica
      { id: "breakfast", name: "Breakfast", time: "7:00 AM", calories: 580, macros: { protein: 34, carbs: 52, fat: 28, fiber: 11 }, recipe: "Benedict Eggs", ingredients: [
        { id: "eggs", name: "Uova", amount: "2", calories: 140, macros: { protein: 12, carbs: 1, fat: 10, fiber: 0 } },
        { id: "english-muffin", name: "Muffin Inglese", amount: "1", calories: 150, macros: { protein: 6, carbs: 30, fat: 1, fiber: 2 } },
        { id: "ham", name: "Prosciutto", amount: "50g", calories: 100, macros: { protein: 15, carbs: 1, fat: 4, fiber: 0 } }
      ]},
      { id: "lunch", name: "Lunch", time: "12:30 PM", calories: 800, macros: { protein: 52, carbs: 65, fat: 35, fiber: 16 }, recipe: "Arrosto di Manzo", ingredients: [
        { id: "beef", name: "Manzo", amount: "200g", calories: 400, macros: { protein: 40, carbs: 0, fat: 24, fiber: 0 } },
        { id: "potatoes", name: "Patate", amount: "250g", calories: 200, macros: { protein: 5, carbs: 45, fat: 0, fiber: 5 } },
        { id: "vegetables", name: "Verdure", amount: "200g", calories: 50, macros: { protein: 3, carbs: 10, fat: 0, fiber: 4 } }
      ]},
      { id: "dinner", name: "Dinner", time: "7:00 PM", calories: 720, macros: { protein: 46, carbs: 75, fat: 30, fiber: 14 }, recipe: "Pasta Carbonara", ingredients: [
        { id: "pasta", name: "Pasta", amount: "120g", calories: 420, macros: { protein: 15, carbs: 84, fat: 2, fiber: 3 } },
        { id: "eggs", name: "Uova", amount: "2", calories: 140, macros: { protein: 12, carbs: 1, fat: 10, fiber: 0 } },
        { id: "pancetta", name: "Pancetta", amount: "80g", calories: 400, macros: { protein: 20, carbs: 0, fat: 35, fiber: 0 } }
      ]},
      { id: "snacks", name: "Snacks", time: "3:00 PM", calories: 360, macros: { protein: 32, carbs: 55, fat: 26, fiber: 8 }, recipe: "Cheesecake Proteica", ingredients: [
        { id: "protein-cheesecake", name: "Cheesecake Proteica", amount: "150g", calories: 250, macros: { protein: 25, carbs: 20, fat: 8, fiber: 3 } },
        { id: "berries", name: "Frutti di Bosco", amount: "80g", calories: 40, macros: { protein: 1, carbs: 10, fat: 0, fiber: 3 } },
        { id: "nuts", name: "Frutta Secca", amount: "25g", calories: 120, macros: { protein: 3, carbs: 5, fat: 10, fiber: 2 } }
      ]}
    ]
  }

  const exampleDiet = {
    totalCalories: 2150,
    totalMacros: { protein: 140, carbs: 215, fat: 95, fiber: 35 },
    meals: [
      {
        id: "breakfast",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 520,
        macros: { protein: 28, carbs: 45, fat: 22, fiber: 8 },
        ingredients: [
          {
            id: "oats",
            name: "Rolled Oats",
            amount: "60g",
            calories: 220,
            macros: { protein: 8, carbs: 40, fat: 4, fiber: 6 },
          },
          {
            id: "banana",
            name: "Banana",
            amount: "1 medium",
            calories: 105,
            macros: { protein: 1, carbs: 27, fat: 0, fiber: 3 },
          },
          {
            id: "almonds",
            name: "Almonds",
            amount: "20g",
            calories: 115,
            macros: { protein: 4, carbs: 4, fat: 10, fiber: 2 },
          },
          {
            id: "milk",
            name: "Almond Milk",
            amount: "200ml",
            calories: 80,
            macros: { protein: 3, carbs: 8, fat: 3, fiber: 1 },
          },
        ],
      },
      {
        id: "lunch",
        name: "Lunch",
        time: "12:30 PM",
        calories: 680,
        macros: { protein: 45, carbs: 52, fat: 28, fiber: 12 },
        ingredients: [
          {
            id: "chicken",
            name: "Grilled Chicken Breast",
            amount: "150g",
            calories: 280,
            macros: { protein: 35, carbs: 0, fat: 8, fiber: 0 },
          },
          {
            id: "quinoa",
            name: "Quinoa",
            amount: "80g dry",
            calories: 220,
            macros: { protein: 8, carbs: 40, fat: 4, fiber: 5 },
          },
          {
            id: "broccoli",
            name: "Broccoli",
            amount: "150g",
            calories: 51,
            macros: { protein: 5, carbs: 10, fat: 1, fiber: 5 },
          },
          {
            id: "avocado",
            name: "Avocado",
            amount: "1/2 medium",
            calories: 129,
            macros: { protein: 2, carbs: 7, fat: 12, fiber: 2 },
          },
        ],
      },
      {
        id: "dinner",
        name: "Dinner",
        time: "7:00 PM",
        calories: 650,
        macros: { protein: 42, carbs: 68, fat: 25, fiber: 10 },
        ingredients: [
          {
            id: "salmon",
            name: "Baked Salmon",
            amount: "150g",
            calories: 280,
            macros: { protein: 35, carbs: 0, fat: 15, fiber: 0 },
          },
          {
            id: "sweet-potato",
            name: "Sweet Potato",
            amount: "200g",
            calories: 180,
            macros: { protein: 4, carbs: 42, fat: 0, fiber: 6 },
          },
          {
            id: "spinach",
            name: "Spinach Salad",
            amount: "100g",
            calories: 23,
            macros: { protein: 3, carbs: 4, fat: 0, fiber: 2 },
          },
          {
            id: "olive-oil",
            name: "Olive Oil",
            amount: "1 tbsp",
            calories: 120,
            macros: { protein: 0, carbs: 0, fat: 14, fiber: 0 },
          },
        ],
      },
      {
        id: "snacks",
        name: "Snacks",
        time: "3:00 PM",
        calories: 300,
        macros: { protein: 25, carbs: 50, fat: 20, fiber: 5 },
        ingredients: [
          {
            id: "greek-yogurt",
            name: "Greek Yogurt",
            amount: "200g",
            calories: 130,
            macros: { protein: 20, carbs: 9, fat: 0, fiber: 0 },
          },
          {
            id: "berries",
            name: "Mixed Berries",
            amount: "100g",
            calories: 60,
            macros: { protein: 1, carbs: 14, fat: 0, fiber: 6 },
          },
          {
            id: "walnuts",
            name: "Walnuts",
            amount: "15g",
            calories: 100,
            macros: { protein: 2, carbs: 2, fat: 10, fiber: 1 },
          },
        ],
      },
    ],
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your diet plan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${aiTheme.primaryGradientBg} relative`}>
      <div className="max-w-4xl mx-auto">
        {/* Title and Description */}
        <div className="text-center p-4 pt-6">
          <h1 className={`text-2xl font-bold mb-2 ${aiTheme.primaryGradientText}`}>Your Diet Plan</h1>
          <p className="text-muted-foreground mb-4">
            {formData.age ? `${formData.age}y, ${formData.weight}kg, ${formData.height}m, ${formData.gender}` : 'Personalized nutrition plan'}
          </p>
          
          {/* Day Selector */}
          <div className="flex justify-center gap-1 mb-6 px-2">
            {daysOfWeek.map((day, index) => (
              <Button
                key={index}
                variant={selectedDay === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(index)}
                className={`w-10 h-8 text-xs px-2 ${
                  selectedDay === index 
                    ? aiTheme.aiButton 
                    : `${aiTheme.aiButtonOutline} hover:${getCyclicColor(index, aiTheme.cardGradients)}`
                }`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Compact Daily Totals - At top */}
        <div className="px-3 mb-2">
          <div className="grid grid-cols-4 gap-2">
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
              <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{exampleDiet.totalCalories}</div>
              <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-3`}>Cal</div>
            </Card>
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
              <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{exampleDiet.totalMacros.carbs}g</div>
              <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-1`}>Carb</div>
            </Card>
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
              <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{exampleDiet.totalMacros.protein}g</div>
              <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-1`}>Prot</div>
            </Card>
            <Card className={`p-2 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
              <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{exampleDiet.totalMacros.fat}g</div>
              <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-1`}>Grassi</div>
            </Card>
          </div>
        </div>

        {/* Meals List - Mobile optimized */}
        <div className="space-y-3 px-3 pb-24">
          {weeklyMeals[selectedDay as keyof typeof weeklyMeals].map((meal, index) => {
            return (
            <Card key={meal.id} className={`cursor-pointer ${aiTheme.aiCardHover} mx-0 bg-white border border-gray-200 relative`} onClick={() => toggleMeal(meal.id)}>
              <CardContent className="py-0 px-2">
                {/* Pulsante rigenera pasto - a sinistra della freccia */}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-1 right-8 w-6 h-6 p-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMealRegenerateDialog(meal.id)
                  }}
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
                
                {/* Freccia espandi */}
                <div className="absolute top-2 right-2 z-10">
                  {expandedMeals[meal.id] ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                <div className="flex items-center justify-between pr-8">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`text-xl flex-shrink-0 ${getCyclicColor(index, aiTheme.accentColors)}`}>
                      {getMealIcon(meal.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="text-base font-semibold truncate text-gray-800">
                         {meal.recipe}
                       </h3>
                      <p className="text-sm text-muted-foreground capitalize">{meal.name}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-lg font-bold ${getCyclicColor(index, aiTheme.accentColors)}`}>{meal.calories}</div>
                    <div className="text-xs text-muted-foreground">cal</div>
                  </div>
                </div>

                {/* Expanded Meal Details */}
                {expandedMeals[meal.id] && (
                  <div className="mt-3 space-y-3">
                    {/* Macronutrients in separate cards */}
                    <div className="grid grid-cols-4 gap-1">
                      <Card className={`p-1 text-center gap-2 ${getCyclicColor(0, aiTheme.cardGradients)}`}>
                        <div className={`text-sm font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{meal.calories}</div>
                        <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Cal</div>
                      </Card>
                      <Card className={`p-1 text-center gap-2 ${getCyclicColor(1, aiTheme.cardGradients)}`}>
                        <div className={`text-sm font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{meal.macros.carbs}g</div>
                        <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Carb</div>
                      </Card>
                      <Card className={`p-1 text-center gap-2 ${getCyclicColor(2, aiTheme.cardGradients)}`}>
                        <div className={`text-sm font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{meal.macros.protein}g</div>
                        <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Prot</div>
                      </Card>
                      <Card className={`p-1 text-center gap-2 ${getCyclicColor(3, aiTheme.cardGradients)}`}>
                        <div className={`text-sm font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{meal.macros.fat}g</div>
                        <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70 -mt-0.5`}>Grassi</div>
                      </Card>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Ingredients:</h4>
                      {meal.ingredients?.map((ingredient) => (
                        <Card key={ingredient.id} className="hover:shadow-md transition-shadow py-2 px-1">
                          <CardContent className="py-0 px-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <div className="text-lg flex-shrink-0">{getIngredientIcon(ingredient.name)}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">{ingredient.name}</div>
                                  <div className="text-xs text-muted-foreground">{ingredient.calories} cal</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="text-right">
                                  <div className="font-medium text-sm">{ingredient.amount}</div>
                                  <div className="text-xs text-muted-foreground">
                                    P:{ingredient.macros.protein} C:{ingredient.macros.carbs} F:{ingredient.macros.fat}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )) || (
                        <div className="text-center text-muted-foreground text-sm py-4">
                          Ingredienti non disponibili per questo pasto
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            )
          })}
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl p-3">
            <div className="flex justify-between">
            <Button
              size="sm"
              className={`w-12 h-12 rounded-xl ${aiTheme.aiButton}`}
              onClick={() => {
                // Accept action - go to favorites
                console.log("Accept diet plan")
                router.push("/favorites")
              }}
            >
              <Check className="w-5 h-5" />
            </Button>
            
            <Button
              size="sm"
              className={`w-12 h-12 rounded-xl ${aiTheme.aiButton}`}
              onClick={() => setShowRegenerateDialog(true)}
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
            
            <Button
              size="sm"
              className={`w-12 h-12 rounded-xl ${aiTheme.aiButton}`}
              onClick={() => {
                // Modify action - redirect to first slide of wizard
                console.log("Modify diet plan")
                router.push("/generate/wizard?step=0")
              }}
            >
              <Edit className="w-5 h-5" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-12 h-12 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="backdrop-blur-sm bg-background/95">
                <AlertDialogHeader>
                  <AlertDialogTitle>Annulla Generazione</AlertDialogTitle>
                  <AlertDialogDescription>
                    Sei sicuro di voler annullare la generazione del piano dietetico? 
                    Tutti i dati inseriti andranno persi e tornerai al wizard di generazione.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Mantieni</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      console.log("Reject diet plan")
                      router.push("/generate")
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Annulla Generazione
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </Card>
        </div>

        {/* Dialog per rigenerazione dieta */}
        <AlertDialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
          <AlertDialogContent className="backdrop-blur-sm bg-background/95">
            <AlertDialogHeader>
              <AlertDialogTitle>Rigenera Dieta</AlertDialogTitle>
              <AlertDialogDescription>
                Cosa vuoi rigenerare?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-3">
              <Button
                className={`w-full ${aiTheme.aiButton}`}
                onClick={() => {
                  console.log("Regenerate entire diet")
                  setShowRegenerateDialog(false)
                  router.push("/generate/wizard")
                }}
              >
                Rigenera tutta la dieta
              </Button>
              <Button
                variant="outline"
                className={`w-full ${aiTheme.aiButtonOutline}`}
                onClick={() => {
                  console.log(`Regenerate ${daysOfWeek[selectedDay]} only`)
                  setShowRegenerateDialog(false)
                  // Qui potresti implementare la logica per rigenerare solo il giorno selezionato
                }}
              >
                Rigenera solo {daysOfWeek[selectedDay]}
              </Button>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Dialog per rigenerazione singolo pasto */}
        <AlertDialog open={showMealRegenerateDialog !== null} onOpenChange={() => setShowMealRegenerateDialog(null)}>
          <AlertDialogContent className="backdrop-blur-sm bg-background/95">
            <AlertDialogHeader>
              <AlertDialogTitle>Rigenera Pasto</AlertDialogTitle>
              <AlertDialogDescription>
                Sei sicuro di voler rigenerare questo pasto? Verrà sostituito con una nuova ricetta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla</AlertDialogCancel>
              <AlertDialogAction
                className={aiTheme.aiButton}
                onClick={() => {
                  console.log(`Regenerate meal: ${showMealRegenerateDialog}`)
                  setShowMealRegenerateDialog(null)
                  // Qui potresti implementare la logica per rigenerare il singolo pasto
                }}
              >
                Rigenera Pasto
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  )
}
