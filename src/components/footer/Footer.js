// Enhanced Professional Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    discover: [
      { name: 'Popular Movies', href: '/movies' },
      { name: 'Trending TV Shows', href: '/tv' },
      { name: 'My Watchlist', href: '/watchlist' },
      { name: 'Search Movies', href: '/search?query=' },
    ],
    genres: [
      { name: 'Action & Adventure', href: '/movies?genre=action' },
      { name: 'Comedy', href: '/movies?genre=comedy' },
      { name: 'Drama', href: '/movies?genre=drama' },
      { name: 'Horror & Thriller', href: '/movies?genre=horror' },
    ],
    company: [
      { name: 'About TMDB', href: 'https://www.themoviedb.org/about' },
      { name: 'API Documentation', href: 'https://developers.themoviedb.org' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Bug Reports', href: '#' },
      { name: 'Feature Requests', href: '#' },
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-16 sm:mt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-center sm:justify-start mb-6">
              <div className="relative">
                <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">TMDB</span>
                <div className="absolute -top-2 -right-16 sm:-right-20">
                  <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg">
                    Clone
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 text-center sm:text-left max-w-md">
              Discover millions of movies, TV shows, and people. A beautiful, modern clone built with cutting-edge web technologies and powered by The Movie Database API.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-center sm:text-left">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent backdrop-blur-sm text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium text-sm shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Discover</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.discover.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block group"
                  >
                    <span className="group-hover:underline">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Genres</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.genres.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block group"
                  >
                    <span className="group-hover:underline">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block group"
                  >
                    <span className="group-hover:underline">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.support.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block group"
                  >
                    <span className="group-hover:underline">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TMDB Attribution Section */}
        <div className="bg-gradient-to-r from-blue-900/30 to-teal-900/30 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                alt="TMDB Logo" 
                className="h-8 sm:h-10 mr-3 sm:mr-4"
              />
              <div>
                <h4 className="text-white font-semibold text-base sm:text-lg">Powered by TMDB</h4>
                <p className="text-gray-300 text-xs sm:text-sm">The Movie Database</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                This product uses the TMDB API but is not endorsed or certified by TMDB. 
                All movie and TV show data is provided by The Movie Database.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-gray-400 mb-2">
              © {currentYear} TMDB Clone. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Built with ❤️ using React, Tailwind CSS, FastAPI & MongoDB
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-400 hidden sm:block">Follow us:</span>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/10"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/10"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/10"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/10"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Final Bottom Notice */}
        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
            <span>Made with modern web technologies</span>
            <span className="hidden sm:inline">•</span>
            <span>React + Vite + Tailwind CSS</span>
            <span className="hidden sm:inline">•</span>
            <span>TMDB API Integration</span>
            <span className="hidden sm:inline">•</span>
            <span>Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;