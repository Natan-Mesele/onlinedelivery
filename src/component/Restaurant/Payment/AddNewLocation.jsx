import React, { useState } from 'react';

function AddNewLocation({ onClose, onSave }) {
  const [locationDetails, setLocationDetails] = useState({
    name: '',
    description: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationDetails({
      ...locationDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationDetails.name && locationDetails.description && locationDetails.phone) {
      onSave(locationDetails);
      onClose();  // Close the popup after saving the location
    } else {
      alert('All fields are required!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
        
        {/* Google Map Embed */}
        <div className="mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18499.68485934746!2d38.495503500000005!3d7.032923149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1735568094312!5m2!1sen!2set"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Form to add location details */}
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-2">Create a name for your location (required)</label>
          <input
            type="text"
            name="name"
            placeholder="Location Name"
            value={locationDetails.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <label className="block text-sm font-semibold mb-2">Describe your location (required)</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={locationDetails.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <label className="block text-sm font-semibold mb-2">Telephone number (required)</label>
          <input
            type="tel"
            name="phone"
            placeholder="Telephone Number"
            value={locationDetails.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
            Save Location
          </button>
        </form>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddNewLocation;
