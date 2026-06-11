import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  User, 
  Search, 
  ArrowRight, 
  Star, 
  Percent, 
  Grid, 
  List, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  X, 
  Check, 
  Info, 
  Copy, 
  MessageSquare, 
  HelpCircle, 
  Award,
  Trash2,
  Lock,
  ChevronRight,
  Gift,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

import { PRODUCTS, Product, REVIEWS, BlogPost, BLOG_POSTS, COUPONS, Coupon } from './data/products';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import SizeChartModal from './components/SizeChartModal';
import AIShoppingAssistant from './components/AIShoppingAssistant';
import ProductCard from './components/ProductCard';

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export default function App() {
  // Navigation & View Flow State
  const [activeView, setActiveView] = useState<string>('home'); // home | shop | detail | offers | wishlist | cart | checkout | about | contact | blog | account
  const [selectedProductId, setSelectedProductId] = useState<string>('trad-saree-1');
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Shop Filter Options State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedSubCategoryFilter, setSelectedSubCategoryFilter] = useState<string>('All');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('All');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState<string>('All');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(500);
  const [sortOption, setSortOption] = useState<string>('Newest');
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Panels Drawer States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeChartOpen, setSizeChartOpen] = useState<boolean>(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);

  // Coupon State
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0); // discount percent
  const [copiedCouponCode, setCopiedCouponCode] = useState<string | null>(null);

  // Contact Page State
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // Checkout Steps
  const [checkoutStep, setCheckoutStep] = useState<number>(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'Susmitha',
    lastName: 'Karaka',
    email: 'susmitha.karaka07@gmail.com',
    phone: '+91 94412 34567',
    street: '14 Royal Atelier Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);

  // User Account & Past Orders Simulator
  const [userProfile, setUserProfile] = useState({
    name: 'Susmitha Karaka',
    email: 'susmitha.karaka07@gmail.com',
    phone: '+91 94412 34567',
    memberSince: 'March 2026',
    loyaltyPoints: 340,
    shippingAddresses: [
      { id: '1', street: '14 Royal Atelier Marg', city: 'Mumbai', state: 'Maharashtra', zip: '400001' }
    ]
  });

  const [simulatedOrders, setSimulatedOrders] = useState<any[]>([
    {
      id: "FB-9923K",
      date: "May 12, 2026",
      status: "Delivered",
      total: 189,
      items: [
        { name: "Classic Crimson Banarasi Georgette Saree", size: "One Size", quantity: 1 }
      ]
    },
    {
      id: "FB-8861P",
      date: "April 20, 2026",
      status: "Delivered",
      total: 79,
      items: [
        { name: "Mint Sage Hand-Block Cotton Kurta Set", size: "M", quantity: 1 }
      ]
    }
  ]);

  // Flash Sale Dynamic Countdown Simulation
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 32, seconds: 15 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 }; // Loop simulation
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Home Hero Banner Auto-Slider
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const heroSlides = [
    {
      title: "Royal Traditional Weaves",
      heading: "Elegance Meets Modern Fashion",
      subheading: "Discover Traditional, Contemporary & Lifestyle Collections Designed For Every Occasion.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
      cta: "Shop Sarees"
    },
    {
      title: "Haute Couture Ensembles",
      heading: "Crafted Pleats & Pure Linens",
      subheading: "Curated minimalist modern silhouettes that strike absolute visual poetry with premium cuts.",
      image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&q=80&w=1200",
      cta: "Explore Modern Wear"
    }
  ];

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setActiveHeroSlide(prev => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(bannerTimer);
  }, []);

  // Add to Cart handler
  const handleAddToCart = (product: Product, size: string, color: string, q = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item.product.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + q }
          : item
        );
      }
      return [...prev, { product, size, color, quantity: q }];
    });
  };

  // Toggle Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => 
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  const handleBuyNowDirect = (product: Product) => {
    const size = product.sizes[0] === "One Size" ? "One Size" : (product.sizes[1] || "M");
    const color = product.colors[0] || "Default";
    handleAddToCart(product, size, color, 1);
    setActiveView('cart');
  };

  // Switch category with full presets mapping
  const handleCategorySelection = (cat: string, subCat = 'All') => {
    setSelectedCategoryFilter(cat);
    setSelectedSubCategoryFilter(subCat);
    setActiveView('shop');
  };

  // Execute Search query from header
  const handleSearchExecution = (query: string) => {
    setSearchQuery(query);
    setActiveView('shop');
  };

  // Main calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartDiscountAmt = (cartSubtotal * couponDiscount) / 100;
  const deliveryCharges = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15;
  const billingTotal = cartSubtotal - cartDiscountAmt + deliveryCharges;

  // Apply Voucher code
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const coup = COUPONS.find(c => c.code.toUpperCase() === appliedCouponCode.trim().toUpperCase());
    if (coup) {
      if (coup.minAmount && cartSubtotal < coup.minAmount) {
        alert(`This promo requires a minimum purchase value of $${coup.minAmount}.`);
        return;
      }
      setCouponDiscount(coup.discountPercent);
    } else {
      alert("Invalid coupon code. Try one of our special promo deals instead!");
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponCode(code);
    setTimeout(() => setCopiedCouponCode(null), 2000);
  };

  // Contact Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
        setContactSubmitted(false);
      }, 4000);
    }
  };

  // Trigger Checkout Submission Processing
  const handleTriggerCheckoutOrder = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      // Simulate real successful transaction
      const newSimulatedId = "FB-" + Math.floor(10000 + Math.random() * 90000) + "S";
      const newOrder = {
        id: newSimulatedId,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: "Processing",
        total: Math.round(billingTotal),
        items: cart.map(c => ({ name: c.product.name, size: c.size, quantity: c.quantity }))
      };

      setSimulatedOrders(prev => [newOrder, ...prev]);
      setUserProfile(prev => ({ ...prev, loyaltyPoints: prev.loyaltyPoints + Math.round(cartSubtotal / 10) }));
      setCart([]);
      setPaymentProcessing(false);
      setCheckoutStep(3); // success screen
    }, 2500);
  };

  // Filter Products Algorithm
  const filteredProducts = PRODUCTS.filter(p => {
    // Search match
    const matchesSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());

    // Category / Subcategory filters
    const matchesCategory = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    const matchesSubCategory = selectedSubCategoryFilter === 'All' || p.subCategory === selectedSubCategoryFilter;
    
    // Multi options filters
    const matchesColor = selectedColorFilter === 'All' || p.colors.includes(selectedColorFilter);
    const matchesSize = selectedSizeFilter === 'All' || p.sizes.includes(selectedSizeFilter);
    const matchesFabric = selectedFabricFilter === 'All' || (p.fabric && p.fabric.toLowerCase().includes(selectedFabricFilter.toLowerCase()));
    const matchesOccasion = selectedOccasionFilter === 'All' || p.occasion.toLowerCase().includes(selectedOccasionFilter.toLowerCase());
    const matchesPrice = p.price <= priceRange;

    return matchesSearch && matchesCategory && matchesSubCategory && matchesColor && matchesSize && matchesFabric && matchesOccasion && matchesPrice;
  });

  // Sort Products Algorithm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'Price Low to High') return a.price - b.price;
    if (sortOption === 'Price High to Low') return b.price - a.price;
    if (sortOption === 'Customer Ratings') return b.rating - a.rating;
    if (sortOption === 'Popularity') return b.reviewsCount - a.reviewsCount;
    // Default or Newest
    return b.price - a.price; // mock newest relative to premium pricing
  });

  // Dynamic Product details item
  const productDetailsItem = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  // Colors database for filters
  const filterColors = ["All", "Cherry Red", "Royal Gold", "Emerald Green", "Mint Sage", "Indigo Blue", "Ivory Gold", "Blush Pink", "Luxury Emerald", "Classic Onyx", "Champagne Blush", "Tan Suede font", "Classic Rose Gold"];
  const filterSizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const filterOccasions = ["All", "Wedding", "Festive", "Cocktail", "Office", "Lifestyle"];
  const filterFabrics = ["All", "Silk", "Georgette", "Cotton", "Linen", "Chiffon", "Satin", "Suede", "Leather"];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-luxury-black font-sans selection:bg-gold/30 antialiased leading-relaxed">
      
      {/* 1. Header component overlay */}
      <Header 
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onSearch={handleSearchExecution}
        onSelectCategory={handleCategorySelection}
        products={PRODUCTS}
        onProductClick={(id) => {
          setSelectedProductId(id);
          setActiveView('detail');
        }}
        openDrawer={() => setAiAssistantOpen(true)}
      />

      {/* Breadcrumbs Navigation helper */}
      {activeView !== 'home' && (
        <div className="bg-gold-cream/40 border-b border-gold-beige py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <button onClick={() => setActiveView('home')} className="hover:text-gold transition">Fashionbar</button>
            <ChevronRight size={12} />
            <span className="text-luxury-black capitalize text-[11px] font-bold tracking-widest uppercase">{activeView}</span>
          </div>
        </div>
      )}

      {/* 2. Primary Page Router views */}
      <main className="flex-1 pb-16 md:pb-24">
        
        {/* VIEW: HOME PAGE */}
        {activeView === 'home' && (
          <div className="animate-fadeIn">
            
            {/* Interactive Custom Hero Carousel block */}
            <div className="relative h-[450px] sm:h-[600px] overflow-hidden bg-neutral-950">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 filter brightness-[0.7]" 
                style={{ backgroundImage: `url('${heroSlides[activeHeroSlide].image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/45 to-transparent"></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white p-6 z-10">
                <span className="text-gold text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4 animate-fadeIn block hover:scale-105 transition-transform origin-left">
                  🌟 {heroSlides[activeHeroSlide].title}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-none mb-6 animate-fadeIn">
                  {heroSlides[activeHeroSlide].heading}
                </h2>
                <p className="text-xs sm:text-base text-gray-300 max-w-xl font-sans mb-8 leading-relaxed">
                  {heroSlides[activeHeroSlide].subheading}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleCategorySelection('Traditional Wear')}
                    className="px-6 py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-lg shadow-gold/20"
                  >
                    Shop Traditional
                  </button>
                  <button 
                    onClick={() => handleCategorySelection('Modern Fashion')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white text-white hover:text-luxury-black font-sans text-xs font-bold uppercase tracking-widest rounded-lg border border-white/30 hover:border-white transition-all active:scale-95"
                  >
                    Examine Modern Collections
                  </button>
                </div>
              </div>

              {/* Slider Dots indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button onClick={() => setActiveHeroSlide(0)} className={`h-2.5 rounded-full transition-all ${activeHeroSlide === 0 ? 'w-8 bg-gold' : 'w-2.5 bg-white/40'}`}></button>
                <button onClick={() => setActiveHeroSlide(1)} className={`h-2.5 rounded-full transition-all ${activeHeroSlide === 1 ? 'w-8 bg-gold' : 'w-2.5 bg-white/40'}`}></button>
              </div>
            </div>

            {/* Campaign Categories Bento Circle */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block mb-2">Exclusive Curation</span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black">Discover Our Curated Departments</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-2">Explore handcrafted silhouettes detailed with traditional values and modern elegance.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { id: '1', name: "Royal Sarees", cat: 'Traditional Wear', sub: 'Sarees', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300' },
                  { id: '2', name: "Haute Lehengas", cat: 'Traditional Wear', sub: 'Lehengas', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=300' },
                  { id: '3', name: "Cocktail Dresses", cat: 'Modern Fashion', sub: 'Dresses', img: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&q=80&w=300' },
                  { id: '4', name: "Exquisite jewelry", cat: 'Accessories', sub: 'Jewelry', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300' },
                ].map(dept => (
                  <div 
                    key={dept.id} 
                    onClick={() => handleCategorySelection(dept.cat, dept.sub)}
                    className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-gold-beige hover:border-gold transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <img src={dept.img} alt={dept.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/10 to-transparent flex items-end p-5">
                      <div>
                        <h4 className="font-serif text-white text-base sm:text-lg font-bold group-hover:text-gold transition">{dept.name}</h4>
                        <span className="text-[10px] text-gold tracking-widest uppercase block mt-1">Shop Haute Department →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* LIMITED FLASH SALE COUNTER BAR */}
            <section className="bg-luxury-black text-white py-12 relative overflow-hidden my-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.06)_0%,transparent_60%)]"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="text-center lg:text-left">
                  <span className="bg-gold/15 text-gold border border-gold/40 text-[9px] font-bold tracking-widest px-3 py-1 uppercase rounded-full mb-3 inline-block">
                    ⚡ LIMITED OFFERS
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">Elite Mid-Season Flash Sale</h3>
                  <p className="text-xs text-gray-400 mt-2">Drape premium sarees & accessorize luxury bags at up to <span className="text-gold font-bold">50% off</span> today.</p>
                </div>

                {/* Countdown display */}
                <div className="flex gap-4">
                  {[
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Mins" },
                    { value: countdown.seconds, label: "Secs" }
                  ].map((t, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white/5 border border-gold/15 rounded-xl flex items-center justify-center text-gold font-serif text-xl sm:text-2xl font-bold shadow-inner">
                        {String(t.value).padStart(2, '0')}
                      </div>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1.5">{t.label}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setSelectedCategoryFilter('Traditional Wear');
                    setActiveView('shop');
                  }}
                  className="px-6 py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-xs font-bold uppercase tracking-widest rounded-lg transition active:scale-95 shadow-lg shadow-gold/20"
                >
                  Drape the Sale Items
                </button>
              </div>
            </section>

            {/* Trending Collections Grid (New Arrivals, Best Sellers, etc) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-10 border-b border-gold-beige pb-4">
                <div>
                  <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block">This Season's Curation</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black">The Trending Atelier Collection</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto w-full sm:w-auto pb-1 mt-3 sm:mt-0 font-sans text-xs text-gray-500">
                  {["Trending Now", "Best Sellers", "New Arrivals", "Staff Picks"].map(tabName => (
                    <button
                      key={tabName}
                      onClick={() => {
                        if (tabName === "Trending Now") setSelectedCategoryFilter('All');
                        if (tabName === "Best Sellers") handleCategorySelection('Traditional Wear');
                        if (tabName === "New Arrivals") handleCategorySelection('Modern Fashion');
                        if (tabName === "Staff Picks") handleCategorySelection('Accessories');
                      }}
                      className="hover:text-gold transition font-medium uppercase tracking-wider flex-shrink-0"
                    >
                      {tabName} →
                    </button>
                  ))}
                </div>
              </div>

              {/* Products listing */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => handleToggleWishlist(product)}
                    onQuickView={() => setQuickViewProduct(product)}
                    onAddToCart={() => handleAddToCart(product, product.sizes[0] || 'M', product.colors[0] || 'Default', 1)}
                    onBuyNow={() => handleBuyNowDirect(product)}
                    onProductClick={() => {
                      setSelectedProductId(product.id);
                      setActiveView('detail');
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Atelier Brand Story Snapshot */}
            <section className="bg-gold-cream py-16 border-y border-gold-beige">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=700" 
                    alt="Atelier workshop drafting" 
                    className="w-full h-[400px] object-cover rounded-2xl shadow-xl border border-gold/15"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl border border-gold-beige shadow-xl hidden sm:block max-w-[250px]">
                    <span className="text-gold font-serif text-3xl font-bold leading-none block">100%</span>
                    <p className="text-[11px] text-gray-500 font-sans tracking-wide mt-1 uppercase font-bold">Verifiably Handloomed Heritage Textiles</p>
                  </div>
                </div>

                <div>
                  <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block mb-2">Our Philosophy</span>
                  <h3 className="font-serif text-3xl font-bold text-luxury-black mb-4">Woven luxury Designed for Every Memory</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mb-6">
                    Fashionbar stands as India and global communities' bespoke atelier. Our silk sarees represent the hand-crafted integrity of legacy weavers, whereas our sleek coordinates speak the clean geometry of western fashion. We strive to craft sustainable luxury, delivering uncompromised quality immediately to your doors.
                  </p>
                  <ul className="space-y-3.5 mb-8 text-[11px] font-semibold text-luxury-black font-sans">
                    <li className="flex items-center gap-2">✨ Direct partnership support with heritage Varanasi weaver clusters</li>
                    <li className="flex items-center gap-2">✨ Certified organic cottons and biodegradable European linens</li>
                    <li className="flex items-center gap-2">✨ Zero plastic signature brand packaging</li>
                  </ul>
                  <button 
                    onClick={() => setActiveView('about')}
                    className="px-6 py-3 border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white transition font-sans text-xs font-bold uppercase tracking-widest rounded-lg"
                  >
                    Read Our Complete Story
                  </button>
                </div>
              </div>
            </section>

            {/* Happy Customer Testimonials Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block mb-1">Customer Diaries</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black">Connoisseur Endorsements</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {REVIEWS.map(r => {
                  const item = PRODUCTS.find(p => p.id === r.productId);
                  return (
                    <div key={r.id} className="bg-white border border-gold-beige p-6 rounded-2xl shadow-sm hover:shadow-xl transition flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-amber-500 mb-4">
                          {Array.from({ length: r.rating }).map((_, idx) => (
                            <Star key={idx} size={13} fill="currentColor" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 italic leading-relaxed font-sans mb-6">"{r.comment}"</p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gold-beige">
                        <div>
                          <h5 className="text-xs font-bold text-luxury-black">{r.userName}</h5>
                          <span className="text-[9px] text-gray-400 font-sans">{r.date}</span>
                        </div>
                        {item && (
                          <div className="text-right">
                            <span className="text-[10px] text-gold font-bold block">{item.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Newsletter Engagement section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
              <div className="bg-luxury-black text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-gold/15">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none"></div>
                
                <div className="max-w-md text-center lg:text-left">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">Get Exclusive Fashion Deals</h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Subscribe today and receive bespoke catalog releases, VIP early access styling invitations, and a <span className="text-gold font-bold">10% discount voucher</span>.
                  </p>
                </div>

                <form 
                  onSubmit={(e) => { e.preventDefault(); alert("Welcome to the Atelier! A VIP 10% voucher has been dispatched to your email address."); }}
                  className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md"
                >
                  <input 
                    type="email" 
                    placeholder="Provide your premium email..." 
                    className="flex-1 bg-white/5 border border-gold/20 hover:border-gold rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gold hover:bg-gold-dark text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </section>

          </div>
        )}

        {/* VIEW: SHOP PAGE */}
        {activeView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
            
            {/* Header section with count */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 mb-8 border-b border-gold-beige pb-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black">Atelier Catalog</h2>
                <p className="text-xs text-gray-500 font-sans mt-1">Showing <span className="text-luxury-black font-bold">{sortedProducts.length}</span> luxury drapes and lifestyle items match your filters.</p>
              </div>

              {/* Sorting and Grid controls */}
              <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-1.5 md:pb-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white border border-gold-beige rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-gold"
                  >
                    <option>Newest</option>
                    <option>Popularity</option>
                    <option>Best Selling</option>
                    <option>Price Low to High</option>
                    <option>Price High to Low</option>
                    <option>Customer Ratings</option>
                  </select>
                </div>

                <div className="h-4 w-px bg-gray-200"></div>

                {/* Grid vs List toggles */}
                <div className="flex items-center gap-1.5 bg-gold-cream border border-gold-beige p-1 rounded-lg">
                  <button onClick={() => setIsGridView(true)} className={`p-1.5 rounded ${isGridView ? 'bg-[#111111] text-white' : 'text-gray-400 hover:text-luxury-black'}`}>
                    <Grid size={13} />
                  </button>
                  <button onClick={() => setIsGridView(false)} className={`p-1.5 rounded ${!isGridView ? 'bg-[#111111] text-white' : 'text-gray-400 hover:text-luxury-black'}`}>
                    <List size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Large layout: Filters Left pane / Catalog Grid right pane */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Filter panel Left drawer widget */}
              <div className="space-y-6 bg-white border border-gold-beige p-6 rounded-2xl h-fit shadow-md">
                <div className="flex justify-between items-center border-b border-gold-beige pb-3">
                  <div className="flex items-center gap-2 font-serif text-lg font-bold text-luxury-black">
                    <Filter size={15} className="text-gold" />
                    <span>Couture Filters</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategoryFilter('All');
                      setSelectedSubCategoryFilter('All');
                      setSelectedColorFilter('All');
                      setSelectedSizeFilter('All');
                      setSelectedFabricFilter('All');
                      setSelectedOccasionFilter('All');
                      setPriceRange(500);
                      setSearchQuery('');
                    }}
                    className="text-[10px] text-gray-500 hover:text-gold uppercase tracking-widest font-bold"
                  >
                    Reset All
                  </button>
                </div>

                {/* Sub-Category selection */}
                <div>
                  <h4 className="text-[11px] font-bold text-luxury-black uppercase tracking-wider block mb-3">Department Category</h4>
                  <div className="space-y-2">
                    {["All", "Traditional Wear", "Modern Fashion", "Accessories", "Beauty Products", "Lifestyle"].map(dept => (
                      <button
                        key={dept}
                        onClick={() => {
                          setSelectedCategoryFilter(dept);
                          setSelectedSubCategoryFilter('All');
                        }}
                        className={`block text-xs text-left w-full transition ${
                          selectedCategoryFilter === dept 
                            ? 'text-gold font-bold hover:scale-105' 
                            : 'text-gray-600 hover:text-luxury-black'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size filters */}
                <div>
                  <h4 className="text-[11px] font-bold text-luxury-black uppercase tracking-wider block mb-3">Filter Size</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {filterSizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSizeFilter(sz)}
                        className={`px-3 py-1 text-[10px] font-serif rounded border text-center transition ${
                          selectedSizeFilter === sz
                            ? 'border-gold bg-[#111111] text-white font-bold'
                            : 'border-gold-beige bg-[#FAF7F2] text-gray-600 hover:border-gold'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors palette */}
                <div>
                  <h4 className="text-[11px] font-bold text-luxury-black uppercase tracking-wider block mb-3">Atelier Shade Group</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {filterColors.slice(0, 8).map(col => (
                      <button
                        key={col}
                        onClick={() => setSelectedColorFilter(col)}
                        className={`px-2.5 py-1 text-[10px] border rounded-full transition ${
                          selectedColorFilter === col
                            ? 'border-gold bg-luxury-black text-white font-bold'
                            : 'border-gold-beige bg-[#FAF7F2] text-gray-500 hover:border-gold'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric Type */}
                <div>
                  <h4 className="text-[11px] font-bold text-luxury-black uppercase tracking-wider block mb-3">Textile Fabric</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {filterFabrics.map(fab => (
                      <button
                        key={fab}
                        onClick={() => setSelectedFabricFilter(fab)}
                        className={`px-3 py-1 text-[10px] border rounded transition ${
                          selectedFabricFilter === fab
                            ? 'border-gold bg-gold text-white font-bold'
                            : 'border-gold-beige bg-[#FAF7F2] text-gray-500 hover:border-gold'
                        }`}
                      >
                        {fab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasions */}
                <div>
                  <h4 className="text-[11px] font-bold text-luxury-black uppercase tracking-wider block mb-3">Occasion Selection</h4>
                  <div className="space-y-1">
                    {filterOccasions.map(occ => (
                      <label key={occ} className="flex items-center gap-2 text-xs py-1 cursor-pointer">
                        <input
                          type="radio"
                          name="occasion-filter"
                          checked={selectedOccasionFilter === occ}
                          onChange={() => setSelectedOccasionFilter(occ)}
                          className="accent-gold h-3.5 w-3.5"
                        />
                        <span className={selectedOccasionFilter === occ ? 'text-gold font-semibold' : 'text-gray-600'}>{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price sliding control */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-[11px] font-bold text-luxury-black uppercase tracking-wider block">Max Pricing</h4>
                    <span className="text-xs text-gold font-bold">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                    <span>$30</span>
                    <span>$500</span>
                  </div>
                </div>

              </div>

              {/* Products Catalog panel */}
              <div className="lg:col-span-3">
                {sortedProducts.length === 0 ? (
                  <div className="bg-white border border-gold-beige p-16 text-center rounded-2xl flex flex-col items-center justify-center">
                    <AlertCircle size={36} className="text-gold mb-3" />
                    <h4 className="text-lg font-serif font-bold text-luxury-black">No Boutique Items Fit Sizing/Pricing Filters</h4>
                    <p className="text-xs text-gray-500 mt-1.5 mb-6 max-w-sm">Try resetting your filters or chatting with our AI Stylist in the side drawer to recommend equivalent items!</p>
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter('All');
                        setSelectedSubCategoryFilter('All');
                        setSelectedColorFilter('All');
                        setSelectedSizeFilter('All');
                        setSelectedFabricFilter('All');
                        setSelectedOccasionFilter('All');
                        setPriceRange(500);
                        setSearchQuery('');
                      }}
                      className="px-6 py-2.5 bg-[#111111] hover:bg-gold text-white font-bold uppercase text-[10px] tracking-widest rounded transition-all"
                    >
                      Reset All Filters
                    </button>
                    <button onClick={() => setAiAssistantOpen(true)} className="text-xs text-gold font-bold tracking-wider uppercase mt-4 underline flex items-center gap-1">
                      <Sparkles size={11} /> Open AI Personal Stylist
                    </button>
                  </div>
                ) : isGridView ? (
                  /* Grid Catalog Layout */
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
                    {sortedProducts.map(product => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={() => handleToggleWishlist(product)}
                        onQuickView={() => setQuickViewProduct(product)}
                        onAddToCart={() => handleAddToCart(product, product.sizes[0] || 'M', product.colors[0] || 'Default', 1)}
                        onBuyNow={() => handleBuyNowDirect(product)}
                        onProductClick={() => {
                          setSelectedProductId(product.id);
                          setActiveView('detail');
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  /* Horizontal List Catalog Layout */
                  <div className="space-y-4 animate-fadeIn">
                    {sortedProducts.map(product => (
                      <div 
                        key={product.id} 
                        onClick={() => { setSelectedProductId(product.id); setActiveView('detail'); }}
                        className="bg-white border border-gold-beige hover:border-gold p-4 rounded-2xl flex gap-6 items-center shadow-sm cursor-pointer transition-all hover:-translate-y-0.5"
                      >
                        <img src={product.images[0]} alt={product.name} className="w-24 sm:w-32 aspect-[3/4] object-cover rounded-xl flex-shrink-0" />
                        <div className="flex-1 min-w-0 py-2 flex flex-col justify-between h-full">
                          <div>
                            <span className="text-[9px] font-bold text-gold tracking-widest uppercase">{product.subCategory}</span>
                            <h3 className="font-serif text-lg font-bold text-luxury-black mt-1 mb-2 hover:text-gold transition truncate">{product.name}</h3>
                            <p className="text-xs text-gray-400 font-sans line-clamp-2 max-w-xl mb-4">{product.description}</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                            <div className="flex items-baseline gap-2">
                              <span className="text-base font-bold text-luxury-black font-sans">${product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-xs text-[#B76E79] line-through font-sans">${product.originalPrice}</span>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
                                className="px-3.5 py-1.5 border border-gold-beige text-luxury-black text-[10px] font-bold uppercase tracking-widest hover:border-gold rounded transition"
                              >
                                Quick View
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(product, product.sizes[0] || 'M', product.colors[0] || 'Default', 1); }}
                                className="px-3.5 py-1.5 bg-gold hover:bg-gold-dark text-white text-[10px] font-bold uppercase tracking-widest rounded transition active:scale-95"
                              >
                                + Add Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW: PRODUCT DETAILS PAGE */}
        {activeView === 'detail' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            {/* Split gallery left / descriptions right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white border border-gold-beige p-6 sm:p-12 rounded-3xl shadow-sm">
              
              {/* Product galleries */}
              <div className="space-y-4">
                <div className="relative aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden shadow-lg border border-gold-beige">
                  <img 
                    src={productDetailsItem.images[0]} 
                    alt={productDetailsItem.name} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-[1.03]"
                    id="primary-details-image"
                  />
                  {productDetailsItem.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-rose-gold text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase rounded-full shadow-lg z-10">
                      {productDetailsItem.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Extra thumbnails */}
                {productDetailsItem.images.length > 1 && (
                  <div className="flex gap-3">
                    {productDetailsItem.images.map((img, index) => (
                      <button 
                        key={index}
                        className="h-20 w-16 bg-neutral-900 border rounded-lg overflow-hidden border-gold-beige hover:border-gold transition-all"
                      >
                        <img src={img} alt="Product view thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Descriptions & Actions panel */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block mb-1.5">{productDetailsItem.category} • {productDetailsItem.subCategory}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-luxury-black tracking-tight mb-3">
                    {productDetailsItem.name}
                  </h2>

                  {/* Rating summary */}
                  <div className="flex items-center gap-3 mb-6 font-sans">
                    <div className="flex text-amber-500 gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(productDetailsItem.rating) ? "currentColor" : "none"} className={i < Math.floor(productDetailsItem.rating) ? "text-amber-500" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-bold">({productDetailsItem.reviewsCount} verified connoisseur reviews)</span>
                  </div>

                  {/* Price banner */}
                  <div className="flex items-baseline gap-4 mb-6 bg-gold-cream border border-gold-beige p-4 rounded-2xl">
                    <span className="font-serif text-3xl font-bold text-luxury-black">${productDetailsItem.price}</span>
                    {productDetailsItem.originalPrice > productDetailsItem.price && (
                      <>
                        <span className="text-sm text-gray-400 line-through">${productDetailsItem.originalPrice}</span>
                        <span className="text-xs text-rose-gold font-bold">Save ${(productDetailsItem.originalPrice - productDetailsItem.price)}</span>
                      </>
                    )}
                  </div>

                  {/* Core copy description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mb-6">
                    {productDetailsItem.description}
                  </p>

                  {/* Specification List */}
                  <div className="border-t border-b border-gold-beige py-4 mb-6 space-y-2.5 text-xs text-gray-700 font-sans">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Atelier Fabric weave:</span>
                      <span className="font-semibold text-luxury-black">{productDetailsItem.fabric || "Premium Suede Blend"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Drape Material:</span>
                      <span className="font-semibold text-luxury-black">{productDetailsItem.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Recommended Occasion:</span>
                      <span className="font-semibold text-luxury-black">{productDetailsItem.occasion}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-400 font-medium">Fit Sizing equivalent:</span>
                      <button onClick={() => setSizeChartOpen(true)} className="text-gold font-bold hover:underline uppercase tracking-wide text-[10px]">
                        📏 View Size Blueprint chart
                      </button>
                    </div>
                  </div>

                  {/* Options selections */}
                  <div className="space-y-4 mb-8">
                    {productDetailsItem.sizes[0] !== "One Size" && (
                      <div>
                        <span className="text-xs font-bold text-luxury-black uppercase tracking-wider block mb-2">Configure Size Tag</span>
                        <div className="flex gap-2">
                          {productDetailsItem.sizes.map(s => (
                            <button key={s} className="h-9 min-w-[36px] bg-[#FAF7F2] border border-gold border-solid text-luxury-black hover:bg-[#111111] hover:text-white transition font-sans text-xs font-bold rounded">
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-xs font-bold text-luxury-black uppercase tracking-wider block mb-2">Available Shade:</span>
                      <div className="flex gap-2.5">
                        {productDetailsItem.colors.map(col => (
                          <span key={col} className="px-3.5 py-1 text-xs border border-gold-beige bg-[#FAF7F2] rounded-full font-medium">
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Primary Action bar CTA */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAddToCart(productDetailsItem, productDetailsItem.sizes[0] || 'M', productDetailsItem.colors[0] || 'Default', 1)}
                      className="flex-1 py-4 bg-gold hover:bg-gold-dark text-white font-sans text-xs font-bold uppercase tracking-widest shadow-lg shadow-gold/20 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} /> Add to Atelier Bag
                    </button>
                    <button 
                      onClick={() => handleToggleWishlist(productDetailsItem)}
                      className={`p-4 border rounded-xl flex items-center justify-center transition-all ${
                        wishlist.includes(productDetailsItem.id)
                          ? 'bg-rose-50 border-rose-200 text-rose-gold'
                          : 'bg-white border-gold-beige text-gray-400 hover:text-gold hover:border-gold'
                      }`}
                    >
                      <Heart size={18} fill={wishlist.includes(productDetailsItem.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleBuyNowDirect(productDetailsItem)}
                    className="w-full py-4 border-2 border-luxury-black hover:bg-luxury-black hover:text-white transition text-luxury-black font-sans text-xs font-bold uppercase tracking-widest rounded-xl"
                  >
                    Express Buy Now
                  </button>
                </div>

              </div>

            </div>

            {/* Similiar Recommendation Carousel section */}
            <section className="mt-16">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-black border-b border-gold-beige pb-3 mb-8 flex items-center gap-2">
                <Sparkles size={16} className="text-gold" />
                <span>Examine Complementary Pieces</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.id !== productDetailsItem.id).slice(0, 4).map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => handleToggleWishlist(product)}
                    onQuickView={() => setQuickViewProduct(product)}
                    onAddToCart={() => handleAddToCart(product, product.sizes[0] || 'M', product.colors[0] || 'Default', 1)}
                    onBuyNow={() => handleBuyNowDirect(product)}
                    onProductClick={() => {
                      setSelectedProductId(product.id);
                      setActiveView('detail');
                    }}
                  />
                ))}
              </div>
            </section>

          </div>
        )}

        {/* VIEW: OFFERS & DEALS PAGE */}
        {activeView === 'offers' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            <div className="text-center mb-12">
              <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block mb-1">Promotion Center</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-luxury-black">Festival Deals & Coupons</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 font-sans">Apply luxury voucher discounts around checkout. Click on individual codes below to copy of them.</p>
            </div>

            {/* Coupons Card list Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {COUPONS.map(c => (
                <div key={c.code} className="bg-white border-2 border-dashed border-gold p-6 rounded-2xl relative shadow-sm hover:shadow-xl transition overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gold text-luxury-black text-[9px] font-bold tracking-widest px-3 py-1 uppercase rounded-bl-lg">
                    {c.discountPercent}% OFF
                  </div>

                  <span className="text-gold text-[10px] uppercase font-bold tracking-widest block mb-1">Coupon code</span>
                  <div className="flex items-center gap-2.5 mb-4">
                    <input 
                      type="text" 
                      value={c.code} 
                      readOnly 
                      className="font-serif text-lg font-bold text-luxury-black border-none p-0 focus:outline-none focus:ring-0 w-28 bg-transparent"
                    />
                    <button 
                      onClick={() => handleCopyCode(c.code)}
                      className="p-1 px-2.5 bg-gold-cream border border-gold-beige text-luxury-black text-[10px] rounded hover:border-gold font-sans font-bold transition flex items-center gap-1 active:scale-95"
                    >
                      {copiedCouponCode === c.code ? (
                        <>
                          <Check size={10} className="text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={10} /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-4 font-sans">{c.description}</p>
                  
                  <div className="border-t border-gold-beige pt-3.5 flex justify-between items-center text-[10px] text-gray-400">
                    <span>Expiry: {c.expiryDate}</span>
                    {c.minAmount && <span className="font-bold text-gold">Min Order: ${c.minAmount}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Flash promotions product showcase */}
            <div className="bg-luxury-black text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden my-6 border border-gold/15">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase block mb-2">Flash Campaign Offer</span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold">Bridal Wardrobe Combo Deals</h3>
                  <p className="text-xs text-gray-400 mt-2 font-sans mb-6">
                    Unlock extra savings when pairing majestic Kanjeevarams with heritage handcrafted Kundan emerald gold plated bridal chokers! Experience royal bridal curation at up to 40% combined discount cuts.
                  </p>
                  <button 
                    onClick={() => handleCategorySelection('Traditional Wear')}
                    className="px-6 py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-xs font-bold uppercase tracking-widest rounded-lg"
                  >
                    Examine Bridal Wardrobe
                  </button>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600" alt="Bridal Lehenga styling" className="w-full h-80 object-cover rounded-2xl filter brightness-90 shadow-2xl" />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: ELITE WISHLIST PAGE */}
        {activeView === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black border-b border-gold-beige pb-3 mb-8">
              My Saved Wishlist
            </h2>

            {wishlist.length === 0 ? (
              <div className="bg-white border border-gold-beige p-16 text-center rounded-2xl">
                <Heart size={36} className="text-rose-gold mb-3 mx-auto animate-pulse" />
                <h4 className="font-serif text-lg font-bold text-luxury-black">Your Closet List is Empty</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-6">Browse our majestic sarees, coordinates, and accessories catalogs to save items for future orders.</p>
                <button 
                  onClick={() => setActiveView('shop')}
                  className="px-6 py-2.5 bg-[#111111] text-white hover:bg-gold font-bold uppercase text-[10px] tracking-widest rounded"
                >
                  Explore Haute Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
                {PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                  <div key={product.id} className="relative group">
                    <ProductCard 
                      product={product}
                      isWishlisted={true}
                      onToggleWishlist={() => handleToggleWishlist(product)}
                      onQuickView={() => setQuickViewProduct(product)}
                      onAddToCart={() => handleAddToCart(product, product.sizes[0] || 'M', product.colors[0] || 'Default', 1)}
                      onBuyNow={() => handleBuyNowDirect(product)}
                      onProductClick={() => {
                        setSelectedProductId(product.id);
                        setActiveView('detail');
                      }}
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
                      className="absolute top-3 right-3 bg-white hover:bg-rose-50 text-rose-gold p-1.5 rounded-full shadow-md hover:scale-105 transition-all z-10"
                      title="Delete saved item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW: SHOPPING CART PAGE */}
        {activeView === 'cart' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black border-b border-gold-beige pb-3 mb-8">
              Your Haute Designer Bag
            </h2>

            {cart.length === 0 ? (
              <div className="bg-white border border-gold-beige p-16 text-center rounded-2xl flex flex-col items-center">
                <ShoppingBag size={36} className="text-gold mb-3 animate-bounce" />
                <h4 className="font-serif text-lg font-bold text-luxury-black">Your Cart is Empty</h4>
                <p className="text-xs text-gray-500 mt-1 mb-6">Select from our outstanding ethnic outfits or modern collections to add drapes to your bag.</p>
                <button 
                  onClick={() => setActiveView('shop')}
                  className="px-6 py-2.5 bg-luxury-black text-white hover:bg-gold font-bold uppercase text-[10px] tracking-widest rounded"
                >
                  Explore Haute Department
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cart list panel Left */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="bg-white border border-gold-beige p-4 rounded-2xl flex gap-4 sm:gap-6 items-center relative"
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl flex-shrink-0" />
                      
                      <div className="flex-1 min-w-0 pr-8">
                        <span className="text-[9px] font-bold text-gold tracking-widest uppercase">{item.product.subCategory}</span>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-luxury-black mt-0.5 truncate">{item.product.name}</h4>
                        <p className="text-[10px] text-gray-400 capitalize font-sans tracking-wide mt-1">Config: {item.size} • {item.color}</p>
                        
                        {/* Quantity management */}
                        <div className="flex items-center gap-3 mt-3">
                          <button 
                            onClick={() => {
                              if (item.quantity > 1) {
                                setCart(prev => prev.map((itm, i) => i === index ? { ...itm, quantity: itm.quantity - 1 } : itm));
                              } else {
                                setCart(prev => prev.filter((_, i) => i !== index));
                              }
                            }}
                            className="h-6 w-6 bg-[#FAF7F2] border border-gold-beige hover:border-gold font-bold rounded flex items-center justify-center text-xs active:scale-95"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold font-sans">{item.quantity}</span>
                          <button 
                            onClick={() => setCart(prev => prev.map((itm, i) => i === index ? { ...itm, quantity: itm.quantity + 1 } : itm))}
                            className="h-6 w-6 bg-[#FAF7F2] border border-gold-beige hover:border-gold font-bold rounded flex items-center justify-center text-xs active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line pricing */}
                      <div className="text-right">
                        <span className="font-sans text-sm sm:text-base font-bold text-luxury-black block">${item.product.price * item.quantity}</span>
                        <span className="text-[10px] text-gray-400 font-sans block mt-1">${item.product.price} each</span>
                      </div>

                      {/* Elimination action */}
                      <button 
                        onClick={() => setCart(prev => prev.filter((_, i) => i !== index))}
                        className="absolute top-4 right-4 text-gray-300 hover:text-rose-gold p-1"
                        title="Eliminate item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary panel Right */}
                <div className="space-y-6">
                  
                  {/* Coupon prompt bar */}
                  <div className="bg-white border border-gold-beige p-5 rounded-2xl shadow-sm">
                    <h4 className="font-serif text-sm font-bold text-luxury-black mb-3">Apply Special Voucher</h4>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Voucher code e.g. BARGOLD20"
                        value={appliedCouponCode}
                        onChange={(e) => setAppliedCouponCode(e.target.value)}
                        className="flex-1 bg-[#FAF7F2] border border-gold-beige rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold uppercase"
                        id="cart-coupon-input"
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-luxury-black hover:bg-gold text-white hover:text-luxury-black font-sans text-[10px] font-bold tracking-widest uppercase rounded-lg transition"
                      >
                        Apply
                      </button>
                    </form>
                    {couponDiscount > 0 && (
                      <p className="text-[10px] text-emerald-600 font-semibold mt-2">✨ Coupon applied successfully! Saving {couponDiscount}% off selected items.</p>
                    )}
                  </div>

                  {/* Summary grid billing stats */}
                  <div className="bg-white border border-gold-beige p-6 rounded-2xl shadow-sm space-y-4">
                    <h4 className="font-serif text-base font-bold text-luxury-black border-b border-gold-beige pb-3">Bag Order Summary</h4>
                    
                    <div className="space-y-2 text-xs text-gray-500 font-sans border-b border-gold-beige pb-3.5">
                      <div className="flex justify-between">
                        <span>Cart Subtotal:</span>
                        <span className="font-bold text-luxury-black">${cartSubtotal}</span>
                      </div>
                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Promo Saving ({couponDiscount}%):</span>
                          <span className="font-bold">-${cartDiscountAmt}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Luxe Delivery Insured charges:</span>
                        <span className="font-bold text-luxury-black">{deliveryCharges === 0 ? 'FREE' : `$${deliveryCharges}`}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline font-serif text-lg font-bold text-luxury-black">
                      <span>Total Invoice:</span>
                      <span className="font-sans text-xl">${billingTotal}</span>
                    </div>

                    <p className="text-[10px] text-gray-400 font-sans leading-relaxed text-center py-2 bg-[#FAF7F2] rounded-lg">
                      🔒 Guaranteed premium parcel insurance included at no additional custom fee.
                    </p>

                    <button 
                      onClick={() => {
                        setCheckoutStep(1);
                        setActiveView('checkout');
                      }}
                      className="w-full py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-xs font-bold uppercase tracking-widest shadow-lg shadow-gold/20 rounded-xl transition text-center block"
                      id="proceed-checkout-btn"
                    >
                      Proceed to Secure Checkout
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* VIEW: CHECKOUT PAGE (Multi step progress tracker) */}
        {activeView === 'checkout' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12 text-center text-xs font-semibold font-sans">
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center border font-bold ${checkoutStep >= 1 ? 'bg-gold border-gold text-white' : 'border-gray-300 text-gray-400'}`}>1</span>
                <span className={checkoutStep >= 1 ? 'text-luxury-black font-bold' : 'text-gray-400'}>Shipping Atelier</span>
              </div>
              <div className="h-px w-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center border font-bold ${checkoutStep >= 2 ? 'bg-gold border-gold text-white' : 'border-gray-300 text-gray-400'}`}>2</span>
                <span className={checkoutStep >= 2 ? 'text-luxury-black font-bold' : 'text-gray-400'}>Payment Vault</span>
              </div>
              <div className="h-px w-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center border font-bold ${checkoutStep >= 3 ? 'bg-gold border-gold text-white' : 'border-gray-300 text-gray-400'}`}>3</span>
                <span className={checkoutStep >= 3 ? 'text-luxury-black font-bold' : 'text-gray-400'}>Confirmation receipt</span>
              </div>
            </div>

            {/* STEP 1: SHIPPING ADDRESS DETAILS */}
            {checkoutStep === 1 && (
              <div className="bg-white border border-gold-beige p-6 sm:p-10 rounded-2xl shadow-sm space-y-6">
                <h3 className="font-serif text-xl font-bold text-luxury-black border-b border-gold-beige pb-3">Atelier Postal & Delivery Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">First name</label>
                    <input 
                      type="text" 
                      value={shippingAddress.firstName} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Last name</label>
                    <input 
                      type="text" 
                      value={shippingAddress.lastName} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Delivery Apartment / street address</label>
                    <input 
                      type="text" 
                      value={shippingAddress.street} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">City</label>
                    <input 
                      type="text" 
                      value={shippingAddress.city} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">State</label>
                    <input 
                      type="text" 
                      value={shippingAddress.state} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Zip postal code</label>
                    <input 
                      type="text" 
                      value={shippingAddress.zip} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, zip: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Country</label>
                    <input 
                      type="text" 
                      value={shippingAddress.country} 
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gold-beige flex justify-between">
                  <button onClick={() => setActiveView('cart')} className="text-luxury-black font-semibold uppercase hover:underline text-xs">Back to Bag</button>
                  <button 
                    onClick={() => {
                      if (shippingAddress.firstName && shippingAddress.street && shippingAddress.city) {
                        setCheckoutStep(2);
                      } else {
                        alert("Please fill out major delivery details first.");
                      }
                    }}
                    className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-xs font-bold uppercase tracking-widest rounded transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD & REVIEW SECURE TRANSACTION */}
            {checkoutStep === 2 && (
              <div className="bg-white border border-gold-beige p-6 sm:p-10 rounded-2xl shadow-sm space-y-6">
                <h3 className="font-serif text-xl font-bold text-luxury-black border-b border-gold-beige pb-3">Vault Secure Payment Gateway</h3>
                
                {/* Method Radios */}
                <div className="space-y-2.5 font-sans">
                  {[
                    { id: 'card', name: "Credit or Debit Card (Visa, MasterCard, Amex)" },
                    { id: 'upi', name: "UPI Instant (GPay, PhonePe, Paytm)" },
                    { id: 'net', name: "Secure Corporate Net Banking" },
                    { id: 'cod', name: "Cash on Delivery (Available in Mumbai)" }
                  ].map(mth => (
                    <label key={mth.id} className="flex items-center gap-3 p-3.5 bg-[#FAF7F2] border border-gold-beige rounded-xl cursor-pointer hover:border-gold transition-colors">
                      <input 
                        type="radio" 
                        name="payment-method-selector"
                        checked={paymentMethod === mth.id}
                        onChange={() => setPaymentMethod(mth.id)}
                        className="accent-gold h-4 w-4"
                      />
                      <span className="text-xs font-semibold text-luxury-black">{mth.name}</span>
                    </label>
                  ))}
                </div>

                {/* Simulated inputs for credit cards */}
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-gold/15 bg-gold-cream/40 rounded-xl text-xs font-sans">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Card number digits</label>
                      <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx" className="w-full bg-white border border-gold-beige rounded p-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Expiration MM/YY</label>
                      <input type="text" placeholder="12/29" className="w-full bg-white border border-gold-beige rounded p-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">CVV Vault key</label>
                      <input type="password" placeholder="***" className="w-full bg-white border border-gold-beige rounded p-2 focus:outline-none" />
                    </div>
                  </div>
                )}

                <div className="bg-gold-cream/60 border border-gold-beige p-4 rounded-xl flex items-center justify-between text-xs font-sans">
                  <div>
                    <span className="text-gray-400 block font-medium">Final Invoice charges:</span>
                    <span className="text-luxury-black font-extrabold text-sm">${billingTotal}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Delivery destination:</span>
                    <span className="text-gold-dark font-extrabold">{shippingAddress.city}, {shippingAddress.state}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gold-beige flex justify-between">
                  <button onClick={() => setCheckoutStep(1)} className="text-luxury-black font-semibold uppercase hover:underline text-xs">Back to address</button>
                  <button 
                    onClick={handleTriggerCheckoutOrder}
                    disabled={paymentProcessing}
                    className="px-6 py-3 bg-gold hover:bg-gold-dark text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-gold/20 rounded transition flex items-center gap-2"
                  >
                    {paymentProcessing ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" /> Authorizing transaction secure...
                      </>
                    ) : (
                      <>
                        <Lock size={13} /> Complete insured transaction
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: TRANSACTION SUCCESS & RECEIPT SUMMARY */}
            {checkoutStep === 3 && (
              <div className="bg-white border border-gold-beige p-8 sm:p-14 text-center rounded-2xl shadow-sm space-y-6 animate-scaleUp">
                <div className="h-14 w-14 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner animate-pulse">
                  <Check size={28} />
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black">Insured order Authorized</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed font-sans">
                  Thank you, <span className="font-bold text-luxury-black">{shippingAddress.firstName}</span>. Your Fashionbar transaction has bypassed authentication with success. A copy of your invoice and real-time tracking links has been dispatched to <span className="font-bold text-luxury-black">{shippingAddress.email}</span>.
                </p>

                <div className="bg-gold-cream border border-gold-beige p-5 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-2 font-sans">
                  <div className="flex justify-between font-bold border-b border-gold-beige pb-1.5 mb-2.5 text-luxury-black">
                    <span>Order Receipt</span>
                    <span>FB-Insured</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Charged:</span>
                    <span className="font-bold text-luxury-black">${billingTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated delivery:</span>
                    <span className="font-bold text-gold-dark">3 - 5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Carrier Courier:</span>
                    <span className="font-bold text-luxury-black">Atelier Premium Logist</span>
                  </div>
                </div>

                <div className="pt-6 flex justify-center gap-4">
                  <button 
                    onClick={() => setActiveView('account')}
                    className="px-6 py-2.5 border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white font-bold uppercase text-[10px] tracking-widest rounded transition"
                  >
                    Order History
                  </button>
                  <button 
                    onClick={() => setActiveView('home')}
                    className="px-6 py-2.5 bg-luxury-black text-white hover:bg-gold font-bold uppercase text-[10px] tracking-widest rounded transition-all shadow"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW: ABOUT US PAGE */}
        {activeView === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn font-sans text-xs">
            
            <div className="text-center mb-16">
              <span className="text-gold text-xs font-bold tracking-[0.25em] block mb-1 uppercase">About Fashionbar</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-luxury-black">The Atelier Brand Story</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">Where centuries-old Indian handloom traditions meet modern aesthetic geometries seamlessly.</p>
            </div>

            {/* Split row: Story/Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=700" 
                  alt="Fine weaving close up details" 
                  className="w-full h-[350px] object-cover rounded-2xl shadow-lg border border-gold-beige"
                />
              </div>
              <div className="space-y-4">
                <span className="text-gold font-serif text-sm font-bold block">Legacy & Heritage</span>
                <h3 className="font-serif text-2xl font-bold text-luxury-black">Direct weaver cluster Empowerment</h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                  The soul of Fashionbar survives through direct relationships with weaver cooperatives in Varanasi, Chanderi, and Jaipur. By removing secondary brokers, we guarantee the exact purity of Kanjeevaram silken threads while redistributing fair, high living earnings back to original artist families.
                </p>
                <p className="text-gray-600 leading-relaxed font-sans">
                  Our modern capsules and asymmetrical dresses explore these structural textiles in high-contrast western paradigms, weaving visual drapes that serve are wearable poetry on global platforms.
                </p>
              </div>
            </div>

            {/* Grid metrics details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white border border-gold-beige p-8 rounded-2xl shadow-sm text-center mb-16">
              <div>
                <span className="font-serif text-gold text-4xl font-extrabold leading-none block mb-1">150+</span>
                <h5 className="text-[11px] font-bold text-luxury-black uppercase tracking-widest block mb-2">Master drapers artisans</h5>
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-xs mx-auto">Employed continuously throughout cooperative networks in India hubs.</p>
              </div>
              <div>
                <span className="font-serif text-gold text-4xl font-extrabold leading-none block mb-1">100%</span>
                <h5 className="text-[11px] font-bold text-luxury-black uppercase tracking-widest block mb-2">Bio-Degradable Fibers</h5>
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-xs mx-auto">Certified pure European linens and organic Indian block cotton blends.</p>
              </div>
              <div>
                <span className="font-serif text-gold text-4xl font-extrabold leading-none block mb-1">30k+</span>
                <h5 className="text-[11px] font-bold text-luxury-black uppercase tracking-widest block mb-2">Global Deliveries</h5>
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-xs mx-auto">Hand-packaged parcels delivered seamlessly with elite tracking systems.</p>
              </div>
            </div>

            {/* Sustainability initiatives heading */}
            <div className="bg-luxury-black text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden border border-gold/15">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none"></div>
              <h4 className="font-serif text-gold text-lg tracking-wider block mb-2 uppercase">Sustainability Pledge</h4>
              <h3 className="font-serif text-xl sm:text-3xl font-extrabold text-white mb-4">Zero-Carbon Handloom Logistics</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-2xl">
                Every step from the initial cocoon sorting in Varanasi to final box dispatch integrates sustainable initiatives. We use water-efficient natural vegetation dyes, offset carbon on shipping transits, and wrap every parcel inside seed-paper boxes that grow custom aromatic herbs when planted. Choose fashion that respects our earth.
              </p>
            </div>

          </div>
        )}

        {/* VIEW: CONTACT US PAGE */}
        {activeView === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn font-sans text-xs">
            
            <div className="text-center mb-16">
              <span className="text-gold text-xs font-bold tracking-[0.25em] block mb-1 uppercase font-sans">Corporate concierge</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-luxury-black">We Are Here to Assist</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">Reach out for bespoke styling, sizing questions, or retail order inquiries.</p>
            </div>

            {/* split contact block right / embed map left */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white border border-gold-beige p-6 sm:p-12 rounded-3xl shadow-sm">
              
              {/* Support details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-luxury-black mb-1.5">Atelier Headquarters</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">Our luxury designers and support concierge operate from the heritage Quarter of Mumbai.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="p-2.5 h-9 w-9 bg-gold-cream text-gold border border-gold-beige rounded-lg flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-luxury-black">Address location:</h4>
                      <p className="text-gray-500 mt-1">Fashionbar Mansion, Galleria Blvd, Suite 240, luxury Quarter, Mumbai, MH 400001</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="p-2.5 h-9 w-9 bg-gold-cream text-gold border border-gold-beige rounded-lg flex items-center justify-center">
                      <Phone size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-luxury-black">Direct phone lines:</h4>
                      <p className="text-gray-500 mt-1">+1 (800) BAR-GOLD • (22) 2993-8102</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="p-2.5 h-9 w-9 bg-gold-cream text-gold border border-gold-beige rounded-lg flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-luxury-black">Concierge support email:</h4>
                      <p className="text-gray-500 mt-1">concierge@fashionbar.com • orders@fashionbar.com</p>
                    </div>
                  </div>
                </div>

                {/* Embedded luxury location map placeholder */}
                <div className="w-full h-48 bg-gold-cream/45 border border-gold-beige rounded-2xl overflow-hidden relative flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <div className="absolute inset-0 bg-cover bg-center filter opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=400')" }}></div>
                  <MapPin size={28} className="text-gold animate-bounce" />
                  <span className="font-serif text-sm font-bold text-luxury-black">Interactive Atelier Map Grid</span>
                  <p className="text-[10px] text-gray-400 font-sans max-w-xs">GOP coordinates verified at Fashionbar Mansion, Suite 240, Mumbai, India.</p>
                </div>
              </div>

              {/* Form input elements right */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-luxury-black border-b border-gold-beige pb-3 mb-2">Concierge Mailbox</h3>
                
                {contactSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center space-y-3 animate-scaleUp">
                    <Check size={28} className="text-emerald-600 block mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-luxury-black">Message Sent Successfully</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">Thank you, {contactForm.name}. A customer care executive will reply within 3 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email address</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cellular Phone</label>
                      <input 
                        type="text" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Desire subject</label>
                      <input 
                        type="text" 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Message details</label>
                      <textarea 
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-3 py-2 text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        id="contact-message-body"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-luxury-black hover:bg-gold text-white hover:text-luxury-black text-xs font-bold uppercase tracking-widest rounded-lg transition"
                    >
                      Dispatch Concierge ticket
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW: BLOG DEALS PAGE */}
        {activeView === 'blog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn font-sans text-xs text-gray-500">
            
            <div className="text-center mb-16">
              <span className="text-gold text-xs font-bold tracking-[0.25em] block mb-1 uppercase font-sans">The Editorial Closet</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-luxury-black">Fashionbar Styling Journal</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">Read curated style formulas, ancient skincare rituals, and traditional heritage archives.</p>
            </div>

            {selectedBlogPostId ? (
              /* Reading detailed single blog post */
              (() => {
                const post = BLOG_POSTS.find(b => b.id === selectedBlogPostId)!;
                return (
                  <div className="max-w-3xl mx-auto bg-white border border-gold-beige p-6 sm:p-12 rounded-3xl shadow-sm space-y-6">
                    <button 
                      onClick={() => setSelectedBlogPostId(null)}
                      className="text-gold font-bold uppercase tracking-widest text-[10px] hover:underline mb-2 flex items-center gap-1"
                    >
                      ← Back to Styling Journal
                    </button>
                    
                    <span className="text-gold text-[10px] font-bold uppercase tracking-widest font-sans">{post.category} • {post.readTime}</span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-luxury-black leading-tight tracking-tight mt-1">{post.title}</h3>
                    
                    <div className="text-[11px] text-gray-400 font-sans border-y border-gold-beige py-2 flex justify-between items-center">
                      <span>Article curated by {post.author}</span>
                      <span>Published on {post.date}</span>
                    </div>

                    <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded-2xl shadow-md border border-gold-beige" />
                    
                    <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans whitespace-pre-line text-justify pt-4">
                      {post.content}
                    </p>

                    <p className="text-xs text-gray-600 font-sans leading-relaxed pt-2">
                       We are dedicated to bringing you these design perspectives directly from original hubs. For compatible looks examined in this post, explore our bespoke <span onClick={() => setActiveView('shop')} className="text-gold font-bold underline cursor-pointer">Atelier catalog collections</span> now.
                    </p>
                  </div>
                );
              })()
            ) : (
              /* Blogs Grid directory list */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map(post => (
                  <div 
                    key={post.id} 
                    onClick={() => setSelectedBlogPostId(post.id)}
                    className="bg-white border border-gold-beige hover:border-gold rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-3 left-3 bg-luxury-black/75 text-gold text-[9px] font-bold tracking-widest px-2.5 py-0.5 uppercase rounded">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-sans block mb-1.5">{post.date} • {post.readTime}</span>
                        <h4 className="font-serif text-base font-bold text-luxury-black leading-snug tracking-tight mb-2 group-hover:text-gold transition line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3 mb-4">{post.excerpt}</p>
                      </div>

                      <span className="text-gold font-bold uppercase tracking-widest text-[9px] group-hover:underline block mt-auto">Read Style Formula →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW: USER ACCOUNT & LOYALTY DASHBOARD */}
        {activeView === 'account' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn font-sans text-xs">
            
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8 border-b border-gold-beige pb-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black">My Atelier Account</h2>
                <p className="text-gray-450 mt-1">Connoisseur Member since: <span className="font-bold text-luxury-black">{userProfile.memberSince}</span></p>
              </div>

              {/* Loyalty Reward point block */}
              <div className="bg-gold-cream border border-gold-beige p-3 px-5 rounded-2xl flex items-center gap-3.5 shadow-sm">
                <div className="p-2.5 bg-gold/15 text-gold rounded-xl border border-gold/45 text-center flex-shrink-0 font-serif font-bold text-lg animate-pulse">
                  💎
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Fashionbar rewards</span>
                  <span className="font-serif text-lg font-bold text-luxury-black">{userProfile.loyaltyPoints} Couture points</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Account Profile editing left section */}
              <div className="bg-white border border-gold-beige p-6 rounded-2xl height-fit shadow-sm space-y-4">
                <h4 className="font-serif text-base font-bold text-luxury-black border-b border-gold-beige pb-2.5">Connoisseur Profile</h4>
                
                <div className="space-y-3 font-sans">
                  <div>
                    <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Full name:</span>
                    <input 
                      type="text" 
                      value={userProfile.name} 
                      onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Primary email address:</span>
                    <input 
                      type="text" 
                      value={userProfile.email} 
                      readOnly
                      className="w-full bg-[#FAF7F2]/50 border border-transparent rounded px-2.5 py-1.5 focus:outline-none text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Direct cellular:</span>
                    <input 
                      type="text" 
                      value={userProfile.phone} 
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-[#FAF7F2] border border-gold-beige rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button onClick={() => alert("Profile updated successfully!")} className="w-full py-2 bg-[#111111] hover:bg-gold hover:text-luxury-black text-white rounded text-[10px] font-bold uppercase tracking-widest transition">
                    Save Profile configs
                  </button>
                </div>
              </div>

              {/* Order history panel Right columns */}
              <div className="lg:col-span-2 bg-white border border-gold-beige p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-serif text-base font-bold text-luxury-black border-b border-gold-beige pb-2.5">Atelier Insured Order History</h4>
                
                {simulatedOrders.length === 0 ? (
                  <p className="text-xs text-gray-500 py-6 text-center">We locate no past orders associated with this account. Shop luxury outfits today!</p>
                ) : (
                  <div className="space-y-4">
                    {simulatedOrders.map(ord => (
                      <div key={ord.id} className="border border-gold-beige p-4 rounded-xl space-y-3 font-sans text-xs">
                        <div className="flex flex-wrap justify-between items-baseline gap-2 pb-2 border-b border-gold-beige">
                          <div>
                            <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-widest">Order ID</span>
                            <span className="font-serif font-bold text-luxury-black">{ord.id}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-widest">Date placed</span>
                            <span>{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-widest">Delivery status</span>
                            <span className={`bg-emerald-50 text-emerald-600 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border border-emerald-200`}>
                              {ord.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-widest">Charges Charged</span>
                            <span className="font-bold text-luxury-black">${ord.total}</span>
                          </div>
                        </div>

                        {/* Order line items */}
                        <div className="space-y-1 text-gray-600">
                          {ord.items.map((i: any, idx: number) => (
                            <div key={idx} className="flex justify-between">
                              <span>✨ {i.name} ({i.size})</span>
                              <span className="font-bold">x {i.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 3. Footer Section */}
      <Footer 
        setActiveView={setActiveView}
        onSelectCategory={handleCategorySelection}
      />

      {/* 4. MODALS DIALOG OVERLAYS */}
      
      {/* Quick View Modal Overlay */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
          onViewDetails={(id) => {
            setSelectedProductId(id);
            setActiveView('detail');
          }}
        />
      )}

      {/* Size Chart Modal Overlay */}
      {sizeChartOpen && (
        <SizeChartModal onClose={() => setSizeChartOpen(false)} />
      )}

      {/* AI Assistant Stylist Sidebar Drawer */}
      <AIShoppingAssistant 
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onProductClick={(id) => {
          setSelectedProductId(id);
          setActiveView('detail');
        }}
        setActiveView={setActiveView}
      />

    </div>
  );
}
