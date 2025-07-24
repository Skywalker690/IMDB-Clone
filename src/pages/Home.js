import Header from '../components/header/Header';
import HeroSection from '../components/hero/HeroSection';
import TrendingSection from '../components/movie/TrendingSection';
import TrendingTVSection from '../components/tv/TrendingTVSection';
import Footer from '../components/footer/Footer';

// Home Page Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      {/* Preview Sections */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100">
        <TrendingSection />
        <TrendingTVSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;