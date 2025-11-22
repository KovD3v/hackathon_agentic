'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function BiometricsChart() {
  // Mock chart for now
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Weight Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <div className="w-full h-full bg-muted/20 rounded-lg flex items-end justify-between px-4 pb-4 gap-2">
            {[65, 68, 74, 78, 82, 80, 85].map((h, i) => (
                <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
