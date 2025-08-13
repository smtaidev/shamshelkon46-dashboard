import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface DashboardStats {
  newUsers: number
  activeEvents: number
  boostRevenue: number
  ticketSales: number
  pendingReports: number
}

interface DashboardState {
  stats: DashboardStats
  timePeriod: "7 Days" | "30 Days" | "Custom"
  revenueData: Array<{
    day: string
    boostRevenue: number
    ticketSales: number
  }>
  salesDistribution: Array<{
    category: string
    value: number
    color: string
  }>
  pendingTasks: Array<{
    id: string
    title: string
    count: number
  }>
  recentActivities: Array<{
    id: string
    user: string
    action: string
    time: string
    avatar: string
  }>
}

const initialState: DashboardState = {
  stats: {
    newUsers: 4876,
    activeEvents: 568,
    boostRevenue: 12876,
    ticketSales: 8026,
    pendingReports: 40,
  },
  timePeriod: "7 Days",
  revenueData: [
    { day: "Fri", boostRevenue: 2500, ticketSales: 1500 },
    { day: "Sat", boostRevenue: 3200, ticketSales: 2200 },
    { day: "Sun", boostRevenue: 1800, ticketSales: 1000 },
    { day: "Mon", boostRevenue: 2900, ticketSales: 1275 },
    { day: "Tue", boostRevenue: 3800, ticketSales: 3000 },
    { day: "Wed", boostRevenue: 2342, ticketSales: 1500 },
    { day: "Thu", boostRevenue: 2800, ticketSales: 1400 },
  ],
  salesDistribution: [
    { category: "Tech", value: 32, color: "#6366f1" },
    { category: "Business", value: 28, color: "#8b5cf6" },
    { category: "Music", value: 22, color: "#a855f7" },
    { category: "Education", value: 18, color: "#c084fc" },
    { category: "Fashion", value: 18, color: "#9ca3af" },
    { category: "Sports", value: 28, color: "#4b5563" },
  ],
  pendingTasks: [
    { id: "1", title: "User Verification Requests", count: 99 },
    { id: "2", title: "System Updates", count: 8 },
    { id: "3", title: "Process Payout Requests", count: 4 },
  ],
  recentActivities: [
    {
      id: "1",
      user: "Michael Brown",
      action: "purchased tickets for Tech Conference 2025",
      time: "1 min ago",
      avatar: "/generic-person-avatar.png",
    },
    {
      id: "2",
      user: "Frank Onis",
      action: 'created a new event "Summer Music Festival"',
      time: "6 min ago",
      avatar: "/frank-onis-avatar.png",
    },
    {
      id: "3",
      user: "Michael Brown",
      action: "purchased tickets for Tech Conference 2025",
      time: "1 min ago",
      avatar: "/generic-person-avatar.png",
    },
    {
      id: "4",
      user: "Emma Davis",
      action: 'created a new event "Summer Music Festival"',
      time: "6 min ago",
      avatar: "/emma-davis-avatar.png",
    },
  ],
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTimePeriod: (state, action: PayloadAction<"7 Days" | "30 Days" | "Custom">) => {
      state.timePeriod = action.payload
    },
    updateStats: (state, action: PayloadAction<Partial<DashboardStats>>) => {
      state.stats = { ...state.stats, ...action.payload }
    },
  },
})

export const { setTimePeriod, updateStats } = dashboardSlice.actions
export default dashboardSlice.reducer
