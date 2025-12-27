// Data utama aplikasi Neverland Store
// Versi modern dan rapi, hanya satu deklarasi tiap variabel
import React from 'react';
import { Star, Zap, Shield, Clock, CreditCard, Wallet, Smartphone, TrendingUp, Award, Users, HeadphonesIcon, Gift, Gamepad2, Swords, Crosshair, Sparkles, Target, Castle, Palette } from 'lucide-react';

export const games = [
  {
    id: 1,
    name: 'Mobile Legends',
    category: 'MOBA',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    rating: '4.8',
    players: '100M+',
    popular: true,
    trending: true,
    description: 'Join forces with friends in this 5v5 MOBA game featuring fast-paced battles',
    tags: ['Multiplayer', 'Strategy', 'Competitive'],
    packages: [
      { id: 101, amount: '50 Diamonds', bonus: '5', price: 15000, popular: false },
      { id: 102, amount: '100 Diamonds', bonus: '10', price: 30000, popular: false },
      { id: 103, amount: '500 Diamonds', bonus: '50', price: 150000, popular: true },
      { id: 104, amount: '1000 Diamonds', bonus: '120', price: 300000, popular: false },
      { id: 105, amount: '2000 Diamonds', bonus: '250', price: 590000, popular: false },
    ],
  },
  {
    id: 2,
    name: 'PUBG Mobile',
    category: 'Battle Royale',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
    rating: '4.7',
    players: '50M+',
    popular: true,
    trending: false,
    description: 'Last one standing wins! Battle 100 players in an epic survival shooter',
    tags: ['Action', 'Survival', 'Shooter'],
    packages: [
      { id: 201, amount: '60 UC', bonus: '0', price: 16000, popular: false },
      { id: 202, amount: '325 UC', bonus: '25', price: 80000, popular: true },
      { id: 203, amount: '660 UC', bonus: '60', price: 160000, popular: false },
      { id: 204, amount: '1800 UC', bonus: '200', price: 400000, popular: false },
    ],
  },
  {
    id: 3,
    name: 'Genshin Impact',
    category: 'RPG',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    rating: '4.9',
    players: '60M+',
    popular: true,
    trending: true,
    description: 'Explore a magical open world filled with mystery and adventure',
    tags: ['Adventure', 'Open World', 'Gacha'],
    packages: [
      { id: 301, amount: '60 Genesis Crystals', bonus: '0', price: 16000, popular: false },
      { id: 302, amount: '300 Genesis Crystals', bonus: '30', price: 79000, popular: false },
      { id: 303, amount: '980 Genesis Crystals', bonus: '110', price: 249000, popular: true },
      { id: 304, amount: '1980 Genesis Crystals', bonus: '260', price: 479000, popular: false },
      { id: 305, amount: '3280 Genesis Crystals', bonus: '600', price: 799000, popular: false },
    ],
  },
  {
    id: 4,
    name: 'Free Fire',
    category: 'Battle Royale',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    rating: '4.6',
    players: '80M+',
    popular: true,
    trending: false,
    description: 'Fast-paced 10-minute battles that will get your adrenaline pumping',
    tags: ['Fast-Paced', 'Action', 'Survival'],
    packages: [
      { id: 401, amount: '50 Diamonds', bonus: '0', price: 7000, popular: false },
      { id: 402, amount: '100 Diamonds', bonus: '10', price: 14000, popular: false },
      { id: 403, amount: '310 Diamonds', bonus: '31', price: 42000, popular: true },
      { id: 404, amount: '520 Diamonds', bonus: '52', price: 70000, popular: false },
      { id: 405, amount: '1060 Diamonds', bonus: '106', price: 140000, popular: false },
    ],
  },
  {
    id: 5,
    name: 'Call of Duty Mobile',
    category: 'FPS',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop',
    rating: '4.7',
    players: '40M+',
    popular: false,
    trending: true,
    description: 'Experience the thrill of console-quality FPS gaming on mobile',
    tags: ['Shooter', 'Multiplayer', 'Competitive'],
    packages: [
      { id: 501, amount: '80 CP', bonus: '0', price: 16000, popular: false },
      { id: 502, amount: '400 CP', bonus: '40', price: 79000, popular: true },
      { id: 503, amount: '800 CP', bonus: '100', price: 159000, popular: false },
      { id: 504, amount: '2000 CP', bonus: '300', price: 399000, popular: false },
    ],
  },
  {
    id: 6,
    name: 'Valorant',
    category: 'FPS',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop',
    rating: '4.8',
    players: '30M+',
    popular: false,
    trending: true,
    description: 'Tactical 5v5 shooter with unique agents and abilities',
    tags: ['Tactical', 'Competitive', 'Esports'],
    packages: [
      { id: 601, amount: '475 VP', bonus: '0', price: 50000, popular: false },
      { id: 602, amount: '1000 VP', bonus: '100', price: 100000, popular: true },
      { id: 603, amount: '2050 VP', bonus: '250', price: 200000, popular: false },
      { id: 604, amount: '3650 VP', bonus: '500', price: 350000, popular: false },
    ],
  },
  {
    id: 7,
    name: 'Honkai Star Rail',
    category: 'RPG',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop',
    rating: '4.8',
    players: '25M+',
    popular: false,
    trending: true,
    description: 'Epic space fantasy RPG with stunning turn-based combat',
    tags: ['Turn-Based', 'Story-Rich', 'Gacha'],
    packages: [
      { id: 701, amount: '60 Oneiric Shards', bonus: '0', price: 16000, popular: false },
      { id: 702, amount: '300 Oneiric Shards', bonus: '30', price: 79000, popular: false },
      { id: 703, amount: '980 Oneiric Shards', bonus: '110', price: 249000, popular: true },
      { id: 704, amount: '1980 Oneiric Shards', bonus: '260', price: 479000, popular: false },
    ],
  },
  {
    id: 8,
    name: 'League of Legends: Wild Rift',
    category: 'MOBA',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop',
    rating: '4.7',
    players: '35M+',
    popular: false,
    trending: false,
    description: 'The classic MOBA experience, now perfected for mobile',
    tags: ['MOBA', 'Strategy', 'Competitive'],
    packages: [
      { id: 801, amount: '420 Wild Cores', bonus: '0', price: 49000, popular: false },
      { id: 802, amount: '875 Wild Cores', bonus: '75', price: 99000, popular: true },
      { id: 803, amount: '1830 Wild Cores', bonus: '180', price: 199000, popular: false },
      { id: 804, amount: '3820 Wild Cores', bonus: '420', price: 399000, popular: false },
    ],
  },
  {
    id: 9,
    name: 'Clash of Clans',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    rating: '4.6',
    players: '70M+',
    popular: false,
    trending: false,
    description: 'Build your village, raise a clan, and compete in epic wars',
    tags: ['Strategy', 'Building', 'Multiplayer'],
    packages: [
      { id: 901, amount: '500 Gems', bonus: '0', price: 69000, popular: false },
      { id: 902, amount: '1200 Gems', bonus: '100', price: 139000, popular: true },
      { id: 903, amount: '2500 Gems', bonus: '250', price: 279000, popular: false },
      { id: 904, amount: '6500 Gems', bonus: '1000', price: 699000, popular: false },
    ],
  },
  {
    id: 10,
    name: 'Roblox',
    category: 'Sandbox',
    image: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=300&fit=crop',
    rating: '4.5',
    players: '200M+',
    popular: false,
    trending: false,
    description: 'Infinite worlds to explore, unlimited possibilities to create',
    tags: ['Creative', 'Social', 'Sandbox'],
    packages: [
      { id: 1001, amount: '400 Robux', bonus: '0', price: 49000, popular: false },
      { id: 1002, amount: '800 Robux', bonus: '80', price: 99000, popular: true },
      { id: 1003, amount: '1700 Robux', bonus: '170', price: 199000, popular: false },
      { id: 1004, amount: '4500 Robux', bonus: '500', price: 499000, popular: false },
    ],
  },
];

