package com.dataentry.service;

import java.util.List;

import com.dataentry.entity.Booking;

public interface BookingService {
	
	List<Booking> getAllBookings();
	Booking getBookingById(Integer bookingId);
	Booking addBooking(Booking booking);
	Booking updateBooking(Booking booking);
	String deleteBooking(Booking booking);
	
}
