// Ultra-Modern Movie Card with Advanced Visual Effects and Interactions

import { JSX } from "preact";
import type { Movie } from "../types/database.ts";

interface MovieCardProps {
  movie: Movie;
  showBookButton?: boolean;
}

export default function MovieCard({ movie, showBookButton = true }: MovieCardProps): JSX.Element {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  };

  return (
    <div class="movie-card group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 backdrop-blur-lg">
      
      {/* Ambient Glow Effect */}
      <div class="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-700"></div>
      
      {/* Main Card Content */}
      <div class="relative z-10">
        
        {/* Movie Poster Section with Advanced Effects */}
        <div class="relative aspect-[2/3] overflow-hidden rounded-t-3xl">
          
          {/* Main Poster Image */}
          <img 
            src={movie.poster_url || '/static/placeholder-movie.jpg'}
            alt={movie.movie_name}
            class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Multi-layered Gradient Overlays */}
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {/* Enhanced Rating Badge */}
          <div class="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-2xl transform group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-yellow-600 group-hover:text-black transition-all duration-500">
            <div class="flex items-center space-x-2">
              <span class="text-yellow-400 group-hover:text-black text-xl">⭐</span>
              <span>{movie.ratings}</span>
            </div>
          </div>

          {/* Genre Tags with Modern Design */}
          <div class="absolute top-4 left-4">
            {movie.movie_genre.split(',').slice(0, 2).map((genre, index) => (
              <div 
                key={index}
                class="inline-block mb-2 mr-2 px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 backdrop-blur-xl text-white text-xs font-bold rounded-full border border-red-400/50 shadow-lg transform hover:scale-105 transition-all duration-300"
                style={`animation-delay: ${index * 0.1}s`}
              >
                {genre.trim()}
              </div>
            ))}
          </div>
          
          {/* Movie Title Overlay with Enhanced Typography */}
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="text-white text-2xl lg:text-3xl font-black mb-3 leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-2xl">
              {movie.movie_name}
            </h3>
            
            {/* Movie Stats Row */}
            <div class="flex items-center flex-wrap gap-3 text-gray-300 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <div class="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span class="text-blue-400 text-base">🕒</span>
                <span>{formatDuration(movie.duration)}</span>
              </div>
              <div class="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span class="text-green-400 text-base">🎭</span>
                <span>{movie.age_rating}+</span>
              </div>
              <div class="bg-gradient-to-r from-red-600 to-red-700 px-3 py-1 text-white rounded-full font-bold shadow-lg">
                4K HDR
              </div>
            </div>
          </div>

          {/* Interactive Play Button */}
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div class="relative">
              {/* Pulsing Background */}
              <div class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-25"></div>
              <div class="absolute inset-0 bg-red-600 rounded-full animate-pulse opacity-50"></div>
              
              {/* Main Play Button */}
              <div class="relative w-20 h-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-full flex items-center justify-center backdrop-blur-xl border-4 border-white/30 shadow-2xl transform group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                <span class="text-white text-3xl ml-1 drop-shadow-lg">▶</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Movie Details Section */}
        <div class="p-6 space-y-6 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl">
          
          {/* Language and Category Row */}
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 text-sm">
              <div class="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
                <span class="text-purple-400 text-base">🌐</span>
                <span class="text-gray-300 font-medium">{movie.movie_lang}</span>
              </div>
              <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span class="text-red-400 font-semibold">{movie.movie_genre}</span>
            </div>
            <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1 rounded-full border border-purple-400/50">
              <span class="text-white text-xs font-bold">{movie.age_rating}+</span>
            </div>
          </div>
          
          {/* Enhanced Description */}
          <p class="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
            {movie.movie_description}
          </p>
          
          {/* Price and Action Section */}
          <div class="flex items-center justify-between pt-4 border-t border-white/10">
            <div class="space-y-1">
              <div class="flex items-baseline space-x-2">
                <span class="text-3xl font-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                  ₹{movie.net_amount}
                </span>
                <span class="text-gray-500 text-sm line-through">₹{movie.price + movie.tax}</span>
              </div>
              <div class="text-gray-500 text-xs">per ticket • all taxes included</div>
            </div>
            
            {showBookButton && (
              <a 
                href={`/book/${movie.movie_id}`}
                class="group/btn relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold rounded-2xl hover:from-red-700 hover:via-red-800 hover:to-red-900 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-red-500/50 border border-red-400/30"
              >
                {/* Animated Background */}
                <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover/btn:opacity-40 transition-opacity duration-500"></span>
                <span class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-25 group-hover/btn:opacity-75 transition duration-500"></span>
                
                {/* Button Content */}
                <span class="relative flex items-center space-x-2">
                  <span>Book Now</span>
                  <span class="text-xl transform group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-all duration-300">🎫</span>
                </span>
              </a>
            )}
          </div>

          {/* Enhanced Movie Stats Footer */}
          <div class="flex items-center justify-between pt-4 border-t border-white/10">
            <div class="flex items-center space-x-4 text-xs">
              <div class="flex items-center space-x-1 text-gray-500">
                <span class="text-green-400">👥</span>
                <span>Popular Choice</span>
              </div>
              <div class="flex items-center space-x-1 text-gray-500">
                <span class="text-blue-400">💿</span>
                <span>Premium Quality</span>
              </div>
              <div class="flex items-center space-x-1 text-gray-500">
                <span class="text-purple-400">🏆</span>
                <span>Top Rated</span>
              </div>
            </div>
            <div class="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              ⏱️ {formatDuration(movie.duration)}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Hidden by default, shown on hover) */}
      <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 space-y-2">
        <button class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
          <span class="text-sm">❤️</span>
        </button>
        <button class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
          <span class="text-sm">📌</span>
        </button>
        <button class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
          <span class="text-sm">📤</span>
        </button>
      </div>

      {/* Bottom Ambient Glow */}
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-red-600/10 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
}