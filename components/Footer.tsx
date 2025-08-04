// Enhanced footer component with modern design

import { JSX } from "preact";

export default function Footer(): JSX.Element {
  return (
    <footer class="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 to-transparent"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/5 to-transparent rounded-full transform translate-x-32 translate-y-32"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Enhanced Brand Section */}
          <div class="md:col-span-1">
            <a href="/" class="flex items-center space-x-3 text-3xl font-bold mb-6 group">
              <span class="text-red-500 text-4xl transform group-hover:rotate-12 transition-transform duration-300">🎬</span>
              <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Fl<span class="text-red-500 drop-shadow-lg">i</span>x
              </span>
            </a>
            <p class="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Experience the magic of cinema with our premium booking platform. 
              Book your favorite movies with ease and comfort using cutting-edge technology.
            </p>
            
            {/* Enhanced Social Links */}
            <div class="flex space-x-4">
              <a href="#" class="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25">
                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25">
                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" class="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25">
                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5 0C5.597 0 0 5.597 0 12.5S5.597 25 12.5 25 25 19.403 25 12.5 19.403 0 12.5 0zm5.25 7.5l-5.625 5.625L6.5 7.5h5.625L17.75 7.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h3 class="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              🔗 Quick Links
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="/" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-red-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/movies" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-red-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Movies
                </a>
              </li>
              <li>
                <a href="/about" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-red-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-red-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Contact
                </a>
              </li>
              <li>
                <a href="/help" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-red-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Enhanced Browse Section */}
          <div>
            <h3 class="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              🎭 Browse Movies
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="/movies?genre=action" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Action & Adventure
                </a>
              </li>
              <li>
                <a href="/movies?genre=comedy" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Comedy
                </a>
              </li>
              <li>
                <a href="/movies?genre=drama" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Drama & Romance
                </a>
              </li>
              <li>
                <a href="/movies?genre=thriller" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Thriller & Horror
                </a>
              </li>
              <li>
                <a href="/movies?latest=true" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Latest Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Enhanced Support Section */}
          <div>
            <h3 class="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              🛟 Support
            </h3>
            <ul class="space-y-3 mb-6">
              <li>
                <a href="/faq" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-blue-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="/booking-guide" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-blue-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Booking Guide
                </a>
              </li>
              <li>
                <a href="/refund-policy" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-blue-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/terms" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-blue-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" class="group flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <span class="w-0 group-hover:w-4 h-0.5 bg-blue-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>

            {/* Contact Info */}
            <div class="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30">
              <h4 class="text-white font-semibold mb-2">📞 24/7 Support</h4>
              <p class="text-gray-300 text-sm mb-1">Call: +1 (555) 123-4567</p>
              <p class="text-gray-300 text-sm">Email: support@flix.com</p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div class="border-t border-gradient-to-r from-transparent via-gray-700 to-transparent mt-12 pt-8">
          <div class="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <div class="text-center lg:text-left">
              <p class="text-gray-300 text-sm leading-relaxed">
                © 2025 <strong class="text-white">Flix Movie Booking</strong>. All rights reserved.
              </p>
              <p class="text-gray-400 text-xs mt-1">
                <span class="inline-flex items-center space-x-2">
                  <span>Built with</span>
                  <span class="text-red-500">❤️</span>
                  <span>using</span>
                  <strong class="text-blue-400">Fresh Framework</strong>
                  <span>&</span>
                  <strong class="text-blue-500">TypeScript</strong>
                </span>
              </p>
            </div>

            {/* App Download Links */}
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <p class="text-gray-400 text-xs mb-2">Download Our App</p>
                <div class="flex space-x-3">
                  <img 
                    src="/static/app-store.png" 
                    alt="Download on App Store" 
                    class="h-12 hover:scale-105 transition-transform duration-300 cursor-pointer" 
                  />
                  <img 
                    src="/static/google-play.png" 
                    alt="Get it on Google Play" 
                    class="h-12 hover:scale-105 transition-transform duration-300 cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div class="flex items-center space-x-4">
              <div class="flex flex-col items-center">
                <span class="text-green-400 text-2xl mb-1">🔒</span>
                <span class="text-gray-400 text-xs">Secure</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-blue-400 text-2xl mb-1">⚡</span>
                <span class="text-gray-400 text-xs">Fast</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-yellow-400 text-2xl mb-1">⭐</span>
                <span class="text-gray-400 text-xs">Rated #1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Border Glow */}
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
    </footer>
  );
}