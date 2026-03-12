import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Wifi, 
  CreditCard, 
  MessageCircle, 
  Star, 
  Utensils,
  Coffee,
  Pizza,
  X,
  Calendar,
  User,
  Image as ImageIcon,
  Phone
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  name: string;
  price: string;
  description?: string;
  popular?: boolean;
  isVeg: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

interface Review {
  name: string;
  text: string;
  rating: number;
}

// --- Data ---
const MENU_DATA: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters',
    icon: <Utensils className="w-5 h-5" />,
    items: [
      { name: 'Chi. Thred Crispy', price: '₹180', popular: true, isVeg: false, description: 'Our signature crispy shredded chicken' },
      { name: 'Chi. Crispy', price: '₹180', isVeg: false },
      { name: 'Paneer Chilly', price: '₹160', isVeg: true },
      { name: 'Veg Crispy', price: '₹180', isVeg: true },
      { name: 'Chicken Lollipop', price: '₹160', isVeg: false },
      { name: 'Veg Manchurian', price: '₹110', isVeg: true },
    ]
  },
  {
    id: 'main',
    name: 'Main Course',
    icon: <Utensils className="w-5 h-5" />,
    items: [
      { name: 'Chi. Triple Schezwan Rice', price: '₹160', popular: true, isVeg: false },
      { name: 'Veg Schezwan Rice', price: '₹120', isVeg: true },
      { name: 'Chi. Manchurian Rice', price: '₹170', isVeg: false },
      { name: 'Egg Fried Rice', price: '₹110', isVeg: false },
      { name: 'Veg Hakka Noodles', price: '₹100', isVeg: true },
    ]
  },
  {
    id: 'burgers-pizzas',
    name: 'Burgers & Pizzas',
    icon: <Pizza className="w-5 h-5" />,
    items: [
      { name: 'Veg Paneer Peri Peri Pizza', price: '₹169', popular: true, isVeg: true },
      { name: 'Hot Chicken Pizza', price: '₹189', isVeg: false },
      { name: 'Veg Burger', price: '₹79', isVeg: true },
      { name: 'Chicken Cheese Burger', price: '₹120', isVeg: false },
      { name: 'Margherita Pizza', price: '₹149', isVeg: true },
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: <Coffee className="w-5 h-5" />,
    items: [
      { name: 'Oreo Shake', price: '₹89', popular: true, isVeg: true },
      { name: 'Classic Mojito', price: '₹59', isVeg: true },
      { name: 'Cold Coffee', price: '₹89', isVeg: true },
      { name: 'Virgin Mojito', price: '₹70', isVeg: true },
    ]
  }
];

const REVIEWS: Review[] = [
  { name: 'Nikita Mishra', text: 'Service was good and food also nice. Must visit ❤️', rating: 5 },
  { name: 'POSITIVE CHANGES', text: 'Food was tasty and Service was great.', rating: 5 },
  { name: 'Kabita Kainee', text: 'Good food, best place for enjoyment.', rating: 5 },
  { name: 'Nikita', text: 'Pizza is best here and service great....❤️', rating: 5 },
  { name: 'Ajay Wings', text: 'The are Very Good cafe for Family and friends.', rating: 5 },
  { name: 'Pranali Jadhav', text: 'Outstanding interior and testy foods.', rating: 5 },
  { name: 'Rajesh Palve', text: 'Execellent service.', rating: 5 },
  { name: 'Hitesh Pandey', text: 'Rated 5/5 for both Food and Service.', rating: 5 },
];

const GALLERY_IMAGES = [
  'https://storage.googleapis.com/generativeai-static/image_0.png',
  'https://storage.googleapis.com/generativeai-static/image_1.png',
  'https://storage.googleapis.com/generativeai-static/image_2.png',
  'https://storage.googleapis.com/generativeai-static/image_3.png',
  'https://storage.googleapis.com/generativeai-static/image_4.png',
];

// --- Components ---

const Ticker = () => (
  <div className="bg-golden text-charcoal py-2 overflow-hidden whitespace-nowrap sticky top-0 z-50 font-bold uppercase tracking-widest text-sm">
    <div className="inline-block animate-scroll">
      FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area!
    </div>
  </div>
);

