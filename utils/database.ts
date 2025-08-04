// Database abstraction layer - MongoDB implementation
// Replaces in-memory storage with MongoDB collections

import type { 
  User, 
  Movie, 
  Screening, 
  Booking, 
  Snack, 
  BookingSnack, 
  Admin,
  MovieWithScreenings 
} from '../types/database.ts';
import { hashPassword, verifyPassword, generateId } from './crypto.ts';
import { getCollection, Collections, connectToMongoDB } from './mongodb.ts';

// MongoDB database implementation
class MongoDatabase {
  private initialized = false;

  constructor() {
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    if (this.initialized) return;
    
    try {
      await connectToMongoDB();
      
      // Check if admin already exists
      const adminCollection = await getCollection<Admin>(Collections.ADMINS);
      const existingAdmin = await adminCollection.findOne({ username: 'admin' });
      
      if (!existingAdmin) {
        // Create default admin
        const adminId = generateId();
        await adminCollection.insertOne({
          admin_id: adminId,
          username: 'admin',
          password: await hashPassword('admin123'),
          role: 'super_admin',
          created_at: new Date()
        });
      }

      // Check if movies already exist
      const movieCollection = await getCollection<Movie>(Collections.MOVIES);
      const existingMovieCount = await movieCollection.countDocuments();
      
      if (existingMovieCount === 0) {
        // Create sample movies
        const movies = [
          {
            movie_id: generateId(),
            movie_name: 'Black Panther',
            movie_lang: 'English',
            movie_genre: 'Action, Superhero',
            ratings: 9.5,
            movie_description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.',
            price: 250,
            tax: 8,
            net_amount: 270,
            poster_url: '/static/images/movies/captain-marvel.png',
            banner_url: '/static/images/black-banner.png',
            duration: 134,
            age_rating: '13+',
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            movie_id: generateId(),
            movie_name: 'Supergirl',
            movie_lang: 'English',
            movie_genre: 'Action, Superhero',
            ratings: 8.5,
            movie_description: 'Kara Zor-El, Superman\'s cousin, discovers her powers and becomes Earth\'s newest protector.',
            price: 220,
            tax: 8,
            net_amount: 238,
            poster_url: '/static/images/series/supergirl.jpg',
            banner_url: '/static/images/supergirl-banner.jpg',
            duration: 120,
            age_rating: '13+',
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            movie_id: generateId(),
            movie_name: 'Wanda Vision',
            movie_lang: 'English',
            movie_genre: 'Fantasy, Drama',
            ratings: 9.0,
            movie_description: 'Wanda Maximoff and Vision live idealized suburban lives, hiding their true powers.',
            price: 280,
            tax: 8,
            net_amount: 302,
            poster_url: '/static/images/series/wanda.png',
            banner_url: '/static/images/wanda-banner.jpg',
            duration: 150,
            age_rating: '13+',
            created_at: new Date(),
            updated_at: new Date()
          }
        ];

        await movieCollection.insertMany(movies);

        // Create screenings for each movie
        const screeningCollection = await getCollection<Screening>(Collections.SCREENINGS);
        const screenings: Screening[] = [];
        
        const times = ['10:00:00', '13:00:00', '16:00:00', '19:00:00', '22:00:00'];
        const today = new Date();
        
        for (const movie of movies) {
          for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            times.forEach(time => {
              screenings.push({
                screening_id: generateId(),
                movie_id: movie.movie_id,
                date: dateStr,
                time,
                available_seats: 100,
                total_seats: 100,
                price_modifier: time === '19:00:00' || time === '22:00:00' ? 1.2 : 1.0,
                created_at: new Date()
              });
            });
          }
        }
        
        if (screenings.length > 0) {
          await screeningCollection.insertMany(screenings);
        }
      }

      // Check if snacks already exist
      const snackCollection = await getCollection<Snack>(Collections.SNACKS);
      const existingSnackCount = await snackCollection.countDocuments();
      
      if (existingSnackCount === 0) {
        // Create sample snacks
        const snacks = [
          { name: 'Large Popcorn', price: 150, category: 'popcorn' as const },
          { name: 'Medium Popcorn', price: 100, category: 'popcorn' as const },
          { name: 'Cola', price: 80, category: 'drinks' as const },
          { name: 'Candy Mix', price: 60, category: 'candy' as const },
          { name: 'Popcorn & Drink Combo', price: 200, category: 'combo' as const }
        ];

        const snackDocuments = snacks.map(snack => ({
          snack_id: generateId(),
          ...snack,
          available: true,
          created_at: new Date()
        }));

        await snackCollection.insertMany(snackDocuments);
      }
      
      this.initialized = true;
      console.log('MongoDB database initialized with sample data');
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }

