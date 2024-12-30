import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085'; // Replace with your backend URL

export const getAllBookings = async () => {
  const response = await axios.get(`${API_BASE_URL}/bookings`);
  return response.data;
};

export const createBooking = async (booking) => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, booking);
  return response.data;
};

export const updateBooking = async (id, booking) => {
  const response = await axios.patch(`${API_BASE_URL}/bookings/${id}`, booking);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/bookings/${id}`);
  return response.data;
};
