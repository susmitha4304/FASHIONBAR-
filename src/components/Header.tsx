import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, Tag, HelpCircle, FileText, Compass } from 'lucide-react';
import { Product } from '../data/products';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  onSelectCategory: (category: string, subCategory?: string) => void;
  products: Product[];
  onProductClick: (id: string) => void;
  openDrawer: () => void;
}

export default function Header({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  onSearch,
  onSelectCategory,
  products,
  onProductClick,
  openDrawer
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | null>(null);

  // Monitor scroll for premium dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products for predictive search
  const suggestions = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setActiveView('shop');
      setSearchFocused(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    onProductClick(product.id);
    setActiveView('detail');
    setSearchQuery('');
    setSearchFocused(false);
  };

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const executeCategoryFilter = (category: string, sub?: string) => {
    onSelectCategory(category, sub);
    setMobileMenuOpen(false);
    setMegaMenuCategory(null);
  };

  return (
    <>
      {/* Upper Micro Announcement Ribbon */}
      <div className="bg-luxury-black text-white text-[11px] uppercase tracking-[0.25em] py-2 px-4 flex justify-between items-center z-50 relative border-b border-gold/10 font-sans">
        <div className="hidden md:block"> ✨ ELEGANCE MEETS MODERN TRADITION</div>
        <div className="mx-auto md:mx-0 font-medium">
          PREMIUM ETHNIC FESTIVAL OFFER: USE <span className="text-gold font-bold">BARGOLD20</span> FOR 20% OFF
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <button onClick={() => handleNavClick('about')} className="hover:text-gold transition">Our Story</button>
          <span>|</span>
          <button onClick={() => handleNavClick('contact')} className="hover:text-gold transition">Concierge Support</button>
        </div>
      </div>

      {/* Primary Sticky Luxurious Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#111111]/95 backdrop-blur-md shadow-lg border-b border-white/15 py-2'
            : 'bg-[#111111] border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-gold transition p-1"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Brand Logo - Playfair Display & Cormorant pairing */}
            <div 
              onClick={() => setActiveView('home')} 
              className="flex flex-col cursor-pointer select-none"
            >
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.1em] text-white leading-none drop-shadow-sm">
                FASHION<span className="text-gold">BAR</span>
              </h1>
              <p className="font-sans text-[8px] uppercase tracking-[0.45em] text-gold font-medium ml-0.5">
                haute couture
              </p>
            </div>

            {/* Desktop Center Navigation Menus */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              <button
                onClick={() => handleNavClick('home')}
                className={`font-sans text-sm font-medium tracking-wider uppercase pb-1 border-b-2 transition ${
                  activeView === 'home' ? 'border-gold text-white font-bold' : 'border-transparent text-white/60 hover:text-white hover:border-gold'
                }`}
              >
                Home
              </button>

              {/* Mega-Menu Styling for shop collections */}
              <div
                className="relative group"
                onMouseEnter={() => setMegaMenuCategory('shop')}
                onMouseLeave={() => setMegaMenuCategory(null)}
              >
                <button
                  onClick={() => handleNavClick('shop')}
                  className={`font-sans text-sm font-medium tracking-wider uppercase pb-1 border-b-2 transition flex items-center gap-1 cursor-pointer ${
                    activeView === 'shop' ? 'border-gold text-white font-bold' : 'border-transparent text-white/60 hover:text-white hover:border-gold'
                  }`}
                >
                  Collections
                </button>

                {/* Desktop Mega Menu Dropdown */}
                {megaMenuCategory === 'shop' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[650px] bg-[#161616]/95 border border-white/10 shadow-2xl rounded-lg p-6 grid grid-cols-4 gap-6 animate-fadeIn z-50 text-white">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-3">Traditional</h4>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li><button onClick={() => executeCategoryFilter('Traditional Wear', 'Sarees')} className="hover:text-gold transition">Sarees</button></li>
                        <li><button onClick={() => executeCategoryFilter('Traditional Wear', 'Lehengas')} className="hover:text-gold transition">Lehengas</button></li>
                        <li><button onClick={() => executeCategoryFilter('Traditional Wear', 'Kurtis')} className="hover:text-gold transition">Kurtis</button></li>
                        <li><button onClick={() => executeCategoryFilter('Traditional Wear', 'Salwar Suits')} className="hover:text-gold transition">Salwar Suits</button></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-3">Modern Haute</h4>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li><button onClick={() => executeCategoryFilter('Modern Fashion', 'Dresses')} className="hover:text-gold transition">Dresses</button></li>
                        <li><button onClick={() => executeCategoryFilter('Modern Fashion', 'Tops')} className="hover:text-gold transition">Tops</button></li>
                        <li><button onClick={() => executeCategoryFilter('Modern Fashion', 'Co-ord Sets')} className="hover:text-gold transition">Co-ord Sets</button></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-3">Fine Accents</h4>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li><button onClick={() => executeCategoryFilter('Accessories', 'Handbags')} className="hover:text-gold transition">Handbags</button></li>
                        <li><button onClick={() => executeCategoryFilter('Accessories', 'Jewelry')} className="hover:text-gold transition">Exquisite Jewelry</button></li>
                        <li><button onClick={() => executeCategoryFilter('Accessories', 'Watches')} className="hover:text-gold transition">Swiss Mesh Watches</button></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-3">Lifestyle</h4>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li><button onClick={() => executeCategoryFilter('Beauty Products', 'Beauty Products')} className="hover:text-gold transition">Saffron Radiance</button></li>
                        <li><button onClick={() => executeCategoryFilter('Lifestyle', 'Lifestyle')} className="hover:text-gold transition">Soy Santal Candles</button></li>
                      </ul>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs text-gold font-bold">
                        <Sparkles size={12} className="mr-1 animate-pulse" />
                        <button onClick={() => handleNavClick('offers')} className="underline">Special Deals</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('offers')}
                className={`font-sans text-sm font-medium tracking-wider uppercase pb-1 border-b-2 transition ${
                  activeView === 'offers' ? 'border-gold text-white font-bold' : 'border-transparent text-white/60 hover:text-white hover:border-gold'
                }`}
              >
                Offers & Deals
              </button>

              <button
                onClick={() => handleNavClick('blog')}
                className={`font-sans text-sm font-medium tracking-wider uppercase pb-1 border-b-2 transition ${
                  activeView === 'blog' ? 'border-gold text-white font-bold' : 'border-transparent text-white/60 hover:text-white hover:border-gold'
                }`}
              >
                Editorial Blog
              </button>
            </nav>

            {/* Smart Expandable Search Bar */}
            <div className="flex-1 max-w-xs relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search silk sarees, hand bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-xs font-sans text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  id="search-input-field"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition">
                  <Search size={16} />
                </button>
              </form>

              {/* Predictive Auto Suggestions Panel */}
              {searchFocused && (searchQuery.trim().length > 0 || suggestions.length > 0) && (
                <div className="absolute left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50 text-white">
                  {suggestions.length > 0 ? (
                    <div className="p-2">
                      <div className="text-[10px] font-bold text-gold tracking-widest uppercase p-2 border-b border-white/5">Matching Outfits:</div>
                      {suggestions.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSuggestionClick(p)}
                          className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-8 h-10 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-[11px] font-medium text-white truncate">{p.name}</h5>
                            <p className="text-[10px] text-gold font-bold">${p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-white/50">
                      No exact match. Try 'Saree', 'Lehenga', or 'Linen'.
                    </div>
                  )}
                  {searchQuery && (
                    <div className="bg-[#242424] py-2 px-4 text-[11px] font-bold text-center text-white border-t border-white/5 hover:bg-[#2c2c2c] cursor-pointer" onClick={() => onSearch(searchQuery)}>
                      See all results for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Side Icons Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Intelligent AI Assistant Floating Trigger */}
              <button
                onClick={openDrawer}
                className="relative bg-luxury-black text-gold p-2 rounded-full border border-gold/40 hover:bg-gold hover:text-luxury-black shadow-lg shadow-gold/10 transition-all flex items-center justify-center animate-bounce-subtle"
                title="AI Personal Stylist"
              >
                <Sparkles size={16} className="animate-pulse" />
              </button>

              <button
                onClick={() => handleNavClick('wishlist')}
                className="relative text-white/80 hover:text-gold transition p-1"
                id="wishlist-trigger-btn"
              >
                <Heart size={21} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-gold text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-transparent">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('cart')}
                className="relative text-white/80 hover:text-gold transition p-1"
                id="cart-trigger-btn"
              >
                <ShoppingBag size={21} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-luxury-black text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-transparent">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('account')}
                className="relative text-white/80 hover:text-gold transition p-1 hidden sm:block"
                id="account-trigger-btn"
              >
                <User size={21} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Slide-out Mobile Hamburger Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-55 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-[80%] max-w-sm bg-[#111111] border-r border-white/10 h-full p-6 shadow-2xl flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-serif text-xl font-bold tracking-widest text-white">FASHIONBAR</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-gold">
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Search input */}
              <div className="mt-5 mb-6">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search silk drapes, jewelry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-gold"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                    <Search size={16} />
                  </button>
                </form>
              </div>

              <nav className="space-y-4">
                <button onClick={() => handleNavClick('home')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">Home</button>
                <button onClick={() => handleNavClick('shop')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">Collections</button>
                <button onClick={() => handleNavClick('offers')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">Special Offers</button>
                <button onClick={() => handleNavClick('blog')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">Editorial Blog</button>
                <button onClick={() => handleNavClick('about')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">About Us</button>
                <button onClick={() => handleNavClick('contact')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">Contact Concierge</button>
                <button onClick={() => handleNavClick('account')} className="block w-full text-left font-sans text-sm font-semibold tracking-widest text-white/90 uppercase py-1 border-l-2 pl-3 border-transparent hover:border-gold hover:text-gold">My Account</button>
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 align-bottom">
              <p className="text-[10px] text-white/40 text-center tracking-widest">© 2026 FASHIONBAR HAUTE COUTURE</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111]/95 text-white border-t border-white/10 py-2 px-4 flex justify-between items-center z-45 md:hidden shadow-lg shadow-black/40 backdrop-blur-md">
        <button onClick={() => handleNavClick('home')} className={`flex flex-col items-center gap-0.5 text-xs ${activeView === 'home' ? 'text-gold' : 'text-white/50'}`}>
          <Compass size={18} />
          <span className="text-[9px] font-sans">Discover</span>
        </button>
        <button onClick={() => handleNavClick('shop')} className={`flex flex-col items-center gap-0.5 text-xs ${activeView === 'shop' ? 'text-gold' : 'text-white/50'}`}>
          <Tag size={18} />
          <span className="text-[9px] font-sans">Shop</span>
        </button>
        <button onClick={openDrawer} className="flex flex-col items-center gap-0.5 text-xs text-luxury-black -mt-4 bg-gold rounded-full p-2.5 shadow-md shadow-gold/20 border border-transparent">
          <Sparkles size={18} className="text-luxury-black animate-pulse" />
        </button>
        <button onClick={() => handleNavClick('wishlist')} className={`flex flex-col items-center gap-0.5 text-xs ${activeView === 'wishlist' ? 'text-gold' : 'text-white/50'}`}>
          <div className="relative">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-rose-gold text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">{wishlistCount}</span>}
          </div>
          <span className="text-[9px] font-sans">Wishlist</span>
        </button>
        <button onClick={() => handleNavClick('cart')} className={`flex flex-col items-center gap-0.5 text-xs ${activeView === 'cart' ? 'text-gold' : 'text-white/50'}`}>
          <div className="relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-gold text-luxury-black text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">{cartCount}</span>}
          </div>
          <span className="text-[9px] font-sans">Cart</span>
        </button>
      </div>

      {/* Extra safety spacer for mobile sticky footer */}
      <div className="h-10 md:hidden"></div>
    </>
  );
}
