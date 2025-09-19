"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { GoalsStep } from "./steps/goals-step"
import { PreferencesStep } from "./steps/preferences-step"
import { SummaryStep } from "./steps/summary-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"

export interface OnboardingData {
  personalInfo: {
    age: string
    gender: string
    height: string
    weight: string
    activityLevel: string
  }
  goals: {
    primaryGoal: string
    targetWeight: string
    timeframe: string
  }
  preferences: {
    dietaryRestrictions: string[]
    allergies: string[]
    mealsPerDay: string
    cookingTime: string
  }
}

const steps = [
  { id: 1, title: "Personal Info", description: "Tell us about yourself" },
  { id: 2, title: "Goals", description: "What do you want to achieve?" },
  { id: 3, title: "Preferences", description: "Your dietary preferences" },
  { id: 4, title: "Summary", description: "Review your information" },
]

export function OnboardingFlow() {
  const { updateUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    personalInfo: {
      age: "",
      gender: "",
      height: "",
      weight: "",
      activityLevel: "",
    },
    goals: {
      primaryGoal: "",
      targetWeight: "",
      timeframe: "",
    },
    preferences: {
      dietaryRestrictions: [],
      allergies: [],
      mealsPerDay: "",
      cookingTime: "",
    },
  })

  const updateData = (section: keyof OnboardingData, newData: any) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...newData },
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to save onboarding data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user with preferences
      updateUser({
        preferences: {
          goal: data.goals.primaryGoal,
          dietaryRestrictions: data.preferences.dietaryRestrictions,
          allergies: data.preferences.allergies,
        },
      })

      // Redirect to dashboard or diet generation
      window.location.href = "/generate"
    } catch (error) {
      console.error("Failed to complete onboarding:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={data.personalInfo} onUpdate={(newData) => updateData("personalInfo", newData)} />
      case 2:
        return <GoalsStep data={data.goals} onUpdate={(newData) => updateData("goals", newData)} />
      case 3:
        return <PreferencesStep data={data.preferences} onUpdate={(newData) => updateData("preferences", newData)} />
      case 4:
        return <SummaryStep data={data} />
      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          data.personalInfo.age &&
          data.personalInfo.gender &&
          data.personalInfo.height &&
          data.personalInfo.weight &&
          data.personalInfo.activityLevel
        )
      case 2:
        return data.goals.primaryGoal && data.goals.timeframe
      case 3:
        return data.preferences.mealsPerDay && data.preferences.cookingTime
      case 4:
        return true
      default:
        return false
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading font-bold text-2xl">Setup Your Profile</h1>
            <span className="text-sm text-muted-foreground">
              {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`text-xs ${step.id <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="text-center">
            <CardTitle className="font-heading font-bold text-xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-base">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length ? (
            <Button onClick={handleComplete} disabled={!isStepValid() || isLoading} className="flex items-center gap-2">
              {isLoading ? "Setting up..." : "Complete Setup"}
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
