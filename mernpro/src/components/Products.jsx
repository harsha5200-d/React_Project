import React, { useState, useEffect } from 'react';
import { ProductResponseSchema } from '../schemas/cart';
import { useCartStore } from '../store/storeProducts';

const Products = () => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const maxPrice = useCartStore((state) => state.maxPrice);
  const setMaxPrice = useCartStore((state) => state.setMaxPrice);
  const searchQuery = useCartStore((state) => state.searchQuery);
  const setSearchQuery = useCartStore((state) => state.setSearchQuery);
  const categoryFilter = useCartStore((state) => state.categoryFilter);
  const setCategoryFilter = useCartStore((state) => state.setCategoryFilter);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        // Validate with Zod schema from cart.ts
        const validation = ProductResponseSchema.safeParse(data);
        if (validation.success) {
          setProducts(validation.data.products);
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

  const nonVegKeywords = ['chicken', 'beef', 'pork', 'meat', 'fish', 'egg', 'mutton', 'seafood', 'bacon'];

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    // Check if the product contains any non-veg keywords
    const isNonVeg = nonVegKeywords.some(keyword => {
      const title = product.title?.toLowerCase() || '';
      const desc = product.description?.toLowerCase() || '';
      const cat = product.category?.toLowerCase() || '';
      return title.includes(keyword) || desc.includes(keyword) || cat.includes(keyword);
    });

    if (isNonVeg) return false; // Filter out non-veg

    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      return false;
    }

    if (!maxPrice) return true;
    return product.price <= Number(maxPrice);
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Products</h1>
          <p className="text-gray-500 text-sm mt-1"> Navdeep produts</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-gray-800 bg-gray-50 focus:bg-white shadow-sm"
          />
          
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-32 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-gray-800 bg-gray-50 focus:bg-white shadow-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2 bg-white p-1.5 rounded-md shadow-sm border border-gray-200">
            <label className="text-sm font-bold text-gray-700 whitespace-nowrap px-2">Max (₹):</label>
            <input 
              type="number" 
              placeholder="e.g. 50" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-gray-800 bg-gray-50"
            />
          </div>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col group">
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center p-6 relative">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" 
                  />
                  {product.discountPercentage > 10 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      Sale!
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={product.title}>{product.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                    <span className="text-2xl font-extrabold text-indigo-600">₹{product.price}</span>
                    {(() => {
                      const cartItem = cart.find(c => c.id === product.id);
                      if (cartItem) {
                        return (
                          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                            <button onClick={() => decrementQuantity(product.id)} className="px-3 py-1 bg-white rounded shadow-sm text-gray-800 font-bold hover:bg-gray-50">-</button>
                            <span className="font-bold text-gray-900 w-4 text-center">{cartItem.quantity}</span>
                            <button onClick={() => incrementQuantity(product.id)} className="px-3 py-1 bg-white rounded shadow-sm text-gray-800 font-bold hover:bg-gray-50">+</button>
                          </div>
                        );
                      }
                      return (
                        <button 
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-800 active:scale-95 transition-all"
                        >
                          Add to Cart
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
