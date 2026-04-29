"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProfileInfo from "@/components/profile-info"
import PasswordManagement from "@/components/password-management"
import DeviceManagement from "@/components/device-management"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "devices">("profile")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your profile, security settings, and active devices</p>
          </div>

          <div className="flex gap-4 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "profile" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "password" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Password & Security
            </button>
            <button
              onClick={() => setActiveTab("devices")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "devices" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Active Devices
            </button>
          </div>

          {activeTab === "profile" && <ProfileInfo />}
          {activeTab === "password" && <PasswordManagement />}
          {activeTab === "devices" && <DeviceManagement />}
        </div>
      </main>

      <Footer />
    </div>
  )
}
