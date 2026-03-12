import { useParams, useNavigate } from 'react-router-dom';
import restaurantData from '../services/data.json';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const res = restaurantData.find(item => item.id === id);

  if (!res) return <div className="p-10">Restaurant not found...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button onClick={() => navigate('/')} className="mb-4 text-blue-900 text-sm font-bold uppercase tracking-widest">
        ← Back
      </button>

      <h1 className="text-5xl font-light mb-2">{res.name}</h1>
      <div className="text-blue-900 text-2xl mb-8">
        {"★".repeat(res.rating)}{"☆".repeat(5 - res.rating)}
      </div>

      <hr className="border-gray-200 mb-10" />

      <div>
        <h2 className="text-2xl font-light mb-8">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {res.reviews.length > 0 ? res.reviews.map((rev, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-bold text-lg">{rev.name}</p>
                <div className="text-blue-900 text-xs mb-2">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>
            </div>
          )) : (
            <p className="text-gray-400 italic">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;