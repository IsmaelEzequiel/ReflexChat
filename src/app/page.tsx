"use client"

import { InitialForm } from "@/components/initial-form";
import { withWrapper } from "@/components/wrapper";
import { useCallback } from "react";

const Home = () => {
  const handleStartChartSubmit = useCallback(() => {

  }, [])

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <InitialForm
            handleStartChartSubmit={handleStartChartSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default withWrapper(Home)