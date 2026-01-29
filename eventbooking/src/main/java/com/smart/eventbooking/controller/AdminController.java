package com.smart.eventbooking.controller;

import com.smart.eventbooking.dto.AdminAnalyticsDTO;
import com.smart.eventbooking.dto.AdminEventBookingDTO;
import com.smart.eventbooking.dto.BookingDTO;
import com.smart.eventbooking.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/bookings")
    public List<BookingDTO> getAllBookings() {
        return adminService.getAllBookings();
    }

    @GetMapping("/analytics")
    public AdminAnalyticsDTO getAnalytics() {
        return adminService.getAnalytics();
    }

    @GetMapping("/bookings/event/{eventId}")
    public List<AdminEventBookingDTO> getBookingsByEvent(
            @PathVariable Long eventId
    ) {
        return adminService.getBookingsByEvent(eventId);
    }

}