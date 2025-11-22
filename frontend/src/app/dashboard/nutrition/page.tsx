import { MealPlan } from '@/components/nutrition/meal-plan'
import { ShoppingList } from '@/components/nutrition/shopping-list'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export default async function NutritionPage() {
  const supabase = await createClient()
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*')
    .limit(10)

  return (
    <div className="container mx-auto py-6 space-y-6 h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-500">Nutrition Center</h1>
            <p className="text-muted-foreground">AI-powered meal planning and tracking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-10">
        <div className="lg:col-span-2">
            <MealPlan initialRecipes={recipes || []} />
        </div>
        <div>
            <ShoppingList />
        </div>
      </div>
    </div>
  )
}
