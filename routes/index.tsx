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
    <div class="min-h-screen bg-gray-900">
      <Header currentUser={currentUser} />
      
      {/* Hero Section */}
      <Hero featuredMovies={featuredMovies} />
      
      {/* Latest Movies Section */}
      <section class="py-16 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex items-center mb-8">
            <div class="w-1 h-8 bg-red-600 mr-4"></div>
            <h2 class="text-3xl font-bold text-white">Latest Movies</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestMovies.map((movie) => (
              <MovieCard key={movie.movie_id} movie={movie} />
            ))}
          </div>
          
          <div class="text-center mt-12">
            <a 
              href="/movies"
              class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              View All Movies
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-16 bg-black">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">Why Choose Flix?</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">
              Experience the best movie booking platform with premium features and seamless booking experience.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🎟️</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Easy Booking</h3>
              <p class="text-gray-400">Book your tickets in just a few clicks with our intuitive interface.</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🍿</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Snacks & Combos</h3>
              <p class="text-gray-400">Pre-order your favorite snacks and save time at the theater.</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">💳</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Secure Payment</h3>
              <p class="text-gray-400">Safe and secure payment processing with multiple payment options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section class="py-16 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">Flix Pricing</h2>
            <p class="text-gray-400">Choose the perfect plan for your movie experience</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Basic */}
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <h3 class="text-2xl font-bold text-white mb-4">Basic</h3>
              <div class="text-4xl font-bold text-white mb-4">Free</div>
              <ul class="space-y-3 mb-8">
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Movie Booking
                </li>
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Basic Support
                </li>
                <li class="text-gray-500 flex items-center">
                  <span class="text-red-500 mr-2">✗</span>
                  Priority Booking
                </li>
                <li class="text-gray-500 flex items-center">
                  <span class="text-red-500 mr-2">✗</span>
                  Exclusive Shows
                </li>
              </ul>
              <a href="/register" class="block w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded text-center transition-colors">
                Get Started
              </a>
            </div>
            
            {/* Premium */}
            <div class="bg-gray-800 p-8 rounded-lg border-2 border-red-600 relative">
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded text-sm font-semibold">
                Most Popular
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">Premium</h3>
              <div class="text-4xl font-bold text-white mb-1">₹299</div>
              <div class="text-gray-400 mb-4">/month</div>
              <ul class="space-y-3 mb-8">
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Everything in Basic
                </li>
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Priority Booking
                </li>
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Discounted Tickets
                </li>
                <li class="text-gray-500 flex items-center">
                  <span class="text-red-500 mr-2">✗</span>
                  Exclusive Shows
                </li>
              </ul>
              <a href="/register" class="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-center transition-colors">
                Choose Premium
              </a>
            </div>
            
            {/* VIP */}
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <h3 class="text-2xl font-bold text-white mb-4">VIP</h3>
              <div class="text-4xl font-bold text-white mb-1">₹599</div>
              <div class="text-gray-400 mb-4">/month</div>
              <ul class="space-y-3 mb-8">
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Everything in Premium
                </li>
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Exclusive Shows
                </li>
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  VIP Support
                </li>
                <li class="text-gray-300 flex items-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Free Snacks
                </li>
              </ul>
              <a href="/register" class="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-center transition-colors">
                Go VIP
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}