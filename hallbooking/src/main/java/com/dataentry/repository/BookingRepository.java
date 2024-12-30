package com.dataentry.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dataentry.entity.Booking;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Integer> {

}
