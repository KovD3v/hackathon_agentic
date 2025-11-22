'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ExercisePlayer() {
  const [currentExercise] = useState(0)
  
  const workout = [
    { name: 'Push Ups', sets: 3, reps: 12 },
    { name: 'Dumbbell Rows', sets: 3, reps: 12 },
    { name: 'Squats', sets: 4, reps: 15 },
  ]

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Current Workout: Upper Body Power</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold mb-2">{workout[currentExercise].name}</h3>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Sets</p>
                <p className="text-2xl font-bold">{workout[currentExercise].sets}</p>
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Reps</p>
                <p className="text-2xl font-bold">{workout[currentExercise].reps}</p>
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Rest</p>
                <p className="text-2xl font-bold">60s</p>
            </div>
        </div>

      </CardContent>
    </Card>
  )
}
