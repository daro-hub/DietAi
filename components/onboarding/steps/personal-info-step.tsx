"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { User, Ruler, Weight, Activity } from "lucide-react"

interface PersonalInfoData {
  age: string
  gender: string
  height: string
  weight: string
  activityLevel: string
}

interface PersonalInfoStepProps {
  data: PersonalInfoData
  onUpdate: (data: Partial<PersonalInfoData>) => void
}

export function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium">
            Age
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="age"
              type="number"
              placeholder="25"
              value={data.age}
              onChange={(e) => onUpdate({ age: e.target.value })}
              className="pl-10 h-12"
              min="13"
              max="100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium">
            Gender
          </Label>
          <Select value={data.gender} onValueChange={(value) => onUpdate({ gender: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium">
            Height (cm)
          </Label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={data.height}
              onChange={(e) => onUpdate({ height: e.target.value })}
              className="pl-10 h-12"
              min="100"
              max="250"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium">
            Current Weight (kg)
          </Label>
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={data.weight}
              onChange={(e) => onUpdate({ weight: e.target.value })}
              className="pl-10 h-12"
              min="30"
              max="300"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Activity Level
        </Label>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              value: "sedentary",
              title: "Sedentary",
              description: "Little to no exercise, desk job",
            },
            {
              value: "lightly_active",
              title: "Lightly Active",
              description: "Light exercise 1-3 days/week",
            },
            {
              value: "moderately_active",
              title: "Moderately Active",
              description: "Moderate exercise 3-5 days/week",
            },
            {
              value: "very_active",
              title: "Very Active",
              description: "Hard exercise 6-7 days/week",
            },
            {
              value: "extremely_active",
              title: "Extremely Active",
              description: "Very hard exercise, physical job",
            },
          ].map((level) => (
            <Card
              key={level.value}
              className={`cursor-pointer transition-all hover:shadow-md ${
                data.activityLevel === level.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onUpdate({ activityLevel: level.value })}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      data.activityLevel === level.value ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}
                  />
                  <div>
                    <h4 className="font-medium">{level.title}</h4>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
