"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface MacroChartProps {
  macros: {
    protein: number
    carbs: number
    fat: number
  }
}

export function MacroChart({ macros }: MacroChartProps) {
  const data = [
    { name: "Protein", value: macros.protein * 4, grams: macros.protein, color: "#84cc16" },
    { name: "Carbs", value: macros.carbs * 4, grams: macros.carbs, color: "#3b82f6" },
    { name: "Fat", value: macros.fat * 9, grams: macros.fat, color: "#f97316" },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.grams}g (
            {Math.round((data.value / data.reduce((sum: number, item: any) => sum + item.value, 0)) * 100)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value, entry: any) => (
              <span style={{ color: entry.color }}>
                {value}: {entry.payload.grams}g
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
