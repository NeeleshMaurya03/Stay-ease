// src/pages/SearchPage.jsx
import { useEffect, useState } from 'react';

import db from '../db.json';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
const SearchPage = () => {
    const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    query: '',
    minPrice: '',
    maxPrice: '',
    propertyType: 'all'
  });

  // Initialize filters from URL params
  useEffect(() => {
    setFilters({
      query: searchParams.get('query') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      propertyType: searchParams.get('type') || 'all'
    });
  }, [searchParams]);

  // Filter listings
  const filteredListings = db.listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(filters.query.toLowerCase());
    const matchesPrice = (
      (!filters.minPrice || listing.price >= Number(filters.minPrice)) && 
      (!filters.maxPrice || listing.price <= Number(filters.maxPrice)) // Added missing parenthesis
    );
    const matchesType = filters.propertyType === 'all' || 
      listing.propertyType === filters.propertyType;
  
    return matchesSearch && matchesPrice && matchesType;
  });

  // Unique property types
  const propertyTypes = ['all', ...new Set(db.listings.map(l => l.propertyType))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Filters */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search listings..."
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.query}
              onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
            />

            {/* Min Price */}
            <input
              type="number"
              placeholder="Min price"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.minPrice}
              onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            />

            {/* Max Price */}
            <input
              type="number"
              placeholder="Max price"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.maxPrice}
              onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            />

            {/* Property Type */}
            <select
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.propertyType}
              onChange={e => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No listings found matching your criteria</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img 
                  src={listing.images[0]} 
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{listing.name}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      ₹{listing.price}/day
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.features.slice(0, 3).map((feature, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★ {listing.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({listing.reviewsCount})</span>
                    </div>
                    <button 
    onClick={() => navigate(`/listing/${listing.id}`)}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
  >
    View Details
  </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;