export const categories = [
  { id: 'all', name: 'All Games', icon: <Gamepad2 /> },
  { id: 'MOBA', name: 'MOBA', icon: <Swords /> },
  { id: 'Battle Royale', name: 'Battle Royale', icon: <Crosshair /> },
  { id: 'RPG', name: 'RPG', icon: <Sparkles /> },
  { id: 'FPS', name: 'FPS', icon: <Target /> },
  { id: 'Strategy', name: 'Strategy', icon: <Castle /> },
  { id: 'Sandbox', name: 'Sandbox', icon: <Palette /> },
];

export const stats = [
  { icon: <Users className="w-8 h-8" />, value: '2M+', label: 'Happy Customers', description: 'Trusted by millions' },
  { icon: <TrendingUp className="w-8 h-8" />, value: '10M+', label: 'Transactions', description: 'Successful orders' },
  { icon: <Star className="w-8 h-8" />, value: '4.9', label: 'Average Rating', description: 'Customer satisfaction' },
  { icon: <Zap className="w-8 h-8" />, value: '<30s', label: 'Avg. Delivery', description: 'Lightning fast' }
];

export const features = [
  { icon: <Zap className="w-6 h-6" />, title: 'Instant Delivery', desc: 'Get your items within seconds after payment confirmation', color: 'from-yellow-500 to-orange-500' },
  { icon: <Shield className="w-6 h-6" />, title: 'Secure Payment', desc: '100% safe transactions with encryption and fraud protection', color: 'from-green-500 to-emerald-500' },
  { icon: <Clock className="w-6 h-6" />, title: '24/7 Support', desc: 'Our customer service team is always ready to help you', color: 'from-blue-500 to-cyan-500' },
  { icon: <Award className="w-6 h-6" />, title: 'Best Prices', desc: 'Most competitive rates in the market with frequent promos', color: 'from-purple-500 to-pink-500' },
  { icon: <Gift className="w-6 h-6" />, title: 'Bonus Rewards', desc: 'Earn points and get special bonuses on every purchase', color: 'from-red-500 to-rose-500' },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: 'Live Chat', desc: 'Real-time assistance through our 24/7 live chat support', color: 'from-indigo-500 to-violet-500' }
];

