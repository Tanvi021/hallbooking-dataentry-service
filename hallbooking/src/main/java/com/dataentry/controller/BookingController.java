package com.dataentry.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dataentry.entity.Booking;
import com.dataentry.service.BookingService;

@CrossOrigin(maxAge = 3360)
@RestController
public class BookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable("id") Integer id) {
            return new ResponseEntity<>(bookingService.getBookingById(id),HttpStatus.OK);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return new ResponseEntity<>(bookingService.addBooking(booking), HttpStatus.CREATED);
    }

    @PatchMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable("id") Integer id, @RequestBody Booking booking) {
        Booking existingBooking = bookingService.getBookingById(id);
        if (existingBooking != null) {
            existingBooking.setApplicantName(booking.getApplicantName());
            existingBooking.setEmail(booking.getEmail());
            existingBooking.setMobileNo(booking.getMobileNo());
            existingBooking.setStartDate(booking.getStartDate());
            existingBooking.setEndDate(booking.getEndDate());
            existingBooking.setRent(booking.getRent());
            existingBooking.setAdditionalCharges(booking.getAdditionalCharges());
            existingBooking.setHallName(booking.getHallName());
            existingBooking.setBookingType(booking.getBookingType());
            existingBooking.setTimeSlot(booking.getTimeSlot());
            existingBooking.setStatus(booking.getStatus());
            existingBooking.setReceiptNo(booking.getReceiptNo());
            existingBooking.setReceiptDate(booking.getReceiptDate());
            existingBooking.setRemark(booking.getRemark());

            return new ResponseEntity<>(bookingService.updateBooking(existingBooking), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Integer id) {
    	String deleteMsg=null;
        Booking bookObj = bookingService.getBookingById(id);
    	if(bookObj != null) {
    		deleteMsg = bookingService.deleteBooking(bookObj);
    	}
        return new ResponseEntity<>(deleteMsg, HttpStatus.OK);
    }

}
