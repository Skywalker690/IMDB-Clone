import { useState, useEffect, useCallback } from 'react';
import { fetchTrendingTVShows } from '../../api/tmdb';
import TVShowCard from './TVShowCard';

// Trending TV Shows Section Component
const TrendingTVSection = () => {
  const [shows, setShows] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [loading, setLoading] = useState(true);

  const fetchTrendingTVShowsData = useCallback(async () => {
    try {
      setLoading(true);
      const results = await fetchTrendingTVShows(timeWindow);
      setShows(results);
    } catch (error) {
      console.error('Error fetching trending TV shows:', error);
      // Fallback to mock data if API fails
      setShows([
        {
          id: 1,
          name: "Breaking Bad",
          poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
          vote_average: 9.5,
          first_air_date: "2008-01-20"
        },
        {
          id: 2,
          name: "Game of Thrones",
          poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
          vote_average: 9.3,
          first_air_date: "2011-04-17"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [timeWindow]);

  useEffect(() => {
    fetchTrendingTVShowsData();
  }, [fetchTrendingTVShowsData]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 md:mb-12">
          <div className="h-8 sm:h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 sm:w-60 skeleton-shimmer mb-4 sm:mb-0"></div>
          <div className="flex bg-gray-100 rounded-lg overflow-hidden p-1">
            <div className="h-8 sm:h-10 w-16 sm:w-20 bg-gray-200 rounded skeleton-shimmer mr-1"></div>
            <div className="h-8 sm:h-10 w-20 sm:w-24 bg-gray-200 rounded skeleton-shimmer"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="movie-card-skeleton">
              <div className="h-64 sm:h-72 md:h-80 bg-gray-200 mb-2 sm:mb-4"></div>
              <div className="p-3 sm:p-5">
                <div className="h-4 sm:h-6 bg-gray-200 rounded mb-1 sm:mb-2 w-3/4"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 md:mb-12 space-y-4 sm:space-y-0">
        {/* Section Title */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-2 sm:mb-4">
            Trending TV Shows
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto sm:mx-0 rounded-full"></div>
        </div>

        {/* Time Window Toggle - Enhanced for mobile */}
        <div className="flex bg-white rounded-lg sm:rounded-xl overflow-hidden p-1 shadow-lg border border-gray-100">
          <button
            onClick={() => setTimeWindow('day')}
            className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg transition-all duration-300 transform active:scale-95 ${
              timeWindow === 'day'
                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeWindow('week')}
            className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg transition-all duration-300 transform active:scale-95 ${
              timeWindow === 'week'
                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* TV Shows Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {shows.map((show, index) => (
          <div 
            key={show.id} 
            className="opacity-0 animate-fade-in-up"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              animationFillMode: 'forwards'
            }}
          >
            <TVShowCard 
              show={show} 
              showWatchlistButton={true}
            />
          </div>
        ))}
      </div>
      
      {/* Floating background elements - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default TrendingTVSection;