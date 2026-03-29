"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000); // Auto-hide after 4s
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-0">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 flex items-center justify-center bg-blue-900">
        <Image
          src="/brand/10.jpg"
          alt="Contact Banner"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Contact Us</h1>
          <p className="text-lg text-blue-100 mt-2">We’re here to help you with your security needs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 flex flex-col md:flex-row gap-10">
          {/* Left: Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Send us a message</h2>
            {submitted ? (
              <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-4 text-center mb-6 transition">
                Thank you! Your message has been sent. We’ll get back to you soon.
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} autoComplete="on">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    placeholder="Your Name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    rows={5}
                    required
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-lg shadow"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Info & Image */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Image
              src="/brand/hikvision.png"
              alt="Contact Illustration"
              width={220}
              height={120}
              className="mb-6 rounded-lg shadow"
              style={{ background: "#f3f4f6" }}
            />
            <div className="text-gray-700 text-center space-y-2">
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:info@spottive.com" className="text-blue-600 hover:underline">
                  info@spottive.com
                </a>
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:+971123456789" className="text-blue-600 hover:underline">
                  +971 123 456 789
                </a>
              </div>
              <div>
                <span className="font-semibold">Location:</span> Dubai, UAE & Riyadh, Saudi Arabia
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg className="w-6 h-6 text-blue-600 hover:text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className="w-6 h-6 text-blue-400 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg className="w-6 h-6 text-red-600 hover:text-red-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254-.985-.997-1.76-1.938-2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c-.254-.985-.997-1.76-1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945-.266 1.687-1.04 1.938-2.022zM10 15.5l6-3.5-6-3.5v7z" />
                  </svg>
                </a>
              </div>
            </div>
            <Image
              src="/brand/Uniview.png"
              alt="Brand"
              width={120}
              height={60}
              className="mt-8 rounded shadow"
              style={{ background: "#f3f4f6" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}