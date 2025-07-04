import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Mail, Clock, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ServiceToDo() {
  const [todoServices, setTodoServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    document.title = 'ServiceHub - Service To-Do';
    fetchTodoServices();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchTodoServices();
    }
  }, [currentUser]);


  const fetchTodoServices = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTodoServices([]);
      setLoading(false);
      toast.error("No auth token found. Please log in again.");
      return;
    }

    try {
      const res = await fetch("https://service-assingment-server.vercel.app/servicetodo", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch service tasks");

      const data = await res.json();
      setTodoServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Could not load your service bookings");
    } finally {
      setLoading(false);
    }
  };


  const handleStatusUpdate = async (bookingId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://service-assingment-server.vercel.app/updatestatus/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Local state update
      setTodoServices(prevServices =>
        prevServices.map(service =>
          service._id === bookingId
            ? { ...service, serviceStatus: newStatus }
            : service
        )
      );

      toast.success(`Service status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service status");
    }
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
            Service To-Do
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage services booked by customers and update their status
          </p>
        </motion.div>

        {/* Todo Services List */}
        {todoServices.length > 0 ? (
          <div className="space-y-6">
            {todoServices.map((booking, index) => (
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
                            Customer: {booking.currentUserName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {booking.currentUserEmail}
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
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Special Instructions:
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {booking.specialInstruction}
                        </p>
                      </div>
                    )}

                    {/* Status Update Dropdown */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Update Status:
                        </span>
                        <div className="relative">
                          <select
                            value={booking.serviceStatus}
                            onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="working">Working</option>
                            <option value="completed">Completed</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
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
              <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No services to manage
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You don't have any services booked by customers yet. Add your services to start receiving bookings.
            </p>
            <Link
              to="/add-service"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
            >
              Add Service
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}