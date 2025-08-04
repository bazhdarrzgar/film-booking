// Enhanced navigation header component with modern styling

import { JSX } from "preact";

interface HeaderProps {
  currentUser?: {
    fullname: string;
    username: string;
  } | null;
  isAdmin?: boolean;
}

export default function Header({ currentUser, isAdmin = false }: HeaderProps): JSX.Element {
  return (
    <header class="fixed top-0 left-0 w-full z-50 backdrop-filter backdrop-blur-lg bg-black bg-opacity-80 border-b border-white border-opacity-10">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between h-18">
          {/* Logo with enhanced styling */}
          <a href="/" class="flex items-center space-x-2 text-2xl font-bold group">
            <span class="text-red-500 text-3xl transform group-hover:rotate-12 transition-transform duration-300">🎬</span>
            <span class="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Fl<span class="text-red-500 drop-shadow-lg">i</span>x
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <ul class="hidden md:flex items-center space-x-8">
            <li>
              <a href="/" class="relative px-4 py-2 text-white hover:text-red-400 transition-colors duration-300 group">
                Home
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a href="/movies" class="relative px-4 py-2 text-white hover:text-red-400 transition-colors duration-300 group">
                Movies
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            {currentUser && (
              <li>
                <a href="/bookings" class="relative px-4 py-2 text-white hover:text-red-400 transition-colors duration-300 group">
                  My Bookings
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            )}
            {isAdmin && (
              <li>
                <a href="/admin" class="relative px-4 py-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 group">
                  Admin Panel
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            )}
          </ul>

          {/* User Actions */}
          <div class="flex items-center space-x-4">
            {currentUser ? (
              <div class="flex items-center space-x-4">
                <div class="text-sm text-gray-300">
                  Welcome, <span class="text-white font-semibold">{currentUser.fullname}</span>
                </div>
                <a 
                  href="/api/logout" 
                  class="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                  Logout
                </a>
              </div>
            ) : (
              <div class="flex items-center space-x-4">
                <a 
                  href="/login" 
                  class="text-white hover:text-red-400 px-4 py-2 font-medium transition-colors duration-300"
                >
                  Login
                </a>
                <a 
                  href="/register" 
                  class="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                  Register
                </a>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <button 
            class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group"
            onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"
          >
            <span class="block w-6 h-0.5 bg-white group-hover:bg-red-400 transition-all duration-300 group-hover:rotate-45 group-hover:translate-y-2"></span>
            <span class="block w-6 h-0.5 bg-white group-hover:bg-red-400 transition-all duration-300 group-hover:opacity-0"></span>
            <span class="block w-6 h-0.5 bg-white group-hover:bg-red-400 transition-all duration-300 group-hover:-rotate-45 group-hover:-translate-y-2"></span>
          </button>
        </nav>

        {/* Enhanced Mobile menu */}
        <div id="mobile-menu" class="hidden md:hidden py-6 border-t border-white border-opacity-10">
          <div class="flex flex-col space-y-4">
            <a href="/" class="text-white hover:text-red-400 py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 transition-all duration-300">
              Home
            </a>
            <a href="/movies" class="text-white hover:text-red-400 py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 transition-all duration-300">
              Movies
            </a>
            {currentUser && (
              <a href="/bookings" class="text-white hover:text-red-400 py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 transition-all duration-300">
                My Bookings
              </a>
            )}
            {isAdmin && (
              <a href="/admin" class="text-yellow-400 hover:text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-400 hover:bg-opacity-10 transition-all duration-300">
                Admin Panel
              </a>
            )}
            {!currentUser && (
              <>
                <a href="/login" class="text-white hover:text-red-400 py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 transition-all duration-300">
                  Login
                </a>
                <a href="/register" class="text-white hover:text-red-400 py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 transition-all duration-300">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}