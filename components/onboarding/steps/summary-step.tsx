"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Target, Utensils, CheckCircle } from "lucide-react"
import type { OnboardingData } from "../onboarding-flow"

interface SummaryStepProps {
  data: OnboardingData
}

export function SummaryStep({ data }: SummaryStepProps) {
  const getGoalTitle = (goal: string) => {
    const goals: Record<string, string> = {
      lose_weight: "Lose Weight",
      maintain_weight: "Maintain Weight",
      gain_weight: "Gain Weight",
      build_muscle: "Build Muscle",
    }
    return goals[goal] || goal
  }

  const getActivityTitle = (level: string) => {
    const levels: Record<string, string> = {
      sedentary: "Sedentary",
      lightly_active: "Lightly Active",
      moderately_active: "Moderately Active",
      very_active: "Very Active",
      extremely_active: "Extremely Active",
    }
    return levels[level] || level
  }

  const getTimeframeTitle = (timeframe: string) => {
    const timeframes: Record<string, string> = {
      "1_month": "1 Month",
      "3_months": "3 Months",
      "6_months": "6 Months",
      "1_year": "1 Year",
      long_term: "Long Term (1+ years)",
    }
    return timeframes[timeframe] || timeframe
  }

  const getCookingTimeTitle = (time: string) => {
    const times: Record<string, string> = {
      minimal: "Minimal (0-15 min)",
      quick: "Quick (15-30 min)",
      moderate: "Moderate (30-60 min)",
      extensive: "Extensive (60+ min)",
    }
    return times[time] || time
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle className="h-12 w-12 text-primary mx-auto" />
        <h3 className="font-heading font-bold text-xl">Almost Ready!</h3>
        <p className="text-muted-foreground">
          Review your information below. We'll use this to create your personalized diet plan.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="border-0 bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>
                <span className="ml-2 font-medium">{data.personalInfo.age} years</span>
              </div>
              <div>
                <span className="text-muted-foreground">Gender:</span>
                <span className="ml-2 font-medium capitalize">{data.personalInfo.gender}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Height:</span>
                <span className="ml-2 font-medium">{data.personalInfo.height} cm</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <span className="ml-2 font-medium">{data.personalInfo.weight} kg</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground text-sm">Activity Level:</span>
              <Badge variant="outline" className="ml-2">
                {getActivityTitle(data.personalInfo.activityLevel)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-muted-foreground text-sm">Primary Goal:</span>
              <Badge className="ml-2">{getGoalTitle(data.goals.primaryGoal)}</Badge>
            </div>
            {data.goals.targetWeight && (
              <div>
                <span className="text-muted-foreground text-sm">Target Weight:</span>
                <span className="ml-2 font-medium">{data.goals.targetWeight} kg</span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground text-sm">Timeframe:</span>
              <Badge variant="outline" className="ml-2">
                {getTimeframeTitle(data.goals.timeframe)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-muted-foreground text-sm">Meals Per Day:</span>
              <Badge variant="outline" className="ml-2">
                {data.preferences.mealsPerDay} meals
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Cooking Time:</span>
              <Badge variant="outline" className="ml-2">
                {getCookingTimeTitle(data.preferences.cookingTime)}
              </Badge>
            </div>
            {data.preferences.dietaryRestrictions.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm block mb-2">Dietary Restrictions:</span>
                <div className="flex flex-wrap gap-1">
                  {data.preferences.dietaryRestrictions.map((restriction) => (
                    <Badge key={restriction} variant="secondary" className="text-xs">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {data.preferences.allergies.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm block mb-2">Allergies:</span>
                <div className="flex flex-wrap gap-1">
                  {data.preferences.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
