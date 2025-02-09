import api from "@/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const fetchUserAndSession = createAsyncThunk(
  'session/fetchUserAndSession',
  async (userName: string, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<{ user: User, session: Session }>>('api/user', { userName })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      }
      return rejectWithValue("Unexpected error occurred")
    }
  },
)

export default fetchUserAndSession