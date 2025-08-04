// Interactive booking form component

import { useState } from "preact/hooks";
import type { Movie, Screening, Snack } from "../types/database.ts";

interface BookingFormProps {
  movie: Movie;
  screeningsByDate: Record<string, Screening[]>;
  snacks: Snack[];
  formatDate: (dateStr: string) => string;
  formatTime: (timeStr: string) => string;
}

export default function BookingForm({ 
  movie, 
  screeningsByDate, 
  snacks, 
  formatDate, 
  formatTime 
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<number>(1);
  const [selectedSnacks, setSelectedSnacks] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const availableDates = Object.keys(screeningsByDate).sort();
  const availableTimes = selectedDate ? screeningsByDate[selectedDate] : [];
  
  const selectedScreening = availableTimes.find(s => s.time === selectedTime);
  
  const handleSnackChange = (snackId: string, quantity: number) => {
    setSelectedSnacks(prev => ({
      ...prev,
      [snackId]: quantity
    }));
  };

  const calculateTotal = (): number => {
    let total = 0;
    
    // Movie tickets
    if (selectedScreening) {
      const basePrice = movie.net_amount;
      const priceWithModifier = basePrice * selectedScreening.price_modifier;
      total += priceWithModifier * selectedSeats;
    }
    
    // Snacks
    Object.entries(selectedSnacks).forEach(([snackId, quantity]) => {
      const snack = snacks.find(s => s.snack_id === snackId);
      if (snack && quantity > 0) {
        total += snack.price * quantity;
      }
    });
    
    return Math.round(total);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedSeats) {
      setError("Please select date, time, and number of seats");
      return;
    }

    if (!selectedScreening) {
      setError("Invalid screening selection");
      return;
    }

    if (selectedSeats > selectedScreening.available_seats) {
      setError(`Only ${selectedScreening.available_seats} seats available for this show`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const bookingData = {
        screening_id: selectedScreening.screening_id,
        seats_booked: selectedSeats,
        snacks: Object.entries(selectedSnacks)
          .filter(([_, quantity]) => quantity > 0)
          .map(([snack_id, quantity]) => ({ snack_id, quantity })),
        total_amount: calculateTotal()
      };

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to booking confirmation
        window.location.href = `/booking-success/${result.booking_id}`;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-8">
      
      {/* Error Message */}
      {error && (
        <div class="bg-red-600 bg-opacity-20 border border-red-600 text-red-300 p-4 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div>
        <h3 class="text-xl font-semibold text-white mb-4">Select Date</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availableDates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime("");
              }}
              class={`p-4 rounded-lg border-2 text-center transition-colors ${
                selectedDate === date
                  ? 'border-red-600 bg-red-600 bg-opacity-20 text-white'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div class="font-semibold">{formatDate(date)}</div>
              <div class="text-sm text-gray-400">{date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">Select Time</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            {availableTimes.map((screening) => (
              <button
                key={screening.screening_id}
                type="button"
                onClick={() => setSelectedTime(screening.time)}
                disabled={screening.available_seats === 0}
                class={`p-3 rounded-lg border-2 text-center transition-colors ${
                  selectedTime === screening.time
                    ? 'border-red-600 bg-red-600 bg-opacity-20 text-white'
                    : screening.available_seats === 0
                    ? 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div class="font-semibold">{formatTime(screening.time)}</div>
                <div class="text-xs text-gray-400">
                  {screening.available_seats} seats left
                </div>
                {screening.price_modifier !== 1 && (
                  <div class="text-xs text-red-400">
                    +{Math.round((screening.price_modifier - 1) * 100)}%
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seat Selection */}
      {selectedTime && (
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">Number of Seats</h3>
          <div class="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
              class="w-10 h-10 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              −
            </button>
            <span class="text-2xl font-bold text-white w-12 text-center">{selectedSeats}</span>
            <button
              type="button"
              onClick={() => setSelectedSeats(Math.min((selectedScreening?.available_seats || 10), selectedSeats + 1))}
              class="w-10 h-10 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              +
            </button>
            <span class="text-gray-400 ml-4">
              Max {selectedScreening?.available_seats} seats available
            </span>
          </div>
        </div>
      )}

      {/* Snacks Selection */}
      {selectedSeats && (
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">Add Snacks (Optional)</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {snacks.map((snack) => (
              <div key={snack.snack_id} class="bg-gray-700 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-white">{snack.name}</h4>
                  <span class="text-red-400 font-bold">₹{snack.price}</span>
                </div>
                <div class="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleSnackChange(snack.snack_id, Math.max(0, (selectedSnacks[snack.snack_id] || 0) - 1))}
                    class="w-8 h-8 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                  >
                    −
                  </button>
                  <span class="text-white w-8 text-center font-semibold">
                    {selectedSnacks[snack.snack_id] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSnackChange(snack.snack_id, Math.min(10, (selectedSnacks[snack.snack_id] || 0) + 1))}
                    class="w-8 h-8 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Summary and Submit */}
      {selectedSeats && (
        <div class="bg-gray-700 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-4">Booking Summary</h3>
          
          <div class="space-y-2 text-gray-300 mb-4">
            <div class="flex justify-between">
              <span>Movie:</span>
              <span class="font-semibold text-white">{movie.movie_name}</span>
            </div>
            <div class="flex justify-between">
              <span>Date:</span>
              <span>{selectedDate} ({formatDate(selectedDate)})</span>
            </div>
            <div class="flex justify-between">
              <span>Time:</span>
              <span>{formatTime(selectedTime)}</span>
            </div>
            <div class="flex justify-between">
              <span>Seats:</span>
              <span>{selectedSeats}</span>
            </div>
            
            {/* Snacks summary */}
            {Object.entries(selectedSnacks).some(([_, quantity]) => quantity > 0) && (
              <div>
                <span class="block mb-2">Snacks:</span>
                {Object.entries(selectedSnacks).map(([snackId, quantity]) => {
                  if (quantity === 0) return null;
                  const snack = snacks.find(s => s.snack_id === snackId);
                  return (
                    <div key={snackId} class="flex justify-between ml-4 text-sm">
                      <span>{snack?.name} x {quantity}</span>
                      <span>₹{snack ? snack.price * quantity : 0}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div class="border-t border-gray-600 pt-4">
            <div class="flex justify-between items-center text-2xl font-bold text-white">
              <span>Total Amount:</span>
              <span class="text-red-400">₹{calculateTotal()}</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !selectedDate || !selectedTime || !selectedSeats}
            class={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
              isSubmitting || !selectedDate || !selectedTime || !selectedSeats
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isSubmitting ? 'Processing...' : `Book Now - ₹${calculateTotal()}`}
          </button>
        </div>
      )}
    </form>
  );
}