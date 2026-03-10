import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import CalendarPage from './CalendarPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
