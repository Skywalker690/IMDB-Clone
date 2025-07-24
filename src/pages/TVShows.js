import Header from '../components/header/Header';
import TrendingTVSection from '../components/tv/TrendingTVSection';
import PopularTVSection from '../components/tv/PopularTVSection';
import Footer from '../components/footer/Footer';

// TV Shows Page Component - Enhanced Mobile Responsive
const TVShows = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            TV Shows
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white">
            Discover amazing TV series and shows from around the world.
          </p>
        </div>
      </div>
      <TrendingTVSection />
      <PopularTVSection />
      <Footer />
    </div>
  );
};

export default TVShows;