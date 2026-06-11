import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck, Truck, RefreshCw, Headphones, Award } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
  onSelectCategory: (category: string, subCategory?: string) => void;
}

export default function Footer({ setActiveView, onSelectCategory }: FooterProps) {
  const handleCategoryClick = (category: string, sub?: string) => {
    onSelectCategory(category, sub);
    setActiveView('shop');
  };

  return (
    <footer className="bg-luxury-black text-gray-400 font-sans border-t border-gold/10">
      
      {/* 1. Trust & Benefit Badges Section */}
      <div className="border-b border-white/5 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-white/5 rounded-lg text-gold border border-gold/20 flex-shrink-0">
            <Award size={20} />
          </div>
          <div>
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-1">Premium Quality</h5>
            <p className="text-[11px] text-gray-500">Every textile & weave is hand-verified for luxury grades.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-white/5 rounded-lg text-gold border border-gold/20 flex-shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-1">Secure Payments</h5>
            <p className="text-[11px] text-gray-500">256-bit encrypted SSL checkout and instant fraud shields.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-white/5 rounded-lg text-gold border border-gold/20 flex-shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-1">Fast Delivery</h5>
            <p className="text-[11px] text-gray-500">Insured express shipping globally with live SMS tracking.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-white/5 rounded-lg text-gold border border-gold/20 flex-shrink-0">
            <RefreshCw size={20} />
          </div>
          <div>
            <h5 className="text-white text-xs font-bold tracking-widest uppercase mb-1">Easy Returns</h5>
            <p className="text-[11px] text-gray-500">Hassle-free 30-day pick-ups from your residential address.</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Bio */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-bold tracking-widest text-white leading-none mb-3">
            FASHION<span className="text-gold">BAR</span>
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mb-6">
            Fashionbar is a distinguished online shopping house offering elite traditional wear, luxury modern fashion ensembles, and handcrafted lifestyle essentials designed to inspire the modern connoisseur of taste.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-luxury-black transition text-gray-400">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-luxury-black transition text-gray-400">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-luxury-black transition text-gray-400">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Category */}
        <div>
          <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-3 mb-4">Elite Collections</h4>
          <ul className="space-y-2.5 text-xs">
            <li><button onClick={() => handleCategoryClick('Traditional Wear', 'Sarees')} className="hover:text-gold transition">Royal Sarees</button></li>
            <li><button onClick={() => handleCategoryClick('Traditional Wear', 'Lehengas')} className="hover:text-gold transition">Bridal Lehengas</button></li>
            <li><button onClick={() => handleCategoryClick('Traditional Wear', 'Kurtis')} className="hover:text-gold transition">Designer Kurtas</button></li>
            <li><button onClick={() => handleCategoryClick('Modern Fashion', 'Dresses')} className="hover:text-gold transition">Cocktail Dresses</button></li>
            <li><button onClick={() => handleCategoryClick('Accessories', 'Handbags')} className="hover:text-gold transition">Suede Handbags</button></li>
            <li><button onClick={() => handleCategoryClick('Accessories', 'Jewelry')} className="hover:text-gold transition">Luxury Jewelry</button></li>
          </ul>
        </div>

        {/* Brand Information */}
        <div>
          <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-3 mb-4">The Atelier</h4>
          <ul className="space-y-2.5 text-xs">
            <li><button onClick={() => setActiveView('about')} className="hover:text-gold transition text-left">About Fashionbar</button></li>
            <li><button onClick={() => setActiveView('blog')} className="hover:text-gold transition text-left">The Editor's Blog</button></li>
            <li><button onClick={() => setActiveView('offers')} className="hover:text-gold transition text-left">Coupons & Flash Sales</button></li>
            <li><button onClick={() => setActiveView('about')} className="hover:text-gold transition text-left">Sustainability Pledge</button></li>
            <li><button onClick={() => setActiveView('contact')} className="hover:text-gold transition text-left">Corporate Enquiries</button></li>
          </ul>
        </div>

        {/* Concierge Support Contact */}
        <div>
          <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-3 mb-4">Atelier Support</h4>
          <ul className="space-y-3.5 text-xs text-gray-500">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-gold flex-shrink-0" />
              <span>Fashionbar Mansion, Galleria Blvd, Suite 240, luxury Quarter</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-gold flex-shrink-0" />
              <span>+1 (800) BAR-GOLD</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-gold flex-shrink-0" />
              <span>concierge@fashionbar.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3. Bottom Legal Section */}
      <div className="bg-neutral-900 py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-[11px] text-gray-600">
          <div>
            © 2026 Fashionbar Haute Couture. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-gold transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition">Terms of Sale</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition">GDPR Compliance</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition">Cookie Preferences</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
