"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Printer, Download, ArrowLeft } from "lucide-react"

export default function ShippingLabel() {
  const router = useRouter()
  const [labelData, setLabelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get checkout data from localStorage or URL params
    const fetchLabelData = async () => {
      try {
        // In a real implementation, you would get the package ID from URL params or context
        const packageId = new URLSearchParams(window.location.search).get("packageId")

        if (!packageId) {
          throw new Error("No package ID provided")
        }

        const response = await fetch(`https://apipost.vercel.app/api/GetShippingLabel?packageId=${packageId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch shipping label data")
        }

        const data = await response.json()
        setLabelData(data.data)
      } catch (err) {
        console.error("Error fetching shipping label:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLabelData()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real implementation, you would generate a PDF and download it
    alert("Download functionality would be implemented here")
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Generating shipping label...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    )
  }

  // Use mock data if labelData is not available
  const data = labelData || {
    tracking_number: "USPS1234567890",
    sender_name: "Post Office",
    sender_address: "123 Main St, New York, NY 10001",
    receiver_name: "John Doe",
    receiver_address: "456 Oak St, Apt 7B, San Francisco, CA 94103",
    package_type: "Box",
    weight: "2.5 kg",
    size: "Medium",
    fragile: true,
    date: new Date().toLocaleDateString(),
    postage_amount: "$12.99",
    barcode: "1234567890123456789",
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipping Label</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      {/* Shipping Label Card - This will be the printable area */}
      <Card className="border-2 border-black print:border-0 print:shadow-none" id="printable-label">
        <CardHeader className="border-b border-black pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">USPS PRIORITY MAIL</CardTitle>
              <p className="text-sm text-muted-foreground">Tracking #: {data.tracking_number}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Shipping Date: {data.date}</p>
              <p className="text-sm">Postage: {data.postage_amount}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-1">From:</h3>
              <p className="font-bold">{data.sender_name}</p>
              <p>{data.sender_address}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-1">To:</h3>
              <p className="font-bold">{data.receiver_name}</p>
              <p>{data.receiver_address}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-1">Package Details:</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p className="text-sm">Type:</p>
                <p className="text-sm font-medium">{data.package_type}</p>

                <p className="text-sm">Weight:</p>
                <p className="text-sm font-medium">{data.weight}</p>

                <p className="text-sm">Size:</p>
                <p className="text-sm font-medium">{data.size}</p>

                <p className="text-sm">Fragile:</p>
                <p className="text-sm font-medium">{data.fragile ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              {/* Barcode representation */}
              <div className="w-full h-20 bg-[url('/placeholder.svg?height=80&width=200')] bg-contain bg-no-repeat bg-center"></div>
              <p className="text-xs mt-1">{data.barcode}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-black pt-4 flex justify-between">
          <p className="text-xs text-muted-foreground">This shipping label was generated by Post Office Web System</p>
          <p className="text-xs font-medium">USPS PRIORITY</p>
        </CardFooter>
      </Card>

      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-label, #printable-label * {
            visibility: visible;
          }
          #printable-label {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}

