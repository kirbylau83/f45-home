import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import { ArrowLeft, Activity, RefreshCw } from 'lucide-react';

export default function CalendarPage() {
    const [date, setDate] = useState(new Date());
    const [workouts, setWorkouts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const fetchWorkouts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://${window.location.hostname}:3000/api/workouts`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setWorkouts(data);
        } catch (err) {
            setError('Could not connect to the backend server. Is it running on port 3000?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const getDayName = (dateObj) => format(dateObj, 'EEEE');

    const getWorkoutForDate = (dateObj) => {
        const dayName = getDayName(dateObj);
        return workouts[dayName];
    };

    const handleDayClick = (value) => {
        setDate(value);
        const workout = getWorkoutForDate(value);
        setSelectedWorkout(workout || null);
    };

    // Add dots or labels under the days on the calendar
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const workout = getWorkoutForDate(date);
            if (workout) {
                // Extract just the first word to keep it clean on the small tile
                const shortName = workout.name.split(' ')[0];
                return (
                    <div className="calendar-marker">
                        {shortName}
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-slate-900 pb-20">
            {/* Header */}
            <header className="glass-panel sticky top-0 z-10 px-6 py-4 flex justify-between items-center rounded-none border-t-0 border-x-0 !border-b-slate-800">
                <div className="flex items-center gap-3">
                    <Activity className="text-rose-500 w-6 h-6" />
                    <h1 className="text-xl font-bold text-slate-100">Weekly Intel</h1>
                </div>
                <button
                    onClick={fetchWorkouts}
                    className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition"
                    disabled={loading}
                >
                    <RefreshCw className={`w-5 h-5 text-slate-300 ${loading ? 'animate-spin opacity-50' : ''}`} />
                </button>
            </header>

            <main className="max-w-2xl mx-auto px-4 mt-8">

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                {/* Main Calendar Render */}
                <div className="animate-fade-in relative">
                    {loading && (
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                            <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
                        </div>
                    )}

                    <Calendar
                        onChange={handleDayClick}
                        value={date}
                        tileContent={tileContent}
                        next2Label={null}
                        prev2Label={null}
                        minDetail="month"
                    />
                </div>

                {/* Selected Workout Rendering */}
                {selectedWorkout && (
                    <div className="mt-8 animate-fade-in bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-rose-400 mb-2">
                            {selectedWorkout.name}
                        </h2>
                        <p className="text-sm font-semibold text-slate-400 mb-6 pb-4 border-b border-slate-700">
                            {format(date, 'EEEE, MMMM do')}
                        </p>

                        <div className="prose prose-invert prose-p:text-slate-300 prose-p:leading-relaxed max-w-none text-sm md:text-base whitespace-pre-wrap">
                            {selectedWorkout.routine}
                        </div>
                    </div>
                )}

                {/* Empty State when day is clicked but NO workout exists */}
                {!selectedWorkout && !loading && !error && (
                    <div className="mt-8 p-8 text-center bg-slate-800/30 border border-slate-800 rounded-2xl">
                        <p className="text-slate-400">No workout intel found for {format(date, 'EEEE')}.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
