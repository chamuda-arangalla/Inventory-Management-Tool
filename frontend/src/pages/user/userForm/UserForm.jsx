import React, { useState } from 'react';
import "./Userform.css";
import { toast } from "react-toastify";

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    nic: '',
    birthDate: '',
    designation: '',
    marriedStatus: 'single',
    age: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    ['firstName', 'lastName', 'employeeId', 'nic', 'birthDate', 'designation', 'age'].forEach(field => {
      if (!formData[field]) newErrors[field] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', employeeId: '', nic: '', birthDate: '', designation: '', marriedStatus: 'single', age: '', image: null });
    setPreview(null);
    setErrors({});
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image') {
        if (value) data.append('image', value);
      } else {
        data.append(key, value);
      }
    });

    try {
      setLoading(true);
      const response = await fetch('/api/users/add', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('User added successfully!');
        toast.success("User added successfully!!");
        resetForm();
        if (onSubmit) onSubmit(result.data);
      } else {
        setMessage(result.message || 'Failed to add user');
      }
    } catch (err) {
      setMessage('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">User Registration</h2>
      {loading && <p className="text-center text-blue-600 mb-2">Loading...</p>}
      {message && (<div className={`custom-alert ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</div>)}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={preview || 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-200 object-cover"
          />
          <label htmlFor="image" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-3.586l-1.707-1.707A1 1 0 0010.586 3H9.414a1 1 0 00-.707.293L7 5H4z" />
              <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['firstName', 'lastName', 'employeeId', 'nic', 'designation'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="marriedStatus"
              value={formData.marriedStatus}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
