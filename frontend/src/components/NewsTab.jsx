import React, { useEffect, useState } from "react";

export default function NewsTab() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.tavily.com/news", {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_TAVILY_API_KEY}`,
          },
        });
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-8">Loading news...</p>;

  return (
    <section id="news" className="max-w-5xl mx-auto p-6 md:p-12">
      <h3 className="text-3xl font-semibold mb-8 text-center">Gold News</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {news.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-36 object-cover rounded-lg mb-3"
              />
            )}
            <h4 className="font-semibold text-lg mb-1">{article.title}</h4>
            <p className="text-white/70 text-sm">{article.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
