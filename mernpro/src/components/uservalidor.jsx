import React, { useState, useEffect } from 'react';
import { UserResponseSchema } from '../schemas/usersvalidators';

const UserValidator = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxAge, setMaxAge] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => {
        // Validate API response with Zod
        const validation = UserResponseSchema.safeParse(data);
        if (validation.success) {
          setUsers(validation.data.users);
        } else {
          setError("Data validation failed! API returned unexpected format.");
          console.error(validation.error);
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user => {
    if (!maxAge) return true;
    return user.age <= Number(maxAge);
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Directory</h1>
          <p className="text-gray-500 text-sm mt-1"> Our Company Users </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
          <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Max Age (Years):</label>
          <input 
            type="number" 
            placeholder="e.g. 30" 
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            className="w-24 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-gray-800 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm border border-red-200">
          <strong>Oops!</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col items-center p-6">
                <img 
                  src={user.image} 
                  alt={user.firstName} 
                  className="w-24 h-24 rounded-full border-4 border-indigo-100 mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500 mb-4 text-center">{user.email}</p>
                
                <div className="mt-auto pt-4 flex w-full justify-between items-center border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-600">Age:</span>
                  <span className="text-lg font-bold text-indigo-600">{user.age} yrs</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="text-gray-500 mt-1">Try increasing the max age above {maxAge} years.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserValidator;
