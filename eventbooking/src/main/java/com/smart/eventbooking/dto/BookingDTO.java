package com.smart.eventbooking.dto;

public class BookingDTO {

    private Long id;
    private String eventTitle;
    private int numberOfTickets;
    private double totalAmount;
    private String bookingStatus;

    public BookingDTO() {}

    public BookingDTO(Long id, String eventTitle,
                      int numberOfTickets, double totalAmount,
                      String bookingStatus) {
        this.id = id;
        this.eventTitle = eventTitle;
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
 
    public String getEventTitle() {
        return eventTitle;
    }
 
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
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