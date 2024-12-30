package com.dataentry.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dataentry.entity.Booking;
import com.dataentry.repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService{

	@Autowired
	private BookingRepository bookingRepository;

	@Override
	public List<Booking> getAllBookings() {
		
		return (List<Booking>) bookingRepository.findAll();
	}

	@Override
	public Booking getBookingById(Integer bookingId) {
		
		return bookingRepository.findById(bookingId).get();
	}

	@Override
	public Booking addBooking(Booking booking) {
		
		return bookingRepository.save(booking);
	}

	@Override
	public Booking updateBooking(Booking booking) {
	    if (booking.getId() != null) {
	        return bookingRepository.save(booking);
	    }
	    throw new IllegalArgumentException("Booking ID is required for update");
	}

	@Override
	public String deleteBooking(Booking booking) {
		
		bookingRepository.delete(booking);
		return "Booking cancelled successfully for bookingId : "+booking.getId();
	}
	

}
