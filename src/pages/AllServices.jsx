import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

export default function AllServices() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'ServiceHub - All Services';
    fetchAllServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, services]);

  const fetchAllServices = async () => {
    // Mock data for all services
    const mockServices = [
      {
        _id: '1',
        serviceName: 'Plumbing Repair',
        description: 'Professional plumbing services including pipe repair, leak fixing, and drain cleaning. Our certified plumbers ensure quality work with guaranteed results.',
        imageURL: 'https://www.robinsonsplumbingservice.com/wp-content/uploads/2022/06/AdobeStock_187023351-1024x696.jpeg',
        price: '89',
        serviceArea: 'New York',
        providerName: 'John Smith',
        providerImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
        providerEmail: 'john@example.com'
      },
      {
        _id: '2',
        serviceName: 'Electrical Installation',
        description: 'Complete electrical services for homes and offices. Licensed electricians providing safe and reliable installations with modern equipment.',
        imageURL: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
        price: '125',
        serviceArea: 'Los Angeles',
        providerName: 'Sarah Johnson',
        providerImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
        providerEmail: 'sarah@example.com'
      },
      {
        _id: '3',
        serviceName: 'AC Repair & Maintenance',
        description: 'Expert air conditioning repair and maintenance services. Keep your home cool and comfortable year-round with our HVAC specialists.',
        imageURL: 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg',
        price: '95',
        serviceArea: 'Chicago',
        providerName: 'Mike Davis',
        providerImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        providerEmail: 'mike@example.com'
      },
      {
        _id: '4',
        serviceName: 'Kitchen Renovation',
        description: 'Transform your kitchen with our complete renovation services. Modern designs and quality craftsmanship guaranteed for your dream kitchen.',
        imageURL: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
        price: '2500',
        serviceArea: 'Miami',
        providerName: 'Emily Brown',
        providerImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        providerEmail: 'emily@example.com'
      },
      {
        _id: '5',
        serviceName: 'House Painting',
        description: 'Professional interior and exterior painting services. High-quality paints and expert application for lasting results and beautiful finishes.',
        imageURL: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg',
        price: '450',
        serviceArea: 'Houston',
        providerName: 'David Wilson',
        providerImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        providerEmail: 'david@example.com'
      },
      {
        _id: '6',
        serviceName: 'Garden Landscaping',
        description: 'Beautiful garden design and landscaping services. Create your dream outdoor space with our expert team of landscape designers.',
        imageURL: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg',
        price: '800',
        serviceArea: 'Seattle',
        providerName: 'Lisa Garcia',
        providerImage: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
        providerEmail: 'lisa@example.com'
      },
      {
        _id: '7',
        serviceName: 'Roof Repair',
        description: 'Comprehensive roofing services including repair, replacement, and maintenance. Protect your home with our experienced roofing contractors.',
        imageURL: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
        price: '350',
        serviceArea: 'Denver',
        providerName: 'Robert Taylor',
        providerImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
        providerEmail: 'robert@example.com'
      },
      {
        _id: '8',
        serviceName: 'Bathroom Renovation',
        description: 'Complete bathroom remodeling services. From design to installation, we create beautiful and functional bathroom spaces.',
        imageURL: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        price: '1800',
        serviceArea: 'Phoenix',
        providerName: 'Jennifer Lee',
        providerImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        providerEmail: 'jennifer@example.com'
      },
      {
        _id: '9',
        serviceName: 'Carpet Cleaning',
        description: 'Professional carpet and upholstery cleaning services. Deep cleaning solutions that remove stains and restore your carpets.',
        imageURL: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg',
        price: '120',
        serviceArea: 'Atlanta',
        providerName: 'Michael Brown',
        providerImage: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
        providerEmail: 'michael@example.com'
      },
      {
        _id: '10',
        serviceName: 'Window Cleaning',
        description: 'Professional window cleaning for residential and commercial properties. Crystal clear results with eco-friendly cleaning solutions.',
        imageURL: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg',
        price: '75',
        serviceArea: 'Portland',
        providerName: 'Amanda White',
        providerImage: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg',
        providerEmail: 'amanda@example.com'
      },
      {
        _id: '11',
        serviceName: 'Furniture Assembly',
        description: 'Expert furniture assembly service for all types of furniture. Save time and ensure proper assembly with our skilled technicians.',
        imageURL: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
        price: '60',
        serviceArea: 'San Francisco',
        providerName: 'Chris Miller',
        providerImage: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg',
        providerEmail: 'chris@example.com'
      },
      {
        _id: '12',
        serviceName: 'Home Security Installation',
        description: 'Complete home security system installation and setup. Protect your family and property with modern security solutions.',
        imageURL: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg',
        price: '295',
        serviceArea: 'Boston',
        providerName: 'Kevin Jones',
        providerImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg',
        providerEmail: 'kevin@example.com'
      }
    ];
    
    setServices(mockServices);
    setFilteredServices(mockServices);
    setLoading(false);
  };

  const filterServices = () => {
    if (!searchTerm.trim()) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(service =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceArea.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse through our comprehensive collection of professional home services
          </p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Filter className="h-5 w-5 mr-2" />
              <span>{filteredServices.length} services found</span>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              
               
                <ServiceCard key={service._id} service={service} />
              
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No services found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or browse all available services
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}