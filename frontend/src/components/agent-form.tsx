"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface AgentFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function AgentForm({ onSubmit, isLoading }: AgentFormProps) {
  const [formData, setFormData] = useState({
    user_id: "user_" + Math.random().toString(36).substr(2, 9),
    medical_records_text: "Patient is a 30-year-old male. Height: 180cm, Weight: 85kg. Waist: 90cm, Neck: 40cm. No known allergies. Mild lower back pain reported after long periods of sitting.",
    wearable_data: JSON.stringify({ steps: 8500, resting_hr: 62, sleep_score: 78 }, null, 2),
    user_goals: "Lose 5kg of fat, improve posture, and build functional strength.",
    time_constraints: "45 minutes per session, 4 days a week.",
    location: "Berlin, Germany",
    budget: "Medium (€50-100/month)",
    photo_path: "/path/to/user/photo.jpg" // Placeholder for now
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Parse wearable data safely
    let parsedWearable = {}
    try {
      parsedWearable = JSON.parse(formData.wearable_data)
    } catch (e) {
      console.error("Invalid JSON for wearable data")
    }

    onSubmit({
      ...formData,
      wearable_data: parsedWearable
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Health Agent Orchestra</CardTitle>
        <CardDescription>Enter your health data to get a personalized plan from our AI agents.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="medical_records_text">Medical Records / Health Context</Label>
            <Textarea 
              id="medical_records_text" 
              name="medical_records_text"
              value={formData.medical_records_text}
              onChange={handleChange}
              placeholder="Enter medical history, measurements, etc."
              className="h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user_goals">Goals</Label>
              <Input 
                id="user_goals" 
                name="user_goals"
                value={formData.user_goals}
                onChange={handleChange}
                placeholder="e.g. Lose weight, build muscle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time_constraints">Time Constraints</Label>
              <Input 
                id="time_constraints" 
                name="time_constraints"
                value={formData.time_constraints}
                onChange={handleChange}
                placeholder="e.g. 30 mins, 3x/week"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input 
                id="budget" 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. Low, Medium, High"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wearable_data">Wearable Data (JSON)</Label>
            <Textarea 
              id="wearable_data" 
              name="wearable_data"
              value={formData.wearable_data}
              onChange={handleChange}
              className="font-mono text-sm h-24"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Orchestrating Agents...
              </>
            ) : (
              "Generate Health Plan"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
