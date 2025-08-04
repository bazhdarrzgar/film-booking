// Enhanced hero section with modern cinematic design

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
      {/* Enhanced Background with Parallax Effect */}
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 z-10"></div>
        <img 
          src={currentMovie.banner_url || currentMovie.poster_url || '/static/images/black-banner.png'}
          alt={currentMovie.movie_name}
          class="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        {/* Animated Overlay */}
        <div class="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/10 animate-glow"></div>
      </div>

      {/* Enhanced Hero Content */}
      <div class="relative z-10 container mx-auto px-4 pt-20">
        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-3 gap-12 items-center">
            
            {/* Main Movie Info - Enhanced */}
            <div class="lg:col-span-2 text-center lg:text-left hero-content">
              {/* Movie Category Badge */}
              <div class="inline-flex items-center px-4 py-2 bg-red-600 bg-opacity-20 backdrop-blur-sm border border-red-500 border-opacity-30 rounded-full text-red-400 text-sm font-semibold mb-6 animate-glow">
                <span class="mr-2">🔥</span>
                Now Playing • {currentMovie.movie_genre}
              </div>

              <h1 class="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight slide-in-left">
                <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  {currentMovie.movie_name}
                </span>
              </h1>
              
              {/* Enhanced Movie Stats */}
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white text-lg mb-8 slide-in-right">
                <div class="flex items-center space-x-2 bg-black bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full border border-white border-opacity-20">
                  <span class="text-yellow-400 text-xl">⭐</span>
                  <span class="font-bold">{currentMovie.ratings}</span>
                  <span class="text-gray-300 text-sm">/10</span>
                </div>
                <div class="flex items-center space-x-2 bg-black bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full border border-white border-opacity-20">
                  <span class="text-blue-400 text-xl">🕒</span>
                  <span class="font-semibold">{Math.floor(currentMovie.duration / 60)}h {currentMovie.duration % 60}m</span>
                </div>
                <div class="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 rounded-full shadow-lg">
                  <span class="font-bold">4K HDR</span>
                </div>
                <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 rounded-full shadow-lg">
                  <span class="font-bold">{currentMovie.age_rating}+</span>
                </div>
              </div>
              
              {/* Enhanced Description */}
              <p class="text-gray-200 text-xl lg:text-2xl mb-10 max-w-3xl leading-relaxed fade-in-up">
                {currentMovie.movie_description}
              </p>
              
              {/* Enhanced Action Buttons */}
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 fade-in-up">
                <a 
                  href={`/book/${currentMovie.movie_id}`}
                  class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold rounded-full hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/50"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                  <span class="relative flex items-center space-x-3">
                    <span class="text-2xl">🎬</span>
                    <span>Book Now</span>
                    <span class="text-xl transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
                
                <button class="group relative inline-flex items-center px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white border-opacity-30 text-white text-lg font-semibold rounded-full hover:bg-opacity-20 hover:border-opacity-50 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <span class="flex items-center space-x-3">
                    <span class="text-2xl">▶️</span>
                    <span>Watch Trailer</span>
                  </span>
                </button>
              </div>

              {/* Additional Movie Info */}
              <div class="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
                <span class="flex items-center space-x-1">
                  <span class="text-green-400">🌐</span>
                  <span>{currentMovie.movie_lang}</span>
                </span>
                <span>•</span>
                <span class="flex items-center space-x-1">
                  <span class="text-purple-400">🎭</span>
                  <span>{currentMovie.movie_genre}</span>
                </span>
                <span>•</span>
                <span class="flex items-center space-x-1">
                  <span class="text-yellow-400">💰</span>
                  <span>From ₹{currentMovie.net_amount}</span>
                </span>
              </div>
            </div>

            {/* Enhanced Featured Movies Sidebar */}
            <div class="lg:col-span-1 slide-in-right">
              <div class="bg-black bg-opacity-40 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-10 shadow-2xl">
                <h3 class="text-white text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  🎬 Featured Movies
                </h3>
                <div class="space-y-4">
                  {featuredMovies.slice(0, 3).map((movie, index) => (
                    <div 
                      key={movie.movie_id}
                      class={`group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                        index === 0 
                          ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-500 shadow-lg' 
                          : 'bg-black bg-opacity-30 border-white border-opacity-10 hover:bg-opacity-50 hover:border-opacity-20 hover:shadow-lg'
                      }`}
                    >
                      <div class="relative flex-shrink-0">
                        <img 
                          src={movie.poster_url || '/static/placeholder-movie.jpg'}
                          alt={movie.movie_name}
                          class="w-16 h-24 object-cover rounded-xl shadow-lg"
                        />
                        {index === 0 && (
                          <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span class="text-black text-xs font-bold">1</span>
                          </div>
                        )}
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="text-white font-bold text-lg mb-1 truncate">{movie.movie_name}</h4>
                        <p class="text-gray-300 text-sm mb-2">{movie.movie_genre}</p>
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-2">
                            <span class="text-yellow-400 text-sm">⭐</span>
                            <span class="text-white text-sm font-semibold">{movie.ratings}</span>
                          </div>
                          <span class="text-gray-400 text-xs">₹{movie.net_amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View All Movies Button */}
                <div class="mt-6 text-center">
                  <a 
                    href="/movies" 
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-full hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span>View All Movies</span>
                    <span class="ml-2 text-lg">🎬</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div class="flex flex-col items-center space-y-2">
          <div class="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center backdrop-blur-sm">
            <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <span class="text-xs text-gray-400 font-medium">Scroll Down</span>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-30 animate-ping"></div>
        <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-40 animate-pulse"></div>
        <div class="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-25 animate-bounce"></div>
      </div>
    </section>
  );
}