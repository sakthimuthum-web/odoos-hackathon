import { Link, useLocation } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"

export default function Navbar() {
  const { state } = useTrips()
  const loc = useLocation()
  const isAuthPage = loc.pathname === "/login"

  if (isAuthPage) return null

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="font-semibold text-xl">GlobeTrotter</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/trips" className="hover:text-blue-600">My Trips</Link>
          <Link to="/trips/new" className="hover:text-blue-600">Plan New Trip</Link>
          <Link to="/profile" className="hover:text-blue-600">Profile</Link>
          <Link to="/admin" className="hover:text-blue-600">Admin</Link>
        </nav>
        <div className="text-sm">
          <span className="mr-2">👤 {state.user?.name || "Guest"}</span>
        </div>
      </div>
    </header>
  )
}
