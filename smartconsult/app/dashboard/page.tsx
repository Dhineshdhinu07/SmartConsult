'use client';

import { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Calendar as CalendarInput } from '@/app/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Trash2, Calendar, Clock, ExternalLink, ArrowUpDown, Edit2, Video } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { format } from 'date-fns';
import { useAuth } from '@/app/context/auth-context';
import { api } from '@/app/lib/api-client';
import type { Booking } from '@/app/types/api';

type SortField = 'date' | 'consultant' | 'status';
type SortOrder = 'asc' | 'desc';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token');

      const response = await api.bookings.getMyBookings(token);
      if (!response.success) throw new Error(response.error);

      setBookings(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token');

      const response = await api.bookings.update(token, id, { status: 'cancelled' });
      if (!response.success) throw new Error(response.error);

      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    }
  };

  const updateBookingDateTime = async () => {
    if (!editingBooking || !selectedDate || !selectedTime) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token');

      const response = await api.bookings.update(token, editingBooking.id, {
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime
      });

      if (!response.success) throw new Error(response.error);

      setBookings(bookings.map(b => 
        b.id === editingBooking.id 
          ? { ...b, date: format(selectedDate, 'yyyy-MM-dd'), time: selectedTime }
          : b
      ));
      setEditingBooking(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    }
  };

  const sortBookings = (a: Booking, b: Booking) => {
    if (sortField === 'date') {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    if (sortField === 'consultant') {
      return sortOrder === 'asc' 
        ? a.expertName.localeCompare(b.expertName)
        : b.expertName.localeCompare(a.expertName);
    }
    return sortOrder === 'asc' 
      ? a.status.localeCompare(b.status)
      : b.status.localeCompare(a.status);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedBookings = [...bookings].sort(sortBookings);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='p-6 space-y-4'>
        <h1 className='text-2xl font-bold'>📅 My Bookings</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => toggleSort('consultant')} className="cursor-pointer">
                Consultant <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead onClick={() => toggleSort('date')} className="cursor-pointer">
                <Calendar className='inline-block w-4 h-4 mr-2' /> Date <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead><Clock className='inline-block w-4 h-4 mr-2' /> Time</TableHead>
              <TableHead onClick={() => toggleSort('status')} className="cursor-pointer">
                Status <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead><Video className='inline-block w-4 h-4 mr-2' /> Meeting Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.expertName}</TableCell>
                <TableCell>{format(new Date(booking.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Badge variant={
                    booking.status === 'confirmed' ? 'default' : 
                    booking.status === 'pending' ? 'secondary' : 
                    'destructive'
                  }>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {booking.meetingLink && (
                    <a 
                      href={booking.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      Join Meeting <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  {booking.status !== 'cancelled' && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant='outline' 
                            size='sm'
                            onClick={() => {
                              setEditingBooking(booking);
                              setSelectedDate(new Date(booking.date));
                              setSelectedTime(booking.time);
                            }}
                          >
                            <Edit2 className='w-4 h-4 mr-2' /> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reschedule Booking</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Select Date</label>
                              <CalendarInput
                                mode="single"
                                selected={selectedDate || undefined}
                                onSelect={handleDateSelect}
                                disabled={(date) => date < new Date()}
                                className="rounded-md border"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Select Time</label>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TIME_SLOTS.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              className="w-full"
                              onClick={updateBookingDateTime}
                              disabled={!selectedDate || !selectedTime}
                            >
                              Update Booking
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant='outline' size='sm' onClick={() => cancelBooking(booking.id)}>
                        <Trash2 className='w-4 h-4 mr-2' /> Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
} 