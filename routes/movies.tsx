// Movies listing page

import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import MovieCard from "../components/MovieCard.tsx";
import Footer from "../components/Footer.tsx";
import { db } from "../utils/database.ts";
import { getCurrentUser } from "../utils/session.ts";
import type { Movie, User } from "../types/database.ts";

interface MoviesPageData {
  movies: Movie[];
  currentUser: User | null;
  searchQuery?: string;
  genre?: string;
}

export const handler: Handlers<MoviesPageData> = {
  async GET(req, ctx) {
    const userId = await getCurrentUser(req);
    const currentUser = userId ? await db.getUserByUsername(userId) : null;
    
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get('search') || undefined;
    const genre = url.searchParams.get('genre') || undefined;
    
    let movies = await db.getMovies();
    
    // Apply search filter
    if (searchQuery) {
      movies = movies.filter(movie => 
        movie.movie_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.movie_genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.movie_lang.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply genre filter
    if (genre) {
      movies = movies.filter(movie => 
        movie.movie_genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    
    return ctx.render({ movies, currentUser, searchQuery, genre });
  },
};

export default function Movies({ data }: PageProps<MoviesPageData>) {
  const { movies, currentUser, searchQuery, genre } = data;
  
  const genres = ['Action', 'Comedy', 'Drama', 'Thriller', 'Romance', 'Horror', 'Sci-Fi', 'Fantasy'];
  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam'];

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header currentUser={currentUser} />
      
      {/* Ultra-Modern Page Header */}
      <section class="pt-32 pb-16 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%);"></div>
        
        {/* Floating Particles */}
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-40 animate-ping" style="animation-delay: 0s;"></div>
          <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-50 animate-pulse" style="animation-delay: 1s;"></div>
          <div class="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-30 animate-bounce" style="animation-delay: 2s;"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center">
            {/* Page Title with Enhanced Design */}
            <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-6 shadow-lg shadow-red-500/30 border border-red-400/30">
              <span class="text-white font-bold text-lg tracking-wide">🎬 MOVIE LIBRARY</span>
            </div>
            
            <h1 class="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              {genre ? `${genre} Movies` : searchQuery ? `Search Results` : 'All Movies'}
            </h1>
            
            <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {searchQuery 
                ? `Found results for "${searchQuery}" - Discover amazing movies that match your search`
                : 'Discover and book your favorite movies from our premium collection of blockbusters and critically acclaimed films'
              }
            </p>
            
            <div class="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Search and Filters */}
      <section class="py-8 bg-gradient-to-r from-gray-800/80 via-gray-900/90 to-gray-800/80 backdrop-blur-xl border-y border-white/10 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-blue-600/5"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            
            {/* Enhanced Search Bar */}
            <form method="GET" class="flex-1 max-w-xl">
              <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div class="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search movies, genres, languages..."
                    value={searchQuery || ''}
                    class="w-full bg-gray-800/90 backdrop-blur-xl text-white px-6 py-4 pr-14 rounded-2xl border border-white/20 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 text-lg font-medium placeholder-gray-400"
                  />
                  <button 
                    type="submit"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
              {genre && <input type="hidden" name="genre" value={genre} />}
            </form>

            {/* Enhanced Genre Filter Pills */}
            <div class="flex flex-wrap gap-3">
              <a 
                href="/movies"
                class={`group relative px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                  !genre 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 border border-red-400/30' 
                    : 'bg-white/5 backdrop-blur-xl text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:shadow-lg'
                }`}
              >
                <span class="relative z-10">All Movies</span>
                {!genre && <div class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>}
              </a>
              
              {genres.map((g) => (
                <a 
                  key={g}
                  href={`/movies?genre=${g.toLowerCase()}`}
                  class={`group relative px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    genre?.toLowerCase() === g.toLowerCase() 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 border border-red-400/30' 
                      : 'bg-white/5 backdrop-blur-xl text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:shadow-lg'
                  }`}
                >
                  <span class="relative z-10">{g}</span>
                  {genre?.toLowerCase() === g.toLowerCase() && <div class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid with Enhanced Layout */}
      <section class="py-16">
        <div class="container mx-auto px-4">
          {movies.length === 0 ? (
            /* Enhanced Empty State */
            <div class="text-center py-20">
              <div class="relative mb-8">
                <div class="text-8xl mb-4 opacity-20">🎬</div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-32 h-32 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h2 class="text-4xl font-black text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                No Movies Found
              </h2>
              <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                {searchQuery || genre 
                  ? 'We couldn\'t find any movies matching your criteria. Try adjusting your search or explore different genres.' 
                  : 'Our movie collection is being updated. Check back soon for the latest blockbusters and indie gems!'
                }
              </p>
              <a 
                href="/movies"
                class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-2xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-red-500/30"
              >
                <span class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                <span class="relative flex items-center space-x-3">
                  <span>Explore All Movies</span>
                  <span class="text-xl group-hover:rotate-12 transition-transform duration-300">🎬</span>
                </span>
              </a>
            </div>
          ) : (
            <>
              {/* Enhanced Results Header */}
              <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 p-6 bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/10">
                <div class="mb-4 lg:mb-0">
                  <h2 class="text-3xl font-black text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {movies.length} Movie{movies.length !== 1 ? 's' : ''} Found
                  </h2>
                  <p class="text-gray-400">
                    {searchQuery 
                      ? `Results for "${searchQuery}"`
                      : genre 
                        ? `${genre} movies in our collection`
                        : 'All movies in our premium collection'
                    }
                  </p>
                </div>
                
                {/* Enhanced Sort Dropdown */}
                <div class="flex items-center space-x-4">
                  <label class="text-gray-400 text-sm font-medium">Sort by:</label>
                  <div class="relative">
                    <select class="bg-gray-800/90 backdrop-blur-xl text-white px-6 py-3 pr-10 rounded-2xl border border-white/20 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 appearance-none cursor-pointer font-medium">
                      <option>Latest Releases</option>
                      <option>Highest Rated</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Alphabetical A-Z</option>
                      <option>Most Popular</option>
                    </select>
                    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Movies Grid with Staggered Animation */}
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie, index) => (
                  <div 
                    key={movie.movie_id}
                    class="fade-in-up"
                    style={`animation-delay: ${index * 0.1}s`}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
              
              {/* Enhanced Load More Section (Placeholder for Pagination) */}
              <div class="text-center mt-16">
                <div class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white font-bold rounded-2xl hover:from-gray-600 hover:via-gray-700 hover:to-gray-600 transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-600/50">
                  <span class="mr-3">Showing all {movies.length} movies</span>
                  <span class="text-green-400">✓</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}