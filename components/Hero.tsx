// Ultra-Modern Cinematic Hero Section with Advanced Visual Effects

import { JSX } from "preact";
import type { Movie } from "../types/database.ts";

interface HeroProps {
  featuredMovies: Movie[];
}

export default function Hero({ featuredMovies }: HeroProps): JSX.Element {
  if (featuredMovies.length === 0) {
    return <div></div>;
  }

  const currentMovie = featuredMovies[0]; // Show first movie as hero

  return (
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Multiple Layers */}
      <div class="absolute inset-0 z-0">
        {/* Main Background Image */}
        <div class="absolute inset-0">
          <img 
            src={currentMovie.banner_url || currentMovie.poster_url || '/static/images/black-banner.png'}
            alt={currentMovie.movie_name}
            class="w-full h-full object-cover scale-110 animate-pulse-slow"
          />
        </div>
        
        {/* Multiple Gradient Overlays for Depth */}
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-blue-900/20 z-10"></div>
        
        {/* Animated Geometric Pattern Overlay */}
        <div class="absolute inset-0 opacity-10 z-10" style="background-image: radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);"></div>
      </div>

      {/* Floating Particles Animation */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-40 animate-ping" style="animation-delay: 0s;"></div>
        <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-50 animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-30 animate-bounce" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-500 rounded-full opacity-35 animate-ping" style="animation-delay: 3s;"></div>
        <div class="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-500 rounded-full opacity-25 animate-pulse" style="animation-delay: 4s;"></div>
      </div>

      {/* Main Hero Content */}
      <div class="relative z-30 container mx-auto px-4 pt-20">
        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Main Movie Info - Ultra Enhanced */}
            <div class="lg:col-span-3 text-center lg:text-left">
              
              {/* Status Badge with Glow Effect */}
              <div class="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg shadow-red-500/50 border border-red-400/30 backdrop-blur-sm animate-glow">
                <span class="mr-3 text-xl animate-bounce">🔥</span>
                <span class="text-white font-bold text-lg tracking-wide">NOW PLAYING</span>
                <span class="ml-3 text-red-200">•</span>
                <span class="ml-3 text-red-200 font-medium">{currentMovie.movie_genre}</span>
              </div>

              {/* Movie Title with Enhanced Typography */}
              <h1 class="text-6xl lg:text-8xl font-black text-white mb-8 leading-tight slide-in-left">
                <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  {currentMovie.movie_name}
                </span>
              </h1>
              
              {/* Ultra-Enhanced Movie Stats Grid */}
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 slide-in-right">
                {/* Rating */}
                <div class="bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:bg-black/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
                  <div class="text-3xl mb-2">⭐</div>
                  <div class="text-2xl font-bold text-white">{currentMovie.ratings}</div>
                  <div class="text-gray-300 text-sm">Rating</div>
                </div>
                
                {/* Duration */}
                <div class="bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:bg-black/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                  <div class="text-3xl mb-2">🕒</div>
                  <div class="text-2xl font-bold text-white">{Math.floor(currentMovie.duration / 60)}h {currentMovie.duration % 60}m</div>
                  <div class="text-gray-300 text-sm">Duration</div>
                </div>
                
                {/* Quality */}
                <div class="bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:bg-black/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
                  <div class="text-3xl mb-2">📺</div>
                  <div class="text-xl font-bold text-white">4K HDR</div>
                  <div class="text-gray-300 text-sm">Quality</div>
                </div>
                
                {/* Age Rating */}
                <div class="bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:bg-black/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  <div class="text-3xl mb-2">🎭</div>
                  <div class="text-2xl font-bold text-white">{currentMovie.age_rating}+</div>
                  <div class="text-gray-300 text-sm">Age</div>
                </div>
              </div>
              
              {/* Enhanced Movie Description */}
              <p class="text-gray-200 text-xl lg:text-2xl mb-12 max-w-3xl leading-relaxed fade-in-up">
                {currentMovie.movie_description}
              </p>
              
              {/* Ultra-Enhanced Action Buttons */}
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 fade-in-up">
                <a 
                  href={`/book/${currentMovie.movie_id}`}
                  class="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white text-xl font-bold rounded-2xl hover:from-red-700 hover:via-red-800 hover:to-red-900 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-red-500/60 border border-red-400/30"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
                  <span class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></span>
                  <span class="relative flex items-center space-x-4">
                    <span class="text-3xl group-hover:rotate-12 transition-transform duration-300">🎬</span>
                    <span>BOOK NOW</span>
                    <span class="text-2xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </a>
                
                <button class="group relative inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white text-xl font-bold rounded-2xl hover:bg-white/20 hover:border-white/50 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-white/20">
                  <span class="flex items-center space-x-4">
                    <div class="relative">
                      <span class="text-3xl group-hover:scale-110 transition-transform duration-300">▶️</span>
                      <div class="absolute inset-0 bg-white/20 rounded-full blur group-hover:bg-white/40 transition-all duration-300"></div>
                    </div>
                    <span>WATCH TRAILER</span>
                  </span>
                </button>
              </div>

              {/* Enhanced Movie Details */}
              <div class="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-lg">
                <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <span class="text-green-400 text-xl">🌐</span>
                  <span class="text-white font-medium">{currentMovie.movie_lang}</span>
                </div>
                <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <span class="text-purple-400 text-xl">🎭</span>
                  <span class="text-white font-medium">{currentMovie.movie_genre}</span>
                </div>
                <div class="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 rounded-full shadow-lg">
                  <span class="text-yellow-100 text-xl">💰</span>
                  <span class="text-white font-bold">From ₹{currentMovie.net_amount}</span>
                </div>
              </div>
            </div>

            {/* Ultra-Enhanced Featured Movies Sidebar */}
            <div class="lg:col-span-2 slide-in-right">
              <div class="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div class="text-center mb-8">
                  <h3 class="text-3xl font-black text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    Featured Movies
                  </h3>
                  <div class="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto"></div>
                </div>
                
                <div class="space-y-6">
                  {featuredMovies.slice(0, 3).map((movie, index) => (
                    <div 
                      key={movie.movie_id}
                      class={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 ${
                        index === 0 
                          ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg shadow-red-500/50 border border-red-400/50' 
                          : 'bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10'
                      }`}
                    >
                      {/* Background Pattern */}
                      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);"></div>
                      
                      <div class="relative flex items-center space-x-4 p-6">
                        {/* Movie Poster with Effects */}
                        <div class="relative flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={movie.poster_url || '/static/placeholder-movie.jpg'}
                            alt={movie.movie_name}
                            class="w-20 h-28 object-cover rounded-xl shadow-2xl border-2 border-white/20"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                          {index === 0 && (
                            <div class="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-bounce">
                              <span class="text-black text-sm font-black">1</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Movie Info */}
                        <div class="flex-1 min-w-0">
                          <h4 class="text-white font-bold text-xl mb-2 truncate group-hover:text-gray-100 transition-colors duration-300">
                            {movie.movie_name}
                          </h4>
                          <p class="text-gray-300 text-sm mb-3 group-hover:text-gray-200 transition-colors duration-300">
                            {movie.movie_genre}
                          </p>
                          <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                              <span class="text-yellow-400 text-lg">⭐</span>
                              <span class="text-white font-bold">{movie.ratings}</span>
                            </div>
                            <div class="bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 rounded-full">
                              <span class="text-white font-bold text-sm">₹{movie.net_amount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Play Button */}
                      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <span class="text-white text-xl ml-1">▶</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Enhanced View All Movies Button */}
                <div class="mt-8 text-center">
                  <a 
                    href="/movies" 
                    class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-bold rounded-2xl hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-2xl border border-gray-600/50"
                  >
                    <span class="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                    <span class="relative flex items-center space-x-3">
                      <span>View All Movies</span>
                      <span class="text-2xl group-hover:rotate-12 transition-transform duration-300">🎬</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-30">
        <div class="flex flex-col items-center space-y-3">
          <div class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm bg-white/10 shadow-lg">
            <div class="w-1.5 h-4 bg-gradient-to-b from-white to-gray-300 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span class="text-sm text-gray-300 font-medium tracking-wide">Scroll to Explore</span>
        </div>
      </div>

      {/* Advanced Ambient Effects */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Animated Gradient Orbs */}
        <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 0s;"></div>
        <div class="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 4s;"></div>
      </div>
    </section>
  );
}