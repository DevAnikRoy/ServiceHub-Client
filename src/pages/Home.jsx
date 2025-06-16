import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Wrench, Clock, Star, Shield, Award } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    document.title = 'ServiceHub - Home';
    fetchPopularServices();
  }, []);

  const fetchPopularServices = async () => {
    
    fetch('http://localhost:3000/featuredservices')
    .then(res => res.json())
    .then(data => setPopularServices(data));
    
    ;
  };

  const features = [
    {
      icon: CheckCircle,
      title: 'Verified Professionals',
      description: 'All service providers are thoroughly vetted and verified for your peace of mind.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payments are protected with bank-level security and encryption.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any questions or issues.'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'We stand behind our services with satisfaction guarantees and quality assurance.'
    }
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Happy Customers' },
    { icon: Wrench, number: '500+', label: 'Service Providers' },
    { icon: Award, number: '50,000+', label: 'Services Completed' },
    { icon: Star, number: '4.9', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Professional
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}Home Services
              </span>
              <br />At Your Doorstep
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with trusted professionals for all your home repair and maintenance needs. 
              Quality service, fair pricing, and complete satisfaction guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
              >
                Browse Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/add-service"
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Become a Provider
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 opacity-20 dark:opacity-10"
        >
          <Wrench className="h-16 w-16 text-blue-500" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 right-10 opacity-20 dark:opacity-10"
        >
          <CheckCircle className="h-20 w-20 text-emerald-500" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most requested home services performed by trusted professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularServices.slice(0, 6).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
            >
              Show All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ServiceHub?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide a seamless experience connecting you with the best service professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experienced service providers on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
              >
                Get Started Today
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Browse Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}