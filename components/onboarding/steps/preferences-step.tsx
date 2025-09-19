"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Clock, AlertTriangle, X } from "lucide-react"

interface PreferencesData {
  dietaryRestrictions: string[]
  allergies: string[]
  mealsPerDay: string
  cookingTime: string
}

interface PreferencesStepProps {
  data: PreferencesData
  onUpdate: (data: Partial<PreferencesData>) => void
}

export function PreferencesStep({ data, onUpdate }: PreferencesStepProps) {
  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Keto",
    "Paleo",
    "Mediterranean",
    "Low Carb",
    "Gluten Free",
    "Dairy Free",
    "Halal",
    "Kosher",
  ]

  const allergyOptions = ["Nuts", "Peanuts", "Shellfish", "Fish", "Eggs", "Dairy", "Soy", "Wheat/Gluten", "Sesame"]

  const toggleRestriction = (restriction: string) => {
    const current = data.dietaryRestrictions
    if (current.includes(restriction)) {
      onUpdate({ dietaryRestrictions: current.filter((r) => r !== restriction) })
    } else {
      onUpdate({ dietaryRestrictions: [...current, restriction] })
    }
  }

  const toggleAllergy = (allergy: string) => {
    const current = data.allergies
    if (current.includes(allergy)) {
      onUpdate({ allergies: current.filter((a) => a !== allergy) })
    } else {
      onUpdate({ allergies: [...current, allergy] })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          Dietary Restrictions (Optional)
        </Label>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <Badge
              key={option}
              variant={data.dietaryRestrictions.includes(option) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => toggleRestriction(option)}
            >
              {option}
              {data.dietaryRestrictions.includes(option) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Allergies (Optional)
        </Label>
        <div className="flex flex-wrap gap-2">
          {allergyOptions.map((option) => (
            <Badge
              key={option}
              variant={data.allergies.includes(option) ? "destructive" : "outline"}
              className="cursor-pointer hover:bg-destructive/10 transition-colors"
              onClick={() => toggleAllergy(option)}
            >
              {option}
              {data.allergies.includes(option) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Meals Per Day</Label>
          <Select value={data.mealsPerDay} onValueChange={(value) => onUpdate({ mealsPerDay: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="How many meals?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 Meals (Breakfast, Lunch, Dinner)</SelectItem>
              <SelectItem value="4">4 Meals (+ 1 Snack)</SelectItem>
              <SelectItem value="5">5 Meals (+ 2 Snacks)</SelectItem>
              <SelectItem value="6">6 Meals (+ 3 Snacks)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Cooking Time
          </Label>
          <Select value={data.cookingTime} onValueChange={(value) => onUpdate({ cookingTime: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="How much time can you spend?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal (0-15 min)</SelectItem>
              <SelectItem value="quick">Quick (15-30 min)</SelectItem>
              <SelectItem value="moderate">Moderate (30-60 min)</SelectItem>
              <SelectItem value="extensive">Extensive (60+ min)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-muted/30 border-0">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
            <div>
              <h4 className="font-medium text-sm mb-1">Personalization</h4>
              <p className="text-sm text-muted-foreground">
                Your preferences help us create meal plans that fit your lifestyle. You can always update these settings
                later in your profile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
