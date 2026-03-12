import { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterPrice, setFilterPrice] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const API_URL = "https://69b2479fe06ef68ddd948048.mockapi.io/api/v1/restaurant"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setRestaurants(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = restaurants.filter((item) => {
        const matchOpen = filterOpen ? item.isOpen : true;
        const matchPrice = filterPrice ? item.price === filterPrice : true;
        const matchCategory = filterCategory ? item.category === filterCategory : true;
        return matchOpen && matchPrice && matchCategory;
    });

    const handleClearAll = () => {
        setFilterOpen(false);
        setFilterPrice("");
        setFilterCategory("");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-brand-900 text-white pt-24 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight animate-fade-in">
                        Discover <br />
                        <span className="italic text-blue-400">Exquisite</span> Dining
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
                        Exploration of taste and texture. Discover the finest restaurants curated for true food connoisseurs.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-16">
                {/* Filter Navigation - Glassmorphism */}
                <div className="glass-morphism rounded-2xl shadow-xl p-8 sticky top-6 z-10 animate-slide-up">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Filter By:</span>

                                <label className="group flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors hover:text-brand-600">
                                    <div className={`w-10 h-6 rounded-full relative transition-colors ${filterOpen ? 'bg-brand-600' : 'bg-slate-200'}`}>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={filterOpen}
                                            onChange={(e) => setFilterOpen(e.target.checked)}
                                        />
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${filterOpen ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                    Open Now
                                </label>
                            </div>

                            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

                            <select
                                value={filterPrice}
                                onChange={(e) => setFilterPrice(e.target.value)}
                                className="text-sm font-semibold border-b-2 border-transparent focus:border-brand-600 bg-transparent py-1 outline-none cursor-pointer transition-all"
                            >
                                <option value="">Price Range</option>
                                <option value="$">$ (Affordable)</option>
                                <option value="$$">$$ (Moderate)</option>
                                <option value="$$$">$$$ (Expensive)</option>
                                <option value="$$$$">$$$$ (Luxury)</option>
                            </select>

                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="text-sm font-semibold border-b-2 border-transparent focus:border-brand-600 bg-transparent py-1 outline-none cursor-pointer transition-all"
                            >
                                <option value="">All Categories</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Seafood">Seafood</option>
                                <option value="Italian">Italian</option>
                                <option value="Thai">Thai</option>
                                <option value="American">American</option>
                                <option value="Indonesian">Indonesian</option>
                            </select>
                        </div>

                        <button
                            onClick={handleClearAll}
                            className="text-[10px] font-bold text-slate-400 hover:text-brand-600 uppercase tracking-[0.2em] transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                <div className="mt-20 pb-20">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-2">Selection</p>
                            <h2 className="text-4xl font-serif">All Restaurants</h2>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">{filteredData.length} places found</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {isLoading ? (
                            [...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white rounded-3xl h-80 border border-slate-100 flex flex-col p-6 gap-4">
                                    <div className="bg-slate-200 h-2/3 rounded-2xl w-full"></div>
                                    <div className="bg-slate-200 h-6 rounded w-3/4"></div>
                                    <div className="bg-slate-200 h-4 rounded w-1/2"></div>
                                </div>
                            ))
                        ) : filteredData.map((res, index) => (
                            <div key={res.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                <RestaurantCard restaurant={res} />
                            </div>
                        ))}
                    </div>

                    {filteredData.length === 0 && (
                        <div className="text-center py-20 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-serif text-xl italic">No matches found for your criteria.</p>
                            <button onClick={handleClearAll} className="mt-4 text-brand-600 font-bold text-sm underline">Clear all filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;