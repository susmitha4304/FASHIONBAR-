import React from 'react';
import { Heart, Eye, ShoppingCart, Star, Award } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onProductClick: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onProductClick
}: ProductCardProps) {
  return (
    <div className="group relative bg-[#151515] rounded-2xl border border-white/10 hover:border-gold shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer" onClick={onProductClick}>
      
      {/* 1. Image Container with Hover Zoom and Overlay Action bar */}
      <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dynamic Image hover representation (if there are secondary images) */}
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate view`} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            loading="lazy"
          />
        )}

        {/* Discount & Highlight Badges */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-rose-gold text-white text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-md uppercase z-10">
            {product.discount}% OFF
          </div>
        )}

        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-luxury-black text-gold text-[9px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-full shadow-md uppercase z-10 flex items-center gap-1">
            <Award size={9} /> Best
          </div>
        )}

        {/* Custom Touch action buttons overlaying image on desktop hovs */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300 flex justify-center gap-2.5 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="p-2.5 bg-white text-luxury-black hover:bg-gold hover:text-white rounded-full transition-transform duration-300 shadow-md hover:scale-110"
            title="Quick View specifications"
          >
            <Eye size={15} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            disabled={product.availability === 'out_of_stock'}
            className="p-2.5 bg-white text-luxury-black hover:bg-gold hover:text-white rounded-full transition-transform duration-300 shadow-md hover:scale-110 disabled:opacity-45 disabled:cursor-not-allowed"
            title="Quick Add to Bag"
          >
            <ShoppingCart size={15} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className={`p-2.5 rounded-full shadow-md hover:scale-110 transition-all duration-300 ${
              isWishlisted
                ? 'bg-[#B76E79] text-white'
                : 'bg-white text-[#B76E79] hover:bg-[#B76E79] hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* 2. Meta Information & Rating block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-semibold text-gold uppercase tracking-widest">{product.subCategory}</span>
            <div className="flex items-center text-[10px] text-amber-500 font-sans font-medium">
              <Star size={10} fill="currentColor" className="mr-0.5 text-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h4 className="font-serif text-sm font-bold text-white leading-snug tracking-tight mb-2 truncate group-hover:text-gold transition">
            {product.name}
          </h4>
        </div>

        {/* Pricing Layout */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm sm:text-base font-bold text-white font-sans">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-white/40 line-through font-sans">${product.originalPrice}</span>
            )}
          </div>

          {/* Quick Buy CTA */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              disabled={product.availability === 'out_of_stock'}
              className="py-1.5 px-2 bg-transparent text-white/80 hover:text-gold text-[10px] font-bold uppercase tracking-widest text-center border border-white/15 rounded hover:border-gold transition-all active:scale-95 disabled:col-span-2 disabled:bg-neutral-800 disabled:text-gray-500 disabled:border-transparent"
            >
              {product.availability === 'out_of_stock' ? "Out of couture" : "+ Cart"}
            </button>
            {product.availability !== 'out_of_stock' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyNow();
                }}
                className="py-1.5 px-2 bg-gold hover:bg-gold-dark text-white text-[10px] font-bold uppercase tracking-widest text-center rounded transition-all active:scale-95"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
