"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  usefulLinks: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & condition", href: "/terms" },
    { label: "Student spotlight", href: "/spotlight" },
  ],
  learning: [
    { label: "Business Strategy", href: "/learning/business" },
    { label: "Become A Teacher", href: "/learning/teacher" },
    { label: "Project Management", href: "/learning/project" },
    { label: "Membership", href: "/membership" },
  ],
  resources: [
    { label: "Online Guides", href: "/guides" },
    { label: "Conference Notes", href: "/conference" },
    { label: "Forum", href: "/forum" },
    { label: "Downloads", href: "/downloads" },
  ],
  helpfulLinks: [
    { label: "FAQs", href: "/faqs" },
    { label: "Support", href: "/support" },
    { label: "Live Chat", href: "/chat", isLive: true },
  ],
};

const paymentMethods = [
  "Visa",
  "Mastercard",
  "American Express",
  "PayPal",
  "Stripe",
  "Apple Pay",
  "Google Pay",
  "bKash",
];

export default function FooterComplete() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8'>
        {/* Top Section: Logo and Description */}
        <div className='lg:flex lg:items-center lg:justify-between'>
          <div className='flex justify-center sm:justify-start'>
            <div className='flex items-center gap-2'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#DA7C36] to-[#B85C1A] rounded-lg flex items-center justify-center shadow-lg'>
                <span className='text-white font-bold text-2xl'>আ</span>
              </div>
              <span className='text-2xl font-bold text-gray-900'>
                আলো <span className='text-[#DA7C36]'>স্কিল</span>
              </span>
            </div>
          </div>

          <p className='mt-4 max-w-md text-center leading-relaxed text-gray-500 sm:text-left lg:mt-0'>
            We support programs that create achievement for people. Master in-demand skills and
            discover great books — all in one platform, in Bangla.
          </p>
        </div>

        {/* Main Footer Links Grid */}
        <div className='mt-16 grid grid-cols-1 gap-8 border-t border-gray-100 pt-16 sm:grid-cols-2 lg:grid-cols-6'>
          {/* Useful Links */}
          <div className='text-center sm:text-left'>
            <p className='text-lg font-bold text-gray-900'>Useful links</p>
            <ul className='mt-8 space-y-4 text-sm'>
              {footerLinks.usefulLinks.map(link => (
                <li key={link.href}>
                  <a
                    className='text-gray-700 transition hover:text-[#DA7C36]'
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div className='text-center sm:text-left'>
            <p className='text-lg font-bold text-gray-900'>Learning</p>
            <ul className='mt-8 space-y-4 text-sm'>
              {footerLinks.learning.map(link => (
                <li key={link.href}>
                  <a
                    className='text-gray-700 transition hover:text-[#DA7C36]'
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className='text-center sm:text-left'>
            <p className='text-lg font-bold text-gray-900'>Resources</p>
            <ul className='mt-8 space-y-4 text-sm'>
              {footerLinks.resources.map(link => (
                <li key={link.href}>
                  <a
                    className='text-gray-700 transition hover:text-[#DA7C36]'
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links */}
          <div className='text-center sm:text-left'>
            <p className='text-lg font-bold text-gray-900'>Helpful Links</p>
            <ul className='mt-8 space-y-4 text-sm'>
              {footerLinks.helpfulLinks.map(link => (
                <li key={link.href}>
                  {link.isLive ? (
                    <a
                      className='group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'
                      href={link.href}
                    >
                      <span className='text-gray-700 transition group-hover:text-[#DA7C36]'>
                        {link.label}
                      </span>
                      <span className='relative flex size-2'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DA7C36] opacity-75'></span>
                        <span className='relative inline-flex size-2 rounded-full bg-[#DA7C36]'></span>
                      </span>
                    </a>
                  ) : (
                    <a
                      className='text-gray-700 transition hover:text-[#DA7C36]'
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className='text-center sm:text-left lg:col-span-2'>
            <p className='text-lg font-bold text-gray-900'>Contact Us</p>
            <ul className='mt-8 space-y-4 text-sm'>
              <li>
                <a
                  href='tel:+8801658654528'
                  className='flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                >
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DA7C36]/10 transition-colors'>
                    <Phone className='w-5 h-5' />
                  </div>
                  <span>+88-658 654 528</span>
                </a>
              </li>
              <li>
                <a
                  href='mailto:info@aloskill.com'
                  className='flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                >
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DA7C36]/10 transition-colors'>
                    <Mail className='w-5 h-5' />
                  </div>
                  <span>info@aloskill.com</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-start justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#DA7C36] transition-colors group'
                >
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DA7C36]/10 transition-colors flex-shrink-0'>
                    <MapPin className='w-5 h-5' />
                  </div>
                  <span className='text-left'>
                    PO Box 16122 Collins Street
                    <br />
                    West Victoria 8007 Australia
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='mt-12 border-t border-gray-100 pt-12'>
          <div className='mx-auto max-w-md lg:max-w-none'>
            <div className='lg:flex lg:items-start lg:gap-8'>
              <div className='lg:flex-1'>
                <p className='text-lg font-bold text-gray-900 text-center lg:text-left'>
                  Stay in Touch
                </p>
                <p className='mt-4 text-center leading-relaxed text-gray-500 lg:text-left'>
                  Subscribe to get latest courses, books, and exclusive offers delivered straight to
                  your inbox.
                </p>
              </div>

              <form className='mt-6 lg:mt-0 lg:flex-1'>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <label
                    htmlFor='email'
                    className='sr-only'
                  >
                    Email
                  </label>
                  <input
                    className='w-full rounded-full border-gray-200 px-6 py-3 shadow-sm focus:border-[#DA7C36] focus:ring-[#DA7C36]'
                    type='email'
                    id='email'
                    placeholder='Enter your email'
                  />
                  <button
                    className='block rounded-full bg-[#DA7C36] px-8 py-3 font-semibold text-white transition hover:bg-[#B85C1A] shadow-lg hover:shadow-xl whitespace-nowrap'
                    type='submit'
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='mt-12 border-t border-gray-100 pt-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-4 flex-wrap justify-center'>
              <span className='text-gray-700 font-semibold text-sm'>Pay With</span>
              <div className='flex flex-wrap items-center gap-3'>
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className='w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1 hover:shadow-md hover:border-[#DA7C36]/30 transition-all'
                  >
                    <div className='w-full h-full bg-gray-100 rounded flex items-center justify-center'>
                      <span className='text-[8px] text-gray-400 font-semibold'>
                        {method.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex-shrink-0'>
              <div className='bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md'>
                Verified by
                <br />
                <span className='text-base'>SSLCommerz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and Social */}
        <div className='mt-12 border-t border-gray-100 pt-6 sm:flex sm:items-center sm:justify-between'>
          <p className='text-center text-sm text-gray-500 sm:text-left'>
            © Copyright {currentYear} Aloskill. All rights reserved.
          </p>

          <ul className='mt-4 flex justify-center gap-6 sm:mt-0 sm:justify-start'>
            <li>
              <a
                href='#'
                rel='noreferrer'
                target='_blank'
                className='text-[#DA7C36] transition hover:text-[#B85C1A]'
                aria-label='Facebook'
              >
                <Facebook className='size-6' />
              </a>
            </li>
            <li>
              <a
                href='#'
                rel='noreferrer'
                target='_blank'
                className='text-[#DA7C36] transition hover:text-[#B85C1A]'
                aria-label='Instagram'
              >
                <Instagram className='size-6' />
              </a>
            </li>
            <li>
              <a
                href='#'
                rel='noreferrer'
                target='_blank'
                className='text-[#DA7C36] transition hover:text-[#B85C1A]'
                aria-label='Twitter'
              >
                <Twitter className='size-6' />
              </a>
            </li>
            <li>
              <a
                href='#'
                rel='noreferrer'
                target='_blank'
                className='text-[#DA7C36] transition hover:text-[#B85C1A]'
                aria-label='YouTube'
              >
                <Youtube className='size-6' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
