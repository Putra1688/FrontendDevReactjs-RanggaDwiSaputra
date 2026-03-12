import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Detail = () => {
    const { id } = useParams();
    const [res, setRes] = useState(null);
    const [newReview, setNewReview] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewImage, setReviewImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const navigate = useNavigate();
    const { user, openLoginModal } = useAuth();

    useEffect(() => {
        axios.get(`https://69b2479fe06ef68ddd948048.mockapi.io/api/v1/restaurant/${id}`)
            .then(response => setRes(response.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { // Limit 1MB to avoid MockAPI payload limits
                alert("File terlalu besar. Maksimal 1MB.");
                e.target.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setReviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please Login first!");
        if (!newReview.trim()) return;

        setIsSubmitting(true);
        const reviewObj = {
            name: user.name,
            rating: reviewRating,
            text: newReview,
            image: reviewImage || null,
            date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
        };

        try {
            const updatedReviews = [...res.reviews, reviewObj];
            await axios.put(`https://69b2479fe06ef68ddd948048.mockapi.io/api/v1/restaurant/${id}`, {
                reviews: updatedReviews
            });
            setRes({ ...res, reviews: updatedReviews });
            setNewReview("");
            setReviewRating(5);
            setReviewImage("");
            // Reset file input manually
            const fileInput = document.getElementById('review-photo');
            if (fileInput) fileInput.value = "";

            alert("Terima kasih atas review kamu!");
        } catch (error) {
            console.error("Gagal menambah review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!res) return <div className="p-20 text-center font-serif text-2xl animate-pulse text-slate-400">Loading exquisite details...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            {/* Hero Detail Section */}
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
                    style={{ backgroundImage: `url(${res.photos[0]})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute top-28 left-4 md:left-8 z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Discovery
                    </button>
                </div>

                <div className="absolute bottom-8 md:bottom-16 left-4 md:left-8 right-4 md:right-8 max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                        <div className="animate-slide-up">
                            <p className="text-blue-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 md:mb-4">
                                {res.category} • {res.price}
                            </p>
                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif text-white mb-4 md:mb-6 leading-tight">
                                {res.name}
                            </h1>
                            <div className="flex items-center gap-2 text-xl md:text-2xl text-[#facc15]">
                                {"★".repeat(Math.round(res.rating))}{"☆".repeat(5 - Math.round(res.rating))}
                                <span className="text-white/60 text-xs md:text-sm font-sans ml-2 font-medium">({res.rating.toFixed(1)} / 5.0)</span>
                            </div>
                        </div>

                        <div className={`w-fit px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl glass-morphism text-white border-2 animate-fade-in ${res.isOpen ? 'border-green-500/30' : 'border-red-500/30'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 md:w-3 h-2 md:h-3 rounded-full animate-pulse ${res.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-sm md:text-lg font-bold tracking-widest uppercase">
                                    {res.isOpen ? 'Currently Open' : 'Closed Now'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
                    {/* Left: Reviews & Actions */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="flex items-center justify-between mb-8 md:mb-12">
                            <h2 className="text-2xl md:text-4xl font-serif text-slate-900">What People Say</h2>
                            <div className="h-0.5 flex-grow mx-8 bg-slate-100 rounded-full hidden md:block"></div>
                        </div>

                        {/* Add Review Form */}
                        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 mb-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Share your experience</h3>
                            {user ? (
                                <form onSubmit={handleAddReview} className="space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                        <div className="shrink-0">
                                            <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 block">Your Rating</label>
                                            <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        className={`text-3xl transition-all outline-none ${star <= (hoverRating || reviewRating) ? 'text-[#facc15] scale-110 drop-shadow-sm' : 'text-slate-200'}`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 block">Upload Photo</label>
                                            <div className="relative">
                                                <input
                                                    id="review-photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between group-hover:border-brand-600 transition-colors">
                                                    <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">
                                                        {reviewImage ? "Photo uploaded ✓" : "Pilih foto makanan kamu..."}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase text-brand-900 bg-white px-3 py-1.5 rounded-lg shadow-sm">Browse</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 block">Review Message</label>
                                        <textarea
                                            className="w-full bg-slate-50 rounded-2xl p-5 text-sm md:text-base outline-none focus:ring-2 focus:ring-brand-600 transition-all min-h-[120px]"
                                            placeholder={`Hi ${user.name}, what did you love about ${res.name}?`}
                                            value={newReview}
                                            onChange={(e) => setNewReview(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-fit bg-brand-900 text-white px-12 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-800 transition-all disabled:opacity-50 shadow-lg"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-10 bg-slate-50 rounded-[1.5rem] border border-dashed border-slate-200">
                                    <p className="text-slate-500 text-sm mb-6 font-serif italic">Have something to say about your visit?</p>
                                    <button
                                        className="bg-brand-900 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-lg active:scale-95"
                                        onClick={openLoginModal}
                                    >
                                        Login to Write Review
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 md:space-y-10">
                            {res.reviews && res.reviews.length > 0 ? (
                                [...res.reviews].reverse().map((review, i) => (
                                    <div key={i} className="group bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-700">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-4 md:gap-6 mb-8">
                                                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-brand-50 flex items-center justify-center text-brand-900 font-bold text-xl md:text-2xl shrink-0 group-hover:bg-brand-900 group-hover:text-white transition-all duration-500">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{review.name}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex text-[#facc15] text-sm md:text-base">
                                                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                                            </div>
                                                            {review.date && <span className="text-[10px] uppercase font-black text-slate-300 tracking-[0.2em]">{review.date}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 leading-relaxed text-base md:text-2xl font-serif italic">"{review.text}"</p>
                                            </div>

                                            {review.image && (
                                                <div className="md:w-48 shrink-0">
                                                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white rotate-2 group-hover:rotate-0 transition-transform duration-700">
                                                        <img src={review.image} alt="User share" className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-medium font-serif italic">Be the first to share an experience...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Location & Info */}
                    <div className="order-1 lg:order-2">
                        <div className="sticky top-32">
                            <div className="bg-white rounded-[2.5rem] p-4 shadow-xl border border-slate-100 overflow-hidden group">
                                <div className="aspect-square rounded-[2rem] overflow-hidden relative mb-6">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(res.name)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    ></iframe>
                                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                </div>
                                <div className="px-6 pb-8">
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">Location</span>
                                    <p className="text-brand-900 font-serif text-xl md:text-2xl leading-relaxed mb-8 italic">
                                        Premium Dining Hub, <br />
                                        Metropolis Central District 102
                                    </p>
                                    <button
                                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.name)}`, '_blank')}
                                        className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl hover:bg-black transition-all active:scale-95"
                                    >
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;