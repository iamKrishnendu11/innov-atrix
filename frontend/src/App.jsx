import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/landing-page/Navbar"
import Hero from "./components/landing-page/Hero"
import Footer from "./components/landing-page/Footer"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Bounties from "./components/pages/Bounty"
import BountyDetail from "./components/pages/bountyDetails"

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar
        onGetStarted={() => navigate("/signup")}
        onOpenLogin={() => navigate("/login")}
      />
      <Hero />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <div className="bg-black w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={
          <div className="min-h-screen w-full flex items-center justify-center bg-black">
            <Login />
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bounties" element={<Bounties />} />
        <Route path="/bounty-detail" element={<BountyDetail />} />
        <Route path="/bounty-detail/:id" element={<BountyDetail />} />
      </Routes>
    </div>
  )
}