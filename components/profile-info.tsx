"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Mail, Phone, Calendar, CheckCircle, Edit2, Save, X } from "lucide-react"

export default function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 98765 43210",
    accountCreated: "January 15, 2024",
    loginMethods: ["Google", "Password"],
  })

  const [editData, setEditData] = useState({ ...profileData })

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Image
            src="/diverse-user-avatars.png"
            alt="Profile Photo"
            width={120}
            height={120}
            className="w-30 h-30 rounded-full border-4 border-primary"
          />
          {isEditing && (
            <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.fullName}
              onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          ) : (
            <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-lg">{profileData.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900 font-medium">{profileData.email.replace(/(.{3}).*(@.*)/, "$1***$2")}</span>
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
            <span className="text-sm text-green-600">Verified</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={editData.mobile}
              onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900 font-medium">{profileData.mobile.replace(/\d(?=\d{4})/g, "*")}</span>
              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              <span className="text-sm text-green-600">Verified</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Login Methods Linked</label>
          <div className="flex flex-wrap gap-2">
            {profileData.loginMethods.map((method) => (
              <span key={method} className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-full text-sm">
                {method}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900 font-medium">{profileData.accountCreated}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
