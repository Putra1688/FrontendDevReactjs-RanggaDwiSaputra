import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <img 
        src={restaurant.photos[0]} 
        alt={restaurant.name} 
        className="w-full aspect-[4/3] object-cover"
      />
      <h3 className="text-lg font-semibold leading-tight h-14 overflow-hidden">
        {restaurant.name}
      </h3>
      <div className="text-blue-900 text-sm">
        {"★".repeat(restaurant.rating)}{"☆".repeat(5 - restaurant.rating)}
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
        <span>{restaurant.category} • {restaurant.price}</span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {restaurant.isOpen ? "Open Now" : "Closed"}
        </span>
      </div>
      <button 
        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        className="w-full bg-blue-900 text-white py-3 mt-2 text-xs font-bold uppercase tracking-widest hover:bg-blue-800 transition-colors"
      >
        Learn More
      </button>
    </div>
  );
};

export default RestaurantCard;