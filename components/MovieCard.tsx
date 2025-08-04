// Enhanced movie card component with modern design

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
    <div class="movie-card group fade-in-up">
      {/* Movie Poster Section */}
      <div class="relative aspect-[2/3] overflow-hidden movie-poster">
        <img 
          src={movie.poster_url || '/static/placeholder-movie.jpg'}
          alt={movie.movie_name}
          class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Enhanced Gradient Overlay */}
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        {/* Enhanced Rating Badge */}
        <div class="rating-badge">
          <span class="text-yellow-400 text-lg">⭐</span> 
          <span class="ml-1 font-bold">{movie.ratings}</span>
        </div>

        {/* Genre Tag */}
        <div class="absolute top-4 left-4 px-3 py-1 bg-red-600 bg-opacity-90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-red-500">
          {movie.movie_genre}
        </div>
        
        {/* Movie Title Overlay */}
        <div class="absolute bottom-0 left-0 right-0 p-6">
          <h3 class="text-white text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {movie.movie_name}
          </h3>
          <div class="flex items-center space-x-4 text-gray-300 text-sm">
            <div class="flex items-center space-x-1">
              <span class="text-blue-400">🕒</span>
              <span>{formatDuration(movie.duration)}</span>
            </div>
            <div class="flex items-center space-x-1">
              <span class="text-green-400">🎭</span>
              <span>{movie.age_rating}+</span>
            </div>
            <div class="px-2 py-1 bg-red-600 bg-opacity-80 text-white text-xs rounded-full font-semibold">
              HD
            </div>
          </div>
        </div>

        {/* Hover Play Button */}
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div class="w-20 h-20 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <span class="text-white text-2xl ml-1">▶</span>
          </div>
        </div>
      </div>
      
      {/* Movie Details Section */}
      <div class="p-6 space-y-4">
        {/* Language and Category */}
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-3 text-gray-400">
            <span class="flex items-center space-x-1">
              <span class="text-purple-400">🌐</span>
              <span>{movie.movie_lang}</span>
            </span>
            <span class="text-gray-600">•</span>
            <span class="text-red-400 font-medium">{movie.movie_genre}</span>
          </div>
          <div class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
            {movie.age_rating}+
          </div>
        </div>
        
        {/* Description */}
        <p class="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
          {movie.movie_description}
        </p>
        
        {/* Price and Book Button */}
        <div class="flex items-center justify-between pt-2">
          <div class="space-y-1">
            <div class="text-white">
              <span class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ₹{movie.net_amount}
              </span>
            </div>
            <div class="text-gray-500 text-xs">per ticket</div>
          </div>
          
          {showBookButton && (
            <a 
              href={`/book/${movie.movie_id}`}
              class="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-red-500/30 group"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span class="relative flex items-center space-x-2">
                <span>Book Now</span>
                <span class="text-lg transform group-hover:translate-x-1 transition-transform duration-300">🎫</span>
              </span>
            </a>
          )}
        </div>

        {/* Additional Movie Stats */}
        <div class="flex items-center justify-between pt-2 border-t border-gray-700 border-opacity-50">
          <div class="flex items-center space-x-4 text-xs text-gray-500">
            <span class="flex items-center space-x-1">
              <span class="text-green-400">👥</span>
              <span>Popular</span>
            </span>
            <span class="flex items-center space-x-1">
              <span class="text-blue-400">💿</span>
              <span>HD Quality</span>
            </span>
          </div>
          <div class="text-xs text-gray-500">
            ⏱️ {formatDuration(movie.duration)}
          </div>
        </div>
      </div>
    </div>
  );
}