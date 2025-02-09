"use client"

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { InitialForm } from "@/components/initial-form";
import { withWrapper } from "@/components/wrapper";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import fetchUserAndSession from "@/lib/async-thunk/fetchUserAndSession";

const Home = () => {
  const router = useRouter()
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector((state) => state.session)

  useEffect(() => {
    if (error?.message) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message,
        variant: "destructive",
      })
    }
  }, [toast, error?.message])

  useEffect(() => {
    if (data.session?.id) {
      router.push(`/chat/${data.session.id}`)
    }
  }, [router, data.session?.id])

  const handleStartChartSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string

    dispatch(fetchUserAndSession(name))
  }, [dispatch])

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <InitialForm
            loading={loading}
            handleStartChartSubmit={handleStartChartSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default withWrapper(Home)