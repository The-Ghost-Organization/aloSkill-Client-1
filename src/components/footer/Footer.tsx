import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Community", href: "/community" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { icon: Twitter, href: "#", color: "hover:text-sky-500" },
  { icon: Instagram, href: "#", color: "hover:text-pink-600" },
  { icon: Youtube, href: "#", color: "hover:text-red-600" },
];

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>আ</span>
              </div>
              <span className='text-2xl font-bold text-white'>
                আলো <span className='gradient-text'>স্কিল</span>
              </span>
            </div>
            <p className='text-gray-400 mb-4 leading-relaxed'>
              Empowering learners across Bangladesh with quality education and resources in Bangla.
            </p>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-sm'>
                <MapPin className='w-4 h-4 text-orange-500' />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Mail className='w-4 h-4 text-orange-500' />
                <span>support@aloskill.com</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Phone className='w-4 h-4 text-orange-500' />
                <span>+880 1234-567890</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='text-sm hover:text-orange-500 transition-colors'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-white font-semibold mb-4'>Resources</h3>
            <ul className='space-y-2'>
              {footerLinks.resources.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='text-sm hover:text-orange-500 transition-colors'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-white font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              {footerLinks.legal.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='text-sm hover:text-orange-500 transition-colors'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-400'>© 2025 আলো স্কিল. All rights reserved.</p>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className={`p-2 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110`}
                  aria-label={`Visit our ${Icon.name}`}
                >
                  <Icon className='w-5 h-5' />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
