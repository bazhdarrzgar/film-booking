// MongoDB connection and utilities for Deno Fresh
import { MongoClient, Db, Collection } from "mongodb";
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

let client: MongoClient | null = null;
let db: Db | null = null;

// MongoDB Connection
export async function connectToMongoDB(): Promise<Db> {
  if (db) {
    return db;
  }

  const mongoUrl = Deno.env.get("MONGO_URL") || "mongodb://localhost:27017";
  const dbName = Deno.env.get("DB_NAME") || "film_booking";
  
  try {
    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    
    console.log(`Connected to MongoDB: ${mongoUrl}/${dbName}`);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Get collection helper
export async function getCollection<T>(name: string): Promise<Collection<T>> {
  const database = await connectToMongoDB();
  return database.collection<T>(name);
}

// Close connection
export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// Collections
export const Collections = {
  USERS: 'users',
  MOVIES: 'movies', 
  SCREENINGS: 'screenings',
  BOOKINGS: 'bookings',
  SNACKS: 'snacks',
  BOOKING_SNACKS: 'booking_snacks',
  ADMINS: 'admins',
  SESSIONS: 'sessions'
} as const;