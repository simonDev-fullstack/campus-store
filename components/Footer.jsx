import { ShoppingBag, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer({ onInfoClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-neutral-900 font-medium">Campus Store</span>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              Your trusted source for affordable student essentials.  
              Making campus life easier, one order at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-neutral-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Student Discounts</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-neutral-900 font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              {[
                ["faqs", "FAQs"],
                ["delivery", "Delivery Info"],
                ["returns", "Returns Policy"],
                ["contact", "Contact Us"],
              ].map(([key, label]) => (
                <li key={key}>
                  <button
                    onClick={() => onInfoClick(key)}
                    className="hover:text-neutral-900 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-neutral-900 font-semibold mb-4">Connect With Us</h3>

            <p className="text-neutral-600 text-sm mb-4">
              Follow us for exclusive deals and campus style inspiration.
            </p>

            <div className="flex gap-3">
              {[
                ["Instagram", Instagram],
                ["Facebook", Facebook],
                ["Twitter", Twitter],
              ].map(([label, Icon]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 bg-neutral-100 hover:bg-neutral-900 hover:text-white rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Info */}
        <div className="border-t border-neutral-200 mt-8 pt-8 text-center text-sm text-neutral-600">
          <p>
            &copy; {currentYear} Campus Store. All rights reserved.  
            Made for students, by students.
          </p>
        </div>

      </div>
    </footer>
  );
}
