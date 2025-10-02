"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  AlertCircle, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  CheckCircle2,
  Loader2
} from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  role: "STUDENT" | "INSTRUCTOR"
  bio: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  phoneNumber?: string
  general?: string
}

export default function SignUpPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "STUDENT",
    bio: "",
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Basic Info, 2: Account Details, 3: Success
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Password strength calculator
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    return strength
  }

  // Real-time validation
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "firstName":
        if (value.length < 2) return "First name must be at least 2 characters"
        if (value.length > 50) return "First name is too long"
        if (!/^[a-zA-Z\s]+$/.test(value)) return "First name can only contain letters"
        break
      
      case "lastName":
        if (value.length < 2) return "Last name must be at least 2 characters"
        if (value.length > 50) return "Last name is too long"
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Last name can only contain letters"
        break
      
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        break
      
      case "password":
        if (value.length < 8) return "Password must be at least 8 characters"
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter"
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter"
        if (!/[0-9]/.test(value)) return "Password must contain at least one number"
        break
      
      case "confirmPassword":
        if (value !== formData.password) return "Passwords do not match"
        break
      
      case "phoneNumber":
        if (value && !/^\+?[\d\s-()]+$/.test(value)) return "Please enter a valid phone number"
        if (value && value.length > 14) return "Phone number is too long"
        break
    }
    return undefined
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    
    // Calculate password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    
    // Real-time validation
    const error = validateField(name as keyof FormData, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setErrors({})

    try {
      // Call backend registration API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          phoneNumber: formData.phoneNumber || undefined,
          role: formData.role,
          bio: formData.bio || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific errors
        if (response.status === 409) {
          setErrors({ email: "An account with this email already exists" })
        } else if (data.errors) {
          // Zod validation errors from backend
          const backendErrors: FormErrors = {}
          data.errors.forEach((err: any) => {
            backendErrors[err.path[0] as keyof FormErrors] = err.message
          })
          setErrors(backendErrors)
        } else {
          setErrors({ general: data.message || "Registration failed" })
        }
        return
      }

      // Success - Show success screen
      setStep(3)
      
      // Auto-login after 2 seconds
      setTimeout(async () => {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.ok) {
          router.push("/dashboard")
        } else {
          // If auto-login fails, redirect to signin
          router.push("/auth/signin?message=Please sign in with your new account")
        }
      }, 2000)

    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ general: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/onboarding" })
    } catch (error) {
      setErrors({ general: "Google sign-up failed" })
      setIsLoading(false)
    }
  }

  // Next step
  const nextStep = () => {
    if (step === 1) {
      // Validate basic info
      const basicErrors: FormErrors = {}
      const fields = ["firstName", "lastName", "email"] as const
      fields.forEach(field => {
        const error = validateField(field, formData[field])
        if (error) basicErrors[field] = error
      })
      
      if (Object.keys(basicErrors).length > 0) {
        setErrors(basicErrors)
        return
      }
    }
    setStep(step + 1)
  }

  // Password strength indicator
  const PasswordStrengthIndicator = () => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"]
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    
    return (
      <div className="mt-2">
        <div className="flex gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded ${
                i < passwordStrength ? colors[passwordStrength - 1] : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        {formData.password && (
          <p className="text-xs text-gray-600">
            Password strength: {labels[passwordStrength - 1] || "Enter password"}
          </p>
        )}
      </div>
    )
  }

  // Success Screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to Aloskill! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing you in...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join thousands of learners and instructors
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-center gap-16 mt-2">
            <span className="text-sm text-gray-600">Basic Info</span>
            <span className="text-sm text-gray-600">Account Details</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I want to
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: "STUDENT" }))}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        formData.role === "STUDENT"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">🎓</div>
                      <div className="font-semibold">Learn</div>
                      <div className="text-xs text-gray-600">I'm a student</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: "INSTRUCTOR" }))}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        formData.role === "INSTRUCTOR"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">👨‍🏫</div>
                      <div className="font-semibold">Teach</div>
                      <div className="text-xs text-gray-600">I'm an instructor</div>
                    </button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30"
                >
                  Continue
                </button>
              </>
            )}

            {/* Step 2: Account Details */}
            {step === 2 && (
              <>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <PasswordStrengthIndicator />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Phone Number (Optional) */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Bio (Optional) */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                    rows={3}
                    maxLength={150}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500 text-right">
                    {formData.bio.length}/150 characters
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}