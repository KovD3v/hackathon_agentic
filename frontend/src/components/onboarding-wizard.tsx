'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'

export function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    goal: '',
    experience_level: '',
    equipment: '',
    dietary_preferences: [],
    allergies: '',
    medical_file: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      // Send data to backend
      const response = await fetch('http://localhost:8000/api/v1/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          step: step,
          data: formData
        })
      })

      if (!response.ok) throw new Error("Failed to update profile")

      if (step < 5) {
        setStep(step + 1)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error(error)
      // Show error toast
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step {step} of 5</CardTitle>
          <CardDescription>
            {step === 1 && "Let's start with the basics."}
            {step === 2 && "What is your main goal?"}
            {step === 3 && "Tell us about your experience."}
            {step === 4 && "Any dietary preferences?"}
            {step === 5 && "Medical History (Optional)"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(val) => handleSelectChange('gender', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} />
              </div>
            </div>
          )}

          {step === 2 && (
            <RadioGroup onValueChange={(val) => handleSelectChange('goal', val)} className="grid grid-cols-2 gap-4">
              {['Lose Weight', 'Build Muscle', 'Maintain', 'Improve Endurance'].map((goal) => (
                <div key={goal}>
                  <RadioGroupItem value={goal} id={goal} className="peer sr-only" />
                  <Label
                    htmlFor={goal}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {goal}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Select onValueChange={(val) => handleSelectChange('experience_level', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Equipment Access</Label>
                <Select onValueChange={(val) => handleSelectChange('equipment', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gym">Full Gym</SelectItem>
                    <SelectItem value="home">Home Gym</SelectItem>
                    <SelectItem value="none">Bodyweight Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="allergies">Allergies / Restrictions</Label>
                <Input id="allergies" name="allergies" placeholder="e.g. Peanuts, Gluten" value={formData.allergies} onChange={handleInputChange} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-10">
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Upload medical reports or blood work (PDF, JPG)</p>
              <Button variant="outline">Select File</Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 1}>Back</Button>
          <Button onClick={handleNext} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {step === 5 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
