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
  Phone,
  Clock,
  Menu as MenuIcon,
  ChevronRight
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

const Navbar = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-[60] bg-black/80 backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-golden rounded-lg flex items-center justify-center font-black text-charcoal text-xl">D</div>
          <span className="text-xl font-bold tracking-tighter text-white">THE D CAFE</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('menu')} className="text-sm font-medium text-gray-400 hover:text-golden transition-colors">Menu</button>
          <button onClick={() => scrollTo('order')} className="text-sm font-medium text-gray-400 hover:text-golden transition-colors">Order</button>
          <button onClick={() => scrollTo('contact')} className="text-sm font-medium text-gray-400 hover:text-golden transition-colors">Contact</button>
        </div>
        <button 
          onClick={() => scrollTo('menu')}
          className="md:hidden text-white"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

const Ticker = () => (
  <div className="bg-golden text-charcoal py-2 overflow-hidden whitespace-nowrap sticky top-0 z-50 font-bold uppercase tracking-widest text-sm">
    <div className="inline-block animate-scroll">
      FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area! • FREE HOME DELIVERY in Kalher Area!
    </div>
  </div>
);

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center px-4 brick-wall overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-charcoal" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl relative z-10"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-4 py-1 rounded-full bg-golden/20 text-golden text-sm font-bold tracking-widest uppercase mb-6 border border-golden/30"
        >
          Now Open in Kalher
        </motion.span>
        <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight">
          Fresh Bites,<br />
          <span className="text-golden">Better Vibes.</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-300 font-medium max-w-2xl mx-auto">
          Experience the ultimate fusion of taste and comfort at Bhiwandi's favorite hangout spot.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-golden hover:bg-yellow-400 text-charcoal px-10 py-5 rounded-2xl font-black transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
          >
            Explore Menu
            <ChevronRight className="w-5 h-5" />
          </button>
          <a 
            href="tel:+917030894977"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold transition-all border border-white/10"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState(MENU_DATA[0].id);

  const handleAddToOrder = (itemName: string) => {
    const phoneNumber = '917030894977';
    const message = encodeURIComponent(`Hi! I'd like to order: ${itemName}. Please confirm my order.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="menu" className="py-24 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Our Menu</h2>
          <p className="text-gray-400 max-w-xl mx-auto italic">Crafted with passion, served with a smile. Discover our range of delicious treats.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {MENU_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                activeTab === cat.id 
                ? 'bg-golden text-charcoal shadow-[0_10px_20px_rgba(255,215,0,0.2)]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full"
            >
              {MENU_DATA.find(c => c.id === activeTab)?.items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-between group hover:bg-white/10 hover:border-golden/30 transition-all duration-500"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full border shadow-sm ${item.isVeg ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700'}`} />
                        <h4 className="text-2xl font-black group-hover:text-golden transition-colors">{item.name}</h4>
                      </div>
                      <div className="text-golden font-black text-2xl">{item.price}</div>
                    </div>
                    {item.description && <p className="text-gray-400 italic mb-6 leading-relaxed">"{item.description}"</p>}
                    {item.popular && (
                      <div className="inline-flex items-center gap-2 bg-golden/10 text-golden text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest border border-golden/20 mb-6">
                        <Star className="w-3 h-3 fill-golden" />
                        Most Loved
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => handleAddToOrder(item.name)}
                    className="w-full bg-white/5 hover:bg-golden hover:text-charcoal text-white font-bold py-4 rounded-2xl transition-all border border-white/10 hover:border-golden flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Add to Order
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const OrderSection = () => {
  const handleOrder = () => {
    const phoneNumber = '917030894977';
    const message = encodeURIComponent('Hi The D Cafe! I would like to place an order.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="order" className="py-24 px-4 bg-golden text-charcoal">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8">Hungry? Let's Fix That.</h2>
        <p className="text-xl md:text-2xl mb-12 font-bold opacity-80">Get your favorite food delivered straight to your doorstep in Kalher.</p>
        <button 
          onClick={handleOrder}
          className="inline-flex items-center gap-4 bg-charcoal text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
        >
          <MessageCircle className="w-8 h-8" />
          Order via WhatsApp
        </button>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-24 px-4 bg-black/30">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-golden">Visit Us</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-golden/20 p-4 rounded-2xl">
              <MapPin className="text-golden w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Our Address</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                The D Cafe Gppb, Kalher, Bhiwandi,<br />
                Maharashtra 421302, India
              </p>
              <a 
                href="https://www.google.com/maps/place/The+D+Cafe+Gppb/@19.2491652,73.0064362,823m/data=!3m1!1e3!4m6!3m5!1s0x3be7bd6e9e6048af:0x910ab60c87a4c36d!8m2!3d19.2490449!4d73.01159!16s%2Fg%2F11qb89stdp?entry=ttu&g_ep=EgoyMDI2MDMwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-golden font-black hover:underline mt-4 inline-block text-lg"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-blue-500/20 p-4 rounded-2xl">
              <Clock className="text-blue-400 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Operating Hours</h3>
              <p className="text-gray-400 text-lg">Open Daily: 10:00 AM - 11:00 PM</p>
              <p className="text-golden text-sm mt-1 font-bold">Serving happiness all day long!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden h-[400px] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.703276856525!2d73.00901507521016!3d19.24904488199201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bd6e9e6048af%3A0x910ab60c87a4c36d!2sThe%20D%20Cafe%20Gppb!5e0!3m2!1sen!2sin!4v1741794188000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

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
  <footer className="py-16 px-4 border-t border-white/10 text-center bg-black">
    <div className="max-w-4xl mx-auto">
      <div className="w-12 h-12 bg-golden rounded-xl flex items-center justify-center font-black text-charcoal text-2xl mx-auto mb-6">D</div>
      <p className="text-gray-500 mb-6 font-medium">© 2026 The D Cafe. All rights reserved.</p>
      <div className="h-px w-20 bg-white/10 mx-auto mb-6" />
      <p className="text-gray-400 text-sm tracking-widest uppercase font-bold">
        Powered by{' '}
        <a 
          href="https://yashchoubeyportfolio.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-golden hover:text-white transition-colors"
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
  const [isAuthReady] = useState(true); // Placeholder for auth readiness
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-golden selection:text-charcoal pb-24 bg-charcoal text-white font-sans">
      <Ticker />
      <Navbar />
      <Hero />
      <MenuSection />
      <OrderSection />
      <ReviewSection />
      <Facilities />
      <ContactSection />
      <Footer />
      <StickyActions onReserve={() => setIsModalOpen(true)} />
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
