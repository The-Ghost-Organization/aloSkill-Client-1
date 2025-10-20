"use client";

import { CategoriesSectionAnimated } from "@/components/home/CategoriesSectionAnimated.tsx";
import { CertificateSectionSimple } from "@/components/home/CertificateSectionSimple.tsx";
import ConsultationSection from "@/components/home/ConsultationSection.tsx";
import { DiscoverBooksSectionCarousel } from "@/components/home/DiscoverBooksSectionCarousel.tsx";
import HeroSection from "@/components/home/HeroSection";
import InstructorsSection from "@/components/home/InstructorsSection.tsx";
import { InstructorsSectionAdvanced } from "@/components/home/InstructorsSectionAdvanced.tsx";
import PopularCoursesSection from "@/components/home/PopularCoursesSection.tsx";
import { PopularCoursesSectionCompact } from "@/components/home/PopularCoursesSectionCompact.tsx";
import { WhyLearnSectionAnimated } from "@/components/home/WhyLearnSectionAnimated.tsx";
import BackToTop from "@/components/shared/BackToTop";
import FooterSimple from "@/components/shared/footer/FooterSimple";
import Newsletter from "@/components/shared/footer/Newsletter";
import AnnouncementBar from "@/components/shared/header/AnnouncementBar";
import LeftSidebar from "@/components/shared/header/LeftSidebar";
import MobileMenu from "@/components/shared/header/menu/MobileMenu";
import TabletDrawer from "@/components/shared/header/menu/TabletDrawer";
import NavBar from "@/components/shared/header/NavBar";
import RightSidebar from "@/components/shared/header/RightSidebar";
import StatsSection from "@/components/StatsSection.tsx";
import { useState } from "react";
const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className='min-h-screen w-screen bg-gradient-radial from-pink-100 via-purple-50 to-orange-50'>

      <AnnouncementBar />
      <NavBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />


      {/* Main Layout Container */}
      <div className='w-full flex pt-16 lg:pt-0 '>
        {/* Left Sidebar - Desktop */}
        <LeftSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className='flex-1 lg:px-6'>
          <HeroSection />

          <CategoriesSectionAnimated />

          <StatsSection />
          <WhyLearnSectionAnimated />
          <PopularCoursesSection />
          <PopularCoursesSectionCompact />
          <DiscoverBooksSectionCarousel />
          <InstructorsSection />
          <InstructorsSectionAdvanced />

          <CertificateSectionSimple />
          <ConsultationSection />
          <Newsletter />
          {/* <CategoryCard
            icon={undefined}
            title={"i am category card"}
            courseCount={100}
            gradient={"red"}
          />
          <FeatureCard
            icon={undefined}
            title={"i am feature card"}
            description={"here is my description"}
            gradient={"blue}"}
          />
          <InstructorCard
            name={"mr.Instructor"}
            title={"Hi, I am instructor"}
            avatar={"https://images.unsplash.com"}
            students={10}
            courses={110}
            rating={5}
          />
          <TestimonialCard
            name={"mr.reviewer"}
            role={"Student"}
            avatar={"https://images.unsplash.com"}
            rating={5}
            comment={"no comments i am mr. reviewer"}
          /> */}
        </main>

        {/* Right Sidebar - Large Desktop Only */}
        <RightSidebar />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Tablet Quick Access Drawer */}
      <TabletDrawer />
      <BackToTop />
      <FooterSimple />

      {/* Back to Top Button */}
    </div>
    // <div className='flex flex-col items-center justify-center '>

    //   <h1>Home Page</h1>
    //   <div className='flex items-center justify-center h-screen w-full'>
    //     <AloskillLoader />
    //   </div>

    //   <div className='flex items-center justify-center h-screen w-full'>
    //     <HandLoader />
    //   </div>
    //   <ClientButtonWrapper />
    //   <GoogleButton />
    //   <div className='flex max-w-sm rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'>
    //     <button className='flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl'>
    //       Gradient Border Button
    //     </button>
    //   </div>
    //   <div className='relative h-screen w-full bg-white overflow-hidden'>
    //     <div className='absolute inset-0'>
    //       <div className='absolute top-[-100px] left-[100px] w-[600px] h-[600px] bg-pink-300 opacity-40 blur-[120px] rounded-full'></div>
    //       <div className='absolute top-[0px] left-[400px] w-[500px] h-[500px] bg-purple-300 opacity-40 blur-[140px] rounded-full'></div>
    //       <div className='absolute top-[100px] right-[100px] w-[600px] h-[600px] bg-blue-200 opacity-40 blur-[160px] rounded-full'></div>
    //       <div className='absolute bottom-[50px] right-[200px] w-[600px] h-[600px] bg-orange-200 opacity-40 blur-[120px] rounded-full'></div>
    //     </div>

    //     <div className='relative z-10 flex flex-col items-center justify-center h-full'>
    //       <h1 className='text-6xl font-bold text-gray-900'>Beautiful Hero Section</h1>
    //       <p className='mt-4 text-lg text-gray-600'>With soft gradient background</p>
    //     </div>
    //   </div>

    //   <div className='bg-gradient-bpy h-40 w-full rounded-lg'></div>
    //   <div className='bg-gradient-soft-hero h-screen blur-3xl w-full rounded-lg'></div>
    //   <p>i am in</p>

    //   <div className='relative h-screen w-full '>
    //     <div className='bg-gradient-creamy-panda blur-3xl'>
    //       <div className='panda-blue'></div>
    //       <div className='panda-orange'></div>
    //     </div>

    //     <div className='relative z-10 text-center text-2xl font-bold text-gray-800'>
    //       Your main content here
    //     </div>
    //   </div>

    //   <div className='bg-[var(--color-orange)] text-white p-4 rounded-lg'>Orange Background</div>

    //   <div className='bg-orange-700 p-4 rounded-lg'>Dark Orange 600</div>
    //   <div className='bg-[var(--color-orange-dark)] text-white p-4 rounded-lg'>
    //     Dark Orange Text
    //   </div>

    //   <div className='relative min-h-screen w-full bg-gradient-blob '>
    //     <div className='relative z-10 flex flex-col items-center justify-center h-full text-center'>
    //       <h1 className='text-5xl font-bold text-gray-900'>Hero Section</h1>
    //       <p className='mt-4 text-gray-600'>Subtle dreamy background</p>
    //       <OrgButton />

    // <button className='relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[3px] focus:outline-none'>
    //   <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]'></span>
    //   <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[var(--color-orange)] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2'>
    //     Contact me
    //     <Send className='w-4 h-4' />
    //   </span>
    // </button>
    //     </div>
    //   </div>
    //   <div className='relative min-h-screen w-full bg-grad-conic-blob flex justify-center items-center'>
    //     Hello i am conic
    //     <button className='relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[3px] focus:outline-none'>
    //       <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-conic-180 from-purple-600 via-pink-400 to-orange-600 blur-3xl '></span>
    //       <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[var(--color-orange)] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2'>
    //         Contact me 2
    //         <Send className='w-4 h-4' />
    //       </span>
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomePage;
