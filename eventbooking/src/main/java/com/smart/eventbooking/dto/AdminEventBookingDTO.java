package com.smart.eventbooking.dto;

public class AdminEventBookingDTO {

    private Long bookingId;
    private String userName;
    private String userEmail;
    private int numberOfTickets;
    private double totalAmount;
    private String bookingStatus;

    public AdminEventBookingDTO(
            Long bookingId,
            String userName,
            String userEmail,
            int numberOfTickets,
            double totalAmount,
            String bookingStatus
    ) {
        this.bookingId = bookingId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.numberOfTickets = numberOfTickets;
        this.totalAmount = totalAmount;
        this.bookingStatus = bookingStatus;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public int getNumberOfTickets() {
        return numberOfTickets;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }
}