import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Mail, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function BookedServices() {
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    document.title = 'ServiceHub - Booked Services';
    fetchBookedServices();
  }, []);

  const fetchBookedServices = async () => {
    // Mock data for booked services
    const mockBookedServices = [
      {
        _id: '1',
        serviceId: '3',
        serviceName: 'AC Repair & Maintenance',
        serviceImage: 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg',
        providerEmail: 'mike@example.com',
        providerName: 'Mike Davis',
        currentUserEmail: currentUser?.email,
        currentUserName: currentUser?.displayName || currentUser?.email,
        serviceTakingDate: '2024-01-15',
        specialInstruction: 'Please check both living room and bedroom AC units. The living room unit is making unusual noise.',
        price: '95',
        serviceStatus: 'pending',
        bookingDate: '2024-01-10'
      },
      {
        _id: '2',
        serviceId: '5',
        serviceName: 'House Painting',
        serviceImage: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg',
        providerEmail: 'david@example.com',
        providerName: 'David Wilson',
        currentUserEmail: currentUser?.email,
        currentUserName: currentUser?.displayName || currentUser?.email,
        serviceTakingDate: '2024-01-20',
        specialInstruction: 'Need exterior painting for front and side walls. Prefer light blue color similar to the sample shown.',
        price: '450',
        serviceStatus: 'working',
        bookingDate: '2024-01-12'
      },
      {
        _id: '3',
        serviceId: '9',
        serviceName: 'Carpet Cleaning',
        serviceImage: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg',
        providerEmail: 'michael@example.com',
        providerName: 'Michael Brown',
        currentUserEmail: currentUser?.email,
        currentUserName: currentUser?.displayName || currentUser?.email,
        serviceTakingDate: '2024-01-08',
        specialInstruction: 'Deep cleaning required for living room carpet. There are some pet stains that need special attention.',
        price: '120',
        serviceStatus: 'completed',
        bookingDate: '2024-01-05'
      }
    ];
    
    setBookedServices(mockBookedServices);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'working':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Booked Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your service bookings and their current status
          </p>
        </motion.div>

        {/* Booked Services List */}
        {bookedServices.length > 0 ? (
          <div className="space-y-6">
            {bookedServices.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="md:flex">
                  <div className="md:w-64 md:flex-shrink-0">
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="h-48 w-full md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {booking.serviceName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.serviceStatus)}`}>
                          <Clock className="w-3 h-3 mr-1" />
                          {booking.serviceStatus.charAt(0).toUpperCase() + booking.serviceStatus.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          ${booking.price}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Booking ID: #{booking._id}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Provider: {booking.providerName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {booking.providerEmail}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Service Date: {formatDate(booking.serviceTakingDate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Booked: {formatDate(booking.bookingDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {booking.specialInstruction && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Special Instructions:
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {booking.specialInstruction}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No booked services
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't booked any services yet. Browse available services to get started.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
            >
              Browse Services
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}