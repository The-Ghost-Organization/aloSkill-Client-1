"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Zod Schema
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter required")
      .regex(/[a-z]/, "At least one lowercase letter required")
      .regex(/[0-9]/, "At least one number required"),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .optional()
      .refine(val => !val || /^\+?[\d\s-()]+$/.test(val), "Invalid phone number"),
    role: z.enum(["STUDENT", "INSTRUCTOR"]),
    bio: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>({
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
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) {
        console.error("Error:", resData);
        return;
      }

      setStep(3);

      setTimeout(async () => {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (result?.ok) {
          router.push("/dashboard");
        } else {
          router.push("/auth/signin?message=Please sign in with your new account");
        }
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Success Screen
  if (step === 3) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4'>
        <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle2 className='w-12 h-12 text-green-600' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>Welcome to Aloskill! 🎉</h1>
          <p className='text-gray-600 mb-6'>Your account has been created successfully.</p>
          <div className='flex items-center justify-center gap-2 text-blue-600'>
            <Loader2 className='w-5 h-5 animate-spin' />
            <span>Signing you in...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-12'>
      <div className='max-w-xl w-full bg-white rounded-2xl shadow-xl p-8'>
        <h1 className='text-3xl font-bold text-center mb-6'>Create Your Account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-5'
        >
          {/* Step 1 */}
          {step === 1 && (
            <>
              {/* Role */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Role</label>
                <select
                  {...register("role")}
                  className='w-full border rounded-xl px-3 py-2'
                >
                  <option value='STUDENT'>Student</option>
                  <option value='INSTRUCTOR'>Instructor</option>
                </select>
              </div>

              {/* First + Last Name */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label>First Name *</label>
                  <input
                    {...register("firstName")}
                    className='w-full border rounded-xl px-3 py-2'
                  />
                  {errors.firstName && (
                    <p className='text-red-600 text-sm'>{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label>Last Name *</label>
                  <input
                    {...register("lastName")}
                    className='w-full border rounded-xl px-3 py-2'
                  />
                  {errors.lastName && (
                    <p className='text-red-600 text-sm'>{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label>Email *</label>
                <input
                  {...register("email")}
                  type='email'
                  className='w-full border rounded-xl px-3 py-2'
                />
                {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
              </div>
              <button
                type='button'
                onClick={() => setStep(2)}
                className='w-full py-3 rounded-xl bg-blue-600 text-white font-semibold'
              >
                Next
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              {/* Phone */}
              <div>
                <label>Phone</label>
                <input
                  {...register("phoneNumber")}
                  className='w-full border rounded-xl px-3 py-2'
                />
                {errors.phoneNumber && (
                  <p className='text-red-600 text-sm'>{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label>Password *</label>
                <div className='relative'>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className='w-full border rounded-xl px-3 py-2'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-600 text-sm'>{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label>Confirm Password *</label>
                <div className='relative'>
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className='w-full border rounded-xl px-3 py-2'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-600 text-sm'>{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label>Bio</label>
                <textarea
                  {...register("bio")}
                  className='w-full border rounded-xl px-3 py-2'
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-3 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-50'
              >
                {isLoading ? "Creating..." : "Create Account"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
