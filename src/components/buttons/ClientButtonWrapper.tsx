// ClientButtonWrapper.tsx
"use client";

import GlowButton from "@/components/buttons/GlowButton.tsx";

export default function ClientButtonWrapper() {
  return <GlowButton onClick={() => console.log("Button clicked!")} />;
}
