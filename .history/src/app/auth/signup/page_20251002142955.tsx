"use client";

import { authService } from "@/lib/api/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
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

    phoneNumber: z.string().optional(),

    role: z.enum(["STUDENT", "INSTRUCTOR"]),

    bio: z.string().max(150, "Bio must be less than 150 characters").optional(),

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
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "STUDENT",
      bio: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setApiError(null);

    try {
      // Call backend API
      const payload: any = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      if (data.phoneNumber) {
        payload.phoneNumber = data.phoneNumber;
      }
      if (data.bio) {
        payload.bio = data.bio;
      }
      const response = await authService.register(payload);

      if (!response.success) {
        // Handle validation errors from backend
        if (response.errors && Array.isArray(response.errors)) {
          response.errors.forEach((err: any) => {
            const field = err.path?.[0] || err.field;
            if (field && field in data) {
              setError(field as keyof SignupFormData, {
                type: "manual",
                message: err.message,
              });
            }
          });
          return;
        }

        // Handle specific error codes
        if (response.message?.includes("already exists")) {
          setError("email", {
            type: "manual",
            message: "An account with this email already exists",
          });
          return;
        }

        // General error
        setApiError(response.message || "Registration failed. Please try again.");
        return;
      }

      // Success!
      setIsSuccess(true);
      reset();

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className='min-h-screen relative overflow-hidden bg-white flex items-center justify-center p-4'>
      {/* Animated Gradient Blobs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute w-96 h-96 rounded-full opacity-60 blur-3xl'
          style={{
            background: "radial-gradient(circle, #EAFFFF 0%, transparent 70%)",
            top: "-10%",
            left: "-5%",
            animation: "blob 7s infinite",
          }}
        />
        <div
          className='absolute w-96 h-96 rounded-full opacity-60 blur-3xl'
          style={{
            background: "radial-gradient(circle, #FAFFBD 0%, transparent 70%)",
            top: "-5%",
            right: "-10%",
            animation: "blob 8s infinite 2s",
          }}
        />
        <div
          className='absolute w-[500px] h-[500px] rounded-full opacity-50 blur-3xl'
          style={{
            background: "radial-gradient(circle, #5B61FF 0%, transparent 70%)",
            bottom: "-15%",
            left: "10%",
            animation: "blob 9s infinite 4s",
          }}
        />
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
              <p className='text-sm text-gray-600'>Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className='relative z-10 w-'>
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

          {/* API Error Alert */}
          {apiError && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3'>
              <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
              <div className='flex-1'>
                <p className='text-sm text-red-800 font-medium'>{apiError}</p>
              </div>
              <button
                onClick={() => setApiError(null)}
                className='text-red-400 hover:text-red-600 text-lg leading-none'
              >
                ×
              </button>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-5'
          >
            {/* Role Selection */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>I want to</label>
              <div className='grid grid-cols-2 gap-3'>
                <label className='cursor-pointer'>
                  <input
                    type='radio'
                    {...register("role")}
                    value='STUDENT'
                    className='sr-only peer'
                  />
                  <div className='p-3 border-2 rounded-xl transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 border-gray-200 hover:border-gray-300 text-center'>
                    <div className='text-2xl mb-1'>🎓</div>
                    <div className='font-semibold text-sm'>Learn</div>
                  </div>
                </label>
                <label className='cursor-pointer'>
                  <input
                    type='radio'
                    {...register("role")}
                    value='INSTRUCTOR'
                    className='sr-only peer'
                  />
                  <div className='p-3 border-2 rounded-xl transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 border-gray-200 hover:border-gray-300 text-center'>
                    <div className='text-2xl mb-1'>👨‍🏫</div>
                    <div className='font-semibold text-sm'>Teach</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <div className='grid grid-cols-2 gap-4'>
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
                <Lock className='absolute left-3 top-1/2 -translate-                -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
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

            {/* Phone Number (optional) */}
            <div>
              <label
                htmlFor='phoneNumber'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Phone Number (optional)
              </label>
              <div className='relative'>
                <input
                  id='phoneNumber'
                  type='text'
                  {...register("phoneNumber")}
                  placeholder='e.g. +8801XXXXXXXXX'
                  className='w-full pl-3 pr-4 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                />
              </div>
              {errors.phoneNumber && (
                <p className='mt-1.5 text-sm text-red-600 font-medium'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Bio (optional) */}
            <div>
              <label
                htmlFor='bio'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Bio (optional)
              </label>
              <textarea
                id='bio'
                {...register("bio")}
                placeholder='Tell us about yourself'
                className='w-full pl-3 pr-4 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none'
                rows={3}
              />
              {errors.bio && (
                <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.bio.message}</p>
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

            {/* Sign In Link */}
            <p className='text-center text-sm text-gray-600 mt-6'>
              Already have an account?{" "}
              <a
                href='/auth/signin'
                className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'
              >
                Sign in
              </a>
            </p>
          </form>

          {/* Footer Note */}
          <p className='text-center text-xs text-gray-500 mt-6'>
            Protected by industry-leading security standards
          </p>
        </div>
      </div>
    </div>
  );
}
