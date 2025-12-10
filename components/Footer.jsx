import { Store, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer({ onInfoClick }) {
  const currentYear = 2025

  return (
    <footer className="bg-white border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-neutral-900 font-semibold tracking-tight">
                Campus Store
              </span>
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
              {[
                "All Products",
                "Best Sellers",
                "New Arrivals",
                "Student Discounts",
              ].map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
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
                    className="hover:text-blue-500 transition-colors"
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
              Follow us for exclusive deals and campus inspiration.
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
                  className="p-2 bg-neutral-100 hover:bg-blue-500 hover:text-white rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Info */}
        <div className="border-t border-neutral-200 mt-10 pt-8 text-center text-sm text-neutral-600">
          <p>
            &copy; {currentYear} Campus Store. All rights reserved.{' '}
            Made for students, by students.
          </p>
        </div>

      </div>
    </footer>
  );
}
