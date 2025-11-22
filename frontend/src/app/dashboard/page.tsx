

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { DashboardChat } from '@/components/dashboard-chat'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const todayDate = new Date().toISOString().split('T')[0]

  // Fetch daily plan
  const { data: dailyPlan } = await supabase
    .from('daily_plans')
    .select(`
      *,
      workout:workouts(*)
    `)
    .eq('user_id', user?.id)
    .eq('date', todayDate)
    .single()

  // Transform daily plan into schedule items if it exists
  let schedule = []
  
  if (dailyPlan) {
    if (dailyPlan.meal_plan) {
        // Add meals
        // This assumes a certain structure of meal_plan jsonb
        // For now we can just add a placeholder if structure is unknown or empty
    }
    if (dailyPlan.workout) {
        schedule.push({
            time: 'TBD', // Workout time might need to be added to DB or inferred
            title: dailyPlan.workout.name || 'Daily Workout',
            type: 'training',
            completed: dailyPlan.status === 'completed'
        })
    }
  }

  // Fallback/Demo schedule if no real data yet (to keep UI looking good for demo)
  if (schedule.length === 0) {
      schedule = [
        { time: '07:00 AM', title: 'Morning Hydration', type: 'health', completed: true },
        { time: '08:00 AM', title: 'Breakfast: Oatmeal & Berries', type: 'nutrition', completed: true },
        { time: '05:00 PM', title: 'Upper Body Workout', type: 'training', completed: false },
        { time: '07:00 PM', title: 'Dinner: Grilled Chicken Salad', type: 'nutrition', completed: false },
        { time: '10:00 PM', title: 'Sleep Preparation', type: 'health', completed: false },
      ]
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Good Afternoon, {user?.email?.split('@')[0] || 'User'}</h1>
            <p className="text-muted-foreground">Here is your schedule for {today}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Schedule & Tasks */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Daily Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {schedule.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="mt-1">
                                    {item.completed ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{item.title}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                            item.type === 'training' ? 'bg-orange-100 text-orange-700' :
                                            item.type === 'nutrition' ? 'bg-green-100 text-green-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" /> {item.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                        <CardTitle className="text-lg">Next Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-2xl font-bold">Upper Body Workout</h3>
                        <p className="opacity-90 mt-2">Scheduled for 05:00 PM</p>
                        <button className="mt-4 bg-white text-primary px-4 py-2 rounded-md font-medium text-sm">
                            Start Now
                        </button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Weekly Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Workouts</span>
                            <span className="text-sm text-muted-foreground">3/5</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[60%]" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-2 mt-4">
                            <span className="text-sm font-medium">Calories</span>
                            <span className="text-sm text-muted-foreground">1800/2200</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[82%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Right Column: Chat */}
        <div className="lg:col-span-1">
            <DashboardChat />
        </div>
      </div>
    </div>
  )
}
