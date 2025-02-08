"use client"

import { InitialForm } from "@/components/initial-form";
import { withWrapper } from "@/components/wrapper";

const Home = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        Chat
      </div>
    </>
  );
}

export default withWrapper(Home)