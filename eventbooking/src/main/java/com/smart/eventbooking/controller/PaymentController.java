package com.smart.eventbooking.controller;

import com.smart.eventbooking.entity.Booking;
import com.smart.eventbooking.repository.BookingRepository;
import com.smart.eventbooking.service.PaymentService;
import com.smart.eventbooking.service.StripePaymentService;
import com.stripe.model.PaymentIntent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    private final StripePaymentService stripePaymentService;
    private final PaymentService paymentService;
    private final BookingRepository bookingRepository;

    public PaymentController(StripePaymentService stripePaymentService,
                             PaymentService paymentService,
                             BookingRepository bookingRepository) {
        this.stripePaymentService = stripePaymentService;
        this.paymentService = paymentService;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/create-intent")
    public String createPaymentIntent(@RequestParam Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        long amountInPaise = (long) (booking.getTotalAmount() * 100);

        PaymentIntent intent =
                stripePaymentService.createPaymentIntent(amountInPaise);

        return intent.getClientSecret();
    }

    @PostMapping("/confirm")
    public void confirmPayment(@RequestParam Long bookingId,
                               @RequestParam String transactionId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        paymentService.createPayment(
                booking,
                "STRIPE",
                transactionId
        );
    }
}