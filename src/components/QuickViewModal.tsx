import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, Award, Sparkles } from 'lucide-react';
import { Product } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onViewDetails: (productId: string) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onViewDetails
}: QuickViewModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-55 animate-fadeIn">
      <div 
        className="bg-[#111111] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 animate-scaleUp text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left pane: Image Showcase with Discount Badges */}
        <div className="relative bg-[#0d0d0d] h-64 md:h-auto min-h-[350px]">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition duration-700 hover:scale-105"
          />
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 bg-rose-gold text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase rounded-full shadow-lg">
              {product.discount}% OFF
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute top-4 right-4 bg-gold text-[#111111] text-[10px] font-extrabold tracking-widest px-3 py-1 uppercase rounded-full shadow-lg flex items-center gap-1">
              <Award size={10} /> BEST SELLER
            </div>
          )}
        </div>

        {/* Right pane: Product configurations */}
        <div className="p-6 sm:p-10 flex flex-col justify-between h-full max-h-[90vh] overflow-y-auto bg-[#141414]">
          <div>
            {/* Header / Dismissal */}
            <div className="flex justify-between items-start gap-4 mb-2">
              <span className="text-[10px] font-bold text-gold tracking-widest uppercase">{product.subCategory} • {product.category}</span>
              <button onClick={onClose} className="p-1 h-7 w-7 rounded-full bg-white/5 hover:bg-gold hover:text-black text-white transition flex items-center justify-center">
                <X size={15} />
              </button>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 leading-tight">
              {product.name}
            </h3>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-xs text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={13} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "text-amber-500" : "text-white/25"}
                  />
                ))}
                <span className="text-white/40 text-[11px] ml-1.5 font-bold">({product.reviewsCount} reviews)</span>
              </div>
              <div className="h-3 w-px bg-white/10"></div>
              <div className="text-xs text-gold font-bold">Verified Designer Piece</div>
            </div>

            {/* Description */}
            <p className="text-xs text-white/70 leading-relaxed font-sans mb-6">
              {product.description}
            </p>

            {/* Pricing Details */}
            <div className="flex items-baseline gap-3 mb-6 bg-[#1a1a1a] border border-white/10 p-3 rounded-xl">
              <span className="font-serif text-2xl font-bold text-white">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-white/40 line-through">${product.originalPrice}</span>
                  <span className="text-xs text-rose-gold font-bold font-sans">Save ${product.originalPrice - product.price}</span>
                </>
              )}
            </div>

            {/* Color Config */}
            {product.colors.length > 0 && (
              <div className="mb-4">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">Color: {selectedColor}</span>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 text-xs font-sans rounded-full border transition-all ${
                        selectedColor === c 
                          ? 'border-gold bg-gold text-black font-semibold' 
                          : 'border-white/10 bg-[#1e1e1e] text-white/80 hover:border-gold'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Config */}
            {product.sizes[0] !== "One Size" && (
              <div className="mb-6">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">Size: {selectedSize}</span>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-8 min-w-[32px] text-xs font-bold rounded flex items-center justify-center border transition-all ${
                        selectedSize === s
                          ? 'border-gold bg-gold text-black'
                          : 'border-white/10 bg-[#1e1e1e] text-white/80 hover:border-gold'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.availability === 'out_of_stock'}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition shadow-lg ${
                  product.availability === 'out_of_stock'
                    ? 'bg-neutral-805 text-white/50 cursor-not-allowed'
                    : addedMessage
                    ? 'bg-amber-600 text-white shadow-amber-600/10'
                    : 'bg-gold hover:bg-gold-dark text-black shadow-gold/20'
                }`}
              >
                {addedMessage ? (
                  <>
                    <Check size={16} /> Added successfully!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} /> Add to Haute Cart
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 border rounded-lg flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-rose-950/20 border-rose-800 text-rose-gold animate-pulse'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-gold hover:border-gold'
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <button
              onClick={() => {
                onViewDetails(product.id);
                onClose();
              }}
              className="w-full text-center text-xs font-bold text-white/90 hover:text-gold transition uppercase tracking-widest pt-2 flex items-center justify-center gap-1.5"
            >
              <Sparkles size={13} /> View full luxurious specifications
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
