import { ExercisePlayer } from '@/components/training/exercise-player'
import { ExerciseLibrary } from '@/components/training/exercise-library'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export default async function TrainingPage() {
  const supabase = await createClient()
  const { data: workouts } = await supabase
    .from('workouts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="container mx-auto py-6 space-y-6 h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-orange-600 dark:text-orange-500">Training Center</h1>
            <p className="text-muted-foreground">Your personal gym and workout assistant.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-10">
        <div className="lg:col-span-2 h-full">
            {/* Pass workouts to ExercisePlayer if it accepts props, otherwise it stays as is for now */}
            <ExercisePlayer />
        </div>
        <div className="h-full">
            {/* Pass workouts to ExerciseLibrary if it accepts props */}
            <ExerciseLibrary initialWorkouts={workouts || []} />
        </div>
      </div>
    </div>
  )
}
