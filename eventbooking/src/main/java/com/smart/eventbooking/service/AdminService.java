package com.smart.eventbooking.service;

import com.smart.eventbooking.dto.AdminAnalyticsDTO;
import com.smart.eventbooking.dto.BookingDTO;

import java.util.List;

public interface AdminService {

    List<BookingDTO> getAllBookings();

    AdminAnalyticsDTO getAnalytics();
}