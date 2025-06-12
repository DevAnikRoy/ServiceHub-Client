import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllServices from './pages/AllServices';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddService from './pages/AddService';
import ManageServices from './pages/ManageServices';
import BookedServices from './pages/BookedServices';
import ServiceToDo from './pages/ServiceToDo';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<AllServices />} />
                <Route path="/services/:id" element={
                  <PrivateRoute>
                    <ServiceDetails />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-service" element={
                  <PrivateRoute>
                    <AddService />
                  </PrivateRoute>
                } />
                <Route path="/manage-services" element={
                  <PrivateRoute>
                    <ManageServices />
                  </PrivateRoute>
                } />
                <Route path="/booked-services" element={
                  <PrivateRoute>
                    <BookedServices />
                  </PrivateRoute>
                } />
                <Route path="/service-todo" element={
                  <PrivateRoute>
                    <ServiceToDo />
                  </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;