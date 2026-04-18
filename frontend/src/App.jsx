import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/landing-page/Navbar"
import Hero from "./components/landing-page/Hero"
import Footer from "./components/landing-page/Footer"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Bounties from "./components/pages/Bounty"
import BountyDetail from "./components/pages/bountyDetails"
import BentoGrid from "./components/landing-page/BentoGrid"
import Timeline from "./components/landing-page/Timeline"
import { PricingSection } from "./components/landing-page/Pricing"

import MsmeLogin from "./components/auth/MsmeLogin"
import MsmeRegister from "./components/auth/MsmeRegister"
import MsmeDashboard from "./components/dashboard/MsmeDashboard"
import PostTask from "./components/pages/PostTask"
import PostBounty from "./components/pages/PostBounty"
import MsmeSubmissions from "./components/dashboard/MsmeSubmissions"
import MsmeApplications from "./components/dashboard/MsmeApplications"
import ViewSubmission from "./components/pages/ViewSubmission"
import Tasks from "./components/pages/Tasks"
import TaskDetail from "./components/pages/TaskDetail"

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar
        onGetStarted={() => navigate("/signup")}
        onOpenLogin={() => navigate("/login")}
      />
      <Hero />
      <BentoGrid />
      <Timeline />
      <PricingSection />
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
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task-detail" element={<TaskDetail />} />
        <Route path="/task-detail/:id" element={<TaskDetail />} />
        <Route path="/msme/login"      element={<MsmeLogin />} />
        <Route path="/msme/register"   element={<MsmeRegister />} />
        <Route path="/msme/dashboard"  element={<MsmeDashboard />} />
        <Route path="/msme/submissions" element={<MsmeSubmissions />} />
        <Route path="/msme/submissions/:id" element={<ViewSubmission />} />
        <Route path="/msme/applications" element={<MsmeApplications />} />
        <Route path="/msme/post-task" element={<PostTask />} />
        <Route path="/msme/post-bounty" element={<PostBounty />} />
      </Routes>
    </div>
  )
}
