// Input validation utilities

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s-()]{10,15}$/;
  return phoneRegex.test(phone);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>\"'&]/g, '');
}

export function validateMovieForm(data: {
  movie_name: string;
  movie_lang: string;
  movie_genre: string;
  ratings: number;
  movie_description: string;
  price: number;
  duration: number;
  age_rating: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.movie_name || data.movie_name.trim().length < 2) {
    errors.push('Movie name must be at least 2 characters long');
  }
  
  if (!data.movie_lang) {
    errors.push('Movie language is required');
  }
  
  if (!data.movie_genre) {
    errors.push('Movie genre is required');
  }
  
  if (data.ratings < 1 || data.ratings > 10) {
    errors.push('Ratings must be between 1 and 10');
  }
  
  if (!data.movie_description || data.movie_description.trim().length < 10) {
    errors.push('Movie description must be at least 10 characters long');
  }
  
  if (data.price <= 0) {
    errors.push('Price must be greater than 0');
  }
  
  if (data.duration <= 0) {
    errors.push('Duration must be greater than 0 minutes');
  }
  
  if (!data.age_rating) {
    errors.push('Age rating is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateBookingForm(data: {
  movie_id: string;
  date: string;
  time: string;
  seats: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.movie_id) {
    errors.push('Movie selection is required');
  }
  
  const selectedDate = new Date(data.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!data.date || selectedDate < today) {
    errors.push('Please select a valid future date');
  }
  
  if (!data.time) {
    errors.push('Please select a showtime');
  }
  
  if (!data.seats || data.seats < 1 || data.seats > 10) {
    errors.push('Please select between 1 and 10 seats');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}