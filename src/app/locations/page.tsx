import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone } from "lucide-react"

export default function LocationsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find a Post Office</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Locate the nearest post office or drop-off point for your convenience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Search Locations</CardTitle>
            <CardDescription>
              Find post offices, collection boxes, and authorized shipping locations near you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input type="text" placeholder="Enter ZIP code, city, or address" className="flex-1" />
              <Button>
                <MapPin className="mr-2 h-4 w-4" />
                Find Locations
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Map will be displayed here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Main Street Post Office
              </CardTitle>
              <CardDescription>0.8 miles away</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">123 Main Street, Anytown, ST 12345</p>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Open today: 9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Directions
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Downtown Postal Center
              </CardTitle>
              <CardDescription>1.2 miles away</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">456 Oak Avenue, Anytown, ST 12345</p>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Open today: 8:30 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>(555) 987-6543</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Directions
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

