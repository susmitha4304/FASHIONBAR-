import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeChartModalProps {
  onClose: () => void;
}

export default function SizeChartModal({ onClose }: SizeChartModalProps) {
  return (
    <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-55 animate-fadeIn">
      <div 
        className="bg-[#FAF7F2] w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-gold/15 p-6 sm:p-8 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b border-gold-beige mb-6">
          <div className="flex items-center gap-2 text-gold">
            <Ruler size={18} />
            <span className="font-serif text-lg font-bold tracking-wider text-luxury-black">Luxury Size Blueprint</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-gray-100 hover:bg-gold hover:text-luxury-black transition">
            <X size={15} />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4 leading-relaxed font-sans">
          Use the sizing matrix below to find your absolute couture fit. Measurements are calibrated in inches and are applicable to all standard Fashionbar kurtas, western dresses, and contemporary outerwear.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gold-beige text-gold bg-gold-cream text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Size Tag</th>
                <th className="py-2.5 px-3">Bust (in)</th>
                <th className="py-2.5 px-3">Waist (in)</th>
                <th className="py-2.5 px-3">Hip (in)</th>
                <th className="py-2.5 px-3 font-medium text-[9px]">Saree Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-beige text-gray-700 font-sans">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-luxury-black">XS (34)</td>
                <td className="py-2.5 px-3">34"</td>
                <td className="py-2.5 px-3">28"</td>
                <td className="py-2.5 px-3">36"</td>
                <td className="py-2.5 px-3 text-gray-400">Standard Drape</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-luxury-black">S (36)</td>
                <td className="py-2.5 px-3">36"</td>
                <td className="py-2.5 px-3">30"</td>
                <td className="py-2.5 px-3">38"</td>
                <td className="py-2.5 px-3 text-gray-400">Standard Drape</td>
              </tr>
              <tr className="bg-gold-cream/40">
                <td className="py-2.5 px-3 font-semibold text-luxury-black">M (38)</td>
                <td className="py-2.5 px-3">38"</td>
                <td className="py-2.5 px-3">32"</td>
                <td className="py-2.5 px-3 font-medium text-gold">40"</td>
                <td className="py-2.5 px-3 text-gray-400">Standard Drape</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-luxury-black">L (40)</td>
                <td className="py-2.5 px-3">40"</td>
                <td className="py-2.5 px-3">34"</td>
                <td className="py-2.5 px-3">42"</td>
                <td className="py-2.5 px-3 text-gray-400">Standard Drape</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-luxury-black">XL (42)</td>
                <td className="py-2.5 px-3">42"</td>
                <td className="py-2.5 px-3">36"</td>
                <td className="py-2.5 px-3">44"</td>
                <td className="py-2.5 px-3 text-gray-400">Bespoke Option</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-luxury-black">XXL (44)</td>
                <td className="py-2.5 px-3">44"</td>
                <td className="py-2.5 px-3">38"</td>
                <td className="py-2.5 px-3">46"</td>
                <td className="py-2.5 px-3 text-gray-400">Bespoke Option</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-gold-beige flex justify-between items-center text-[11px] text-gray-500 bg-gold-cream/20 p-2 rounded-lg">
          <div>💡 <span className="font-semibold text-luxury-black">Drape note:</span> Sarees are One-Size drapes calibrated at 5.5 meters length.</div>
          <button onClick={onClose} className="text-gold font-bold uppercase tracking-wider hover:underline">Got it</button>
        </div>
      </div>
    </div>
  );
}
