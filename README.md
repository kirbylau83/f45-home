# Bringing F45 to Home

A modern, automated web application that seamlessly integrates F45 daily workouts into your personal routine. 

This app automatically scrapes the latest weekly intel from the `r/f45` Reddit community and presents it in a premium, dark-mode calendar interface built with React, Vite, and Tailwind CSS.

## Features

- **Automated Intel Scraping**: A Node.js backend that regularly checks and extracts the pinned weekly intel from the `r/f45` subreddit.
- **Interactive Calendar View**: A visually stunning React-based calendar that automatically labels dates with the corresponding workout (e.g., "Maximus", "Enduro").
- **Detailed Routine Format**: Click on any date to view the precise routine breakdown (pods, stations, timings, and exercises) exactly as posted by the community.
- **Premium Aesthetics**: Designed with modern "glassmorphism" components, smooth animations, and a sleek dark mode.

## Architecture

The project is split into two main directories:

1. `/backend`: A Node.js/Express service that handles the web scraping and exposes the data via a REST API (`/api/workouts`).
2. `/frontend`: A fast, responsive single-page application built with React, Vite, React Router, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Start the Backend API

Navigate to the backend directory, install dependencies, and start the Express server.

```bash
cd backend
npm install
npm start
```

The API will now be running at `http://localhost:3000`.

### 2. Start the Frontend UI

In a new terminal, navigate to the frontend directory, install dependencies, and run the Vite development server.

```bash
cd frontend
npm install
npm run dev
```

The web app will now be running on the port provided by Vite (usually `http://localhost:5173` or `5174`).

## Tech Stack
- Frontend: React 19, Vite, Tailwind CSS v4, React-Calendar, Lucide-React
- Backend: Node.js, Express, Axios
