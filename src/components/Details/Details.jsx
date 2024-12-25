import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"; // For toast notification
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const Details = () => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const [campaign, setCampaign] = useState(null);
  const [formData, setFormData] = useState({
    quantity: "",
    itemType: "",
    pickupLocation: "",
    additionalNotes: "",
  });

  useEffect(() => {
    // Fetch campaign data from JSON or API
    fetch("../capming.json") // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        const selectedCampaign = data.find(
          (campaign) => campaign.id === parseInt(id)
        );
        setCampaign(selectedCampaign);
      })
      .catch((error) => console.error("Error fetching campaign data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show a success toast after submission
    toast.success("Thank you! We will reach your destination soon");
    // Clear the form
    setFormData({
      quantity: "",
      itemType: "",
      pickupLocation: "",
      additionalNotes: "",
    });
  };

  if (!campaign) {
    return <p>Loading campaign details...</p>;
  }

  return (
   <div>
    <Navbar></Navbar>
    <div className="container mx-auto px-4 py-8 w-3/4">
      <Toaster />
      <h1 className="text-3xl text-center font-bold mb-8">{campaign.title}</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={campaign.image} alt={campaign.title} className="w-full h-56  object-cover  " />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
          <p className="text-gray-500 text-sm mb-2"><strong>Division:</strong> {campaign.division}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold my-8">Donation Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quantity" className="block text-gray-700">Quantity of items</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter quantity"
            required
          />
        </div>
        <div>
          <label htmlFor="itemType" className="block text-gray-700">Item Type</label>
          <input
            type="text"
            id="itemType"
            name="itemType"
            value={formData.itemType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter item type (e.g., blanket, jacket)"
            required
          />
        </div>
        <div>
          <label htmlFor="pickupLocation" className="block text-gray-700">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter pickup location"
            required
          />
        </div>
        <div>
          <label htmlFor="additionalNotes" className="block text-gray-700">Additional Notes (Optional)</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Any additional instructions"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit Donation
        </button>
      </form>
    </div>
    <Footer></Footer>
   </div>
  );
};

export default Details;
