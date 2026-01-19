import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import api from "../services/api";

const StripePayment = ({ bookingId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) {
      alert("Stripe not loaded yet");
      return;
    }

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
        alert(result.error.message);
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
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div>
      <h3>Payment</h3>
      <CardElement />
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
};

export default StripePayment;