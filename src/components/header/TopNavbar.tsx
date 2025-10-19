"use client";

import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

export default function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-[var(--color-orange)] rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>আ</span>
            </div>
            <span className='text-xl font-bold text-gray-900 hidden sm:block'>
              আলো <span style={{ color: "var(--color-orange)" }}>স্কিল</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className='hidden md:flex flex-1 max-w-2xl mx-8'
          >
            <div className='relative w-full'>
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search for anything...'
                className='w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all'
              />
              <button
                type='submit'
                className='absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-orange)] text-white hover:bg-[#B85C1A] transition-colors'
                aria-label='Search'
              >
                <Search className='w-5 h-5' />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className='flex items-center gap-4'>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>

            {/* Cart */}
            <button className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
              <ShoppingCart className='w-6 h-6 text-gray-700 group-hover:text-[var(--color-orange)]' />
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-orange)] text-white text-xs font-bold rounded-full flex items-center justify-center'>
                2
              </span>
            </button>

            {/* Wishlist */}
            <button className='hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
              <Heart className='w-6 h-6 text-gray-700 group-hover:text-[var(--color-orange)]' />
            </button>

            {/* User Account */}
            <button className='hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors group'>
              <User className='w-6 h-6 text-gray-700 group-hover:text-[var(--color-orange)]' />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form
          onSubmit={handleSearch}
          className='md:hidden pb-4'
        >
          <div className='relative'>
            <input
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search for anything...'
              className='w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent'
            />
            <button
              type='submit'
              className='absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-orange)] text-white'
              aria-label='Search'
            >
              <Search className='w-5 h-5' />
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-200 animate-fade-in'>
            <div className='flex flex-col gap-4'>
              <button className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                <Heart className='w-5 h-5 text-gray-700' />
                <span className='text-gray-700'>Wishlist</span>
              </button>
              <button className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                <User className='w-5 h-5 text-gray-700' />
                <span className='text-gray-700'>My Account</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
