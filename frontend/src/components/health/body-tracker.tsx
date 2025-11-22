'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Heart, Moon } from 'lucide-react'

export function BodyTracker() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Health Vitals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <Heart className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Resting Heart Rate</p>
                <p className="text-2xl font-bold">62 BPM</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                <Moon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Sleep Quality</p>
                <p className="text-2xl font-bold">7h 45m</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                <Activity className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Daily Steps</p>
                <p className="text-2xl font-bold">8,432</p>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
