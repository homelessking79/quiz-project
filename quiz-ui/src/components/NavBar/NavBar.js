import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';

const NavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/Home');
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', margin: '8px' }}>
          <img
            src="https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/1586498728796-Q9USRXPO6FFZOCYXAD57/Screen+Shot+2020-04-10+at+3.35.11+pm.png?format=1500w"
            alt="Logo"
            onClick={handleImageClick}
            className="logo"
            style={{ margin: 'auto' }}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <nav className="navigation">
            <button
              className="hamburger"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className={isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'}>
              <ul style={{ marginTop: '7px' }}>
                <li>
                  <Link
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                    to="/Home"
                    className={location.pathname === '/Home' ? 'nav-active' : 'nav-non-active'}>
                    <div>
                      {' '}
                      <FlutterDashIcon fontSize="large" />
                    </div>
                    <div className="nav-text-icon hover-underline-animation">Home</div>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                    to="/Quiz"
                    className={location.pathname === '/Quiz' ? 'nav-active' : 'nav-non-active'}>
                    <div>
                      {' '}
                      <ScienceIcon fontSize="large" />
                    </div>
                    <div className="nav-text-icon hover-underline-animation">Quiz</div>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                    to="/Leaderboard"
                    className={
                      location.pathname === '/Leaderboard' ? 'nav-active' : 'nav-non-active'
                    }>
                    <div>
                      {' '}
                      <DashboardIcon fontSize="large" />
                    </div>
                    <div className="nav-text-icon hover-underline-animation">Leaderboard</div>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                    to="/Leaderboard"
                    className={location.pathname === '/Leaderboard' ? 'nav-active' : 'nav-non-active'}>
                    <div>
                      {' '}
                      <DashboardIcon />
                    </div>
                    <div className="nav-text-icon hover-underline-animation">National Science Week</div>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                    to="/Leaderboard"
                    className={location.pathname === '/Leaderboard' ? 'nav-active' : 'nav-non-active'}>
                    <div>
                      {' '}
                      <DashboardIcon />
                    </div>
                    <div className="nav-text-icon hover-underline-animation">Contact Us</div>
                  </Link>
                </li> */}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
