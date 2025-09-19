"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Heart, Zap, Shield, Apple, Droplets } from "lucide-react"

const tips = [
  {
    id: "1",
    title: "Hydration is Key",
    description: "Drinking enough water is crucial for metabolism, digestion, and overall health.",
    content:
      "Aim for 8-10 glasses of water daily. Start your day with a glass of water, and drink before meals to aid digestion. Add lemon or cucumber for flavor without calories.",
    icon: Droplets,
    category: "hydration",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "2",
    title: "Protein at Every Meal",
    description: "Including protein in each meal helps maintain muscle mass and keeps you satisfied longer.",
    content:
      "Aim for 20-30g of protein per meal. Good sources include lean meats, fish, eggs, legumes, and dairy. Plant-based options like quinoa and hemp seeds are also excellent.",
    icon: Zap,
    category: "protein",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "3",
    title: "Eat the Rainbow",
    description: "Different colored fruits and vegetables provide various nutrients and antioxidants.",
    content:
      "Try to include 5-7 different colored fruits and vegetables daily. Each color represents different phytonutrients that support various aspects of health.",
    icon: Apple,
    category: "vegetables",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "4",
    title: "Healthy Fats Matter",
    description: "Not all fats are bad. Your body needs healthy fats for hormone production and nutrient absorption.",
    content:
      "Include sources like avocados, nuts, seeds, olive oil, and fatty fish. Aim for 20-35% of your daily calories from healthy fats.",
    icon: Heart,
    category: "fats",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "5",
    title: "Meal Timing Strategies",
    description: "When you eat can be as important as what you eat for optimizing energy and metabolism.",
    content:
      "Consider eating larger meals earlier in the day when your metabolism is higher. Allow 3-4 hours between meals and avoid eating 2-3 hours before bedtime.",
    icon: TrendingUp,
    category: "timing",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "6",
    title: "Mindful Eating",
    description: "Paying attention to your food and eating habits can improve digestion and satisfaction.",
    content:
      "Eat slowly, chew thoroughly, and minimize distractions. Listen to your hunger and fullness cues. This helps prevent overeating and improves nutrient absorption.",
    icon: Shield,
    category: "mindfulness",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

export function NutritionTips() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-heading font-bold text-2xl">Nutrition Tips & Insights</h2>
        <p className="text-muted-foreground">Evidence-based nutrition advice to help you make better food choices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip) => {
          const Icon = tip.icon
          return (
            <Card key={tip.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tip.bgColor}`}>
                    <Icon className={`h-6 w-6 ${tip.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-heading font-bold">{tip.title}</CardTitle>
                    <CardDescription className="mt-1">{tip.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{tip.content}</p>

                <Badge variant="secondary" className="text-xs">
                  {tip.category}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Tips */}
      <Card className="border-0 bg-primary/5">
        <CardHeader>
          <CardTitle className="font-heading font-bold text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Daily Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Morning</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with a glass of water</li>
                <li>• Include protein in breakfast</li>
                <li>• Add fiber-rich foods</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Throughout the Day</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Eat every 3-4 hours</li>
                <li>• Choose whole foods over processed</li>
                <li>• Stay hydrated consistently</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Evening</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lighter dinner portions</li>
                <li>• Stop eating 2-3 hours before bed</li>
                <li>• Reflect on your food choices</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Weekly Goals</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Try 2-3 new healthy recipes</li>
                <li>• Meal prep for busy days</li>
                <li>• Track your progress</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
