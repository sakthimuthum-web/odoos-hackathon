import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import CreateTrip from "./pages/CreateTrip.jsx"
import MyTrips from "./pages/MyTrips.jsx"
import ItineraryBuilder from "./pages/ItineraryBuilder.jsx"
import ItineraryView from "./pages/ItineraryView.jsx"
import CitySearch from "./pages/CitySearch.jsx"
import ActivitySearch from "./pages/ActivitySearch.jsx"
import Budget from "./pages/Budget.jsx"
import CalendarTimeline from "./pages/CalendarTimeline.jsx"
import SharedItinerary from "./pages/SharedItinerary.jsx"
import ProfileSettings from "./pages/ProfileSettings.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trips/new" element={<CreateTrip />} />
      <Route path="/trips" element={<MyTrips />} />
      <Route path="/trips/:tripId/build" element={<ItineraryBuilder />} />
      <Route path="/trips/:tripId/view" element={<ItineraryView />} />
      <Route path="/trips/:tripId/cities" element={<CitySearch />} />
      <Route path="/trips/:tripId/activities" element={<ActivitySearch />} />
      <Route path="/trips/:tripId/budget" element={<Budget />} />
      <Route path="/trips/:tripId/calendar" element={<CalendarTimeline />} />
      <Route path="/share/:publicId" element={<SharedItinerary />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}
