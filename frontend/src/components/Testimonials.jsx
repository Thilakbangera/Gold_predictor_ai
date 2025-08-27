import React from "react";

export default function Testimonials() {
  const data = [
    { name: "Sarah Chen", role: "Investment Analyst", text: "SARIMAX model accurate and helpful." },
    { name: "John Doe", role: "Trader", text: "Live gold news keeps me ahead of market trends." },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800 text-center space-y-6">
      <h2 className="text-3xl font-bold mb-6">Trusted by Analysts & Traders</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {data.map((t, i) => (
          <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow hover:shadow-xl transition">
            <p className="italic">"{t.text}"</p>
            <p className="mt-4 font-semibold">{t.name}</p>
            <p className="text-gray-500">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
