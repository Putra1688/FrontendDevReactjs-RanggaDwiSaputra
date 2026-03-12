import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const [res, setRes] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://69b2479fe06ef68ddd948048.mockapi.io/api/v1/restaurant/${id}`)
            .then(response => setRes(response.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!res) return <div className="p-20 text-center font-serif text-2xl animate-pulse">Loading detail...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Header */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={res.photos[0]}
                    alt={res.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent"></div>

                <div className="absolute top-8 left-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group glass-morphism text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-brand-900 transition-all"
                    >
                        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Exploration
                    </button>
                </div>

                <div className="absolute bottom-16 left-8 right-8 max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <p className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-4">
                                {res.category} • {res.price}
                            </p>
                            <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight">
                                {res.name}
                            </h1>
                            <div className="flex items-center gap-2 text-2xl text-[#facc15]">
                                {"★".repeat(res.rating)}{"☆".repeat(5 - res.rating)}
                                <span className="text-white/60 text-sm font-sans ml-2 font-medium">({res.rating.toFixed(1)} / 5.0)</span>
                            </div>
                        </div>

                        <div className={`px-8 py-4 rounded-2xl glass-morphism text-white border-2 ${res.isOpen ? 'border-green-500/30' : 'border-red-500/30'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full animate-pulse ${res.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-lg font-bold tracking-widest uppercase">
                                    {res.isOpen ? 'Currently Open' : 'Closed Now'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-4xl font-serif mb-12">Guest Reviews</h2>
                        <div className="space-y-10">
                            {res.reviews.length > 0 ? res.reviews.map((rev, index) => (
                                <div key={index} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex gap-8 transition-transform hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-brand-900/5 rounded-full flex-shrink-0 flex items-center justify-center text-brand-900 font-bold text-xl">
                                        {rev.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="font-bold text-xl text-brand-900">{rev.name}</p>
                                            <div className="text-[#facc15] text-xs">
                                                {"★".repeat(rev.rating)}
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-lg leading-relaxed font-light italic">
                                            "{rev.text}"
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-16 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-serif text-xl italic">Be the first to leave a review.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Location */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-2xl font-serif mb-8">Location</h2>
                            <div className="bg-white p-4 rounded-[40px] shadow-xl border border-slate-100 group">
                                <div className="w-full h-[400px] rounded-[30px] overflow-hidden grayscale-[40%] hover:grayscale-0 transition-all duration-700">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        srcDoc={`
                      <style>body { margin: 0; }</style>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        style="border:0" 
                        src="https://maps.google.com/maps?q=${encodeURIComponent(res.name)}&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                        allowfullscreen>
                      </iframe>
                    `}
                                    ></iframe>
                                </div>
                                <div className="p-6">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Address</p>
                                    <p className="text-brand-900 font-medium leading-relaxed">
                                        Premium Dining Hub, <br />
                                        Metropolis Central District 102
                                    </p>
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