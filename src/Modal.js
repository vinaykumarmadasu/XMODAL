import React, { useState } from 'react';
import './index.css';

function Modal({ closeModal }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    // Clear the error message for the specific field
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;
    const newErrors = {};

    // Validate all fields are filled
    if (!username) newErrors.username = 'Please fill out this field.';
    if (!email) newErrors.email = 'Please fill out this field.';
    if (!phone) newErrors.phone = 'Please fill out this field.';
    if (!dob) newErrors.dob = 'Please fill out this field.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate email format
    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    // Validate phone number
    if (phone.length !== 10 || isNaN(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // Validate date of birth
    const dobDate = new Date(dob).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    if (dobDate >= today) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    // If all validations pass, reset form and close modal
    alert('Form submitted successfully!');
    setFormData({ username: '', email: '', phone: '', dob: '' });
    closeModal();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Fill Details</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}

          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && <p className="error-message">{errors.dob}</p>}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
