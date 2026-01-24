import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../services/api";

const StripePayment = ({ bookingId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    if (!stripe || !elements) {
      setError("Stripe is not loaded yet. Please refresh the page.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post(
        `/payments/create-intent?bookingId=${bookingId}`
      );

      const clientSecret = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await api.post(
          `/payments/confirm?bookingId=${bookingId}&transactionId=${result.paymentIntent.id}`
        );

        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="payment-container">
      <h3>Complete Payment</h3>
      <p className="payment-subtitle">Enter your card details to complete the booking</p>

      {error && <div className="error-message">{error}</div>}

      <div className="card-element-wrapper">
        <CardElement options={cardElementOptions} />
      </div>

      <button
        onClick={handlePay}
        disabled={!stripe || loading}
        className="btn-primary btn-block btn-lg"
      >
        {loading ? "Processing Payment..." : "Complete Payment"}
      </button>

      <p className="payment-info">
        Your payment is secure and encrypted by Stripe
      </p>
    </div>
  );
};

export default StripePayment;