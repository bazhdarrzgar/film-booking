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
    <div class="min-h-screen bg-gray-900">
      <Header currentUser={currentUser} />
      
      {/* Page Header */}
      <section class="pt-24 pb-12 bg-black">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-white mb-4">
            {genre ? `${genre} Movies` : searchQuery ? `Search Results for "${searchQuery}"` : 'All Movies'}
          </h1>
          <p class="text-gray-400 text-lg">
            Discover and book your favorite movies
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section class="py-8 bg-gray-800 border-b border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
            
            {/* Search Bar */}
            <form method="GET" class="flex-1 max-w-lg">
              <div class="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search movies..."
                  value={searchQuery || ''}
                  class="w-full bg-gray-700 text-white px-4 py-3 pr-12 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600"
                />
                <button 
                  type="submit"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
              {genre && <input type="hidden" name="genre" value={genre} />}
            </form>

            {/* Genre Filter */}
            <div class="flex flex-wrap gap-2">
              <a 
                href="/movies"
                class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !genre ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All
              </a>
              {genres.map((g) => (
                <a 
                  key={g}
                  href={`/movies?genre=${g.toLowerCase()}`}
                  class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    genre?.toLowerCase() === g.toLowerCase() 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {g}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section class="py-12">
        <div class="container mx-auto px-4">
          {movies.length === 0 ? (
            <div class="text-center py-16">
              <div class="text-6xl mb-4">🎬</div>
              <h2 class="text-2xl font-bold text-white mb-4">No movies found</h2>
              <p class="text-gray-400 mb-8">
                {searchQuery || genre 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Movies will be added soon'
                }
              </p>
              <a 
                href="/movies"
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                View All Movies
              </a>
            </div>
          ) : (
            <>
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-white">
                  {movies.length} movie{movies.length !== 1 ? 's' : ''} found
                </h2>
                <div class="flex items-center space-x-4">
                  <label class="text-gray-400 text-sm">Sort by:</label>
                  <select class="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-red-600">
                    <option>Latest</option>
                    <option>Rating</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie) => (
                  <MovieCard key={movie.movie_id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}