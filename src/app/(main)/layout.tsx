import Footer from "@/components/shared/footer/Footer.tsx";
import Header from "@/components/shared/header/Header.tsx";
import LeftSidebar from "@/components/shared/leftsidebar/LeftSidebar.tsx";

import RightSidebar from "@/components/shared/RightSide.tsx";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className='flex-1 pt-28'>
        <LeftSidebar />
        <main className='min-h-[calc(100vh-7rem)] lg:ml-44 xl:ml-52 xl:mr-60 px-4 sm:px-6 md:px-8 lg:px-6'>
          <div className='max-w-6xl mx-auto'>{children}</div>
        </main>
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
}
//  <div className='min-h-screen bg-white'>
//       {/* Fixed Header */}
//       <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm'>

//
//       </header>
//
//
//     </div>
