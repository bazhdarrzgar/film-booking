// Movie booking page

import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import BookingForm from "../../islands/BookingForm.tsx";
import { db } from "../../utils/database.ts";
import { getCurrentUser, requireAuth } from "../../utils/session.ts";
import type { Movie, Screening, Snack, User } from "../../types/database.ts";

interface BookingPageData {
  movie: Movie;
  screenings: Screening[];
  snacks: Snack[];
  currentUser: User | null;
}

export const handler: Handlers<BookingPageData> = {
  async GET(req, ctx) {
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { id } = ctx.params;
    const movie = await db.getMovieById(id);
    
    if (!movie) {
      return new Response(null, { status: 404 });
    }

    const screenings = await db.getScreeningsByMovieId(id);
    const snacks = await db.getSnacks();
    const userId = await getCurrentUser(req);
    const currentUser = userId ? await db.getUserByUsername(userId) : null;
    
    return ctx.render({ movie, screenings, snacks, currentUser });
  },
};

export default function BookMovie({ data }: PageProps<BookingPageData>) {
  const { movie, screenings, snacks, currentUser } = data;
  
  // Group screenings by date
  const screeningsByDate = screenings.reduce((acc, screening) => {
    if (!acc[screening.date]) {
      acc[screening.date] = [];
    }
    acc[screening.date].push(screening);
    return acc;
  }, {} as Record<string, Screening[]>);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div class="min-h-screen bg-gray-900">
      <Header currentUser={currentUser} />
      
      {/* Movie Header */}
      <section class="pt-16 bg-black relative overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img 
            src={movie.banner_url || movie.poster_url || '/static/placeholder-banner.jpg'}
            alt={movie.movie_name}
            class="w-full h-full object-cover opacity-30"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div class="relative z-10 container mx-auto px-4 py-16">
          <div class="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12">
            
            {/* Movie Poster */}
            <div class="flex-shrink-0">
              <img 
                src={movie.poster_url || '/static/placeholder-movie.jpg'}
                alt={movie.movie_name}
                class="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div class="flex-1">
              <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4">{movie.movie_name}</h1>
              
              <div class="flex flex-wrap items-center space-x-6 text-white text-lg mb-6">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">⭐</span>
                  <span>{movie.ratings}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span>🕒</span>
                  <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                </div>
                <div class="bg-red-600 px-3 py-1 rounded">
                  <span>HD</span>
                </div>
                <div class="bg-gray-600 px-3 py-1 rounded">
                  <span>{movie.age_rating}</span>
                </div>
              </div>

              <div class="flex flex-wrap items-center space-x-6 text-gray-300 mb-6">
                <span>{movie.movie_lang}</span>
                <span>•</span>
                <span>{movie.movie_genre}</span>
              </div>
              
              <p class="text-gray-300 text-lg mb-8 leading-relaxed max-w-3xl">
                {movie.movie_description}
              </p>
              
              <div class="flex items-center space-x-8">
                <div class="text-white">
                  <div class="text-3xl font-bold">₹{movie.net_amount}</div>
                  <div class="text-gray-400">per ticket</div>
                </div>
                <div class="text-gray-400">
                  <div class="text-sm">Plus applicable taxes</div>
                  <div class="text-sm">Tax: {movie.tax}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            
            <div class="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h2 class="text-3xl font-bold text-white mb-8 text-center">Book Your Tickets</h2>
              
              {Object.keys(screeningsByDate).length === 0 ? (
                <div class="text-center py-12">
                  <div class="text-6xl mb-4">📅</div>
                  <h3 class="text-2xl font-bold text-white mb-4">No Shows Available</h3>
                  <p class="text-gray-400">
                    Sorry, there are no shows scheduled for this movie at the moment.
                  </p>
                </div>
              ) : (
                <BookingForm 
                  movie={movie}
                  screeningsByDate={screeningsByDate}
                  snacks={snacks}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}