import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTVShowDetails, fetchSimilarTVShows } from '../../api/tmdb';
import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL, PLACEHOLDER_IMAGE } from '../../utils/constants';
import { toggleWatchlist, isInWatchlist } from '../../api/watchlist';
import Header from '../header/Header';
import TVShowCard from './TVShowCard';

// TV Show Details Component
const TVShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  
  // Similar shows infinite scroll state
  const [similarShows, setSimilarShows] = useState([]);
  const [similarShowsPage, setSimilarShowsPage] = useState(1);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [hasMoreSimilar, setHasMoreSimilar] = useState(true);

  useEffect(() => {
    const fetchTVShowDetailsData = async () => {
      try {
        setLoading(true);
        const { show, cast } = await fetchTVShowDetails(id);
        
        setShow(show);
        setCast(cast);
        
        // Check if show is in watchlist
        setIsInWatchlistState(isInWatchlist(parseInt(id), 'tv'));
        
        // Reset similar shows state when show changes
        setSimilarShows([]);
        setSimilarShowsPage(1);
        setHasMoreSimilar(true);
        
        // Fetch first page of similar shows
        fetchSimilarShowsData(1, true);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
        // Fallback to mock data
        setShow({
          id: parseInt(id),
          name: "Sample TV Show",
          overview: "This is a sample TV show description. The actual show data could not be loaded.",
          poster_path: null,
          backdrop_path: null,
          first_air_date: "2024-01-01",
          vote_average: 7.5,
          genres: [{ id: 1, name: "Drama" }],
          number_of_seasons: 1,
          number_of_episodes: 10
        });
        setCast([
          { id: 1, name: "Actor One", character: "Main Character", profile_path: null },
          { id: 2, name: "Actor Two", character: "Supporting Character", profile_path: null }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Auto-scroll to top when component loads
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    fetchTVShowDetailsData();
  }, [id]);

  const fetchSimilarShowsData = async (page = 1, reset = false) => {
    if (loadingSimilar || (!hasMoreSimilar && !reset)) return;
    
    try {
      setLoadingSimilar(true);
      const response = await fetchSimilarTVShows(id, page);
      
      const newShows = response.results;
      
      if (reset) {
        setSimilarShows(newShows);
      } else {
        setSimilarShows(prev => [...prev, ...newShows]);
      }
      
      setHasMoreSimilar(page < response.total_pages && page < 5); // Limit to 5 pages
      setSimilarShowsPage(page + 1);
    } catch (error) {
      console.error('Error fetching similar shows:', error);
      // Fallback to mock similar shows
      if (reset) {
        setSimilarShows([
          {
            id: Math.random() * 1000,
            name: "Similar Show 1",
            poster_path: null,
            vote_average: 7.2,
            first_air_date: "2024-01-01"
          },
          {
            id: Math.random() * 1000,
            name: "Similar Show 2", 
            poster_path: null,
            vote_average: 6.8,
            first_air_date: "2023-12-15"
          }
        ]);
      }
      setHasMoreSimilar(false);
    } finally {
      setLoadingSimilar(false);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (hasMoreSimilar && !loadingSimilar) {
          fetchSimilarShowsData(similarShowsPage);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreSimilar, loadingSimilar, similarShowsPage, id]);

  const handleToggleWatchlist = () => {
    toggleWatchlist(show, 'tv');
    setIsInWatchlistState(!isInWatchlistState);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-300"></div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">TV Show Not Found</h1>
          <Link to="/tv" className="text-teal-600 hover:text-teal-800">
            Back to TV Shows
          </Link>
        </div>
      </div>
    );
  }

  const posterUrl = show.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}`
    : PLACEHOLDER_IMAGE;

  const backdropUrl = show.backdrop_path 
    ? `${TMDB_BACKDROP_BASE_URL}${show.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-96 bg-gray-900">
          <img
            src={backdropUrl}
            alt={show.name}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={posterUrl}
              alt={show.name}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {show.name}
              {show.first_air_date && (
                <span className="text-gray-600 font-normal">
                  {' '}({new Date(show.first_air_date).getFullYear()})
                </span>
              )}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              {show.vote_average && (
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold">{show.vote_average.toFixed(1)}/10</span>
                </div>
              )}
              {show.number_of_seasons && (
                <span className="text-gray-600">
                  {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}
                </span>
              )}
              {show.number_of_episodes && (
                <span className="text-gray-600">{show.number_of_episodes} Episodes</span>
              )}
              <button
                onClick={handleToggleWatchlist}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isInWatchlistState
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                {isInWatchlistState ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>

            {show.genres && show.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {show.overview || 'No overview available.'}
              </p>
            </div>

            {cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Cast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="bg-white rounded-lg p-4 shadow">
                      <div className="flex items-center">
                        <img
                          src={
                            actor.profile_path
                              ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
                              : 'https://via.placeholder.com/100x150/1f2937/ffffff?text=No+Image'
                          }
                          alt={actor.name}
                          className="w-16 h-20 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{actor.name}</h3>
                          <p className="text-gray-600 text-sm">{actor.character}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Shows - Endless Exploration Section */}
      {similarShows.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
                More Like This
              </h2>
              <p className="text-gray-600 text-lg">
                Continue your journey with similar TV shows you might love
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full mt-4"></div>
            </div>

            {/* Similar Shows Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {similarShows.map((similarShow, index) => (
                <div 
                  key={`${similarShow.id}-${index}`}
                  className="opacity-0 animate-fade-in-up"
                  style={{ 
                    animationDelay: `${(index % 12) * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <TVShowCard show={similarShow} showWatchlistButton={true} />
                </div>
              ))}
            </div>

            {/* Loading Similar Shows */}
            {loadingSimilar && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="movie-card-skeleton">
                    <div className="h-80 bg-gray-200 mb-4"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* End Message */}
            {!hasMoreSimilar && !loadingSimilar && similarShows.length > 0 && (
              <div className="text-center mt-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You've reached the end!</h3>
                <p className="text-gray-600 mb-6">
                  You've explored all similar shows for "{show.name}". 
                </p>
                <Link
                  to="/tv"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Discover More TV Shows
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TVShowDetails;