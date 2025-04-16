import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaHome,
  FaHeart,
  FaStar,
  FaUserCheck,
  FaWallet
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// Hero images
const heroImages = [
  "/assets/1.jpeg",
  "/assets/2.jpeg",
  "/assets/3.jpeg",
];

const features = [
  {
    icon: FaShieldAlt,
    title: "Verified Hosts",
    description: "All hosts undergo strict verification process"
  },
  {
    icon: FaWallet,
    title: "Affordable Stays",
    description: "Rooms starting from ₹300/day with no hidden charges"
  },
  {
    icon: FaUserCheck,
    title: "Instant Booking",
    description: "Confirm your stay within minutes"
  },
  {
    icon: FaStar,
    title: "Premium Quality",
    description: "Curated listings with essential amenities"
  }
];

const Home = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroImages.map((img, index) => (
          <motion.div
            key={img}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentHeroIndex ? 1 : 0,
              scale: index === currentHeroIndex ? 1 : 1.1
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt="Featured Stay"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Find Your Perfect Budget Stay
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl"
          >
            Discover affordable rooms for students, families, and travelers 
            across India's major cities
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              to="/search"
              className="bg-green-600 text-white px-8 py-4 rounded-full text-lg
              hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <FaHome className="text-xl" />
              Explore Listings
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose StayEase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-green-600 text-4xl mb-4">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Listings */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-sm"
              >
                <img
                  src={`/assets/${id}.jpeg`}
                  alt={`Listing ${id}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Premium Room #{id}</h3>
                    <button className="text-gray-500 hover:text-red-500">
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <MdLocationOn className="text-green-600" />
                    <span className="text-gray-600">Noida Sector 62</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{500 + id * 100}/day
                    </span>
                    <Link
                      to={`/listing/${id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            What Our Guests Say
          </h2>
          <div className="space-y-8">
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "StayEase made finding affordable accommodation so easy during
                  my internship. The room was exactly as described!"
                </p>
                <div className="font-semibold">- Rohan, Student</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Stay?
          </h2>
          <p className="text-gray-200 mb-8 text-lg">
            Join thousands of satisfied guests who found their perfect budget stay
          </p>
          <Link
            to="/search"
            className="bg-white text-green-600 px-8 py-3 rounded-full text-lg
            hover:bg-gray-100 transition-all inline-block"
          >
            Browse All Listings
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;