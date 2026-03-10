import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Auto-navigate after 3 seconds
        const timer = setTimeout(() => {
            navigate('/calendar');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-slate-50">
            <div
                className={`flex flex-col items-center transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="w-24 h-24 mb-6 rounded-full bg-rose-500/10 flex items-center justify-center pulse-icon">
                    <Dumbbell className="w-12 h-12 text-rose-500" />
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 mb-4 text-center">
                    Bringing F45 to Home
                </h1>

                <p className="text-slate-400 text-lg mb-12 text-center max-w-sm">
                    Your weekly intelligent workouts, synced seamlessly with r/f45
                </p>

                <div className="w-12 h-12 rounded-full border-2 border-rose-500/30 border-t-rose-500 animate-spin"></div>
            </div>
        </div>
    );
}
