import type {
  ApiResponse,
  User,
  Booking,
  Expert,
  LoginRequest,
  RegisterRequest,
  CreateBookingRequest,
  UpdateBookingRequest,
} from '@/app/types/api';

const API_BASE_URL = 'http://127.0.0.1:8787';

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse response:', text);
      throw new Error('Invalid JSON response from server');
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
    }

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format: Expected JSON object');
    }

    return data;
  } catch (error) {
    console.error('Response error:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

function getAuthHeaders(token?: string) {
  return token ? { ...defaultHeaders, 'Authorization': `Bearer ${token}` } : defaultHeaders;
}

export const api = {
  auth: {
    login: async (credentials: LoginRequest): Promise<ApiResponse<{ token: string }>> => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    register: async (data: RegisterRequest): Promise<ApiResponse<{ token: string }>> => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    me: async (token: string): Promise<ApiResponse<User>> => {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(token),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    logout: async (token: string): Promise<ApiResponse<void>> => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        credentials: 'include',
      });
      return handleResponse(response);
    },
  },

  bookings: {
    create: async (token: string, data: CreateBookingRequest): Promise<ApiResponse<Booking>> => {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    getMyBookings: async (token: string): Promise<ApiResponse<Booking[]>> => {
      const response = await fetch(`${API_BASE_URL}/bookings/my`, {
        headers: getAuthHeaders(token),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    update: async (
      token: string,
      bookingId: string,
      data: UpdateBookingRequest
    ): Promise<ApiResponse<Booking>> => {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    delete: async (token: string, bookingId: string): Promise<ApiResponse<void>> => {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
        credentials: 'include',
      });
      return handleResponse(response);
    },
  },

  admin: {
    getAllBookings: async (token: string): Promise<ApiResponse<Booking[]>> => {
      const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
        headers: getAuthHeaders(token),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    updateBooking: async (
      token: string,
      bookingId: string,
      data: UpdateBookingRequest
    ): Promise<ApiResponse<Booking>> => {
      const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
        credentials: 'include',
      });
      return handleResponse(response);
    },

    deleteBooking: async (token: string, bookingId: string): Promise<ApiResponse<void>> => {
      const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
        credentials: 'include',
      });
      return handleResponse(response);
    },
  },

  experts: {
    getAll: async (): Promise<ApiResponse<Expert[]>> => {
      const response = await fetch(`${API_BASE_URL}/experts`, {
        headers: defaultHeaders,
        credentials: 'include',
      });
      return handleResponse(response);
    },

    getById: async (expertId: string): Promise<ApiResponse<Expert>> => {
      const response = await fetch(`${API_BASE_URL}/experts/${expertId}`, {
        headers: defaultHeaders,
        credentials: 'include',
      });
      return handleResponse(response);
    },
  },
}; 