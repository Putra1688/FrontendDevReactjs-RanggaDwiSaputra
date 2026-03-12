import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

    return (
        <div className="group card-hover bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-slate-100">
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={restaurant.photos[0]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md ${restaurant.isOpen ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
                        {restaurant.isOpen ? "Open Now" : "Closed"}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <p className="text-brand-600 font-bold text-[10px] uppercase tracking-widest">
                        {restaurant.category}
                    </p>
                    <div className="flex items-center gap-1 text-[#facc15]">
                        <span className="text-xs font-bold text-slate-900 ml-1">{restaurant.rating.toFixed(1)}</span>
                        <span className="text-xs">★</span>
                    </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-brand-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">
                    {restaurant.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400 tracking-tighter">{restaurant.price}</span>
                    <button
                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        className="text-[10px] font-black uppercase tracking-widest text-brand-900 hover:text-brand-600 transition-colors flex items-center gap-2"
                    >
                        Learn More
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;