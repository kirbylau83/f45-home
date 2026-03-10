const express = require('express');
const router = express.Router();
const { fetchWeeklyIntel } = require('./scraper');

let workoutCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

router.get('/workouts', async (req, res) => {
    try {
        const now = Date.now();
        // Return cached data if valid
        if (workoutCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
            return res.json(workoutCache);
        }

        // Fetch fresh data
        const data = await fetchWeeklyIntel();
        if (data) {
            workoutCache = data;
            lastFetchTime = now;
            return res.json(data);
        } else {
            return res.status(500).json({ error: 'Failed to fetch or parse workout data from Reddit' });
        }
    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
