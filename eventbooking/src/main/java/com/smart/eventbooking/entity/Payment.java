package com.smart.eventbooking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(nullable = false)
    private String paymentMethod; // RAZORPAY / STRIPE

    @Column(nullable = false)
    private String paymentStatus; // SUCCESS / FAILED / PENDING

    @Column(unique = true)
    private String transactionId;

    public Payment() {}

    public Payment(Long id, Booking booking, String paymentMethod,
                   String paymentStatus, String transactionId) {
        this.id = id;
        this.booking = booking;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.transactionId = transactionId;
    }

    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public Booking getBooking() {
        return booking;
    }
 
    public void setBooking(Booking booking) {
        this.booking = booking;
    }
 
    public String getPaymentMethod() {
        return paymentMethod;
    }
 
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
 
    public String getPaymentStatus() {
        return paymentStatus;
    }
 
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
 
    public String getTransactionId() {
        return transactionId;
    }
 
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}