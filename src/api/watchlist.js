// Watchlist utility functions
export const getWatchlist = (type = 'movie') => {
  const storageKey = type === 'movie' ? 'tmdb_watchlist' : 'tmdb_tv_watchlist';
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
};

export const addToWatchlist = (item, type = 'movie') => {
  const storageKey = type === 'movie' ? 'tmdb_watchlist' : 'tmdb_tv_watchlist';
  const watchlist = getWatchlist(type);
  
  if (!watchlist.some(existing => existing.id === item.id)) {
    const newWatchlist = [...watchlist, item];
    localStorage.setItem(storageKey, JSON.stringify(newWatchlist));
    return newWatchlist;
  }
  
  return watchlist;
};

export const removeFromWatchlist = (id, type = 'movie') => {
  const storageKey = type === 'movie' ? 'tmdb_watchlist' : 'tmdb_tv_watchlist';
  const watchlist = getWatchlist(type);
  const newWatchlist = watchlist.filter(item => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(newWatchlist));
  return newWatchlist;
};

export const isInWatchlist = (id, type = 'movie') => {
  const watchlist = getWatchlist(type);
  return watchlist.some(item => item.id === id);
};

export const toggleWatchlist = (item, type = 'movie') => {
  if (isInWatchlist(item.id, type)) {
    return removeFromWatchlist(item.id, type);
  } else {
    return addToWatchlist(item, type);
  }
};