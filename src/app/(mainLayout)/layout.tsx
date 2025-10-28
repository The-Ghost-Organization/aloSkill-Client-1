"use client";

import BackToTop from "@/components/shared/BackToTop";
import Footer from "@/components/shared/footer/Footer";
import AnnouncementBar from "@/components/shared/header/AnnouncementBar";
import NavBar from "@/components/shared/header/NavBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import MobileMenu from "@/components/shared/menu/MobileMenu";
import TabletDrawer from "@/components/shared/menu/TabletDrawer";
import RightSidebar from "@/components/shared/RightSide";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-white'>
      {/* Fixed Header */}
      <div className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm'>
        <AnnouncementBar />
        <NavBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Layout Container */}
      <div className='pt-[120px]'>
        {" "}
        {/* Adjust based on your header height */}
        {/* Left Sidebar - Desktop */}
        <LeftSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {/* Main Content Area */}
        <main className='min-h-screen lg:ml-64 xl:mr-64 px-4 sm:px-6 md:px-8 lg:px-1'>
          <div className='max-w-6xl mx-auto'>
            {children} {/* Page content goes here */}
          </div>
        </main>
        {/* Right Sidebar - Large Desktop Only */}
        <RightSidebar />
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Tablet Quick Access Drawer */}
      <TabletDrawer />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
