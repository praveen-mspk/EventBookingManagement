import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppRoutes from "./routes/AppRoutes";

const stripePromise = loadStripe("pk_test_51SrB39Jb5dspcuUizTfiZvFsodoV3GCoYRyegAwXGtPXNpQkFnmwBF5qj47wsxO7Iaot2N593F3TrFhLpO86YGO100pkilShkN");

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <AppRoutes />
      </Elements>
    </>
  );
}

export default App;