  // User operations
  async createUser(userData: Omit<User, 'user_id' | 'created_at' | 'password'> & { password: string }): Promise<User> {
    const userId = generateId();
    const hashedPassword = await hashPassword(userData.password);
    
    const user: User = {
      user_id: userId,
      fullname: userData.fullname,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
      created_at: new Date()
    };
    
    const collection = await getCollection<User>(Collections.USERS);
    await collection.insertOne(user);
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const collection = await getCollection<User>(Collections.USERS);
    const user = await collection.findOne({ username });
    if (!user) return null;
    
    const isValid = await verifyPassword(password, user.password);
    return isValid ? user : null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const collection = await getCollection<User>(Collections.USERS);
    return await collection.findOne({ username });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const collection = await getCollection<User>(Collections.USERS);
    return await collection.findOne({ email });
  }

  // Movie operations
  async getMovies(): Promise<Movie[]> {
    const collection = await getCollection<Movie>(Collections.MOVIES);
    return await collection.find({}).toArray();
  }

  async getMovieById(movieId: string): Promise<Movie | null> {
    const collection = await getCollection<Movie>(Collections.MOVIES);
    return await collection.findOne({ movie_id: movieId });
  }

  async getMoviesWithScreenings(): Promise<MovieWithScreenings[]> {
    const movies = await this.getMovies();
    const result: MovieWithScreenings[] = [];
    
    for (const movie of movies) {
      const screenings = await this.getScreeningsByMovieId(movie.movie_id);
      result.push({ ...movie, screenings });
    }
    
    return result;
  }

  // Screening operations
  async getScreeningsByMovieId(movieId: string): Promise<Screening[]> {
    const collection = await getCollection<Screening>(Collections.SCREENINGS);
    return await collection.find({ movie_id: movieId }).toArray();
  }

  async getScreeningById(screeningId: string): Promise<Screening | null> {
    const collection = await getCollection<Screening>(Collections.SCREENINGS);
    return await collection.findOne({ screening_id: screeningId });
  }

  // Booking operations
  async createBooking(bookingData: Omit<Booking, 'booking_id' | 'created_at' | 'updated_at'>): Promise<Booking> {
    const bookingId = generateId();
    const booking: Booking = {
      booking_id: bookingId,
      ...bookingData,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const bookingCollection = await getCollection<Booking>(Collections.BOOKINGS);
    await bookingCollection.insertOne(booking);
    
    // Update available seats
    const screeningCollection = await getCollection<Screening>(Collections.SCREENINGS);
    await screeningCollection.updateOne(
      { screening_id: bookingData.screening_id },
      { $inc: { available_seats: -bookingData.seats_booked } }
    );
    
    return booking;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const collection = await getCollection<Booking>(Collections.BOOKINGS);
    return await collection.find({ user_id: userId }).toArray();
  }

  // Snack operations
  async getSnacks(): Promise<Snack[]> {
    const collection = await getCollection<Snack>(Collections.SNACKS);
    return await collection.find({ available: true }).toArray();
  }

  async addBookingSnacks(bookingId: string, snacks: { snack_id: string; quantity: number }[]): Promise<void> {
    const snackCollection = await getCollection<Snack>(Collections.SNACKS);
    const bookingSnackCollection = await getCollection<BookingSnack>(Collections.BOOKING_SNACKS);
    
    const bookingSnacks: BookingSnack[] = [];
    
    for (const item of snacks) {
      const snack = await snackCollection.findOne({ snack_id: item.snack_id });
      if (snack) {
        bookingSnacks.push({
          booking_id: bookingId,
          snack_id: item.snack_id,
          quantity: item.quantity,
          price_per_item: snack.price
        });
      }
    }
    
    if (bookingSnacks.length > 0) {
      await bookingSnackCollection.insertMany(bookingSnacks);
    }
  }

  // Admin operations
  async authenticateAdmin(username: string, password: string): Promise<Admin | null> {
    const collection = await getCollection<Admin>(Collections.ADMINS);
    const admin = await collection.findOne({ username });
    if (!admin) return null;
    
    const isValid = await verifyPassword(password, admin.password);
    return isValid ? admin : null;
  }

  // Session operations
  async createSession(userId: string, token: string): Promise<void> {
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // 24 hour expiry
    
    const collection = await getCollection<{ token: string; userId: string; expires: Date }>(Collections.SESSIONS);
    await collection.insertOne({ token, userId, expires });
  }

  async getSession(token: string): Promise<{ userId: string; expires: Date } | null> {
    const collection = await getCollection<{ token: string; userId: string; expires: Date }>(Collections.SESSIONS);
    const session = await collection.findOne({ token });
    
    if (!session || session.expires < new Date()) {
      if (session) {
        await collection.deleteOne({ token });
      }
      return null;
    }
    
    return { userId: session.userId, expires: session.expires };
  }

  async deleteSession(token: string): Promise<void> {
    const collection = await getCollection<{ token: string; userId: string; expires: Date }>(Collections.SESSIONS);
    await collection.deleteOne({ token });
  }
}

// Singleton database instance
export const db = new MongoDatabase();