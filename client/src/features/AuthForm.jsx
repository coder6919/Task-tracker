import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import PageTransition from '../components/PageTransition';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const AuthForm = ({ isLogin, setUser }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';

            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const { data } = await API.post(endpoint, payload);

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <PageTransition>
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="text-slate-500 mb-8">Please enter your details.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            minLength={6}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                        {isLogin ? 'Sign In' : 'Get Started'}
                        <ArrowRight size={18} />
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => navigate(isLogin ? '/signup' : '/login')}
                        className="ml-2 text-indigo-600 font-bold hover:underline"
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </PageTransition>
    );
};

export default AuthForm;