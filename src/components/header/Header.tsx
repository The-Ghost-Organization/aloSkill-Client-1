"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
      <div className='flex items-center justify-between px-4 md:px-6 py-3 max-w-[1920px] mx-auto'>
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
          aria-label='Toggle menu'
        >
          <Menu className='w-6 h-6 text-gray-700' />
        </button>

        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>আ</span>
          </div>
          <span className='text-xl font-bold text-gray-900 hidden sm:block'>
            আলো <span className='gradient-text'>স্কিল</span>
          </span>
        </div>

        {/* Category Button */}
        <button className='hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
          <span className='text-sm font-medium'>Category</span>
        </button>

        {/* Search Bar */}
        <div className='flex-1 max-w-xl mx-4 hidden md:block'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Search courses, books, or topics...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all'
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-3'>
          {/* Notification Icon */}
          <button className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <Bell className='w-5 h-5 text-gray-700' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full'></span>
          </button>

          {/* Login Button */}
          <button className='px-4 md:px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm'>
            Login account
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className='md:hidden px-4 pb-3'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
        </div>
      </div>
    </header>
  );
}
