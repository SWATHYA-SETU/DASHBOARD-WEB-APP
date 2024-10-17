import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo'; // Make sure this path is correct
import { AuthProvider } from './autocontext';
import { ProtectedRoute } from './protectedroute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from "./components/footer";
import Marquee from "./components/marquee";
import "flowbite/dist/flowbite.css";
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import UserProfile from './pages/userprofile';
import AddHospital from './pages/addHospital'; // Add this import

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div className="App flex flex-col min-h-screen">
          <Marquee />
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route // Add this new route
                  path="/add-hospital"
                  element={
                    <ProtectedRoute>
                      <AddHospital />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;