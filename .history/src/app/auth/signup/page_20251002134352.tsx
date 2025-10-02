"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod Schema
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    acceptTerms: z.boolean().refine(val => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Call your API endpoint
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle errors from backend
        if (response.status === 409) {
          alert("An account with this email already exists");
        } else {
          alert(result.message || "Registration failed");
        }
        return;
      }

      // Show success state
      setIsSuccess(true);
      reset();

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        window.location.href = "/auth/signin";
      }, 3000);
    } catch (error) {
      console.error("Signup error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className='min-h-screen relative overflow-hidden bg-white flex items-center justify-center p-4'>
      {/* Animated Gradient Blobs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Blob 1 - Cyan */}
        <div
          className='absolute w-96 h-96 rounded-full opacity-60 blur-3xl animate-blob'
          style={{
            background: "radial-gradient(circle, #EAFFFF 0%, transparent 70%)",
            top: "-10%",
            left: "-5%",
            animation: "blob 7s infinite",
          }}
        />

        {/* Blob 2 - Yellow */}
        <div
          className='absolute w-96 h-96 rounded-full opacity-60 blur-3xl'
          style={{
            background: "radial-gradient(circle, #FAFFBD 0%, transparent 70%)",
            top: "-5%",
            right: "-10%",
            animation: "blob 8s infinite 2s",
          }}
        />

        {/* Blob 3 - Blue */}
        <div
          className='absolute w-[500px] h-[500px] rounded-full opacity-50 blur-3xl'
          style={{
            background: "radial-gradient(circle, #5B61FF 0%, transparent 70%)",
            bottom: "-15%",
            left: "10%",
            animation: "blob 9s infinite 4s",
          }}
        />

        {/* Blob 4 - Pink */}
        <div
          className='absolute w-96 h-96 rounded-full opacity-60 blur-3xl'
          style={{
            background: "radial-gradient(circle, #FFBBF8 0%, transparent 70%)",
            bottom: "-10%",
            right: "15%",
            animation: "blob 10s infinite 6s",
          }}
        />
      </div>

      {/* Success Toast */}
      {isSuccess && (
        <div className='fixed top-4 right-4 z-50 animate-slide-in'>
          <div className='bg-white border border-green-200 rounded-xl shadow-2xl p-4 flex items-center gap-3 backdrop-blur-sm bg-opacity-95'>
            <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
              <CheckCircle2 className='w-6 h-6 text-green-600' />
            </div>
            <div>
              <p className='font-semibold text-gray-900'>Account Created!</p>
              <p className='text-sm text-gray-600'>Welcome to our platform</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className='relative z-10 w-full max-w-md'>
        {/* Glassmorphism Card */}
        <div className='backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <User className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h1>
            <p className='text-gray-600'>Join us today and start your journey</p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-5'
          >
            {/* Name Fields */}
            <div className='grid grid-cols-2 gap-4'>
              {/* First Name */}
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-semibold text-gray-700 mb-2'
                >
                  First Name
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                  <input
                    id='firstName'
                    type='text'
                    {...register("firstName")}
                    placeholder='John'
                    className={`w-full pl-10 pr-4 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all ${
                      errors.firstName
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className='mt-1.5 text-sm text-red-600 font-medium'>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-semibold text-gray-700 mb-2'
                >
                  Last Name
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                  <input
                    id='lastName'
                    type='text'
                    {...register("lastName")}
                    placeholder='Doe'
                    className={`w-full pl-10 pr-4 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all ${
                      errors.lastName
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className='mt-1.5 text-sm text-red-600 font-medium'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                <input
                  id='email'
                  type='email'
                  {...register("email")}
                  placeholder='you@example.com'
                  className={`w-full pl-10 pr-4 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                />
              </div>
              {errors.email && (
                <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder='••••••••'
                  className={`w-full pl-10 pr-12 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {errors.password && (
                <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                <input
                  id='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder='••••••••'
                  className={`w-full pl-10 pr-12 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showConfirmPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='mt-1.5 text-sm text-red-600 font-medium'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className='flex items-start gap-3 cursor-pointer group'>
                <div className='relative flex items-center justify-center mt-0.5'>
                  <input
                    type='checkbox'
                    {...register("acceptTerms")}
                    className='w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-blue-500 checked:border-blue-500 transition-all focus:ring-4 focus:ring-blue-100'
                  />
                </div>
                <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>
                  I agree to the{" "}
                  <a
                    href='#'
                    className='text-blue-600 hover:text-blue-700 font-semibold underline'
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href='#'
                    className='text-blue-600 hover:text-blue-700 font-semibold underline'
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className='mt-1.5 text-sm text-red-600 font-medium'>
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3.5 rounded-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6'
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{" "}
            <a
              href='/auth/signin'
              className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Bottom Text */}
        <p className='text-center text-xs text-gray-500 mt-6'>
          Protected by industry-leading security standards
        </p>
      </div>

      {/* Custom Animations - Add to globals.css */}
      <style jsx>{`
        
      `}</style>
    </div>
  );
}
