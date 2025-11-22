'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function ShoppingList() {
  const items = [
    { id: '1', name: 'Chicken Breast (500g)', checked: false },
    { id: '2', name: 'Oats (1kg)', checked: true },
    { id: '3', name: 'Frozen Berries', checked: false },
    { id: '4', name: 'Greek Yogurt', checked: false },
    { id: '5', name: 'Asparagus', checked: false },
    { id: '6', name: 'Salmon Fillet', checked: false },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Smart Shopping List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} defaultChecked={item.checked} />
                    <Label 
                        htmlFor={item.id} 
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                    >
                        {item.name}
                    </Label>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
