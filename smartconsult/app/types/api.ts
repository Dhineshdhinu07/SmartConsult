export type User = {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: string;
};

export type Booking = {
  id: string;
  userId: string;
  expertId: string;
  expertName: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  date: string;
  time: string;
  duration: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
};

export type Expert = {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  price: number;
  availability: {
    day: string;
    slots: string[];
  }[];
  createdAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type CreateBookingRequest = {
  expertId: string;
  date: string;
  time: string;
  duration: number;
};

export type UpdateBookingRequest = Partial<CreateBookingRequest> & {
  status?: Booking['status'];
}; 