// Main homepage route

import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import MovieCard from "../components/MovieCard.tsx";
import Footer from "../components/Footer.tsx";
import { db } from "../utils/database.ts";
import { getCurrentUser } from "../utils/session.ts";
import type { Movie, User } from "../types/database.ts";

interface HomePageData {
  movies: Movie[];
  currentUser: User | null;
}

export const handler: Handlers<HomePageData> = {
  async GET(req, ctx) {
    const userId = await getCurrentUser(req);
    const currentUser = userId ? await db.getUserByUsername(userId) : null;
    const movies = await db.getMovies();
    
    return ctx.render({ movies, currentUser });
  },
};

export default function Home({ data }: PageProps<HomePageData>) {
  const { movies, currentUser } = data;
  const featuredMovies = movies.slice(0, 3);
  const latestMovies = movies.slice(0, 6);

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header currentUser={currentUser} />
      
      {/* Hero Section */}
      <Hero featuredMovies={featuredMovies} />
      
      {/* Latest Movies Section - Ultra Enhanced */}
      <section class="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%);"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          {/* Section Header with Modern Design */}
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-6 shadow-lg shadow-red-500/30 border border-red-400/30">
              <span class="text-white font-bold text-lg tracking-wide">🎬 LATEST RELEASES</span>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Trending Movies
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the hottest blockbusters and critically acclaimed films playing now in premium quality
            </p>
            <div class="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto mt-6"></div>
          </div>
          
          {/* Enhanced Movie Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {latestMovies.map((movie, index) => (
              <div 
                key={movie.movie_id}
                class="fade-in-up"
                style={`animation-delay: ${index * 0.1}s`}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          
          {/* Enhanced View All Button */}
          <div class="text-center">
            <a 
              href="/movies"
              class="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white text-xl font-bold rounded-2xl hover:from-red-700 hover:via-red-800 hover:to-red-900 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-red-500/50 border border-red-400/30"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
              <span class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></span>
              <span class="relative flex items-center space-x-4">
                <span>Explore All Movies</span>
                <span class="text-2xl group-hover:rotate-12 transition-transform duration-300">🎬</span>
                <span class="text-2xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Ultra Enhanced */}
      <section class="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 0s;"></div>
          <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div class="text-center mb-16">
            <h2 class="text-5xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Why Choose Flix?
            </h2>
            <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience cinema like never before with our premium features, cutting-edge technology, and unmatched convenience
            </p>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full mx-auto mt-6"></div>
          </div>
          
          {/* Enhanced Features Grid */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 - Easy Booking */}
            <div class="group relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-red-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-red-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 group-hover:scale-110 transition-all duration-500">
                  <span class="text-3xl group-hover:scale-110 transition-transform duration-300">🎟️</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">Easy Booking</h3>
                <p class="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Book your tickets in just a few clicks with our intuitive interface and lightning-fast checkout process.
                </p>
              </div>
            </div>
            
            {/* Feature 2 - Snacks & Combos */}
            <div class="group relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-yellow-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-600/5 via-transparent to-yellow-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-20 h-20 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/50 group-hover:scale-110 transition-all duration-500">
                  <span class="text-3xl group-hover:scale-110 transition-transform duration-300">🍿</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">Snacks & Combos</h3>
                <p class="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Pre-order your favorite snacks and drinks. Skip the queues and enjoy fresh treats delivered to your seat.
                </p>
              </div>
            </div>
            
            {/* Feature 3 - Secure Payment */}
            <div class="group relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-green-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 group-hover:scale-110 transition-all duration-500">
                  <span class="text-3xl group-hover:scale-110 transition-transform duration-300">💳</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">Secure Payment</h3>
                <p class="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Bank-grade security with multiple payment options. Your transactions are protected with end-to-end encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section class="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div class="container mx-auto px-4 relative z-10">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="text-5xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div class="text-gray-300 font-semibold text-lg">Happy Customers</div>
            </div>
            <div class="text-center group">
              <div class="text-5xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div class="text-gray-300 font-semibold text-lg">Movies Available</div>
            </div>
            <div class="text-center group">
              <div class="text-5xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div class="text-gray-300 font-semibold text-lg">Cities Covered</div>
            </div>
            <div class="text-center group">
              <div class="text-5xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div class="text-gray-300 font-semibold text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}