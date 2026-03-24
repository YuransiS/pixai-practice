"use client";

import { motion } from "framer-motion";

export default function Portfolio() {
  const videos = [
    { 
      src: "/portfolio-1.mp4", 
      id: 1, 
      url: "https://www.instagram.com/reel/DNtXHVu2N5r/",
      badge: <>👁 <span className="text-[#39ff14] drop-shadow-[0_0_5px_#39ff14]">1.2 млн</span> переглядів</>,
      title: "День Незалежності",
      description: "Безкоштовний трафік без вкладень в рекламу"
    },
    { 
      src: "/portfolio-2.mp4", 
      id: 2, 
      url: "https://www.instagram.com/reel/DSo7ODTjKcI/",
      badge: "👁 945 000 переглядів",
      title: "Різдво та Історія",
      description: "Оживлення минулого, яке збирає тисячі коментарів та підписників"
    },
    { 
      src: "/portfolio-3.mp4", 
      id: 3, 
      url: "https://www.instagram.com/reel/DTvQ_jLjIWj/",
      badge: <>💰 Чек: <span className="text-accent-primary drop-shadow-[0_0_5px_#ce103e]">$500</span></>,
      title: "Реклама для бренду сумок",
      description: "Предметна зйомка без студій. Чиста комерція"
    },
  ];

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-text-main uppercase mb-4 shadow-accent-primary drop-shadow-[0_0_15px_rgba(206,16,62,0.3)]"
          >
            МОЇ РОБОТИ: ВІЗУАЛЬНИЙ ШОК, ЯКИЙ КУПУЮТЬ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto"
          >
            Все це створено без студій, камер та акторів. Тільки ШІ
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((vid, i) => (
            <motion.a
              key={vid.id}
              href={vid.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(206,16,62,0.5)] hover:border-accent-primary/50 flex flex-col h-[400px]"
            >
              <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm px-3 py-1 rounded-full shadow-lg font-medium">
                {vid.badge}
              </div>

              {/* Background Video */}
              <video 
                src={vid.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
              />

              {/* Bottom Gradient for Text Legibility */}
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

              {/* Text Content */}
              <div className="relative z-20 mt-auto p-6 flex flex-col gap-2 pointer-events-none">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white drop-shadow-md group-hover:text-accent-primary transition-colors duration-300">
                  {vid.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed drop-shadow-md">
                  {vid.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
