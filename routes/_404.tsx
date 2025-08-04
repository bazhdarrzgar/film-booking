// 404 error page

import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Flix</title>
      </Head>
      
      <div class="min-h-screen bg-gray-900">
        <Header />
        
        <div class="pt-16 min-h-screen flex items-center justify-center">
          <div class="text-center px-4">
            <div class="mb-8">
              <span class="text-9xl font-bold text-red-600">404</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            
            <p class="text-xl text-gray-400 mb-8 max-w-2xl">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a 
                href="/"
                class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Go Home
              </a>
              
              <a 
                href="/movies"
                class="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Browse Movies
              </a>
            </div>
            
            {/* Popular sections */}
            <div class="mt-16">
              <h2 class="text-2xl font-semibold text-white mb-6">Popular Sections</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a 
                  href="/"
                  class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-center transition-colors"
                >
                  <div class="text-3xl mb-2">🏠</div>
                  <h3 class="font-semibold text-white">Home</h3>
                  <p class="text-gray-400 text-sm">Featured movies and latest releases</p>
                </a>
                
                <a 
                  href="/movies"
                  class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-center transition-colors"
                >
                  <div class="text-3xl mb-2">🎬</div>
                  <h3 class="font-semibold text-white">Movies</h3>
                  <p class="text-gray-400 text-sm">Browse all available movies</p>
                </a>
                
                <a 
                  href="/login"
                  class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-center transition-colors"
                >
                  <div class="text-3xl mb-2">👤</div>
                  <h3 class="font-semibold text-white">Account</h3>
                  <p class="text-gray-400 text-sm">Login or create account</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}