import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../utils/constants';

// Movie API functions
export const fetchTrendingMovies = async (timeWindow = 'day') => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`),
      axios.get(`${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`),
      axios.get(`${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`)
    ]);
    
    return {
      movie: movieResponse.data,
      cast: creditsResponse.data.cast.slice(0, 5),
      trailers: videosResponse.data.results.filter(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchSimilarMovies = async (id, page = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/similar?api_key=${TMDB_API_KEY}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

// TV Show API functions
export const fetchTrendingTVShows = async (timeWindow = 'day') => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/tv/${timeWindow}?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    throw error;
  }
};

export const fetchPopularTVShows = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

export const fetchTVShowDetails = async (id) => {
  try {
    const [showResponse, creditsResponse, videosResponse] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}`),
      axios.get(`${TMDB_BASE_URL}/tv/${id}/credits?api_key=${TMDB_API_KEY}`),
      axios.get(`${TMDB_BASE_URL}/tv/${id}/videos?api_key=${TMDB_API_KEY}`)
    ]);
    
    return {
      show: showResponse.data,
      cast: creditsResponse.data.cast.slice(0, 5),
      trailers: videosResponse.data.results.filter(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )
    };
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

export const fetchSimilarTVShows = async (id, page = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/${id}/similar?api_key=${TMDB_API_KEY}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching similar TV shows:', error);
    throw error;
  }
};

// Search API functions
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const searchTVShows = async (query) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching TV shows:', error);
    throw error;
  }
};

export const searchContent = async (query) => {
  try {
    const [movieResponse, tvResponse] = await Promise.all([
      searchMovies(query),
      searchTVShows(query)
    ]);
    
    return {
      movies: movieResponse,
      tvShows: tvResponse
    };
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
};