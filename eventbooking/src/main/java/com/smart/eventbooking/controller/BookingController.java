package com.smart.eventbooking.controller;

import com.smart.eventbooking.dto.BookingDTO;
import com.smart.eventbooking.dto.CreateBookingRequest;
import com.smart.eventbooking.entity.User;
import com.smart.eventbooking.service.BookingService;
import com.smart.eventbooking.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    public BookingController(BookingService bookingService,
                             UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @PostMapping
    public BookingDTO createBooking(
            @RequestBody CreateBookingRequest request,
            Authentication authentication) {

        String email = authentication.getName();
        User user = userService.getUserByEmail(email);

        return bookingService.createBooking(
                request.getEventId(),
                request.getNumberOfTickets(),
                user
        );
    }

    @GetMapping("/my")
    public List<BookingDTO> getMyBookings(Authentication authentication) {

        String email = authentication.getName();
        User user = userService.getUserByEmail(email);

        return bookingService.getBookingsByUser(user);
    }
}