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
        color: "#374151",
        "::placeholder": {
          color: "#9CA3AF",
        },
      },
      invalid: {
        color: "#DC2626",
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            💳 Complete Payment
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Enter your card details to secure your booking
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm border border-red-300">
            {error}
          </div>
        )}

        <div className="border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-indigo-400 transition">
          <CardElement options={cardElementOptions} />
        </div>

        <button
          onClick={handlePay}
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
          }`}
        >
          {loading ? "⏳ Processing Payment..." : "Complete Payment"}
        </button>

        <p className="text-center text-xs text-gray-400">
          🔒 Your payment is secure and encrypted by Stripe
        </p>
      </div>
    </div>
  );
};

export default StripePayment;