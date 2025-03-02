export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: 'user' | 'expert' | 'admin';
  createdAt: string;
  updatedAt: string;
}

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

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

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