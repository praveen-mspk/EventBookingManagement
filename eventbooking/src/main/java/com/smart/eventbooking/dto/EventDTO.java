package com.smart.eventbooking.dto;

import java.time.LocalDate;

public class EventDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private LocalDate date;
    private double price;
    private int availableSeats;

    public EventDTO() {}

    public EventDTO(Long id, String title, String description,
                    String location, LocalDate date,
                    double price, int availableSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.date = date;
        this.price = price;
        this.availableSeats = availableSeats;
    }

    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getTitle() {
        return title;
    }
 
    public void setTitle(String title) {
        this.title = title;
    }
 
    public String getDescription() {
        return description;
    }
 
    public void setDescription(String description) {
        this.description = description;
    }
 
    public String getLocation() {
        return location;
    }
 
    public void setLocation(String location) {
        this.location = location;
    }
 
    public LocalDate getDate() {
        return date;
    }
 
    public void setDate(LocalDate date) {
        this.date = date;
    }
 
    public double getPrice() {
        return price;
    }
 
    public void setPrice(double price) {
        this.price = price;
    }
 
    public int getAvailableSeats() {
        return availableSeats;
    }
 
    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}