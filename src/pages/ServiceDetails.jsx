import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, User, Mail, Calendar, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BookingModal from '../components/BookingModal';
import toast from 'react-hot-toast';

export default function ServiceDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'ServiceHub - Service Details';
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`https://service-assingment-server.vercel.app/services/${id}`);
      if (!response.ok) throw new Error("Failed to fetch service details");

      const data = await response.json();
      setService(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Could not load service details");
    } finally {
      setLoading(false);
    }
  };


  const handleBookService = async (bookingData) => {

    // console.log('Booking service:', bookingData);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bookingData);
      }, 1000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Service not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The service you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Service Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={service.imageURL}
              alt={service.serviceName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                ${service.price}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Information */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.serviceName}
                  </h1>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {service.serviceArea}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-emerald-500" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {service.price}
                      </span>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Service Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          Professional consultation
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          Quality materials and tools
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          Satisfaction guarantee
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          Clean-up after service
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Provider Information & Booking */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 sticky top-8"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Service Provider
                  </h3>

                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={service.providerImage}
                      alt={service.providerName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {service.providerName}
                      </h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4" />
                        <span>{service.providerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          (4.9)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service Area:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {service.serviceArea}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xl">
                        ${service.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Book Now</span>
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    Secure booking • Satisfaction guaranteed
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
        onBook={handleBookService}
      />
    </div>
  );
}