import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Your Ultimate Event <br className="hidden md:block" />
            Booking Destination
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Discover, book, and experience the most amazing events happening around you.
            Concerts, conferences, workshops — all in one place.
          </p>

          {token ? (
            role === "ADMIN" ? (
              <Link
                to="/admin"
                className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
              >
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/events"
                className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
              >
                Explore Events Now
              </Link>
            )
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-black/20 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose Smart Event Booking?
          </h2>
          <p className="text-gray-600 text-lg">
            A seamless and secure way to book your favorite events.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Diverse Events
            </h3>
            <p className="text-gray-600 text-sm">
              Access hundreds of curated events including concerts,
              conferences, workshops, and much more.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              100% Secure
            </h3>
            <p className="text-gray-600 text-sm">
              Industry-leading Stripe security ensures safe and protected payments.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Instant Tickets
            </h3>
            <p className="text-gray-600 text-sm">
              Get your e-tickets immediately after successful payment.
              No waiting, no hassle.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Lightning Fast
            </h3>
            <p className="text-gray-600 text-sm">
              Optimized platform for instant loading and smooth booking experience.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {[
            { step: "1️⃣", title: "Browse Events", desc: "Explore thousands of events tailored to your interests." },
            { step: "2️⃣", title: "Select Tickets", desc: "Choose ticket quantity and see instant pricing updates." },
            { step: "3️⃣", title: "Secure Payment", desc: "Complete purchase using safe and encrypted payment." },
            { step: "4️⃣", title: "Enjoy Events", desc: "Download tickets and enjoy your amazing experience." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="text-5xl mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;