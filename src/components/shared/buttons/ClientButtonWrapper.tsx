// ClientButtonWrapper.tsx
"use client";

import GlowButton from "@/components/shared/buttons/GlowButton";

export default function ClientButtonWrapper() {
  return <GlowButton onClick={() => console.log("Button clicked!")} />;
}
