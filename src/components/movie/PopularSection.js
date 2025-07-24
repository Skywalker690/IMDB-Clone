import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../api/tmdb';
import MovieCard from './MovieCard';

// Popular Movies Section Component
const PopularSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMoviesData = async () => {
      try {
        setLoading(true);
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        // Fallback to mock data if API fails
        setMovies([
          {
            id: 3,
            title: "Pulp Fiction",
            poster_path: "/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
            vote_average: 8.9,
            release_date: "1994-10-14"
          },
          {
            id: 4,
            title: "The Dark Knight",
            poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            vote_average: 9.0,
            release_date: "2008-07-18"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMoviesData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mx-auto skeleton-shimmer mb-4"></div>
          <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="movie-card-skeleton">
              <div className="h-80 bg-gray-200 mb-4"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularSection;