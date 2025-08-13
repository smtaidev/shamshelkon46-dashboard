import { createSlice } from "@reduxjs/toolkit"

interface UiState {
  sidebarOpen: boolean
  isMobile: boolean
}

const initialState: UiState = {
  sidebarOpen: false,
  isMobile: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    },
  },
})

export const { toggleSidebar, closeSidebar, setIsMobile } = uiSlice.actions
export default uiSlice.reducer
