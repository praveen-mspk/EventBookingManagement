package com.smart.eventbooking.service.impl;

import com.smart.eventbooking.service.StripePaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentServiceImpl implements StripePaymentService {

    @Override
    public PaymentIntent createPaymentIntent(long amount) {
        try {
            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setAmount(amount)
                            .setCurrency("inr")
                            .build();

            return PaymentIntent.create(params);

        } catch (StripeException e) {
            throw new RuntimeException("Stripe payment failed");
        }
    }
}