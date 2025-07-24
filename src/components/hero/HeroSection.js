import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// HeroSection Component with Enhanced Mobile Responsiveness
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up">
          <span className="block">Welcome.</span>
        </h1>
        
        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Millions of movies, TV shows and people to discover. 
          <span className="hidden sm:inline"> Explore now.</span>
        </p>
        
        {/* Search Form */}
        <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
          <form onSubmit={handleSearch} className="relative">
            {/* Mobile Search (Stack Layout) */}
            <div className="flex flex-col sm:hidden space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies, TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-base bg-white/95 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/50 focus:bg-white transition-all duration-300 shadow-2xl border border-white/20"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold rounded-2xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal-500/50 shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </div>
              </button>
            </div>

            {/* Desktop Search (Inline Layout) */}
            <div className="hidden sm:flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border border-white/20 overflow-hidden">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for a movie, tv show, person..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 md:py-5 text-base md:text-lg bg-transparent focus:outline-none"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base md:text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Search Suggestions (Mobile) */}
          <div className="mt-6 sm:hidden">
            <p className="text-white/70 text-sm mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Avengers', 'Breaking Bad', 'Stranger Things', 'Marvel'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    navigate(`/search?query=${encodeURIComponent(term)}`);
                  }}
                  className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;