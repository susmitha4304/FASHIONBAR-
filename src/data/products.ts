export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  material: string;
  fabric?: string;
  occasion: string;
  sizes: string[];
  colors: string[];
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isStaffPick?: boolean;
  discount: number; // percentage
}

export const PRODUCTS: Product[] = [
  // --- TRADITIONAL WEAR ---
  {
    id: "trad-saree-1",
    name: "Varanasi Pure Silk Kanjeevaram Saree",
    category: "Traditional Wear",
    subCategory: "Sarees",
    price: 249,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 124,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Handcrafted by master weavers in Varanasi, this pure silk Kanjeevaram saree boasts intricate gold zari borders and a breathtaking pallu. A timeless heirloom piece perfect for weddings and heritage festivals.",
    material: "100% Pure Varanasi Silk with Gold Zari Threads",
    fabric: "Silk",
    occasion: "Weddings & Festive occasions",
    sizes: ["One Size"],
    colors: ["Cherry Red", "Royal Gold", "Emerald Green"],
    availability: "low_stock",
    isBestSeller: true,
    discount: 50
  },
  {
    id: "trad-saree-2",
    name: "Classic Crimson Banarasi Georgette Saree",
    category: "Traditional Wear",
    subCategory: "Sarees",
    price: 189,
    originalPrice: 279,
    rating: 4.8,
    reviewsCount: 88,
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Woven in premium georgette fabric, this lightweight Banarasi saree features silver booti embroidery and an ornate border, combining comfort with luxury styling effortlessly.",
    material: "Woven Banarasi Georgette",
    fabric: "Georgette",
    occasion: "Festive & Party Wear",
    sizes: ["One Size"],
    colors: ["Crimson Red", "Peach Pink", "Deep Magenta"],
    availability: "in_stock",
    isTrending: true,
    discount: 32
  },
  {
    id: "trad-lehenga-1",
    name: "Empress Floral Embroidered Lehenga Choli",
    category: "Traditional Wear",
    subCategory: "Lehengas",
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 45,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583391265517-35bbadd01209?auto=format&fit=crop&q=80&w=800"
    ],
    description: "This mesmerizing Lehenga features hand-embroidered sequin floral patterns, structured satin canvas, and a premium organza dupatta. Tailored to perfection for brides and bridesmaids who seek absolute sophistication.",
    material: "Premium Satin Silk & Organza Dupatta",
    fabric: "Satin Silk",
    occasion: "Bridal, Reception & Luxury Galas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blush Pink", "Lavender Glow", "Champagne Gold"],
    availability: "low_stock",
    isBestSeller: true,
    discount: 33
  },
  {
    id: "trad-kurti-1",
    name: "Mint Sage Hand-Block Cotton Kurta Set",
    category: "Traditional Wear",
    subCategory: "Kurtis",
    price: 79,
    originalPrice: 119,
    rating: 4.7,
    reviewsCount: 165,
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An elegant straight-cut pure cotton kurta featuring delicate Jaipur hand-block botanical prints, styled with matching straight trousers and a matching mulmul dupatta.",
    material: "100% Breathable Organic Cotton",
    fabric: "Cotton",
    occasion: "Office Wear, Casual out & Festivals",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Mint Sage", "Indigo Blue", "Marigold Yellow"],
    availability: "in_stock",
    isStaffPick: true,
    discount: 33
  },
  {
    id: "trad-salwar-1",
    name: "Gilded Ivory Chanderi Silk Salwar Suit",
    category: "Traditional Wear",
    subCategory: "Salwar Suits",
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviewsCount: 37,
    images: [
      "https://images.unsplash.com/photo-1610030470231-c0067645cf4a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Crafted in beautiful Chanderi fabric with delicate French knots and gota patti threadwork around the collar. Includes a rich woven Banarasi silk dupatta.",
    material: "Chanderi Silk Blend",
    fabric: "Silk Blend",
    occasion: "Family Celebrations & Festivities",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory Gold", "Powder Blue", "Peach Nude"],
    availability: "in_stock",
    isNewArrival: true,
    discount: 25
  },

  // --- MODERN FASHION ---
  {
    id: "mod-dress-1",
    name: "Monaco Pleated Silk Cocktail Dress",
    category: "Modern Fashion",
    subCategory: "Dresses",
    price: 159,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 92,
    images: [
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An elegant silhouette crafted from pleated satin silk, featuring an asymmetrical neckline and a beautifully defined cinched waist. Radiate sophistication at evening gatherings.",
    material: "Liquid Satin Polyester & Silk Blend",
    fabric: "Satin Silk",
    occasion: "Cocktail Nights & High Tea",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Luxury Emerald", "Classic Onyx", "Rose Gold Noir"],
    availability: "in_stock",
    isTrending: true,
    discount: 36
  },
  {
    id: "mod-top-1",
    name: "Savoy Ruffled Silk-Chiffon Blouse",
    category: "Modern Fashion",
    subCategory: "Tops",
    price: 69,
    originalPrice: 99,
    rating: 4.5,
    reviewsCount: 74,
    images: [
      "https://images.unsplash.com/photo-1548624149-f7b31d689186?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Feminine, airy, and masterfully tailored. Features soft ruffles details on the placket and cuffs with a delicate semi-sheer overlay. Pairs perfectly with high-waisted trousers.",
    material: "Premium Mulberry Silk & Chiffon",
    fabric: "Chiffon Silk",
    occasion: "Brunches & Smart Casual Wear",
    sizes: ["S", "M", "L"],
    colors: ["Pristine Ivory", "Champagne Blush", "Sunset Ochre"],
    availability: "in_stock",
    isNewArrival: true,
    discount: 30
  },
  {
    id: "mod-coord-1",
    name: "Linen Trench & Wide-Leg Co-ord Set",
    category: "Modern Fashion",
    subCategory: "Co-ord Sets",
    price: 179,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 51,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Step into effortless style with our pure European-linen co-ord set, featuring a cropped belted trench jacket and flowy, high-rise pleated wide-leg trousers.",
    material: "100% Fine European Linen",
    fabric: "Linen",
    occasion: "Travel Lifestyle & Luxury Lounging",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Toasted Sand", "Midnight Olive", "Espresso Black"],
    availability: "in_stock",
    isStaffPick: true,
    discount: 28
  },

  // --- ACCESSORIES ---
  {
    id: "acc-handbag-1",
    name: "Aurelia Gold-Clasp Suede Shoulder Bag",
    category: "Accessories",
    subCategory: "Handbags",
    price: 129,
    originalPrice: 219,
    rating: 4.8,
    reviewsCount: 110,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Crafted in premium Italian velvet suede with a structural leather frame and a signature custom-engraved geometric gold-finish latch. Elegant and extremely versatile.",
    material: "Genuine Velvet Suede & Italian Box Calf Leather",
    fabric: "Leather & Suede",
    occasion: "Daily Premium & Evening Affairs",
    sizes: ["One Size"],
    colors: ["Tan Suede", "Cabernet Bordeaux", "Onyx Black"],
    availability: "in_stock",
    isBestSeller: true,
    discount: 41
  },
  {
    id: "acc-jewelry-1",
    name: "Heritage Kundan & Emerald Choker Set",
    category: "Accessories",
    subCategory: "Jewelry",
    price: 320,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 33,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A show-stopping vintage reproduction of Royal Mughal jewellery. Featuring handcard Kundan glass in gold plating, finished with premium teardrop faux emerald drops and fresh-water pearls.",
    material: "24k Gold Plated Brass, Kundan glass, Freshwater Pearls",
    fabric: "Brass Gold Plated",
    occasion: "Luxury Bridal & Regal Festivities",
    sizes: ["Adjustable Neckline"],
    colors: ["Emerald Gold", "Ruby Crimson", "Classic White Pearl"],
    availability: "low_stock",
    isTrending: true,
    discount: 29
  },
  {
    id: "acc-watch-1",
    name: "Minimalist Rose Gold Mesh Watch",
    category: "Accessories",
    subCategory: "Watches",
    price: 145,
    originalPrice: 199,
    rating: 4.7,
    reviewsCount: 61,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sophisticated watch featuring an ultra-slim 6mm rose gold plated watch case, clean pearl face, and premium stainless steel Milanese loop mesh band.",
    material: "Stainless Steel & Sapphire Crystal Glass",
    fabric: "Metal Mesh",
    occasion: "Daily Office & Formal Meetings",
    sizes: ["One Size / Adjustable"],
    colors: ["Classic Rose Gold", "Silver Mist", "Cosmic Slate"],
    availability: "in_stock",
    isNewArrival: true,
    discount: 27
  },

  // --- LIFESTYLE & BEAUTY ---
  {
    id: "life-beauty-1",
    name: "Saffron & Royal Rose Elixir Serum",
    category: "Beauty Products",
    subCategory: "Beauty Products",
    price: 59,
    originalPrice: 89,
    rating: 4.8,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Infused with pure Kashmiri high-altitude saffron stitches and steam-distilled Damask rose water. This absolute botanical concentrate deeply hydrates and lights up your youthful radiance.",
    material: "Kashmiri Saffron, Damask Rose, Argan Kernel Oil",
    fabric: "Liquid Extract Serum",
    occasion: "Daily Skincare Ritual",
    sizes: ["50ml", "100ml"],
    colors: ["Clear Elixir"],
    availability: "in_stock",
    isBestSeller: true,
    discount: 33
  },
  {
    id: "life-decor-1",
    name: "Santal and Oud Amber Soy Candle Set",
    category: "Lifestyle",
    subCategory: "Lifestyle",
    price: 45,
    originalPrice: 65,
    rating: 4.9,
    reviewsCount: 99,
    images: [
      "https://images.unsplash.com/photo-1603006905553-294021249704?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An elegant home indulgence. Poured in black frosted glass tumblers with organic wooden wicks, this candle emits a deep, soothing scent of rare santal, warm vanilla spice, and dry incense.",
    material: "All-Natural Organic Soy Wax & Pure Essential Oils",
    fabric: "Glass Container",
    occasion: "Aromatherapy & Home Sanctuary",
    sizes: ["8 oz Set of 2"],
    colors: ["Matte Black Woodyard"],
    availability: "in_stock",
    isStaffPick: true,
    discount: 30
  }
];

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "trad-saree-1",
    userName: "Ananya Sharma",
    rating: 5,
    date: "May 24, 2026",
    comment: "This Kanjeevaram silk saree is absolutely divine! The zari work is exceptionally premium and soft against the drape. I wore it for my sister's wedding, everyone kept asking where I bought it.",
    verified: true
  },
  {
    id: "rev-2",
    productId: "trad-saree-1",
    userName: "Priyanka Patel",
    rating: 5,
    date: "June 02, 2026",
    comment: "Stunning color, drape is very royal. Definitely true Varanasi craftsmanship. Fashionbar is my go-to for traditional luxury.",
    verified: true
  },
  {
    id: "rev-3",
    productId: "mod-dress-1",
    userName: "Sonia G.",
    rating: 4,
    date: "April 18, 2026",
    comment: "The Monaco cocktail dress fits like a glove. The pleats are beautifully set, and the gold accent is subtle. Only wish there was a pocket!",
    verified: true
  },
  {
    id: "rev-4",
    productId: "acc-handbag-1",
    userName: "Natasha Roy",
    rating: 5,
    date: "May 11, 2026",
    comment: "A handbag equal to French luxury labels! The velvet suede feels amazing and the hardware is solidly made. Absolutely love the tan suede collection.",
    verified: true
  }
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Renaissance of Handloom Heritage in Modern Trousseau",
    excerpt: "Sarees are taking over metropolitan bridalwear with a wave of modern drapes and vintage textures. Read our definitive style guide.",
    content: "Traditional heritage textiles like Varanasi silks, high-gauge Chanderis, and golden-wefted Kanjeevarams are no longer relegated strictly to classical temple functions. Today, contemporary bridal styling and high-fashion red carpets have embraced these rich textiles. By layering a royal handwoven Kanjeevaram with custom embroidered silk trenches or choosing structured georgette sarees draped with high-contrast corsets, modern fashion enthusiasts are constructing a dramatic new visual vocabulary. Here we explore how to seamlessly incorporate high-heritage handlooms into modern chic capsules.",
    category: "Fashion Trends",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    date: "June 05, 2026",
    readTime: "5 min read",
    author: "Malvika Sen"
  },
  {
    id: "blog-2",
    title: "5 Elegant Neutral Styling Formulas for Jetset Travel",
    excerpt: "How to construct lightweight, luxurious, breathable travel capsules using organic cotton and fine European linen wear.",
    content: "Linen has lived a beautiful life as the standard for summer lounging. This season, our styling house emphasizes a structured monochrome approach to linen travel dressing. Choosing warm sand, charcoal slate, or dark sage deep coordinates provides a clean silhouette that stays wrinkle-sophisticated during flights. Discover why the wide-leg cropped belted trench co-ord is the ultimate jetset travel accessory for high-class travelers looking to strike a elegant post-boarding pose.",
    category: "Styling Guides",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    date: "May 28, 2026",
    readTime: "4 min read",
    author: "Rohan Khanna"
  },
  {
    id: "blog-3",
    title: "Ancient Botanicals: The Skincare Ritual of Kashmiri Saffron",
    excerpt: "Unlock the therapeutic ancient ingredients behind royal glowing skin & organic rose petal skin wellness elixir therapy.",
    content: "For centuries, the royal courts of Kashmir used saffron threads infused in fresh morning dew as a restorative elixir. Saffron contains powerful antioxidants, crocin, and safranal, which help repair cellular wear and improve skin lucidity. By combining high-atmosphere saffron filaments with organic Damask rose distillates and heavy cold-pressed argan oils, modern facial serums can revitalize dry skin under stress, promoting a deeply radiant look. We look at simple evening steps to maximize the utility of these organic elixirs.",
    category: "Beauty Tips",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800",
    date: "May 15, 2026",
    readTime: "6 min read",
    author: "Dr. Kavita Murthy"
  }
];

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  expiryDate: string;
  minAmount?: number;
}

export const COUPONS: Coupon[] = [
  {
    code: "BARGOLD20",
    discountPercent: 20,
    description: "Get 20% flat discount on all ethnic sarees and traditional wear setups.",
    expiryDate: "June 30, 2026",
    minAmount: 150
  },
  {
    code: "FESTIVE15",
    discountPercent: 15,
    description: "Flat 15% discount site-wide on accessories, modern dresses, and lifestyle elixirs.",
    expiryDate: "July 15, 2026"
  },
  {
    code: "FASHIONBAR50",
    discountPercent: 50,
    description: "Super deal for premium buyers. Enjoy 50% flat off on limited jewelry-choker heritage gold pieces.",
    expiryDate: "June 25, 2026",
    minAmount: 300
  }
];
