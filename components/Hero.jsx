export function Hero() {
  return (
    <section className="bg-linear-to-b from-white to-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-neutral-900 mb-4">
            Everything You Need for Campus Life
          </h1>
          <p className="text-neutral-600 mb-8 text-lg">
            Your one-stop shop for affordable student essentials. From tech gear for studying to dorm must-haves, we've got you covered. 
            <span className="hidden sm:inline"> Free delivery on campus. Student-friendly prices. Order via WhatsApp.</span>
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              </div>
              <span>Budget-friendly</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              </div>
              <span>Quick delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              </div>
              <span>Student approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}