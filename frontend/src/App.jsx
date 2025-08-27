import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import PredictionTab from "./components/PredictionTab";
import NewsTab from "./components/NewsTab";
import ChatTab from "./components/ChatTab";
import FAQ from "./components/FAQ";
import Community from "./components/Community";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Overview />
      <PredictionTab />
      <FAQ />
      <Community />
      <CTA />
      <Footer />
    </div>
  );
}
