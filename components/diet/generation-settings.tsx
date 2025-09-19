"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

interface GenerationParams {
  goal: string
  duration: string
  customPrompt: string
  includeSnacks: boolean
  mealComplexity: string
}

interface GenerationSettingsProps {
  params: GenerationParams
  onUpdate: (params: GenerationParams) => void
}

export function GenerationSettings({ params, onUpdate }: GenerationSettingsProps) {
  const updateParam = (key: keyof GenerationParams, value: any) => {
    onUpdate({ ...params, [key]: value })
  }

  return (
    <Card className="border-0 bg-muted/30">
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Meal Complexity</Label>
            <Select value={params.mealComplexity} onValueChange={(value) => updateParam("mealComplexity", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple (5-15 min)</SelectItem>
                <SelectItem value="moderate">Moderate (15-30 min)</SelectItem>
                <SelectItem value="complex">Complex (30+ min)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Include Snacks</Label>
              <p className="text-xs text-muted-foreground">Add healthy snacks between meals</p>
            </div>
            <Switch
              checked={params.includeSnacks}
              onCheckedChange={(checked) => updateParam("includeSnacks", checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
