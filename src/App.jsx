import Navbar from "./components/Navbar.jsx"
import Router from "./router.jsx"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Router />
      </main>
    </div>
  )
}
