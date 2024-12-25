import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const Campaigns = () => {
  // State to store campaign data
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch('../capming.json')  // Replace with your actual API URL
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => {
        setCampaigns(data);  // Set the campaign data to state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error);  // Set error if any occurs during the fetch
        setLoading(false);  // Set loading to false if there is an error
      });
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  if (loading) {
    return <p className="text-center text-xl text-gray-500">Loading campaigns...</p>;  // Show a loading message while data is being fetched
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Error loading campaigns: {error.message}</p>;  // Show an error message if something goes wrong
  }

  return (
    <div>
      <Navbar /> {/* Navbar Component */}
      
      <Banner /> {/* Banner Component (Optional) */}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-extrabold text-gray-900 mb-12">Donation Campaigns</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{campaign.title}</h3>
                <p className="text-gray-600 text-sm mt-2 mb-4">{campaign.description}</p>
                <p className="text-gray-500 text-sm"><strong>Division:</strong> {campaign.division}</p>
                <a 
                  href={`/campaigns/${campaign.id}`} 
                  className="block text-center mt-4 bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition"
                >
                  Donate Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default Campaigns;
