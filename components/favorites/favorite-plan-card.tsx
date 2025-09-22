"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, Eye, Download, Trash2, Copy, Share } from "lucide-react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"

interface FavoritePlanCardProps {
  item: any
  onRemove: () => void
}

export function FavoritePlanCard({ item, onRemove }: FavoritePlanCardProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleView = () => {
    window.location.href = `/favorites/plan/${item.id}`
  }

  const handleDuplicate = () => {
    // Duplicate plan
    console.log("Duplicate plan:", item.id)
  }

  const handleExport = () => {
    // Export plan as PDF
    console.log("Export plan:", item.id)
  }

  const handleShare = () => {
    // Share plan
    console.log("Share plan:", item.id)
  }

  return (
    <Card className={`${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`text-lg font-heading font-bold ${getCyclicColor(1, aiTheme.textColors)}`}>{item.name}</CardTitle>
            <CardDescription className="mt-1">{item.description}</CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <Eye className="h-4 w-4 mr-2" />
                View Plan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemove} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Saved {formatDate(item.savedAt)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-3 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-lg`}>
            <div className={`text-lg font-bold ${getCyclicColor(0, aiTheme.accentColors)}`}>{item.data.totalCalories}</div>
            <div className={`text-xs ${getCyclicColor(0, aiTheme.accentColors)} opacity-70`}>Daily Calories</div>
          </div>
          <div className={`text-center p-3 ${getCyclicColor(1, aiTheme.cardGradients)} rounded-lg`}>
            <div className={`text-lg font-bold ${getCyclicColor(1, aiTheme.accentColors)}`}>{item.data.macros.protein}g</div>
            <div className={`text-xs ${getCyclicColor(1, aiTheme.accentColors)} opacity-70`}>Protein</div>
          </div>
          <div className={`text-center p-3 ${getCyclicColor(2, aiTheme.cardGradients)} rounded-lg`}>
            <div className={`text-lg font-bold ${getCyclicColor(2, aiTheme.accentColors)}`}>{item.data.macros.carbs}g</div>
            <div className={`text-xs ${getCyclicColor(2, aiTheme.accentColors)} opacity-70`}>Carbs</div>
          </div>
          <div className={`text-center p-3 ${getCyclicColor(3, aiTheme.cardGradients)} rounded-lg`}>
            <div className={`text-lg font-bold ${getCyclicColor(3, aiTheme.accentColors)}`}>{item.data.macros.fat}g</div>
            <div className={`text-xs ${getCyclicColor(3, aiTheme.accentColors)} opacity-70`}>Fat</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Badge variant="outline" className="text-xs">
            {item.data.days} days
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleView} className={`flex-1 ${aiTheme.aiButton}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Plan
          </Button>
          <Button onClick={handleDuplicate} variant="outline" className={aiTheme.aiButtonOutline}>
            <Copy className="h-4 w-4 mr-2" />
            Use Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
