import React, { useState, useEffect, useCallback } from 'react';
import SymptomPredictor from '../components/SymptomPredictor';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const AIDashboard = () => {
  const [location, setLocation] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const requestLocation = useCallback(() => {
    setIsRefreshing(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          localStorage.setItem('userLocation', JSON.stringify(newLocation));
          fetchAreaName(newLocation.latitude, newLocation.longitude);
          setIsRefreshing(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ error: "Unable to retrieve location" });
          setIsRefreshing(false);
        }
      );
    } else {
      setLocation({ error: "Geolocation is not supported by this browser" });
      setIsRefreshing(false);
    }
  }, []);

  const fetchAreaName = async (lat, lng) => {
    const apiKey = 'a765827074be4fe1826ddc54d42af795';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const formattedAddress = result.formatted;
        setAreaName(formattedAddress);
      } else {
        setAreaName("Area name not found");
      }
    } catch (error) {
      console.error("Error fetching area name:", error);
      setAreaName("Error fetching area name");
    }
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setLocation(parsedLocation);
      fetchAreaName(parsedLocation.latitude, parsedLocation.longitude);
    } else {
      requestLocation();
    }
  }, [requestLocation]);

  const handleRefresh = () => {
    localStorage.removeItem('userLocation');
    requestLocation();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">AI Health Dashboard</h1>
      
      {location && !location.error && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold">Your Location</p>
              <p>Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}</p>
              {areaName && (
                <p className="mt-2">
                  <span className="font-semibold">Area:</span> {areaName}
                </p>
              )}
            </div>
            <button 
              onClick={handleRefresh} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
              disabled={isRefreshing}
            >
              <ArrowPathIcon className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Location'}</span>
            </button>
          </div>
        </div>
      )}

      {location && location.error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Location Information</p>
          <p>{location.error}</p>
          <button 
            onClick={handleRefresh} 
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
            disabled={isRefreshing}
          >
            <ArrowPathIcon className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Try Again'}</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">AI-Powered Health Predictions</h2>
          <SymptomPredictor />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Latest Health Research</h2>
          <ul className="space-y-2">
            <li>
              <button className="text-accent hover:underline text-left">New study on the impact of AI in early disease detection</button>
            </li>
            <li>
              <button className="text-accent hover:underline text-left">Machine learning models improve drug discovery process</button>
            </li>
            <li>
              <button className="text-accent hover:underline text-left">AI-assisted personalized treatment plans show promising results</button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">AI in Healthcare: What's Next?</h2>
        <p className="text-gray-700">
          Artificial Intelligence is revolutionizing healthcare by improving diagnosis accuracy, 
          treatment effectiveness, and patient care. From predictive analytics to robotic surgery, 
          AI is paving the way for more personalized and efficient healthcare solutions.
        </p>
        <button className="mt-4 bg-secondary text-white py-2 px-4 rounded hover:bg-secondary-dark transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AIDashboard;