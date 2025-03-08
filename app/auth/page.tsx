import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail } from "lucide-react"
import CustomerSignIn from "@/components/customer-sign-in"
import EmployeeSignIn from "@/components/employee-sign-in"

export default function AuthPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10 px-4 md:px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Cougar Post</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="employee">Employee</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <CustomerSignIn />
          </TabsContent>

          <TabsContent value="employee">
            <EmployeeSignIn />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

