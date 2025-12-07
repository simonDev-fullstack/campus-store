import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const handleClick = () => {
    const message = encodeURIComponent("Hi! I have a question about your products.");
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all hover:scale-110 z-40 group animate-in fade-in zoom-in duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
    </button>
  );
}