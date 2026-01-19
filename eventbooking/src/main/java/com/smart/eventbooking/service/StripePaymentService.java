package com.smart.eventbooking.service;

import com.stripe.model.PaymentIntent;

public interface StripePaymentService {
    PaymentIntent createPaymentIntent(long amount);
}