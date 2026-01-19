package com.smart.eventbooking.service;

import com.smart.eventbooking.entity.Booking;
import com.smart.eventbooking.entity.Payment;

public interface PaymentService {

    Payment createPayment(Booking booking, String method, String transactionId);
}