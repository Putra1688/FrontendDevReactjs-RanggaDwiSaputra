import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, login, logout, isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (name.trim()) {
            login(name);
            closeLoginModal();
            setName('');
        }
    };

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div
                    className="text-white font-serif text-2xl cursor-pointer tracking-tighter"
                    onClick={() => navigate('/')}
                >
                    Lux<span className="font-sans font-light italic">EATS</span>
                </div>

                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4 animate-fade-in">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Welcome back</span>
                                <span className="text-white font-bold text-sm">{user.name}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="w-10 h-10 rounded-full glass-morphism border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                                title="Logout"
                            >
                                <span className="text-white text-xs">✕</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={openLoginModal}
                            className="px-8 py-2.5 rounded-full glass-morphism border border-white/30 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-900 transition-all active:scale-95"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={closeLoginModal}></div>
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl animate-slide-up">
                        <h2 className="text-3xl font-serif text-slate-900 mb-2">Welcome to LuxeEats</h2>
                        <p className="text-slate-500 text-sm mb-8">Enter your name to start exploring and reviewing premium restaurants.</p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2 block">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border-b-2 border-slate-100 focus:border-brand-600 outline-none py-3 text-lg font-bold transition-colors"
                                    placeholder="e.g. Rangga Dwi"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-brand-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-800 transition-all shadow-lg active:scale-95"
                            >
                                Let's Explore
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
