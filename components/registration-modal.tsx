"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  CreditCard,
  Smartphone,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  Instagram,
  Heart,
  CheckCircle,
  Download,
  Mountain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

const trekOptions = [
  { value: "jal-mahal", label: "Jal Mahal View Point - Sunday 7:00 AM" },
  { value: "jhalana-leopard", label: "Jhalana Leopard Trek - Sunday 6:30 AM" },
  { value: "nahargarh-fort", label: "Nahargarh Fort Twin Tower - Sunday 6:00 AM" },
  { value: "bhankrota", label: "Bhankrota Trek - Sunday 7:00 AM" },
  { value: "san-valley", label: "San Valley Trek - Sunday 6:30 AM" },
  { value: "jaigarh-fort", label: "Jaigarh Fort Trek - Sunday 6:00 AM" },
]

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    address: "",
    aadhaar: "",
    instagram: "",
    healthIssues: "no",
    healthDetails: "",
    selectedTrek: "", // Added trek selection field
  })

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi")
  const [upiProvider, setUpiProvider] = useState<"gpay" | "phonepe" | "paytm">("gpay")
  const [upiId, setUpiId] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPaymentDetails, setShowPaymentDetails] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [registrationId, setRegistrationId] = useState("")

  const generateRegistrationId = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 7)
    return `CJ${timestamp}${random}`.toUpperCase()
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop

      if (scrollTop > 50) {
        if (scrollTop > lastScrollTop.current) {
          setShowPaymentDetails(false)
        } else {
          setShowPaymentDetails(true)
        }
      } else {
        setShowPaymentDetails(true)
      }

      lastScrollTop.current = scrollTop
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  const validateAadhaar = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    return cleaned.length === 12 && /^\d+$/.test(cleaned)
  }

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(" ")
    }
    return value
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required"
    else if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ""))) newErrors.contact = "Invalid contact number"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.aadhaar.trim()) newErrors.aadhaar = "Aadhaar number is required"
    else if (!validateAadhaar(formData.aadhaar)) newErrors.aadhaar = "Invalid Aadhaar number (12 digits required)"
    if (!formData.selectedTrek) newErrors.selectedTrek = "Please select a trek"
    if (formData.healthIssues === "yes" && !formData.healthDetails.trim())
      newErrors.healthDetails = "Please provide health details"

    if (paymentMethod === "upi" && !upiId.trim()) {
      newErrors.upiId = "UPI ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const regId = generateRegistrationId()
      setRegistrationId(regId)

      if (paymentMethod === "upi") {
        // Submit form to FormSubmit first
        if (formRef.current) {
          formRef.current.submit()
        }

        // Then open UPI payment
        const upiUrl = "upi://pay?pa=7852870270@ptyes&pn=Chalo%20Jaipur%20Trekking&am=50&cu=INR&tn=Trekking%20Fee"
        window.location.href = upiUrl

        setTimeout(() => {
          setIsSubmitting(false)
          setShowConfirmation(true)
        }, 2000)
      } else {
        // For card payment, just submit the form
        if (formRef.current) {
          formRef.current.submit()
        }

        setTimeout(() => {
          setIsSubmitting(false)
          setShowConfirmation(true)
        }, 1000)
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const downloadReceipt = () => {
    const selectedTrekData = trekOptions.find((t) => t.value === formData.selectedTrek)
    const receiptContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Registration Receipt - Chalo Jaipur</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    .header { text-align: center; border-bottom: 3px solid #FFC93C; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 32px; font-weight: bold; color: #FFC93C; margin-bottom: 10px; }
    .title { font-size: 24px; font-weight: bold; color: #333; }
    .receipt-id { background: #FFC93C; color: white; padding: 10px 20px; border-radius: 8px; display: inline-block; margin: 20px 0; font-size: 18px; font-weight: bold; }
    .section { margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px; }
    .section-title { font-size: 18px; font-weight: bold; color: #FFC93C; margin-bottom: 15px; border-bottom: 2px solid #FFC93C; padding-bottom: 8px; }
    .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #ddd; }
    .info-label { font-weight: bold; width: 200px; color: #666; }
    .info-value { flex: 1; color: #333; }
    .barcode { text-align: center; margin: 30px 0; }
    .barcode-image { font-family: 'Libre Barcode 128', cursive; font-size: 64px; letter-spacing: 0; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #FFC93C; color: #666; }
    .payment-success { background: #6BCF9B; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">CHALO JAIPUR</div>
    <div class="title">Trekking Registration Receipt</div>
  </div>
  
  <div style="text-align: center;">
    <div class="receipt-id">Registration ID: ${registrationId}</div>
  </div>

  <div class="payment-success">
    ✓ Payment Successful - ₹50
  </div>

  <div class="section">
    <div class="section-title">Personal Information</div>
    <div class="info-row">
      <div class="info-label">Full Name:</div>
      <div class="info-value">${formData.fullName}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Mobile Number:</div>
      <div class="info-value">+91 ${formData.contact}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Email:</div>
      <div class="info-value">${formData.email}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Address:</div>
      <div class="info-value">${formData.address}</div>
    </div>
    ${
      formData.instagram
        ? `
    <div class="info-row">
      <div class="info-label">Instagram:</div>
      <div class="info-value">${formData.instagram}</div>
    </div>
    `
        : ""
    }
  </div>

  <div class="section">
    <div class="section-title">Trek Details</div>
    <div class="info-row">
      <div class="info-label">Selected Trek:</div>
      <div class="info-value">${selectedTrekData?.label || formData.selectedTrek}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Registration Fee:</div>
      <div class="info-value">₹50 (Including Refreshment)</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Payment Information</div>
    <div class="info-row">
      <div class="info-label">Payment Method:</div>
      <div class="info-value">${paymentMethod.toUpperCase()}</div>
    </div>
    <div class="info-row">
      <div class="info-label">UPI Provider:</div>
      <div class="info-value">${paymentMethod === "upi" ? upiProvider.toUpperCase() : "N/A"}</div>
    </div>
    <div class="info-row">
      <div class="info-label">UPI ID:</div>
      <div class="info-value">${upiId || "N/A"}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Transaction Date:</div>
      <div class="info-value">${new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</div>
    </div>
  </div>

  <div class="barcode">
    <div class="barcode-image">*${registrationId}*</div>
    <div style="margin-top: 10px; font-size: 14px; color: #666;">${registrationId}</div>
  </div>

  <div class="footer">
    <p><strong>Chalo Jaipur Trekking Community</strong></p>
    <p>Email: somyakhandelwal300@gmail.com | Phone: +91 88243 44598</p>
    <p>Instagram: @chalo.jaipur</p>
    <p style="margin-top: 15px; font-size: 12px;">Please bring this receipt on the day of the trek</p>
  </div>
</body>
</html>
    `

    const blob = new Blob([receiptContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Chalo-Jaipur-Receipt-${registrationId}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setFormData({
      fullName: "",
      contact: "",
      email: "",
      address: "",
      aadhaar: "",
      instagram: "",
      healthIssues: "no",
      healthDetails: "",
      selectedTrek: "",
    })
    setUpiId("")
    setRegistrationId("")
    onClose()
  }

  if (!isOpen) return null

  if (showConfirmation) {
    const selectedTrekData = trekOptions.find((t) => t.value === formData.selectedTrek)

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold font-heading text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground">Thank you for registering with Chalo Jaipur</p>
          </div>

          <div className="bg-primary/10 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">Your Registration ID</p>
              <p className="text-2xl font-bold text-primary font-mono">{registrationId}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium">+91 {formData.contact}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Trek:</span>
                <span className="font-medium">{selectedTrekData?.label}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Payment:</span>
                <span className="font-medium text-green-600">₹50 - Paid via {upiProvider.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-center text-muted-foreground">
              📧 Registration details have been sent to our team. Please download your receipt and bring it on the trek
              day.
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={downloadReceipt} className="flex-1 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button onClick={handleCloseConfirmation} variant="outline" className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div
        ref={scrollContainerRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="sticky top-0 bg-gradient-to-r from-primary to-accent p-6 text-white z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold font-heading">Trek Registration</h2>
          <p className="text-white/90 mt-1">Join us for an amazing trekking experience</p>
        </div>

        <form
          ref={formRef}
          action="https://formsubmit.co/somyakhandelwal300@gmail.com"
          method="POST"
          className="hidden"
        >
          <input type="text" name="Registration_ID" value={registrationId} readOnly />
          <input type="text" name="Full_Name" value={formData.fullName} readOnly />
          <input type="text" name="Contact_Number" value={formData.contact} readOnly />
          <input type="email" name="Email" value={formData.email} readOnly />
          <input type="text" name="Address" value={formData.address} readOnly />
          <input type="text" name="Aadhaar_Number" value={formData.aadhaar} readOnly />
          <input type="text" name="Instagram_ID" value={formData.instagram || "Not provided"} readOnly />
          <input
            type="text"
            name="Selected_Trek"
            value={trekOptions.find((t) => t.value === formData.selectedTrek)?.label || ""}
            readOnly
          />
          <input type="text" name="Health_Issues" value={formData.healthIssues} readOnly />
          <input type="text" name="Health_Details" value={formData.healthDetails || "None"} readOnly />
          <input type="text" name="Payment_Method" value={paymentMethod.toUpperCase()} readOnly />
          <input type="text" name="UPI_Provider" value={paymentMethod === "upi" ? upiProvider : "N/A"} readOnly />
          <input type="text" name="UPI_ID" value={upiId || "N/A"} readOnly />
          <input type="text" name="Registration_Fee" value="₹50" readOnly />
          <input type="hidden" name="_subject" value="New Trek Registration - Chalo Jaipur" />
          <input type="hidden" name="_template" value="table" />
        </form>

        <div className="p-6 space-y-6">
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading text-foreground">Personal Details</h3>

            <div className="space-y-2">
              <Label htmlFor="selectedTrek">Select Trek *</Label>
              <div className="relative">
                <Mountain className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <select
                  id="selectedTrek"
                  value={formData.selectedTrek}
                  onChange={(e) => setFormData({ ...formData, selectedTrek: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg appearance-none bg-white"
                >
                  <option value="">Choose your trek...</option>
                  {trekOptions.map((trek) => (
                    <option key={trek.value} value={trek.value}>
                      {trek.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.selectedTrek && <p className="text-sm text-red-500">{errors.selectedTrek}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="contact"
                  placeholder="10-digit mobile number"
                  value={formData.contact}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                    setFormData({ ...formData, contact: value })
                  }}
                  className="pl-10"
                />
              </div>
              {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email ID *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="pl-10 min-h-20"
                />
              </div>
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Card Number *</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="aadhaar"
                  placeholder="XXXX XXXX XXXX"
                  value={formData.aadhaar}
                  onChange={(e) => {
                    const formatted = formatAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))
                    setFormData({ ...formData, aadhaar: formatted })
                  }}
                  className="pl-10"
                />
              </div>
              {errors.aadhaar && <p className="text-sm text-red-500">{errors.aadhaar}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram ID (Optional)</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="instagram"
                  placeholder="@yourusername"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthIssues">Do you have any health issues? *</Label>
              <select
                id="healthIssues"
                value={formData.healthIssues}
                onChange={(e) => setFormData({ ...formData, healthIssues: e.target.value as "yes" | "no" })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {formData.healthIssues === "yes" && (
              <div className="space-y-2">
                <Label htmlFor="healthDetails">Health Details *</Label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="healthDetails"
                    placeholder="Please describe your health condition"
                    value={formData.healthDetails}
                    onChange={(e) => setFormData({ ...formData, healthDetails: e.target.value })}
                    className="pl-10 min-h-20"
                  />
                </div>
                {errors.healthDetails && <p className="text-sm text-red-500">{errors.healthDetails}</p>}
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div
            className={`transition-all duration-300 border-t pt-6 ${
              showPaymentDetails ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold font-heading text-foreground">Payment Details</h3>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Registration Fee</p>
                  <p className="text-2xl font-bold text-primary">₹50</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">UPI</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Card</p>
                  </button>
                </div>
              </div>

              {paymentMethod === "upi" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Choose UPI Provider</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setUpiProvider("gpay")}
                        className={`p-3 border-2 rounded-lg transition-all ${
                          upiProvider === "gpay"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-sm">Google Pay</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiProvider("phonepe")}
                        className={`p-3 border-2 rounded-lg transition-all ${
                          upiProvider === "phonepe"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-sm">PhonePe</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiProvider("paytm")}
                        className={`p-3 border-2 rounded-lg transition-all ${
                          upiProvider === "paytm"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-sm">Paytm</p>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID *</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    {errors.upiId && <p className="text-sm text-red-500">{errors.upiId}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handlePayment} className="flex-1 bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Proceed to Pay ₹50"}
          </Button>
        </div>
      </div>
    </div>
  )
}
