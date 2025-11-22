'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Flame } from 'lucide-react'

export function MealPlan({ initialRecipes = [] }: { initialRecipes?: any[] }) {
  const meals = initialRecipes.length > 0 ? initialRecipes.map(r => ({
      type: 'Meal', // Type might need to be inferred or added to DB
      name: r.name,
      calories: r.macros?.calories || 0,
      protein: r.macros?.protein || '0g',
      time: 'TBD'
  })) : [
    { type: 'Breakfast', name: 'Oatmeal & Berries', calories: 350, protein: '12g', time: '08:00 AM' },
    { type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450, protein: '40g', time: '01:00 PM' },
    { type: 'Snack', name: 'Greek Yogurt & Honey', calories: 150, protein: '15g', time: '04:00 PM' },
    { type: 'Dinner', name: 'Salmon & Asparagus', calories: 500, protein: '35g', time: '07:00 PM' },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Today's Meal Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {meals.map((meal, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">{meal.type}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {meal.time}
                        </span>
                    </div>
                    <span className="font-medium text-lg">{meal.name}</span>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-medium">
                        <Flame className="h-4 w-4 text-orange-500" />
                        {meal.calories} kcal
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {meal.protein} protein
                    </div>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}
