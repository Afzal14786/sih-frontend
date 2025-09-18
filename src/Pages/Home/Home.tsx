import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CropData {
  name: string;
  quantity: string;
  price: string;
  harvestDate: string;
  address: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  // For demo, load from localStorage (replace with backend or context in real app)
  const [crop, setCrop] = useState<CropData | null>(null);

  useEffect(() => {
    const storedCrop = localStorage.getItem("cropData");
    if (storedCrop) {
      setCrop(JSON.parse(storedCrop));
    }
  }, []);

  if (!crop) {
    // No crop data -> Show "Sell Your Crop" card
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to AgriTech</h2>
          <p className="mb-6">You have not sold any crop yet.</p>
          <Link
            to="/sell"
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Sell Your Crop
          </Link>
        </div>
      </div>
    );
  }

  // Crop data exists -> Show details card
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl p-6 md:p-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crop Image */}
        <div>
          <img
            src={crop.imageUrl}
            alt={crop.name}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        {/* Crop Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-green-700">{crop.name}</h2>
            <p className="mb-2">
              <strong>Quantity:</strong> {crop.quantity}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> {crop.price}
            </p>
            <p className="mb-2">
              <strong>Harvest Date:</strong> {new Date(crop.harvestDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {crop.address}
            </p>
          </div>
          <Link
            to="/sell"
            className="mt-6 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Sell Another Crop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
