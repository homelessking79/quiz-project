import React from 'react';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { NavBar } from './components/NavBar';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Leaderboard } from './pages/Leaderboard';
import Footer from './components/Footer';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/quiz-project' || location.pathname === '/quiz-project/') {
      navigate('/Home');
    }
  }, [location.pathname, navigate]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
};
