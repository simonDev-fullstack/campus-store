import { X, Truck, RefreshCw, HelpCircle, MessageCircle } from 'lucide-react';
import { useMemo } from 'react';

// ---- 1. CENTRALIZED PAGE CONFIG ----
const PAGE_CONFIG = {
  delivery: {
    title: "Delivery Information",
    icon: Truck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  returns: {
    title: "Returns Policy",
    icon: RefreshCw,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  faqs: {
    title: "Frequently Asked Questions",
    icon: HelpCircle,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  contact: {
    title: "Contact Us",
    icon: MessageCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
};

// ---- 2. PAGE CONTENT FUNCTIONS ----
const pageContent = {
  delivery: () => (
    <div className="space-y-6 text-neutral-700">
      <Section title="Campus Delivery">
        We offer free delivery to all campus locations. Orders are typically delivered
        within 1–2 business days.
      </Section>

      <Section title="Delivery Times">
        <ul className="space-y-1 ml-5 list-disc">
          <li>Monday – Friday: 9 AM – 6 PM</li>
          <li>Saturday: 10 AM – 4 PM</li>
          <li>Sunday: Closed</li>
        </ul>
      </Section>

      <Section title="Delivery Locations">
        <p>We deliver to:</p>
        <ul className="space-y-1 ml-5 list-disc mt-2">
          <li>Student dormitories</li>
          <li>Campus buildings</li>
          <li>Library pickup points</li>
          <li>Student center</li>
        </ul>
      </Section>

      <Section title="Track Your Order">
        Once your order is confirmed via WhatsApp, we’ll send real-time delivery updates.
      </Section>
    </div>
  ),

  returns: () => (
    <div className="space-y-6 text-neutral-700">
      <Section title="30-Day Return Policy">
        You can return any item within 30 days for a full refund.
      </Section>

      <Section title="Return Conditions">
        <ul className="space-y-1 ml-5 list-disc">
          <li>Unused and original condition</li>
          <li>Packaging included</li>
          <li>Receipt required</li>
          <li>Hygiene items must be unopened</li>
        </ul>
      </Section>

      <Section title="How to Return">
        <ol className="space-y-2 ml-5 list-decimal">
          <li>Contact us via WhatsApp with your order info</li>
          <li>We arrange free pickup</li>
          <li>Item inspection</li>
          <li>Refund processing (3–5 days)</li>
        </ol>
      </Section>

      <Section title="Exchanges">
        Contact us to do a fast exchange.
      </Section>
    </div>
  ),

  faqs: () => (
    <div className="space-y-6 text-neutral-700">
      <FAQ q="How do I place an order?">
        Add items to your cart and check out via WhatsApp, or use our Quick Order form.
      </FAQ>

      <FAQ q="What payment methods do you accept?">
        Mobile money, bank transfer, and cash on delivery.
      </FAQ>

      <FAQ q="Do you offer student discounts?">
        Yes — many items are student-priced, plus frequent promotions.
      </FAQ>

      <FAQ q="What if an item is out of stock?">
        Contact us and we’ll notify you when it's available.
      </FAQ>

      <FAQ q="Can I cancel my order?">
        Yes, anytime before dispatch.
      </FAQ>

      <FAQ q="Is my information secure?">
        Absolutely — we never share your data.
      </FAQ>

      <FAQ q="Do you have a physical store?">
        We operate online for better prices and fast delivery.
      </FAQ>
    </div>
  ),

  contact: () => (
    <div className="space-y-6 text-neutral-700">

      <p className="mb-6">
        We're here to help! Reach out anytime with questions or concerns.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-neutral-900 mb-3 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          WhatsApp (Fastest Response)
        </h3>

        <p className="text-neutral-700 mb-3">
          Instant replies during business hours.
        </p>

        <button
          onClick={() => {
            const m = encodeURIComponent("Hi! I have a question.");
            window.open(`https://wa.me/?text=${m}`, "_blank");
          }}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </button>
      </div>

      <Section title="Business Hours">
        <ul className="space-y-1">
          <li>Mon–Fri: 8 AM – 8 PM</li>
          <li>Sat: 9 AM – 6 PM</li>
          <li>Sun: 10 AM – 4 PM</li>
        </ul>
      </Section>

      <Section title="Email">
        support@campusstore.com
        <p className="text-sm text-neutral-500 mt-1">
          Usually reply within 24 hours.
        </p>
      </Section>

      <Section title="Social Media">
        <div className="flex gap-3">
          <a className="hover:text-neutral-900">Instagram</a>
          <span className="text-neutral-300">•</span>
          <a className="hover:text-neutral-900">Facebook</a>
          <span className="text-neutral-300">•</span>
          <a className="hover:text-neutral-900">Twitter</a>
        </div>
      </Section>

      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
        <h3 className="text-neutral-900 mb-2">Campus Location</h3>
        We deliver and arrange pickups anywhere on campus.
      </div>
    </div>
  ),
};

// ---- 3. REUSABLE SMALL COMPONENTS ----
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-neutral-900 mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function FAQ({ q, children }) {
  return (
    <div>
      <h3 className="text-neutral-900 mb-2">{q}</h3>
      <p>{children}</p>
    </div>
  );
}

// ---- 4. MAIN COMPONENT ----
export function InfoPages({ page, onClose }) {
  const config = PAGE_CONFIG[page];
  const Icon = config.icon;

  const Content = useMemo(() => pageContent[page], [page]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 flex justify-between border-b">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${config.iconBg}`}>
              <Icon className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <h2 className="text-lg font-medium text-neutral-900">{config.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {Content && <Content />}
        </div>
      </div>
    </div>
  );
}