const Hero = () => (
  <section className="relative h-[80vh] flex items-center justify-center text-center px-4 brick-wall">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
        Bhiwandi's <span className="text-golden">Ultimate</span> Food Destination
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-200">The D Cafe (Kalher)</p>
      <a 
        href="https://www.google.com/maps/place/The+D+Cafe+Gppb/@19.2491652,73.0064362,823m/data=!3m1!1e3!4m6!3m5!1s0x3be7bd6e9e6048af:0x910ab60c87a4c36d!8m2!3d19.2490449!4d73.01159!16s%2Fg%2F11qb89stdp?entry=ttu&g_ep=EgoyMDI2MDMwOS4wIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-deep-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
      >
        <MapPin className="w-5 h-5" />
        View on Google Maps
      </a>
    </motion.div>
  </section>
);

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState(MENU_DATA[0].id);

  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Digital Menu</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {MENU_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === cat.id 
                ? 'bg-golden text-charcoal' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4"
            >
              {MENU_DATA.find(c => c.id === activeTab)?.items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 p-6 rounded-xl border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border ${item.isVeg ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700'}`} title={item.isVeg ? 'Veg' : 'Non-Veg'} />
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      {item.popular && (
                        <span className="flex items-center gap-1 bg-golden/20 text-golden text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter border border-golden/30 shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                          <Star className="w-2 h-2 fill-golden" />
                          Popular
                        </span>
                      )}
                    </div>
                    {item.description && <p className="text-sm text-gray-400 mt-1">{item.description}</p>}
                  </div>
                  <div className="text-golden font-bold text-xl">{item.price}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ReviewSection = () => (
  <section className="py-20 px-4 bg-black/30">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-golden">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">"{review.text}"</p>
            </div>
            <p className="text-golden font-bold text-sm">— {review.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Facilities = () => (
  <section className="py-20 px-4 bg-charcoal">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-golden">Our Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex items-start gap-6">
          <div className="bg-golden/20 p-4 rounded-xl">
            <Wifi className="text-golden w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Free High-Speed Wi-Fi</h3>
            <p className="text-gray-400">Stay connected while you enjoy your favorite meals.</p>
          </div>
        </div>
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex items-start gap-6">
          <div className="bg-deep-red/20 p-4 rounded-xl">
            <CreditCard className="text-deep-red w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">SwiggyPay Accepted</h3>
            <p className="text-gray-400">Seamless payments via SwiggyPay. Also available on Swiggy Dineout.</p>
            <a 
              href="https://www.swiggy.com/restaurants/the-d-cafe-gppb-bhiwandi-koramangala-mumbai-1043443/dineout?is_retargeting=true&media_source=GoogleReserve&utm_campaign=GoogleMap&utm_source=GoogleReserve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-golden hover:underline mt-2 inline-block text-sm font-bold"
            >
              Book via Swiggy Dineout →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ReservationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', when: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '917030894977';
    const message = encodeURIComponent(`Table Reservation Request:\nName: ${formData.name}\nTime: ${formData.when}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-charcoal border border-golden/30 p-8 rounded-3xl w-full max-w-md shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-golden">Reserve a Table</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Your Name
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-golden outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> When are you coming?
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.when}
                  onChange={(e) => setFormData({...formData, when: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-golden outline-none transition-all"
                  placeholder="e.g. Today at 7 PM"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-golden text-charcoal font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all shadow-lg"
              >
                Confirm via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="py-12 px-4 border-t border-white/10 text-center bg-black">
    <div className="max-w-4xl mx-auto">
      <p className="text-gray-500 mb-4">© 2026 The D Cafe. All rights reserved.</p>
      <p className="text-gray-400">
        Designed & Developed by{' '}
        <a 
          href="https://yashchoubeyportfolio.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-golden hover:text-white transition-colors font-bold"
        >
          Code with Yash
        </a>
      </p>
    </div>
  </footer>
);

const StickyActions = ({ onReserve }: { onReserve: () => void }) => {
  const handleOrder = () => {
    const phoneNumber = '917030894977';
    const message = encodeURIComponent('Hi The D Cafe! I would like to order food. Please share the menu and current specials.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+917030894977';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl pointer-events-auto">
        <div className="flex gap-4 flex-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReserve}
            className="flex-1 bg-white text-charcoal font-bold py-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Reserve Table
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCall}
            className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOrder}
          className="w-full md:flex-1 bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Order via WhatsApp
        </motion.button>
      </div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-golden selection:text-charcoal pb-24">
      <Ticker />
      <Hero />
      <MenuSection />
      <ReviewSection />
      <Facilities />
      <Footer />
      <StickyActions onReserve={() => setIsModalOpen(true)} />
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
