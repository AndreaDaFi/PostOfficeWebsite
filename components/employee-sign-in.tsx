"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ShieldAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EmployeeSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would handle employee authentication here
      // and redirect to the employee dashboard
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Sign In</CardTitle>
        <CardDescription>Access the employee portal for internal operations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-muted">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Secure Access</AlertTitle>
          <AlertDescription>
            This portal is for authorized employees only. Unauthorized access attempts are monitored.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee-id">Employee ID</Label>
            <Input id="employee-id" placeholder="EMP12345" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="employee-password">Password</Label>
              <Link href="/auth/employee-reset" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input id="employee-password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="employee-remember" />
            <label
              htmlFor="employee-remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        <p className="w-full">
          Need help? Contact{" "}
          <Link href="/contact" className="text-primary hover:underline">
            IT Support
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

