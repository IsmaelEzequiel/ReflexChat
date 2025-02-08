import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { LoaderCircle } from "lucide-react"

interface InitialFormProps extends React.AllHTMLAttributes<HTMLDivElement> {
  handleStartChartSubmit: () => void
}

const InitialForm = React.forwardRef<HTMLDivElement, InitialFormProps>(
  ({ className, handleStartChartSubmit, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={handleStartChartSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <Image src="/assets/logo.png" alt="ReflexChat" width={60} height={60} />
                </div>
              </a>
              <h1 className="text-xl font-bold">Welcome to ReflexChat.</h1>
              <div className="text-center text-sm">
                To continue, type your name in the box below
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Maria da Silva"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled>
                <LoaderCircle className="animate-spin" />
                Enter
              </Button>
            </div>
          </div>
        </form>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    )
  }
)

export { InitialForm }
