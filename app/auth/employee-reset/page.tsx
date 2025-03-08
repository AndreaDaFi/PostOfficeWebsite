import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EmployeeResetPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10 px-4 md:px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Cougar Post</span>
          </div>
          <h1 className="text-2xl font-bold">Employee Password Reset</h1>
          <p className="text-muted-foreground">Secure password recovery for employees</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Password Recovery</CardTitle>
            <CardDescription>Enter your employee ID and registered email to reset your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-muted">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Secure Process</AlertTitle>
              <AlertDescription>
                For security reasons, password reset requests are logged and may require manager approval.
              </AlertDescription>
            </Alert>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input id="employee-id" placeholder="EMP12345" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="work-email">Work Email</Label>
                <Input id="work-email" type="email" placeholder="name@cougarpost.com" required />
              </div>
              <Button type="submit" className="w-full">
                Request Password Reset
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center">
              Remember your password?{" "}
              <Link href="/auth" className="text-primary hover:underline">
                Back to sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

