"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while trying to sign you in.
          </p>
          <Button
            onClick={reset}
            className="bg-[#00477f] hover:bg-[#003d70]"
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
