import { toast } from '@/hooks/use-toast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as { data: { message: string } }; 

      toast({
        title: "Oops! Something went wrong.",
        variant: "destructive",
        description: payload.data.message || action.error.message,
      })
    }

    return next(action)
  }