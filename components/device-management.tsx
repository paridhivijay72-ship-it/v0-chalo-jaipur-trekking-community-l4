"use client"

import { useState } from "react"
import { Monitor, Smartphone, Tablet, MapPin, Clock, AlertCircle } from "lucide-react"

interface Device {
  id: string
  type: "desktop" | "mobile" | "tablet"
  name: string
  location: string
  lastActive: string
  isCurrent: boolean
}

export default function DeviceManagement() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      type: "desktop",
      name: "Chrome on Windows",
      location: "Jaipur, Rajasthan, India",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      type: "mobile",
      name: "Safari on iPhone",
      location: "Delhi, India",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      type: "mobile",
      name: "Chrome on Android",
      location: "Mumbai, Maharashtra, India",
      lastActive: "1 day ago",
      isCurrent: false,
    },
  ])

  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [deviceToLogout, setDeviceToLogout] = useState<string | null>(null)

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Monitor className="w-6 h-6" />
      case "mobile":
        return <Smartphone className="w-6 h-6" />
      case "tablet":
        return <Tablet className="w-6 h-6" />
      default:
        return <Monitor className="w-6 h-6" />
    }
  }

  const handleLogoutDevice = (deviceId: string) => {
    setDeviceToLogout(deviceId)
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    if (deviceToLogout) {
      setDevices(devices.filter((d) => d.id !== deviceToLogout))
      setDeviceToLogout(null)
      setShowLogoutModal(false)
    }
  }

  const handleLogoutAllOthers = () => {
    setDevices(devices.filter((d) => d.isCurrent))
    setShowLogoutModal(false)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Active Devices & Sessions</h2>
            <p className="text-gray-600 mt-1">Manage devices where you're currently logged in</p>
          </div>
          {devices.length > 1 && (
            <button
              onClick={handleLogoutAllOthers}
              className="px-4 py-2 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Logout All Others
            </button>
          )}
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-6 rounded-lg border-2 ${
                device.isCurrent ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${device.isCurrent ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{device.name}</h3>
                      {device.isCurrent && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          This Device
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{device.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{device.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {!device.isCurrent && (
                  <button
                    onClick={() => handleLogoutDevice(device.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Security Tip</p>
            <p>
              If you see an unfamiliar device or location, logout from that device immediately and change your password.
            </p>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              {deviceToLogout
                ? "Are you sure you want to logout from this device?"
                : "Are you sure you want to logout from all other devices?"}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
