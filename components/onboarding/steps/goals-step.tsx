"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Target, TrendingDown, TrendingUp, Minus, Clock } from "lucide-react"

interface GoalsData {
  primaryGoal: string
  targetWeight: string
  timeframe: string
}

interface GoalsStepProps {
  data: GoalsData
  onUpdate: (data: Partial<GoalsData>) => void
}

export function GoalsStep({ data, onUpdate }: GoalsStepProps) {
  const goals = [
    {
      value: "lose_weight",
      title: "Lose Weight",
      description: "Reduce body weight and body fat",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      value: "maintain_weight",
      title: "Maintain Weight",
      description: "Keep current weight stable",
      icon: Minus,
      color: "text-blue-500",
    },
    {
      value: "gain_weight",
      title: "Gain Weight",
      description: "Increase muscle mass and weight",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      value: "build_muscle",
      title: "Build Muscle",
      description: "Focus on muscle growth and strength",
      icon: Target,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4" />
          Primary Goal
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map((goal) => {
            const Icon = goal.icon
            return (
              <Card
                key={goal.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  data.primaryGoal === goal.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => onUpdate({ primaryGoal: goal.value })}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        data.primaryGoal === goal.value ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`h-4 w-4 ${goal.color}`} />
                        <h4 className="font-medium">{goal.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {(data.primaryGoal === "lose_weight" || data.primaryGoal === "gain_weight") && (
        <div className="space-y-2">
          <Label htmlFor="targetWeight" className="text-sm font-medium">
            Target Weight (kg)
          </Label>
          <Input
            id="targetWeight"
            type="number"
            placeholder="65"
            value={data.targetWeight}
            onChange={(e) => onUpdate({ targetWeight: e.target.value })}
            className="h-12"
            min="30"
            max="300"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Timeframe
        </Label>
        <Select value={data.timeframe} onValueChange={(value) => onUpdate({ timeframe: value })}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="How long do you want to achieve this goal?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1_month">1 Month</SelectItem>
            <SelectItem value="3_months">3 Months</SelectItem>
            <SelectItem value="6_months">6 Months</SelectItem>
            <SelectItem value="1_year">1 Year</SelectItem>
            <SelectItem value="long_term">Long Term (1+ years)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-muted/30 border-0">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <div>
              <h4 className="font-medium text-sm mb-1">Tip</h4>
              <p className="text-sm text-muted-foreground">
                Setting realistic goals and timeframes increases your chances of success. We'll create a personalized
                plan that fits your lifestyle and helps you achieve sustainable results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
