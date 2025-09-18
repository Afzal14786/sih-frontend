import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellCropForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    harvestDate: "",
    address: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create an image URL to preview later on homepage
    let imageUrl = "";
    if (formData.image) {
      imageUrl = URL.createObjectURL(formData.image);
    }

    const cropData = {
      name: formData.name,
      quantity: formData.quantity,
      price: formData.price,
      harvestDate: formData.harvestDate,
      address: formData.address,
      imageUrl,
    };

    // Save the crop data to localStorage
    localStorage.setItem("cropData", JSON.stringify(cropData));

    // Redirect to homepage after submission
    navigate("/");
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard the form?")) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Sell Your Crop</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g makai, chawal"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="e.g 50 K.G"
              required
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="e.g 15/kg * 50 = 750"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              placeholder="Address . . ."
              required
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Harvest Date */}
          <div>
            <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
              Select Harvesting Date
            </label>
            <input
              type="date"
              name="harvestDate"
              id="harvestDate"
              required
              value={formData.harvestDate}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Crop Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-700"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Submit & Discard Buttons */}
          <div className="md:col-span-2 flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
            >
              Submit Crop
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellCropForm;
