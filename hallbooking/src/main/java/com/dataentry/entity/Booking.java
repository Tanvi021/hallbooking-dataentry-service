package com.dataentry.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "bookings")
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "applicant_name", nullable = false)
    private String applicantName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mobile_no", nullable = false)
    private long mobileNo;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "rent", nullable = false)
    private Integer rent;

    @Column(name = "additional_charges")
    private Integer additionalCharges;

    @Column(name = "hall_name", nullable = false)
    private String hallName;

    @Column(name = "booking_type")
    private String bookingType;

    @Column(name = "time_slot")
    private String timeSlot;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "receipt_no", nullable = false)
    private String receiptNo;

    @Column(name = "receipt_date", nullable = false)
    private Date receiptDate;

    @Column(name = "remark")
    private String remark;

	public Integer getTotal() {
		return rent + additionalCharges;
	}

	public void setTotal(int total) {
	}
}
