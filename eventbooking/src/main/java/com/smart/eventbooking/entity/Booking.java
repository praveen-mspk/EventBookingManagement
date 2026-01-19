package com.smart.eventbooking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(nullable = false)
    private int numberOfTickets;

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private String bookingStatus; // CONFIRMED / CANCELLED

    public Booking() {}

    public Booking(Long id, User user, Event event,
                   int numberOfTickets, double totalAmount, String bookingStatus) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.numberOfTickets = numberOfTickets;
        this.totalAmount = totalAmount;
        this.bookingStatus = bookingStatus;
    }

    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public User getUser() {
        return user;
    }
 
    public void setUser(User user) {
        this.user = user;
    }
 
    public Event getEvent() {
        return event;
    }
 
    public void setEvent(Event event) {
        this.event = event;
    }
 
    public int getNumberOfTickets() {
        return numberOfTickets;
    }
 
    public void setNumberOfTickets(int numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }
 
    public double getTotalAmount() {
        return totalAmount;
    }
 
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
 
    public String getBookingStatus() {
        return bookingStatus;
    }
 
    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}