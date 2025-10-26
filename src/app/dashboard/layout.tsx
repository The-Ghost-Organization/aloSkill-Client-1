import AuthProvider from "../providers/session-provider.tsx";

// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
