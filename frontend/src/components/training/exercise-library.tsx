'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function ExerciseLibrary({ initialWorkouts = [] }: { initialWorkouts?: any[] }) {
  const exercises = initialWorkouts.length > 0 ? initialWorkouts.map(w => ({
      name: w.name || 'Unknown Workout',
      muscle: w.muscle_group || 'General',
      difficulty: w.difficulty || 'Intermediate'
  })) : [
    { name: 'Bench Press', muscle: 'Chest', difficulty: 'Intermediate' },
    { name: 'Pull Ups', muscle: 'Back', difficulty: 'Intermediate' },
    { name: 'Squats', muscle: 'Legs', difficulty: 'Beginner' },
    { name: 'Deadlift', muscle: 'Back/Legs', difficulty: 'Advanced' },
    { name: 'Overhead Press', muscle: 'Shoulders', difficulty: 'Intermediate' },
  ]

  return (
    <Card className="h-full">
        <CardHeader>
            <CardTitle>Exercise Library</CardTitle>
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search exercises..." className="pl-8" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {exercises.map((ex, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md border hover:bg-accent cursor-pointer transition-colors">
                        <div>
                            <p className="font-medium">{ex.name}</p>
                            <p className="text-xs text-muted-foreground">{ex.muscle}</p>
                        </div>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full text-secondary-foreground">
                            {ex.difficulty}
                        </span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  )
}
