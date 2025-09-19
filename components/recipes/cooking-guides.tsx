"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, ChefHat, Thermometer, Scale, Utensils } from "lucide-react"

const guides = [
  {
    id: "1",
    title: "Meal Prep Mastery",
    description: "Learn how to efficiently prepare meals for the entire week",
    content:
      "Master the art of meal prepping with our comprehensive guide covering planning, shopping, cooking, and storage techniques.",
    icon: Clock,
    difficulty: "Beginner",
    readTime: "8 min read",
    color: "text-primary",
    bgColor: "bg-primary/10",
    tips: [
      "Plan your meals for the week on Sunday",
      "Invest in quality food storage containers",
      "Prep ingredients in batches",
      "Cook grains and proteins in bulk",
      "Store prepped meals properly for freshness",
    ],
  },
  {
    id: "2",
    title: "Cooking Methods for Health",
    description: "Discover the healthiest ways to prepare your food",
    content:
      "Explore various cooking methods that preserve nutrients while enhancing flavor, from steaming to grilling.",
    icon: ChefHat,
    difficulty: "Intermediate",
    readTime: "12 min read",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    tips: [
      "Steam vegetables to retain maximum nutrients",
      "Grill or bake instead of frying",
      "Use minimal oil with non-stick cookware",
      "Don't overcook vegetables",
      "Try poaching for delicate proteins",
    ],
  },
  {
    id: "3",
    title: "Kitchen Temperature Guide",
    description: "Food safety temperatures and cooking guidelines",
    content:
      "Essential temperature guidelines for food safety and optimal cooking results across different ingredients.",
    icon: Thermometer,
    difficulty: "Beginner",
    readTime: "5 min read",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    tips: [
      "Chicken: 165°F (74°C) internal temperature",
      "Ground beef: 160°F (71°C)",
      "Fish: 145°F (63°C)",
      "Pork: 145°F (63°C) with 3-minute rest",
      "Use a meat thermometer for accuracy",
    ],
  },
  {
    id: "4",
    title: "Portion Control Guide",
    description: "Learn proper serving sizes for balanced nutrition",
    content: "Visual guides and practical tips for understanding appropriate portion sizes for different food groups.",
    icon: Scale,
    difficulty: "Beginner",
    readTime: "6 min read",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    tips: [
      "Protein: Palm-sized portion (3-4 oz)",
      "Vegetables: Fill half your plate",
      "Grains: Cupped hand portion (1/2 cup)",
      "Fats: Thumb-sized portion (1 tbsp)",
      "Use smaller plates to control portions",
    ],
  },
  {
    id: "5",
    title: "Knife Skills Basics",
    description: "Essential cutting techniques for efficient cooking",
    content: "Master fundamental knife skills to improve your cooking efficiency and food presentation.",
    icon: Utensils,
    difficulty: "Intermediate",
    readTime: "10 min read",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    tips: [
      "Keep knives sharp for safety and efficiency",
      "Use proper cutting board (wood or plastic)",
      "Master the basic cuts: dice, julienne, chop",
      "Practice the claw grip for safety",
      "Clean and store knives properly",
    ],
  },
  {
    id: "6",
    title: "Spice & Seasoning Guide",
    description: "Enhance flavors without adding calories",
    content: "Learn how to use herbs and spices to create delicious, healthy meals with complex flavors.",
    icon: BookOpen,
    difficulty: "Beginner",
    readTime: "7 min read",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    tips: [
      "Toast whole spices before grinding",
      "Add herbs at the end of cooking",
      "Experiment with spice blends",
      "Store spices in cool, dark places",
      "Replace salt with herbs and spices",
    ],
  },
]

export function CookingGuides() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-heading font-bold text-2xl">Cooking Guides & Techniques</h2>
        <p className="text-muted-foreground">
          Master essential cooking skills to create healthier, more delicious meals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => {
          const Icon = guide.icon
          return (
            <Card key={guide.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${guide.bgColor}`}>
                    <Icon className={`h-6 w-6 ${guide.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-heading font-bold">{guide.title}</CardTitle>
                    <CardDescription className="mt-1">{guide.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {guide.difficulty}
                  </Badge>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{guide.content}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Tips:</h4>
                  <ul className="space-y-1">
                    {guide.tips.slice(0, 3).map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Guide
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Reference */}
      <Card className="border-0 bg-muted/30">
        <CardHeader>
          <CardTitle className="font-heading font-bold text-xl flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Cooking Times</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Rice (1 cup)</span>
                  <span>18-20 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Quinoa (1 cup)</span>
                  <span>15 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Pasta</span>
                  <span>8-12 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Chicken breast</span>
                  <span>6-8 min/side</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Measurements</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>1 cup</span>
                  <span>240ml</span>
                </div>
                <div className="flex justify-between">
                  <span>1 tbsp</span>
                  <span>15ml</span>
                </div>
                <div className="flex justify-between">
                  <span>1 tsp</span>
                  <span>5ml</span>
                </div>
                <div className="flex justify-between">
                  <span>1 lb</span>
                  <span>454g</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Storage Tips</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Cooked rice</span>
                  <span>4-6 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Cooked chicken</span>
                  <span>3-4 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Cut vegetables</span>
                  <span>3-5 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Cooked pasta</span>
                  <span>3-5 days</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
