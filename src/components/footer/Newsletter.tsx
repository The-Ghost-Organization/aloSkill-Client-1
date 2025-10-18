"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage("Thank you for subscribing!");
    setEmail("");
    setIsSubmitting(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className='py-16 bg-gradient-to-br from-orange-50 to-purple-50'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <div className='bg-white rounded-3xl p-8 md:p-12 shadow-xl'>
          <div className='flex justify-center mb-4'>
            <div className='p-4 bg-orange-100 rounded-2xl'>
              <Mail className='w-8 h-8 text-orange-600' />
            </div>
          </div>

          <h2 className='text-3xl md:text-4xl font-black text-gray-900 mb-4'>
            Stay Updated with <span className='gradient-text'>আলো স্কিল</span>
          </h2>

          <p className='text-gray-600 text-lg mb-8 max-w-2xl mx-auto'>
            Get the latest courses, tips, and exclusive offers delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
          >
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              className='flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all'
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50'
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
              <Send className='w-4 h-4' />
            </button>
          </form>

          {message && <p className='mt-4 text-green-600 font-medium animate-fade-in'>{message}</p>}
        </div>
      </div>
    </section>
  );
}
