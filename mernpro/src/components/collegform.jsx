import React, { useState } from 'react';
import { CollegeLoginSchema } from '../schemas/user';

const CollegeLoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    dept: '',
    email: '',
    login: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    const validationResult = CollegeLoginSchema.safeParse(formData);

    if (!validationResult.success) {
      const flatErrors = validationResult.error.flatten().fieldErrors;
      const formattedErrors = {};
      for (const key in flatErrors) {
        formattedErrors[key] = flatErrors[key][0];
      }
      setErrors(formattedErrors);
    } else {
      setSuccess('Login successful! Welcome to Sreyas Institute of Engineering.');
      console.log("Validated Data:", validationResult.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Sreyas Institute of Engineering</h2>
        <p className="text-sm text-gray-500 mt-1">Student Login Portal</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md shadow-sm">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Roll Number</label>
          <input 
            type="text" 
            name="rollno" 
            value={formData.rollno} 
            onChange={handleChange} 
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${errors.rollno ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
            placeholder="21XXXX0001"
          />
          {errors.rollno && <p className="mt-1 text-sm text-red-500">{errors.rollno}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
          <select 
            name="dept" 
            value={formData.dept} 
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors bg-white ${errors.dept ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
          >
            <option value="" disabled>Select Department</option>
            <option value="cse">Computer Science (CSE)</option>
            <option value="ece">Electronics (ECE)</option>
            <option value="ds">Data Science (DS)</option>
            <option value="ailm">AI & Machine Learning (AILM)</option>
          </select>
          {errors.dept && <p className="mt-1 text-sm text-red-500">{errors.dept}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
            placeholder="student@sreyas.ac.in"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Login ID / Username</label>
          <input 
            type="text" 
            name="login" 
            value={formData.login} 
            onChange={handleChange} 
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${errors.login ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
            placeholder="Your login id"
          />
          {errors.login && <p className="mt-1 text-sm text-red-500">{errors.login}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
        >
          Login Securely
        </button>
      </form>
    </div>
  );
};

export default CollegeLoginForm;
