package com.smart.eventbooking.service.impl;

import com.smart.eventbooking.entity.Booking;
import com.smart.eventbooking.entity.Payment;
import com.smart.eventbooking.repository.PaymentRepository;
import com.smart.eventbooking.service.PaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment createPayment(Booking booking, String method, String transactionId) {

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentMethod(method);
        payment.setPaymentStatus("SUCCESS");
        payment.setTransactionId(transactionId);

        return paymentRepository.save(payment);
    }
}