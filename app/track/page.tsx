import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrackPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Track Your Shipment</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Get real-time updates on your package location and delivery status.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="track">Track a Package</TabsTrigger>
            <TabsTrigger value="history">Tracking History</TabsTrigger>
          </TabsList>
          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Tracking Information</CardTitle>
                <CardDescription>Enter up to 10 tracking numbers, separated by commas or line breaks.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter tracking numbers here (e.g., 9400 1000 0000 0000 0000 00)"
                    />
                  </div>
                  <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Track Packages
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Tracking numbers are typically 10-30 characters long</li>
                  <li>Tracking updates may take 24-48 hours to appear in our system</li>
                  <li>For international shipments, tracking may be limited once the package leaves the country</li>
                  <li>Sign up for email or SMS notifications to get automatic updates from Cougar Post</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tracking History</CardTitle>
                <CardDescription>
                  View packages you've recently tracked. Sign in to save your tracking history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 text-center text-muted-foreground">No recent tracking history found.</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