export const paymentMethods = [
  { name: 'E-Wallet', icon: <Wallet className="w-5 h-5" />, methods: ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja'] },
  { name: 'Bank Transfer', icon: <CreditCard className="w-5 h-5" />, methods: ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB'] },
  { name: 'Mobile Credit', icon: <Smartphone className="w-5 h-5" />, methods: ['Telkomsel', 'XL', 'Indosat', 'Tri', 'Smartfren'] }
];

export const testimonials = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    avatar: 'AR',
    rating: 5,
    comment: 'Seriously fast! I blinked and the diamonds were already in my account. Definitely my go-to store from now on.',
    game: 'Mobile Legends',
    date: 'January 15, 2024'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    avatar: 'SN',
    rating: 4,
    comment: 'Good prices and the CS was helpful. The website was a bit laggy during payment, but the top-up still arrived fast. Pretty good experience overall.',
    game: 'Genshin Impact',
    date: 'January 12, 2024'
  },
  {
    id: 3,
    name: 'Budi Santoso',
    avatar: 'BS',
    rating: 5,
    comment: 'Was a bit worried about using a new site, but it\'s 100% legit and secure. The whole process was smooth. Top-notch service.',
    game: 'PUBG Mobile',
    date: 'January 14, 2024'
  },
  {
    id: 4,
    name: 'Devi Anggraini',
    avatar: 'DA',
    rating: 4,
    comment: 'The top-up was quick and the price was decent. The bonus was a nice touch, though not as big as I hoped. Still, a reliable service I\'d use again.',
    game: 'Free Fire',
    date: 'January 10, 2024'
  },
  {
    id: 5,
    name: 'Rian Ardiansyah',
    avatar: 'RA',
    rating: 5,
    comment: 'Best place for Valorant Points, period. The transaction was seamless and I got my VP in less than a minute. Will be back for more.',
    game: 'Valorant',
    date: 'January 16, 2024'
  },
  {
    id: 6,
    name: 'Putri Lestari',
    avatar: 'PL',
    rating: 5,
    comment: 'I was skeptical at first, but Neverland Store is the real deal. The price for Oneiric Shards is the best I\'ve found online. Very reliable.',
    game: 'Honkai Star Rail',
    date: 'January 13, 2024'
  },
  {
    id: 7,
    name: 'Eko Prasetyo',
    avatar: 'EP',
    rating: 5,
    comment: 'Flawless. I topped up my CP in the middle of a match and it was credited before the next round even started. That\'s just amazing!',
    game: 'Call of Duty Mobile',
    date: 'January 9, 2024'
  },
  {
    id: 8,
    name: 'Linda Wati',
    avatar: 'LW',
    rating: 4,
    comment: 'My son loves Roblox and this is the easiest way I\'ve found to get him Robux. It\'s safe and quick. A little pricey but worth the convenience. Thank you!',
    game: 'Roblox',
    date: 'January 8, 2024'
  },
];

export const faqs = [
  {
    id: 1,
    question: 'How do I top up?',
    answer: 'Select the game you want to top up, choose the desired amount, enter your game ID, select a payment method, and complete the payment. The items will be sent directly to your game account.'
  },
  {
    id: 2,
    question: 'How long does the delivery process take?',
    answer: 'The average delivery process takes less than 30 seconds after payment is successfully confirmed. For certain games, it may take up to a maximum of 5 minutes.'
  },
  {
    id: 3,
    question: 'Is it safe to top up here?',
    answer: 'Absolutely safe! We use an encrypted payment system and do not store your sensitive data. We are also an official partner of various game publishers.'
  },
  {
    id: 4,
    question: 'What if the items are not delivered?',
    answer: 'If the items are not delivered within 5 minutes, please contact our customer service via WhatsApp or Live Chat. Our team is ready to help 24/7.'
  },
  {
    id: 5,
    question: 'Is there a minimum purchase?',
    answer: 'There is no minimum purchase. You can buy the smallest package according to your needs.'
  },
  {
    id: 6,
    question: 'What payment methods are available?',
    answer: 'We accept various payment methods including E-Wallets (GoPay, OVO, DANA, ShopeePay), Bank Transfers (BCA, Mandiri, BNI, BRI), and Mobile Credit (Telkomsel, XL, Indosat, Tri).'
  }
];