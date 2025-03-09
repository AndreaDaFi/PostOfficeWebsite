import Link from "next/link"
import { Mail, Package, Phone, Search, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Cougar Post</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/track" className="font-medium">
              Track
            </Link>
            <Link href="/locations" className="font-medium">
              Locations
            </Link>
            <Link href="/services" className="font-medium">
              Services
            </Link>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
            <Link href="/auth" className="font-medium">
              Sign In
            </Link>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your Reliable Postal Service Partner
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Fast, secure, and reliable postal services for all your shipping needs. Track packages, find
                  locations, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg">Send a Package</Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/auth">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Post office illustration"
                  className="rounded-lg object-cover"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>



        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Track Your Package</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Enter your tracking number to get real-time updates on your shipment.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="flex w-full max-w-md items-center space-x-2">
                  <Input type="text" placeholder="Enter tracking number" className="flex-1" />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>



        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive postal solutions for individuals and businesses.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Package className="h-8 w-8 text-primary" />
                    <CardTitle>Package Shipping</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Send packages domestically and internationally with various delivery speed options.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Mail className="h-8 w-8 text-primary" />
                    <CardTitle>Mail Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Regular mail, certified mail, and special handling options for your correspondence.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Truck className="h-8 w-8 text-primary" />
                    <CardTitle>Express Delivery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Next-day and same-day delivery options for urgent shipments.</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>


      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Cougar Post</span>
            </div>
            <p className="text-sm text-muted-foreground">Reliable postal services since 1995.</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/careers" className="text-sm font-medium">
              Careers
            </Link>
            <Link href="/privacy" className="text-sm font-medium">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
              <span className="sr-only">Call us</span>
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email us</span>
            </Button>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2025 Cougar Post. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

