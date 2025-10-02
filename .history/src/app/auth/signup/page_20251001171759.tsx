"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema validation
const schema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z
    .string()
    .optional()
    .regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number")
    .max(14, "Phone number is too long"),
  role: z.enum(["STUDENT", "INSTRUCTOR"]),
  bio: z.string().max(150, "Bio must be less than 150 characters").optional(),
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: "STUDENT" | "INSTRUCTOR";
  bio: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formData = watch();

  // Password strength calculator
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/onboarding" });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Registration API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle backend validation errors
          const backendErrors: any = result.errors.reduce((acc: any, error: any) => {
            acc[error.path[0]] = error.message;
            return acc;
          }, {});
          return;
        }
      }

      setStep(3);
      setTimeout(() => {
        signIn("credentials", { email: data.email, password: data.password, redirect: false }).then(
          result => {
            if (result?.ok) {
              router.push("/dashboard");
            } else {
              router.push("/auth/signin?message=Please sign in with your new account");
            }
          }
        );
      }, 2000);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Success screen
  if (step === 3) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50'>
        <div className='max-w-md text-center'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle2 className='text-green-600 w-12 h-12' />
          </div>
          <h1 className='text-3xl font-bold mb-3'>Welcome to Aloskill! 🎉</h1>
          <p className='text-gray-600 mb-6'>Your account has been created successfully.</p>
          <div className='flex justify-center items-center gap-2 text-blue-600'>
            <Loader2 className='animate-spin w-5 h-5' />
            <span>Signing you in...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12'>
      <div className='max-w-2xl w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Create Your Account</h1>
          <p className='text-gray-600'>Join thousands of learners and instructors</p>
        </div>

        {/* Progress Indicator */}
        <div className='mb-8'>
          <div className='flex items-center justify-center gap-2'>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
          </div>
          <div className='flex justify-center gap-16 mt-2'>
            <span className='text-sm text-gray-600'>Basic Info</span>
            <span className='text-sm text-gray-600'>Account Details</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className='space-y-5'
        >
          {step === 1 && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>First Name *</label>
                <input
                  id='firstName'
                  {...register("firstName")}
                  placeholder='John'
                  className={`w-full py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.firstName && (
                  <p className='text-sm text-red-600'>{errors.firstName?.message}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name *</label>
                <input
                  id='lastName'
                  {...register("lastName")}
                  placeholder='Doe'
                  className={`w-full py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.lastName && (
                  <p className='text-sm text-red-600'>{errors.lastName?.message}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address *
                </label>
                <input
                  id='email'
                  {...register("email")}
                  placeholder='you@example.com'
                  className={`w-full py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className='text-sm text-red-600'>{errors.email?.message}</p>}
              </div>

              <button
                type='button'
                onClick={() => setStep(2)}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all'
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Password *</label>
                <input
                  id='password'
                  {...register("password")}
                  type='password'
                  placeholder='••••••••'
                  className={`w-full py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && (
                  <p className='text-sm text-red-600'>{errors.password?.message}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Confirm Password *
                </label>
                <input
                  id='confirmPassword'
                  {...register("confirmPassword")}
                  type='password'
                  placeholder='••••••••'
                  className={`w-full py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-red-600'>{errors.confirmPassword?.message}</p>
                )}
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all'
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
