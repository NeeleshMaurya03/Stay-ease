// src/pages/ListingDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import db from "../db.json";
import {
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaUtensils,
  FaTv,
  FaSwimmingPool,
  FaDumbbell
} from "react-icons/fa";
import { MdPets, MdLocalLaundryService, MdSecurity, MdKitchen } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Load listing from local JSON
  useEffect(() => {
    const foundListing = db.listings.find(item => item.id === id);
    if (foundListing) {
      setListing(foundListing);
      setIsFavorite(foundListing.isFavorite || false);
    } else {
      navigate("/not-found");
    }
  }, [id, navigate]);

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We'll contact you soon.");
    setContactForm({ name: "", phone: "", email: "", message: "" });
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (!listing) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  // Amenities icons mapping
  const amenitiesIcons = {
    "Wi-Fi": <FaWifi className="text-green-600" />,
    "Parking": <FaParking className="text-green-600" />,
    "Air Conditioning": <FaSnowflake className="text-green-600" />,
    "Swimming Pool": <FaSwimmingPool className="text-green-600" />,
    "Gym": <FaDumbbell className="text-green-600" />,
    "Pets Allowed": <MdPets className="text-green-600" />,
    "Laundry": <MdLocalLaundryService className="text-green-600" />,
    "Security": <MdSecurity className="text-green-600" />,
    "Kitchen": <MdKitchen className="text-green-600" />,
    "TV": <FaTv className="text-green-600" />,
    "Home-Cooked Meals": <FaUtensils className="text-green-600" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <div className="flex gap-4">
            <button onClick={handleShare} className="text-gray-600 hover:text-green-600">
              <FaShare />
            </button>
            <button 
              onClick={toggleFavorite}
              className={`${isFavorite ? 'text-red-500' : 'text-gray-600'} hover:text-red-600`}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-green-600" />
            <span>{listing.address}</span>
          </div>
          <div className="flex gap-6 text-gray-700">
            <div className="flex items-center">
              <FaBed className="mr-2 text-green-600" />
              {listing.bedrooms} Bed{listing.bedrooms !== 1 && 's'}
            </div>
            <div className="flex items-center">
              <FaBath className="mr-2 text-green-600" />
              {listing.bathrooms} Bath{listing.bathrooms !== 1 && 's'}
            </div>
            <div className="flex items-center">
              <FaRulerCombined className="mr-2 text-green-600" />
              {listing.area}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-96">
            <img
              src={listing.images[activeImage]}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {listing.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-green-600' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.features.slice(0, showAllAmenities ? undefined : 6).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    {amenitiesIcons[feature]}
                    <span className="ml-2">{feature}</span>
                  </div>
                ))}
              </div>
              {listing.features.length > 6 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 text-green-600 hover:underline flex items-center"
                >
                  {showAllAmenities ? 'Show less' : `Show all ${listing.features.length} amenities`}
                  <IoIosArrowForward className={`ml-1 transition-transform ${showAllAmenities ? 'rotate-90' : ''}`} />
                </button>
              )}
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                Map Coming Soon
              </div>
              <div className="mt-4 space-y-2">
                {listing.nearbyPlaces?.map((place, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                    {place}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-2xl font-bold text-green-600">₹{listing.price}</span>
                  <span className="text-gray-500">/{listing.rentUnit}</span>
                </div>
                {listing.monthlyPrice && (
                  <div className="text-gray-600">
                    <span className="font-medium">₹{listing.monthlyPrice}</span>
                    <span className="text-sm">/month</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Available From:</span>
                  <span className="font-medium">
                    {new Date(listing.availableFrom).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Stay:</span>
                  <span className="font-medium">{listing.minimumStay} days</span>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors mb-4">
                Check Availability
              </button>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleFormChange}
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleFormChange}
                  placeholder="Phone"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  placeholder="Message"
                  rows="4"
                  className="w-full p-2 border rounded-lg"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail;