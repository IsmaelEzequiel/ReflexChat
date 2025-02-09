"use client"

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { InitialForm } from "@/components/initial-form";
import { withWrapper } from "@/components/wrapper";
import { useFetchOrCreateUserPostMutation } from "@/lib/rtk-query/manageSession";

const HomePage = () => {
  const router = useRouter()
  const [fetchOrCreateUserPost, { data, isLoading }] = useFetchOrCreateUserPostMutation()

  useEffect(() => {
    const { id } = data?.content.session || {}
    if (id) router.push(`/chat/${id}`)
  }, [router, data])

  const handleStartChartSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string

    fetchOrCreateUserPost(name)
  }, [fetchOrCreateUserPost])

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <InitialForm
            loading={isLoading}
            handleStartChartSubmit={handleStartChartSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default withWrapper(HomePage)