import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (indexToRemove) => set((state) => ({
    cart: state.cart.filter((_, idx) => idx !== indexToRemove)
  })),
  resetCart: () => set({ cart: [] }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  categoryFilter: 'All',
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  
  maxPrice: '',
  setMaxPrice: (price) => set({ maxPrice: price }),
}));
