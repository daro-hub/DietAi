"use client"

import { useState, useEffect } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DietReview } from "@/components/diet/diet-review"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Utensils, Apple, Heart, Plus, CheckCircle } from "lucide-react"
import Link from "next/link"
import { getLocalStorageItem } from "@/hooks/use-local-storage"

export default function GenerateReviewPage() {
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if there's a newly generated plan
    const plan = getLocalStorageItem("dietai-generated-plan")
    setGeneratedPlan(plan)
    setIsLoading(false)
  }, [])
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If there's a generated plan, show the review component
  if (generatedPlan) {
    return <DietReview />
  }

  // Mock data for demonstration
  const savedPlans = [
    {
      id: "1",
      title: "Mediterranean Weight Loss Plan",
      description: "7-day Mediterranean diet for sustainable weight loss",
      createdAt: "2024-01-15",
      calories: 1800,
      duration: "7 days",
      status: "active"
    },
    {
      id: "2", 
      title: "Muscle Building Bulk Plan",
      description: "High-calories plan for muscle growth",
      createdAt: "2024-01-12",
      calories: 2800,
      duration: "14 days",
      status: "completed"
    },
    {
      id: "3",
      title: "Maintenance Plan",
      description: "Balanced nutrition for weight maintenance",
      createdAt: "2024-01-10",
      calories: 2200,
      duration: "30 days",
      status: "paused"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "completed": return "bg-blue-500"
      case "paused": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "completed": return "Completed"
      case "paused": return "Paused"
      default: return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="mobile-container">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/generate">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Generate
              </Link>
            </Button>
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl">Review Plans</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Manage and review your generated diet plans
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{savedPlans.length}</div>
                <div className="text-sm text-muted-foreground">Total Plans</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{savedPlans.filter(p => p.status === "active").length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{savedPlans.filter(p => p.status === "completed").length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Create New Plan */}
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Create New Plan</h3>
                  <p className="text-muted-foreground">Generate a new personalized diet plan</p>
                </div>
                <Button asChild>
                  <Link href="/generate/wizard">
                    <Plus className="h-4 w-4 mr-2" />
                    New Plan
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plans List */}
          <div className="space-y-4">
            {savedPlans.map((plan) => (
              <Card key={plan.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{plan.title}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(plan.status)}`}>
                          {getStatusText(plan.status)}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{plan.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {plan.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <Utensils className="h-4 w-4" />
                          {plan.calories} cal
                        </div>
                        <div className="flex items-center gap-1">
                          <Apple className="h-4 w-4" />
                          {plan.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {savedPlans.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">No Plans Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first diet plan to get started.
                </p>
                <Button asChild>
                  <Link href="/generate/wizard">Create Your First Plan</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
