import { useState } from 'react'
import './App.css'
import CollegeLoginForm from "./components/collegform"
import Products from './components/Products'
import User from './components/uservalidor'
import StorePage from './components/StorePage'
import { useCartStore } from './store/storeProducts'

function App() {
  const cart = useCartStore((state) => state.cart)
  const [view, setView] = useState('products') // 'products' or 'cart'



  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 
          className="text-2xl font-black text-indigo-600 cursor-pointer" 
          onClick={() => setView('products')}
        >
          MyStore
        </h1>
        <div className="space-x-6">
          <button 
            onClick={() => setView('products')} 
            className={`font-semibold transition-colors ${view === 'products' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Shop
          </button>
          <button 
            onClick={() => setView('cart')} 
            className={`font-semibold relative transition-colors ${view === 'cart' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Cart 🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        {view === 'products' && <Products />}
        {view === 'cart' && <StorePage navigateToProducts={() => setView('products')} />}
      </main>

      {/* Separator for the previously requested User Component */}
      <div className="max-w-6xl mx-auto my-16 border-t-2 border-dashed border-gray-300"></div>
      
    </div>
  )
}

export default App
