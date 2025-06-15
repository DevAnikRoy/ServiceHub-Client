import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    document.title = 'ServiceHub - Manage Services';
    fetchMyServices();
  }, []);

  const fetchMyServices = async () => {
    // Mock data for user's services
    const mockServices = [
      {
        _id: '1',
        serviceName: 'Plumbing Repair Service',
        description: 'Professional plumbing services including pipe repair, leak fixing, and drain cleaning.',
        imageURL: 'https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg',
        price: '89',
        serviceArea: 'New York',
        providerName: currentUser?.displayName || 'Current User',
        providerImage: currentUser?.photoURL || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
        providerEmail: currentUser?.email
      },
      {
        _id: '2',
        serviceName: 'Home Electrical Installation',
        description: 'Complete electrical services for homes and offices with licensed electricians.',
        imageURL: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
        price: '125',
        serviceArea: 'New York',
        providerName: currentUser?.displayName || 'Current User',
        providerImage: currentUser?.photoURL || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
        providerEmail: currentUser?.email
      }
    ];
    
    setServices(mockServices);
    setLoading(false);
  };

  const handleDeleteService = async (serviceId, serviceName) => {
  // Show confirmation toast
  toast((t) => (
    <span>
      Are you sure you want to delete <b>"{serviceName}"</b>?
      <div className="mt-2 flex justify-end gap-2">
        <button
          className="px-3 py-1 bg-red-600 text-white rounded"
          onClick={async () => {
            toast.dismiss(t.id); 

            try {
              // Simulate API call or logic
              setServices((prev) => prev.filter(service => service._id !== serviceId));
              toast.success('Service deleted successfully!');
            } catch (error) {
              toast.error('Failed to delete service');
            }
          }}
        >
          Yes
        </button>
        <button
          className="px-3 py-1 bg-gray-300 text-black rounded"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </div>
    </span>
  ), {
    duration: Infinity,
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
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Manage Services
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all your service offerings in one place
            </p>
          </div>
          <Link
            to="/add-service"
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Service
          </Link>
        </motion.div>

        {/* Services List */}
        {services.length > 0 ? (
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="md:flex">
                  <div className="md:w-64 md:flex-shrink-0">
                    <img
                      src={service.imageURL}
                      alt={service.serviceName}
                      className="h-48 w-full md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {service.serviceName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ${service.price}
                            </span>
                          </span>
                          <span>•</span>
                          <span>{service.serviceArea}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          to={`/services/${service._id}`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View Service"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                          title="Edit Service"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id, service.serviceName)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
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
              <Plus className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No services yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start sharing your professional services with the community
            </p>
            <Link
              to="/add-service"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Service
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}