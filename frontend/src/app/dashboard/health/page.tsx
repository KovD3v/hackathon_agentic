import { BiometricsChart } from '@/components/health/biometrics-chart'
import { BodyTracker } from '@/components/health/body-tracker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default function HealthPage() {
  return (
    <div className="container mx-auto py-6 space-y-6 h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-500">Health Center</h1>
            <p className="text-muted-foreground">Monitor your vitals and medical history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-10">
        <div className="lg:col-span-2 space-y-6">
            <BiometricsChart />
            
            <Card>
                <CardHeader>
                    <CardTitle>Medical Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg">Upload New Report</h3>
                        <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to upload PDF/JPG</p>
                        <Button>Select File</Button>
                    </div>

                    <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">Blood_Work_Jan_2024.pdf</p>
                                    <p className="text-xs text-muted-foreground">Uploaded on Jan 15, 2024</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <BodyTracker />
        </div>
      </div>
    </div>
  )
}
