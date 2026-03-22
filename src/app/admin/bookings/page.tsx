'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Booking {
  id: number;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  trip_type: string;
  trip_date: string;
  party_size: number;
  total_amount: string;
  deposit_amount: string;
  deposit_paid: boolean;
  balance_paid: boolean;
  status: string;
  notes: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  useEffect(() => {
    fetchBookings();
  }, [currentDate]);

  const fetchBookings = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const response = await fetch(`/api/admin/bookings?year=${year}&month=${month}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => b.trip_date === dateStr);
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchBookings();
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-earth-400">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-earth-100">Bookings</h1>
          <p className="text-earth-400 mt-1">Manage your trip bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
            className="px-4 py-2 bg-earth-800/50 hover:bg-earth-700/50 text-earth-200 rounded-lg transition-colors"
          >
            {viewMode === 'calendar' ? 'List View' : 'Calendar View'}
          </button>
          <a
            href="/admin/bookings/new"
            className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-earth-950 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>New Booking</span>
          </a>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl overflow-hidden">
          {/* Calendar Header */}
          <div className="px-6 py-4 border-b border-earth-700/50 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-earth-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="text-earth-400" size={20} />
            </button>
            <h2 className="text-lg font-semibold text-earth-100">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-earth-800 rounded-lg transition-colors"
            >
              <ChevronRight className="text-earth-400" size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-earth-500 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before start of month */}
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-earth-800/20 rounded-lg" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayBookings = getBookingsForDate(day);
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div
                    key={day}
                    className={`
                      h-24 p-2 rounded-lg border overflow-hidden
                      ${isToday
                        ? 'border-gold-500/50 bg-gold-500/5'
                        : 'border-earth-700/30 bg-earth-800/20 hover:bg-earth-800/40'
                      }
                    `}
                  >
                    <div className={`text-sm mb-1 ${isToday ? 'text-gold-400 font-bold' : 'text-earth-400'}`}>
                      {day}
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      {dayBookings.slice(0, 2).map(booking => (
                        <div
                          key={booking.id}
                          className={`
                            text-xs px-1.5 py-0.5 rounded truncate cursor-pointer
                            ${booking.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : booking.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-earth-600/30 text-earth-400'
                            }
                          `}
                          title={`${booking.customer_name} - ${booking.trip_type}`}
                        >
                          {booking.customer_name}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-xs text-earth-500">
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-earth-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Trip</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Party</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-700/50">
                {bookings.length > 0 ? (
                  bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-earth-800/30">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-earth-100 font-medium">{booking.customer_name}</p>
                          <p className="text-earth-500 text-sm">{booking.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-earth-200">{booking.trip_type}</td>
                      <td className="px-6 py-4 text-earth-200">
                        {new Date(booking.trip_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-earth-200">{booking.party_size}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-earth-100">${parseFloat(booking.total_amount).toFixed(2)}</p>
                          <div className="flex gap-2 mt-1">
                            <span className={`text-xs ${booking.deposit_paid ? 'text-green-400' : 'text-yellow-400'}`}>
                              Deposit: {booking.deposit_paid ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                          inline-block px-2 py-1 rounded text-xs font-medium
                          ${booking.status === 'confirmed'
                            ? 'bg-green-400/10 text-green-400'
                            : booking.status === 'pending'
                            ? 'bg-yellow-400/10 text-yellow-400'
                            : booking.status === 'cancelled'
                            ? 'bg-red-400/10 text-red-400'
                            : 'bg-earth-600/30 text-earth-400'
                          }
                        `}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/admin/bookings/${booking.id}`}
                            className="p-2 hover:bg-earth-700 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="text-earth-400" size={16} />
                          </a>
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                                title="Confirm booking"
                              >
                                <CheckCircle className="text-green-400" size={16} />
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                title="Cancel booking"
                              >
                                <XCircle className="text-red-400" size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-earth-500">
                      No bookings found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
