// Booking API endpoint

import { Handlers } from "$fresh/server.ts";
import { db } from "../../utils/database.ts";
import { getCurrentUser } from "../../utils/session.ts";

interface BookingRequest {
  screening_id: string;
  seats_booked: number;
  snacks: { snack_id: string; quantity: number }[];
  total_amount: number;
}

export const handler: Handlers = {
  async POST(req) {
    const userId = await getCurrentUser(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const bookingData: BookingRequest = await req.json();
      
      // Validate required fields
      if (!bookingData.screening_id || !bookingData.seats_booked || bookingData.seats_booked < 1) {
        return new Response(JSON.stringify({ error: "Invalid booking data" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Get screening info
      const screening = await db.getScreeningById(bookingData.screening_id);
      if (!screening) {
        return new Response(JSON.stringify({ error: "Screening not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Check seat availability
      if (bookingData.seats_booked > screening.available_seats) {
        return new Response(JSON.stringify({ 
          error: `Only ${screening.available_seats} seats available` 
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Calculate snacks total
      let snacksTotal = 0;
      if (bookingData.snacks && bookingData.snacks.length > 0) {
        const snacks = await db.getSnacks();
        for (const snackItem of bookingData.snacks) {
          const snack = snacks.find(s => s.snack_id === snackItem.snack_id);
          if (snack) {
            snacksTotal += snack.price * snackItem.quantity;
          }
        }
      }

      // Create booking
      const booking = await db.createBooking({
        user_id: userId,
        screening_id: bookingData.screening_id,
        seats_booked: bookingData.seats_booked,
        booking_status: 'confirmed',
        total_amount: bookingData.total_amount,
        snacks_total: snacksTotal
      });

      // Add snacks to booking if any
      if (bookingData.snacks && bookingData.snacks.length > 0) {
        await db.addBookingSnacks(booking.booking_id, bookingData.snacks);
      }

      return new Response(JSON.stringify({
        success: true,
        booking_id: booking.booking_id,
        message: "Booking confirmed successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      console.error("Booking error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};