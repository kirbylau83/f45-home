const axios = require('axios');

async function fetchWeeklyIntel() {
    try {
        const response = await axios.get(
            'https://www.reddit.com/r/f45/hot.json?limit=10',
            {
                headers: {
                    'User-Agent': 'F45HomeApp/1.0.0',
                },
            }
        );

        const posts = response.data.data.children;
        // Find the first post that matches "Intel Week"
        const intelPost = posts.find(p => p.data.title && p.data.title.toLowerCase().includes('intel week'));

        if (!intelPost) {
            console.log('No Intel Week posts found.');
            return null;
        }

        const latestPost = intelPost.data;
        console.log(`Found post: ${latestPost.title}`);

        // Parse the selftext
        return parseWorkoutData(latestPost.selftext);
    } catch (error) {
        console.error('Error fetching data from Reddit:', error.message);
        return null;
    }
}

function parseWorkoutData(text) {
    const daysOfWeek = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    const workouts = {};
    const lines = text.split('\n');

    let currentDay = null;
    let currentWorkoutName = null;
    let currentRoutine = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Attempt to match days of week
        const hasAsteriskMatch = daysOfWeek.find(d => trimmed.toLowerCase().includes(d.toLowerCase()) && (trimmed.startsWith('**') || trimmed.startsWith('##')));
        const plainMatch = daysOfWeek.find(d => trimmed.toLowerCase().startsWith(d.toLowerCase() + ' '));
        const dayMatch = hasAsteriskMatch || plainMatch;

        if (dayMatch) {
            if (currentDay) {
                workouts[currentDay] = {
                    name: currentWorkoutName || 'Unknown Workout',
                    routine: currentRoutine.join('\n')
                };
            }
            currentDay = dayMatch;
            currentRoutine = [];

            // Extract workout name. Often format is "**Monday 10/10: Romans**" or "**Monday 03/09: Pipeline**"
            const parts = trimmed.split(':');
            if (parts.length > 1) {
                currentWorkoutName = parts.slice(1).join(':').replace(/\*/g, '').trim();
            } else {
                currentWorkoutName = 'Unknown Workout';
            }
        } else if (currentDay) {
            currentRoutine.push(trimmed);
        }
    }

    if (currentDay) {
        workouts[currentDay] = {
            name: currentWorkoutName || 'Unknown Workout',
            routine: currentRoutine.join('\n')
        };
    }

    return workouts;
}

// For quick testing
if (require.main === module) {
    fetchWeeklyIntel().then(data => console.log(JSON.stringify(data, null, 2)));
}

module.exports = { fetchWeeklyIntel, parseWorkoutData };
