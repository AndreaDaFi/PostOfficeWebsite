import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Mail, Truck, Globe, ShieldCheck } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Comprehensive postal solutions for individuals and businesses.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="shipping" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="mail">Mail Services</TabsTrigger>
            <TabsTrigger value="business">Business Solutions</TabsTrigger>
          </TabsList>

          <TabsContent value="shipping" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Truck className="h-6 w-6 text-primary" />
                    <CardTitle>Express Shipping</CardTitle>
                  </div>
                  <CardDescription>Next-day and 2-day guaranteed delivery options</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Guaranteed delivery times</li>
                    <li>Package tracking included</li>
                    <li>Insurance up to $100 included</li>
                    <li>Available for domestic and select international destinations</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Rates
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    <CardTitle>Standard Shipping</CardTitle>
                  </div>
                  <CardDescription>Affordable shipping for non-urgent packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Delivery in 3-5 business days</li>
                    <li>Package tracking included</li>
                    <li>Available for packages up to 70 lbs</li>
                    <li>Cost-effective solution for regular shipments</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Rates
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    <CardTitle>International Shipping</CardTitle>
                  </div>
                  <CardDescription>Global delivery solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Delivery to over 190 countries</li>
                    <li>Various speed options available</li>
                    <li>Customs forms assistance</li>
                    <li>International tracking available</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Rates
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <CardTitle>Insurance & Extras</CardTitle>
                  </div>
                  <CardDescription>Additional protection for your shipments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Additional insurance coverage</li>
                    <li>Signature confirmation</li>
                    <li>Delivery confirmation</li>
                    <li>Special handling options</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mail" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <CardTitle>First-Class Mail</CardTitle>
                  </div>
                  <CardDescription>Standard mail service for letters and small packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Delivery in 1-3 business days</li>
                    <li>For postcards, letters, and small packages</li>
                    <li>Weight limit of 13 ounces</li>
                    <li>Most economical option for regular mail</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Rates
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <CardTitle>Certified Mail</CardTitle>
                  </div>
                  <CardDescription>Proof of mailing and delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Proof of mailing at time of mailing</li>
                    <li>Record of delivery kept at the recipient's post office</li>
                    <li>Verification of delivery online</li>
                    <li>Ideal for important documents</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Rates
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    <CardTitle>Business Shipping</CardTitle>
                  </div>
                  <CardDescription>Volume discounts and business-specific solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Volume discounts for regular shippers</li>
                    <li>Customized shipping solutions</li>
                    <li>Integration with e-commerce platforms</li>
                    <li>Dedicated account manager</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <CardTitle>Direct Mail Marketing</CardTitle>
                  </div>
                  <CardDescription>Reach customers with targeted mail campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Targeted mailing lists</li>
                    <li>Design and printing services</li>
                    <li>Bulk mail discounts</li>
                    <li>Campaign tracking and analytics</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

