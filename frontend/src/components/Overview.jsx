import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, MeshWobbleMaterial } from "@react-three/drei";

export default function Overview() {
  return (
    <section
      id="overview"
      className="max-w-6xl mx-auto p-4 sm:p-6 md:p-12 my-16 sm:my-20 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">

        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Overview
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            The gold industry is highly dynamic, with gold price fluctuations affecting both buyers and sellers.
            Traditional valuation methods rely on expert opinions and historical data but often lack efficiency and objectivity.
            Recently, machine learning (ML) has gained prominence as a robust tool to analyze complex data patterns.
            This research focuses on using ML techniques to develop an accurate gold price prediction model by analyzing extensive historical data.
            Results indicate the ML model significantly outperforms traditional methods in accuracy, offering valuable insights for stakeholders in industries like automotive and finance, aiding informed decisions in pricing, inventory management, and financial evaluations.
          </p>
        </motion.div>

        {/* Right Side: 3D Animated Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full h-64 sm:h-72 md:h-96"
        >
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1, 32, 32]} scale={1.2} position={[-1, 0, 0]}>
                  <MeshWobbleMaterial color="#8b5cf6" factor={0.6} speed={2} />
                </Sphere>
              </Float>

              <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
                <Sphere args={[0.8, 32, 32]} scale={1} position={[1, 0.5, 0]}>
                  <MeshWobbleMaterial color="#4f46e5" factor={0.5} speed={1.5} />
                </Sphere>
              </Float>
            </Suspense>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </motion.div>

      </div>
    </section>
  );
}
