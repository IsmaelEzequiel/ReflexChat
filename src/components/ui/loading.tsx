import { LoaderCircle } from "lucide-react";

const LoadingComponent = () => (
  <div className="h-full w-full flex items-center justify-center flex-col gap-2">
    <LoaderCircle className="animate-spin w-10 h-10" />
    <span className="sr-only">Loading...</span>
  </div>
)

export default LoadingComponent