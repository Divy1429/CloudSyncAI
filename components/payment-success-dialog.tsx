"use client"

import { CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface PaymentSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: string
}

export function PaymentSuccessDialog({
  open,
  onOpenChange,
  plan,
}: PaymentSuccessDialogProps) {
  const router = useRouter()

  const handleViewDashboard = () => {
    onOpenChange(false)
    router.push("/dashboard")
  }

  const planNames: Record<string, string> = {
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Payment Successful!
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Your subscription to the{" "}
            <span className="font-semibold text-foreground">
              {planNames[plan] || plan}
            </span>{" "}
            plan is now active.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleViewDashboard} className="w-full">
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Continue Browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
