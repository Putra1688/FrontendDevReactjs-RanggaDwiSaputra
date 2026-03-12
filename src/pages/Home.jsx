import { useState } from 'react';
import restaurantData from '../services/data.json';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPrice, setFilterPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Logika Filter Gabungan
  const filteredData = restaurantData.filter((item) => {
    const matchOpen = filterOpen ? item.isOpen : true;
    const matchPrice = filterPrice ? item.price === filterPrice : true;
    const matchCategory = filterCategory ? item.category === filterCategory : true;
    return matchOpen && matchPrice && matchCategory;
  });

  // Fungsi Reset
  const handleClearAll = () => {
    setFilterOpen(false);
    setFilterPrice("");
    setFilterCategory("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-light mb-4">Restaurants</h1>
      <p className="text-gray-500 max-w-xl mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Filter Navigation */}
      <div className="flex flex-wrap items-center justify-between border-y border-gray-200 py-4 mb-8">
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500">Filter By:</span>
          
          <label className="flex items-center gap-2 text-sm border-b border-blue-900 pb-1 cursor-pointer">
            <input 
              type="checkbox" 
              checked={filterOpen}
              onChange={(e) => setFilterOpen(e.target.checked)}
              className="accent-blue-900" 
            /> Open Now
          </label>

          <select 
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="text-sm border-b border-blue-900 bg-transparent pb-1 outline-none cursor-pointer"
          >
            <option value="">Price</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>

          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-sm border-b border-blue-900 bg-transparent pb-1 outline-none cursor-pointer"
          >
            <option value="">Categories</option>
            <option value="Japanese">Japanese</option>
            <option value="Seafood">Seafood</option>
            <option value="Italian">Italian</option>
            <option value="Thai">Thai</option>
            <option value="American">American</option>
          </select>
        </div>

        <button 
          onClick={handleClearAll}
          className="text-xs font-semibold text-gray-400 border border-gray-300 px-8 py-2 uppercase tracking-widest hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>

      <h2 className="text-2xl mb-8 font-light">All Restaurants</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredData.map((res) => (
          <RestaurantCard key={res.id} restaurant={res} />
        ))}
      </div>
    </div>
  );
};

export default Home;