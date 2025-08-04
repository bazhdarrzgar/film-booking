// Database Types for Film Booking System

export interface User {
  user_id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date;
}

export interface Movie {
  movie_id: string;
  movie_name: string;
  movie_lang: string;
  movie_genre: string;
  ratings: number;
  movie_description: string;
  price: number;
  tax: number;
  net_amount: number;
  poster_url?: string;
  banner_url?: string;
  duration: number; // in minutes
  age_rating: string; // 16+, 18+, etc.
  created_at: Date;
  updated_at: Date;
}

export interface Screening {
  screening_id: string;
  movie_id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  available_seats: number;
  total_seats: number;
  price_modifier: number; // 1.0 for regular, 1.2 for premium times
  created_at: Date;
}

export interface Booking {
  booking_id: string;
  user_id: string;
  screening_id: string;
  seats_booked: number;
  booking_status: 'pending' | 'confirmed' | 'cancelled';
  total_amount: number;
  snacks_total: number;
  created_at: Date;
  updated_at: Date;
}

export interface Snack {
  snack_id: string;
  name: string;
  price: number;
  category: 'popcorn' | 'drinks' | 'candy' | 'combo';
  available: boolean;
  created_at: Date;
}

export interface BookingSnack {
  booking_id: string;
  snack_id: string;
  quantity: number;
  price_per_item: number;
}

export interface Admin {
  admin_id: string;
  username: string;
  password: string;
  role: 'super_admin' | 'admin';
  created_at: Date;
}

// Frontend types
export interface BookingForm {
  movie_id: string;
  date: string;
  time: string;
  seats: number;
  selectedSnacks: { snack_id: string; quantity: number }[];
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface MovieWithScreenings extends Movie {
  screenings: Screening[];
}