"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, AlertTriangle, Activity, Dumbbell, Utensils } from "lucide-react"

interface AgentResultsProps {
  results: any
}

export function AgentResults({ results }: AgentResultsProps) {
  if (!results) return null

  const { clinical_clearance, workout_plan, lifestyle_plan } = results

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Personalized Health Plan</h2>
      
      <Tabs defaultValue="clinical" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clinical">
            <Activity className="mr-2 h-4 w-4" />
            Clinical Director
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Dumbbell className="mr-2 h-4 w-4" />
            Performance Architect
          </TabsTrigger>
          <TabsTrigger value="lifestyle">
            <Utensils className="mr-2 h-4 w-4" />
            Lifestyle Strategist
          </TabsTrigger>
        </TabsList>

        {/* Clinical Tab */}
        <TabsContent value="clinical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Medical Clearance
                <Badge variant="outline">Body Fat: {clinical_clearance.body_fat_percentage || clinical_clearance.body_fat || "N/A"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Identified Conditions</h3>
                <div className="flex gap-2 flex-wrap">
                  {clinical_clearance.conditions?.length > 0 ? (
                    clinical_clearance.conditions.map((c: string, i: number) => (
                      <Badge key={i} variant="secondary">{c}</Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">No conditions detected.</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center mb-2">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Safe Exercises
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {clinical_clearance.safety_guidelines?.safe_exercises?.map((e: string, i: number) => (
                      <li key={i}>{e}</li>
                    )) || clinical_clearance.safety_guidelines?.SAFE?.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center mb-2">
                    <AlertTriangle className="mr-2 h-4 w-4" /> Contraindicated
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {clinical_clearance.safety_guidelines?.unsafe_exercises?.map((e: string, i: number) => (
                      <li key={i}>{e}</li>
                    )) || clinical_clearance.safety_guidelines?.UNSAFE?.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Custom Workout Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {workout_plan.raw_output ? (
                    <p className="whitespace-pre-wrap">{workout_plan.raw_output}</p>
                ) : (
                    <div className="space-y-6">
                    {/* Warm Up */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Warm Up</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {workout_plan.warm_up?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                        </ul>
                    </div>

                    {/* Main Workout */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Main Workout</h3>
                        <div className="space-y-3">
                        {workout_plan.main_workout?.map((exercise: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                            <span className="font-medium">{exercise.exercise}</span>
                            <div className="text-sm text-muted-foreground">
                                {exercise.sets} sets x {exercise.reps}
                                {exercise.duration && ` (${exercise.duration})`}
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Cool Down */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Cool Down</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {workout_plan.cool_down?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                        </ul>
                    </div>
                    </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lifestyle Tab */}
        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition & Lifestyle Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {lifestyle_plan.raw_output ? (
                    <p className="whitespace-pre-wrap">{lifestyle_plan.raw_output}</p>
                ) : (
                    <div className="space-y-6">
                    {/* Meal Plan */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Daily Meal Plan</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(lifestyle_plan.meal_plan || {}).map(([meal, description]: [string, any]) => (
                            <div key={meal} className="p-3 border rounded-md">
                            <span className="capitalize font-medium text-primary">{meal}</span>
                            <p className="text-sm mt-1 text-muted-foreground">{description}</p>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Shopping List */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Shopping List</h3>
                        <div className="flex flex-wrap gap-2">
                        {lifestyle_plan.shopping_list?.map((item: string, i: number) => (
                            <Badge key={i} variant="outline">{item}</Badge>
                        ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Lifestyle Hacks</h3>
                        <p className="text-sm text-muted-foreground">{lifestyle_plan.budget_tips || lifestyle_plan.lifestyle_hacks}</p>
                    </div>
                    </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
