import Header from '../components/header/Header';
import TrendingSection from '../components/movie/TrendingSection';
import PopularSection from '../components/movie/PopularSection';
import Footer from '../components/footer/Footer';

// Movies Page Component - Enhanced Mobile Responsive
const Movies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            Movies
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white">
            Discover amazing movies from around the world.
          </p>
        </div>
      </div>
      <TrendingSection />
      <PopularSection />
      <Footer />
    </div>
  );
};

export default Movies;