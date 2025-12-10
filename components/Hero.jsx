import React from "react";

export function Hero({ flashProducts = [], event = "blackFriday" }) {

  // THEME MAP
  const themes = {
    default: { bgFrom: "white", bgTo: "blue-50", text: "blue-900", button: "blue-600", border: "blue-300" },
    blackFriday: { bgFrom: "black", bgTo: "gray-800", text: "yellow-400", button: "yellow-500", border: "yellow-500" },
    egertonWeek: { bgFrom: "green-50", bgTo: "green-200", text: "green-900", button: "green-600", border: "green-700" },
  };

  const theme = themes[event] || themes.default;

  // DESKTOP ROTATION
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    if (flashProducts.length > 1) {
      const i = setInterval(
        () => setIndex((n) => (n + 1) % flashProducts.length),
        5000
      );
      return () => clearInterval(i);
    }
  }, [flashProducts]);

  const featured = flashProducts[index];

  return (
    <section
      className={`bg-gradient-to-b from-${theme.bgFrom} to-${theme.bgTo} border-b border-${theme.border}`}
    >

      {/* ------------------- DESKTOP VERSION ------------------- */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-6 py-16 gap-10 items-center">
        
        {/* TEXT AREA */}
        <div className="flex-1 space-y-6">
          <h1 className={`text-5xl font-extrabold text-${theme.text}`}>
            Elevate Your Campus Life
          </h1>
          <p className={`text-xl text-${theme.text}`}>
            Shop essential campus gear, student-friendly, fast delivery.
          </p>

          {/* FLASH SALE BOX */}
          {featured && (
            <div className={`p-6 bg-${theme.bgFrom} border-l-4 border-${theme.border} rounded-lg shadow-lg flex gap-6`}>
              <div className="flex-1">
                <h2 className={`text-3xl font-bold text-${theme.text}`}>🔥 Flash Sale</h2>
                <p className={`text-xl font-semibold text-${theme.text}`}>{featured.name}</p>
                <p className={`text-lg text-${theme.text}`}>${featured.price}</p>

                <button
                  onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
                  className={`mt-4 px-6 py-3 bg-${theme.button} text-white rounded-lg hover:brightness-110 shadow-md`}
                >
                  Shop Now
                </button>
              </div>

              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-40 h-40 object-cover rounded-xl shadow-xl"
                />
              )}
            </div>
          )}
        </div>

        {/* PRODUCT IMAGE */}
        {featured?.image && (
          <div className="flex-1">
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
            />
          </div>
        )}
      </div>

      {/* ------------------- MOBILE VERSION ------------------- */}
      <div className="lg:hidden px-4 py-10">

        {/* MOBILE TITLE */}
        <h1 className={`text-3xl font-extrabold mb-4 text-${theme.text}`}>
          Campus Essentials
        </h1>
        <p className={`text-base mb-6 text-${theme.text}`}>
          Flash deals made for students.
        </p>

        {/* MOBILE FLASH SALE SCROLLER */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {flashProducts.map((p) => (
            <div key={p.id} className="min-w-[75%] bg-white p-4 rounded-2xl shadow-lg">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-44 object-cover rounded-xl"
              />
              <p className="mt-3 font-semibold text-blue-900">{p.name}</p>
              <p className="font-bold text-blue-700">${p.price}</p>

              <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
