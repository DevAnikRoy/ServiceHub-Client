import { motion } from 'framer-motion';
import { Eye, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service, showViewDetails = true }) {
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
        loading='lazy'
          src={service.imageURL}
          alt={service.serviceName}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${service.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {service.serviceName}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {truncateDescription(service.description)}
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {service.serviceArea}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {service.providerName}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {service.price}
            </span>
          </div>
        </div>

        {showViewDetails && (
          <Link
            to={`/services/${service._id}`}
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}