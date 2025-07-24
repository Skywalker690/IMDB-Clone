import { useState, useEffect } from 'react';
import { fetchPopularTVShows } from '../../api/tmdb';
import TVShowCard from './TVShowCard';

// Popular TV Shows Section Component
const PopularTVSection = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTVShowsData = async () => {
      try {
        setLoading(true);
        const results = await fetchPopularTVShows();
        setShows(results);
      } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        // Fallback to mock data if API fails
        setShows([
          {
            id: 3,
            name: "Stranger Things",
            poster_path: "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
            vote_average: 8.7,
            first_air_date: "2016-07-15"
          },
          {
            id: 4,
            name: "The Crown",
            poster_path: "/1M876KPjulVwppEpldhdc8V4o68.jpg",
            vote_average: 8.2,
            first_air_date: "2016-11-04"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTVShowsData();
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
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular TV Shows</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {shows.slice(0, 20).map((show) => (
          <TVShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default PopularTVSection;