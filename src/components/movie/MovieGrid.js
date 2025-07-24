import MovieCard from './MovieCard';

// Enhanced Mobile-Responsive Movie Grid Component
const MovieGrid = ({ movies, title, showWatchlistButton = true }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="text-center py-8 sm:py-12 md:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 7v10h6V7H9z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No movies found</h3>
          <p className="text-sm sm:text-base text-gray-500">Try searching for something else or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      {title && (
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-2 sm:mb-4">
            {title}
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
        </div>
      )}
      
      {/* Enhanced Responsive Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="opacity-0 animate-fade-in-up"
            style={{ 
              animationDelay: `${index * 0.05}s`, // Faster staggering for mobile
              animationFillMode: 'forwards'
            }}
          >
            <MovieCard 
              movie={movie} 
              showWatchlistButton={showWatchlistButton}
            />
          </div>
        ))}
      </div>
      
      {/* Floating background elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default MovieGrid;