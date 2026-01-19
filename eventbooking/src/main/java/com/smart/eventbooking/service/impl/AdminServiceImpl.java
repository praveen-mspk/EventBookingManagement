package com.smart.eventbooking.service.impl;

import com.smart.eventbooking.dto.AdminAnalyticsDTO;
import com.smart.eventbooking.dto.BookingDTO;
import com.smart.eventbooking.entity.Booking;
import com.smart.eventbooking.repository.BookingRepository;
import com.smart.eventbooking.repository.EventRepository;
import com.smart.eventbooking.repository.UserRepository;
import com.smart.eventbooking.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public AdminServiceImpl(BookingRepository bookingRepository,
                            UserRepository userRepository,
                            EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AdminAnalyticsDTO getAnalytics() {

        long totalUsers = userRepository.count();
        long totalEvents = eventRepository.count();
        long totalBookings = bookingRepository.count();

        double totalRevenue = bookingRepository.findAll()
                .stream()
                .mapToDouble(Booking::getTotalAmount)
                .sum();

        return new AdminAnalyticsDTO(
                totalUsers,
                totalEvents,
                totalBookings,
                totalRevenue
        );
    }

    private BookingDTO mapToDTO(Booking booking) {
        return new BookingDTO(
                booking.getId(),
                booking.getEvent().getTitle(),
                booking.getNumberOfTickets(),
                booking.getTotalAmount(),
                booking.getBookingStatus()
        );
    }
}