import React, { useState } from 'react';
import { useCartStore } from '../store/storeProducts';

const StorePage = ({ navigateToProducts }) => {
  const { cart, removeFromCart, resetCart } = useCartStore();
  const [billingType, setBillingType] = useState('credit_card');
  const [checkedOut, setCheckedOut] = useState(false);

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <div className="max-w-4xl mx-auto p-10 bg-white min-h-screen text-center mt-10 rounded-xl shadow-lg border border-gray-100">
        <svg className="mx-auto h-20 w-20 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-xl text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-gray-500 mb-8">You paid <span className="font-bold text-gray-800">${totalCost}</span> via {billingType.replace('_', ' ').toUpperCase()}.</p>
        <button 
          onClick={() => {
            resetCart();
            setCheckedOut(false);
            navigateToProducts();
          }}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
        <button 
          onClick={navigateToProducts}
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          &larr; Back to Products
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-400">Your cart is empty</h3>
          <p className="text-gray-500 mt-2">Add some products to see them here.</p>
          <button 
            onClick={navigateToProducts}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item, idx) => (
                  <li key={idx} className="p-6 flex items-center hover:bg-gray-50 transition-colors">
                    <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-contain rounded-md bg-gray-100 border border-gray-200" />
                    <div className="ml-6 flex-1">
                      <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                    </div>
                    <div className="ml-6 flex flex-col items-end">
                      <p className="text-xl font-extrabold text-indigo-600">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(idx)}
                        className="mt-2 text-sm text-red-500 hover:text-red-700 font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Order Summary</h3>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold text-gray-900">{cart.length}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Total Cost:</span>
                <span className="text-2xl font-extrabold text-indigo-600">${totalCost}</span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Method</label>
                <select 
                  value={billingType} 
                  onChange={(e) => setBillingType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                >
                  <option value="credit_card">Credit / Debit Card</option>
                  <option value="upi">UPI / Netbanking</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </select>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 hover:shadow-xl active:scale-95 transition-all text-lg mb-3"
              >
                Proceed to Pay ${totalCost}
              </button>
              
              <button 
                onClick={resetCart}
                className="w-full py-3 bg-red-100 text-red-600 font-bold rounded-lg shadow-sm border border-red-200 hover:bg-red-200 active:scale-95 transition-all"
              >
                Reset Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePage;
