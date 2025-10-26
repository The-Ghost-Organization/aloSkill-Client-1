// ============================================================================
// FILE: components/ui/Button.tsx
// Reusable Animated Button Component with Multiple Variants
// ============================================================================

"use client";

import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";

// Button variants
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "animated-border"
  | "glow"
  | "shine";

// Button sizes
type ButtonSize = "sm" | "md" | "lg" | "xl";

// Icon position
type IconPosition = "left" | "right";

// Props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text */
  children: React.ReactNode;
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Icon position */
  iconPosition?: IconPosition;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Show ripple effect */
  ripple?: boolean;
}

/**
 * Reusable Button Component with Animations
 * 
 * @example
 * // Primary button with icon
 * <Button variant="primary" icon={Send} iconPosition="right">
 *   Send Message
 * </Button>
 * 
 * @example
 * // Animated border button
 * <Button variant="animated-border" icon={Sparkles}>
 *   Get Started
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "right",
      fullWidth = false,
      isLoading = false,
      disabled = false,
      className = "",
      onClick,
      ripple = true,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    // Handle ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !isLoading) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
      }

      onClick?.();
    };

    // Size classes
    const sizeClasses = {
      sm: "h-10 px-4 text-sm gap-1.5",
      md: "h-12 px-6 text-sm gap-2",
      lg: "h-14 px-8 text-base gap-2",
      xl: "h-16 px-10 text-lg gap-3",
    };

    // Icon size classes
    const iconSizeClasses = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    // Base classes
    const baseClasses = `
      relative inline-flex items-center justify-center
      font-semibold rounded-full
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
      ${fullWidth ? "w-full" : "w-auto"}
      ${sizeClasses[size]}
    `;

    // Variant classes
    const variantClasses = {
      primary: `
        bg-gradient-to-r from-orange-500 to-orange-600
        text-white
        hover:from-orange-600 hover:to-orange-700
        focus:ring-orange-500
        shadow-lg hover:shadow-xl
        hover:scale-105
      `,
      secondary: `
        bg-gradient-to-r from-purple-500 to-purple-600
        text-white
        hover:from-purple-600 hover:to-purple-700
        focus:ring-purple-500
        shadow-lg hover:shadow-xl
        hover:scale-105
      `,
      outline: `
        bg-white border-2 border-orange-600
        text-orange-600
        hover:bg-orange-50
        focus:ring-orange-500
        hover:border-orange-700
      `,
      ghost: `
        bg-transparent
        text-gray-700
        hover:bg-gray-100
        focus:ring-gray-500
      `,
      gradient: `
        bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500
        text-white
        hover:shadow-2xl
        focus:ring-purple-500
        bg-[length:200%_auto]
        hover:bg-right
        transition-all duration-500
      `,
      "animated-border": `
        bg-white
        text-gray-900
        hover:bg-orange-500 hover:text-white
        focus:ring-orange-500
      `,
      glow: `
        bg-gradient-to-r from-orange-500 to-purple-600
        text-white
        hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]
        focus:ring-purple-500
        animate-pulse-slow
      `,
      shine: `
        bg-gradient-to-r from-orange-500 to-orange-600
        text-white
        hover:shadow-xl
        focus:ring-orange-500
        overflow-hidden
      `,
    };

    // Render animated border wrapper
    if (variant === "animated-border") {
      return (
        <button
          ref={ref}
          onClick={handleClick}
          disabled={disabled || isLoading}
          className={`
            ${fullWidth ? "w-full" : "w-auto sm:w-auto"}
            relative inline-flex
            active:scale-95 transition-transform
            overflow-hidden rounded-full p-[2px]
            focus:outline-none
            ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
          `}
          {...props}
        >
          {/* Animated spinning border */}
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DA7C36_0%,#f472b6_50%,#bd5fff_100%)]" />

          {/* Button content */}
          <span
            className={`
              inline-flex h-full w-full cursor-pointer items-center justify-center
              rounded-full bg-white backdrop-blur-3xl
              transition-all duration-300
              hover:bg-orange-500 hover:text-white
              ${sizeClasses[size]}
              ${disabled || isLoading ? "cursor-not-allowed" : ""}
            `}
          >
            {/* Loading spinner */}
            {isLoading && (
              <svg
                className={`animate-spin ${iconSizeClasses[size]} mr-2`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}

            {/* Icon left */}
            {!isLoading && Icon && iconPosition === "left" && (
              <Icon className={`${iconSizeClasses[size]} transition-transform group-hover:scale-110`} />
            )}

            {/* Text */}
            <span>{children}</span>

            {/* Icon right */}
            {!isLoading && Icon && iconPosition === "right" && (
              <Icon className={`${iconSizeClasses[size]} transition-transform group-hover:translate-x-1`} />
            )}

            {/* Ripples */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: "20px",
                  height: "20px",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </span>
        </button>
      );
    }

    // Render shine variant
    if (variant === "shine") {
      return (
        <button
          ref={ref}
          onClick={handleClick}
          disabled={disabled || isLoading}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            group
            ${className}
          `}
          {...props}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Button content */}
          <span className="relative flex items-center gap-2">
            {/* Loading spinner */}
            {isLoading && (
              <svg
                className={`animate-spin ${iconSizeClasses[size]}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}

            {/* Icon left */}
            {!isLoading && Icon && iconPosition === "left" && (
              <Icon className={`${iconSizeClasses[size]} transition-transform group-hover:scale-110`} />
            )}

            {/* Text */}
            {children}

            {/* Icon right */}
            {!isLoading && Icon && iconPosition === "right" && (
              <Icon className={`${iconSizeClasses[size]} transition-transform group-hover:translate-x-1`} />
            )}
          </span>

          {/* Ripples */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: "20px",
                height: "20px",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </button>
      );
    }

    // Render standard button
    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          group
          overflow-hidden
          ${className}
        `}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className={`animate-spin ${iconSizeClasses[size]} mr-2`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon left */}
        {!isLoading && Icon && iconPosition === "left" && (
          <Icon className={`${iconSizeClasses[size]} transition-transform group-hover:scale-110`} />
        )}

        {/* Text */}
        {children}

        {/* Icon right */}
        {!isLoading && Icon && iconPosition === "right" && (
          <Icon className={`${iconSizeClasses[size]} transition-transform group-hover:translate-x-1`} />
        )}

        {/* Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "20px",
              height: "20px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

// Add these to your tailwind.config.js:
/*
module.exports = {
  theme: {
    extend: {
     
    }
  }
}
*/
<style jsx>{`
         keyframes: {
        ripple: {
          '0%': { 
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translate(-50%, -50%) scale(4)',
            opacity: '0'
          }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      animation: {
        ripple: 'ripple 0.6s ease-out',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
      `}</style>