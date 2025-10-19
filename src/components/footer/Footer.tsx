"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

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
};

const paymentMethods = [
  {
    name: "Visa",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg",
  },
  { name: "Mastercard", image: "https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" },
  {
    name: "American Express",
    image: "https://cdn.worldvectorlogo.com/logos/american-express-1.svg",
  },
  { name: "PayPal", image: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg" },
  { name: "Stripe", image: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
  { name: "Apple Pay", image: "https://cdn.worldvectorlogo.com/logos/apple-pay-logo.svg" },
  { name: "Google Pay", image: "https://cdn.worldvectorlogo.com/logos/google-pay-2.svg" },
  { name: "Alipay", image: "https://cdn.worldvectorlogo.com/logos/alipay.svg" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-br from-gray-50 to-purple-50 pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-2xl'>আ</span>
              </div>
              <span className='text-2xl font-bold text-gray-900'>
                <span className='text-gray-900'>আলো</span>{" "}
                <span className='gradient-text'>স্কিল</span>
              </span>
            </div>
            <p className='text-gray-600 text-sm leading-relaxed'>
              We support programs that create achievement for people
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className='text-gray-900 font-bold text-lg mb-4'>Useful links</h3>
            <ul className='space-y-3'>
              {footerLinks.usefulLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='text-gray-600 hover:text-orange-600 transition-colors text-sm'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className='text-gray-900 font-bold text-lg mb-4'>Learning</h3>
            <ul className='space-y-3'>
              {footerLinks.learning.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='text-gray-600 hover:text-orange-600 transition-colors text-sm'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className='text-gray-900 font-bold text-lg mb-4'>Contact Us</h3>
            <ul className='space-y-3'>
              <li>
                <a
                  href='tel:+8801658654528'
                  className='flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm group'
                >
                  <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors'>
                    <Phone className='w-4 h-4' />
                  </div>
                  <span>+88-658 654 528</span>
                </a>
              </li>
              <li>
                <a
                  href='mailto:info@example.com'
                  className='flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm group'
                >
                  <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors'>
                    <Mail className='w-4 h-4' />
                  </div>
                  <span>info@example.com</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-start gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm group'
                >
                  <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors flex-shrink-0'>
                    <MapPin className='w-4 h-4' />
                  </div>
                  <span className='flex-1'>
                    PO Box 16122 Collins Street
                    <br />
                    West Victoria 8007 Australia
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='border-t border-gray-200 pt-8 mb-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-4'>
              <span className='text-gray-700 font-semibold text-sm whitespace-nowrap'>
                Pay With
              </span>
              <div className='flex flex-wrap items-center gap-3'>
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className='w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1 hover:shadow-md transition-shadow'
                  >
                    <Image
                      width={32}
                      height={32}
                      src={method.image}
                      alt={method.name}
                      className='w-full h-full object-contain'
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex-shrink-0'>
              <a
                href='https://www.sslcommerz.com'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block'
              >
                <div className='bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors'>
                  Verified by
                  <br />
                  <span className='text-lg'>SSLCommerz</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-200 pt-6'>
          <p className='text-center text-gray-600 text-sm'>
            © Copyright {currentYear} Aloskill. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
