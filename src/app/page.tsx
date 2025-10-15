import ClientButtonWrapper from "@/components/buttons/ClientButtonWrapper.tsx";
import GoogleButton from "@/components/buttons/GoogleButton";
import OrgButton from "@/components/buttons/OrgButton.tsx";
import AloskillLoader from "@/components/loaders/AloskillLoder.tsx";
import HandLoader from "@/components/loaders/HandLoader.tsx";
import { Send } from "lucide-react";
const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1>Home Page</h1>
      <div className='flex items-center justify-center h-screen w-full'>
        <AloskillLoader />
      </div>

      <div className='flex items-center justify-center h-screen w-full'>
        <HandLoader />
      </div>
      <ClientButtonWrapper />
      <GoogleButton />
      <div className='flex max-w-sm rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'>
        <button className='flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl'>
          Gradient Border Button
        </button>
      </div>
      <div className='relative h-screen w-full bg-white overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-[-100px] left-[100px] w-[600px] h-[600px] bg-pink-300 opacity-40 blur-[120px] rounded-full'></div>
          <div className='absolute top-[0px] left-[400px] w-[500px] h-[500px] bg-purple-300 opacity-40 blur-[140px] rounded-full'></div>
          <div className='absolute top-[100px] right-[100px] w-[600px] h-[600px] bg-blue-200 opacity-40 blur-[160px] rounded-full'></div>
          <div className='absolute bottom-[50px] right-[200px] w-[600px] h-[600px] bg-orange-200 opacity-40 blur-[120px] rounded-full'></div>
        </div>

        <div className='relative z-10 flex flex-col items-center justify-center h-full'>
          <h1 className='text-6xl font-bold text-gray-900'>Beautiful Hero Section</h1>
          <p className='mt-4 text-lg text-gray-600'>With soft gradient background</p>
        </div>
      </div>

      <div className='bg-gradient-bpy h-40 w-full rounded-lg'></div>
      <div className='bg-gradient-soft-hero h-screen blur-3xl w-full rounded-lg'></div>
      <p>i am in</p>

      <div className='relative h-screen w-full '>
        <div className='bg-gradient-creamy-panda blur-3xl'>
          <div className='panda-blue'></div>
          <div className='panda-orange'></div>
        </div>

        <div className='relative z-10 text-center text-2xl font-bold text-gray-800'>
          Your main content here
        </div>
      </div>

      <div className='bg-[var(--color-orange)] text-white p-4 rounded-lg'>Orange Background</div>

      <div className='bg-orange-700 p-4 rounded-lg'>Dark Orange 600</div>
      <div className='bg-[var(--color-orange-dark)] text-white p-4 rounded-lg'>
        Dark Orange Text
      </div>

      <div className='relative min-h-screen w-full bg-gradient-blob '>
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center'>
          <h1 className='text-5xl font-bold text-gray-900'>Hero Section</h1>
          <p className='mt-4 text-gray-600'>Subtle dreamy background</p>
          <OrgButton />

          <button className='relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[3px] focus:outline-none'>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]'></span>
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[var(--color-orange)] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2'>
              Contact me
              <Send className='w-4 h-4' />
            </span>
          </button>
        </div>
      </div>
      <div className='relative min-h-screen w-full bg-grad-conic-blob flex justify-center items-center'>
        Hello i am conic
        <button className='relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[3px] focus:outline-none'>
          <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-conic-180 from-purple-600 via-pink-400 to-orange-600 blur-3xl '></span>
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[var(--color-orange)] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2'>
            Contact me 2
            <Send className='w-4 h-4' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
