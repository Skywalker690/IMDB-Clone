import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Header Component with Mobile-First Responsive Design
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Reset search query when location changes
  useEffect(() => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinkClass = (path) => `
    block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95
    ${isActivePath(path) 
      ? 'text-teal-400 bg-teal-500/10 font-semibold shadow-lg' 
      : 'text-white hover:text-teal-400 hover:bg-white/5'
    }
  `;

  const desktopNavLinkClass = (path) => `
    px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800
    ${isActivePath(path) 
      ? 'text-teal-400 bg-teal-500/10 font-semibold' 
      : 'text-white hover:text-teal-400 hover:bg-white/5'
    }
  `;

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-white">TMDB</span>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold rounded shadow-lg">
                Clone
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/movies" className={desktopNavLinkClass('/movies')}>
              Movies
            </Link>
            <Link to="/tv" className={desktopNavLinkClass('/tv')}>
              TV Shows
            </Link>
            <Link to="/watchlist" className={desktopNavLinkClass('/watchlist')}>
              Watchlist
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 xl:w-80 pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white/20 transition-all duration-300"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="ml-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg font-medium"
            >
              Search
            </button>
          </form>

          {/* Mobile Search and Menu Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              className="p-2 text-white hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsMobileSearchOpen(false);
              }}
              className="p-2 text-white hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 mobile-menu-container"
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-3'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Form */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileSearchOpen ? 'max-h-20 pb-4' : 'max-h-0'
        }`}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search movies, TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-20 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white/20 transition-all duration-300"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm rounded-full hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden mobile-menu-container ${
          isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
        }`}>
          <div className="space-y-2 pt-4">
            <Link 
              to="/movies" 
              className={navLinkClass('/movies')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                </svg>
                <span>Movies</span>
              </div>
            </Link>
            
            <Link 
              to="/tv" 
              className={navLinkClass('/tv')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>TV Shows</span>
              </div>
            </Link>
            
            <Link 
              to="/watchlist" 
              className={navLinkClass('/watchlist')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Watchlist</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;