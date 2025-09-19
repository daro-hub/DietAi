"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, TrendingUp } from "lucide-react"

const popularDiets = [
  {
    id: "mediterranean",
    name: "Mediterranean Diet",
    description: "Rich in fruits, vegetables, whole grains, and healthy fats",
    benefits: ["Heart health", "Brain function", "Weight management"],
    difficulty: "Easy",
    duration: "Lifestyle",
    popularity: 95,
    image: "/mediterranean-diet.jpg",
  },
  {
    id: "keto",
    name: "Ketogenic Diet",
    description: "Very low-carb, high-fat diet that puts body into ketosis",
    benefits: ["Rapid weight loss", "Mental clarity", "Blood sugar control"],
    difficulty: "Hard",
    duration: "3-6 months",
    popularity: 88,
    image: "/keto-diet.jpg",
  },
  {
    id: "intermittent-fasting",
    name: "Intermittent Fasting",
    description: "Eating pattern that cycles between periods of fasting and eating",
    benefits: ["Weight loss", "Cellular repair", "Longevity"],
    difficulty: "Medium",
    duration: "Flexible",
    popularity: 82,
    image: "/intermittent-fasting.jpg",
  },
  {
    id: "paleo",
    name: "Paleo Diet",
    description: "Based on foods presumed to be eaten by early humans",
    benefits: ["Reduced inflammation", "Better digestion", "Natural foods"],
    difficulty: "Medium",
    duration: "Lifestyle",
    popularity: 75,
    image: "/paleo-diet.jpg",
  },
  {
    id: "plant-based",
    name: "Plant-Based Diet",
    description: "Focuses on foods derived from plants",
    benefits: ["Environmental impact", "Heart health", "Disease prevention"],
    difficulty: "Medium",
    duration: "Lifestyle",
    popularity: 78,
    image: "/plant-based-diet.jpg",
  },
  {
    id: "dash",
    name: "DASH Diet",
    description: "Dietary approach to stop hypertension",
    benefits: ["Lower blood pressure", "Heart health", "Balanced nutrition"],
    difficulty: "Easy",
    duration: "Lifestyle",
    popularity: 70,
    image: "/dash-diet.jpg",
  },
]

export function DietsExplorer() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {popularDiets.map((diet) => (
          <Card key={diet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <img
                src={diet.image || "/placeholder.svg"}
                alt={diet.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling!.style.display = "flex"
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 hidden items-center justify-center">
                <div className="text-4xl font-bold text-primary/60">{diet.name[0]}</div>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{diet.name}</CardTitle>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>{diet.popularity}%</span>
                </div>
              </div>
              <CardDescription className="text-sm">{diet.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{diet.duration}</span>
                </div>
                <Badge className={getDifficultyColor(diet.difficulty)}>{diet.difficulty}</Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Key Benefits:</div>
                <div className="flex flex-wrap gap-1">
                  {diet.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
