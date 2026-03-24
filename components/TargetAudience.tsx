"use client";

import { motion } from "framer-motion";
import { Unlock, CameraOff, Code2, Sparkles } from "lucide-react";

export default function TargetAudience() {
  const cards = [
    {
      title: "Мамам у декреті та шукачам свободи",
      text: "Ви шукаєте роботу, яку можна робити за 2-3 години на день з телефона, поки дитина спить, щоб мати власні гроші та незалежність",
      icon: <Unlock className="w-6 h-6 text-accent-primary" />,
    },
    {
      title: "Втомленим від рутини та «роботи на ногах»",
      text: "Ви працюєте в б'юті, держслужбі або за кордоном. Відчуваєте вигорання і хочете опанувати онлайн-професію, щоб працювати головою, а не руками",
      icon: <CameraOff className="w-6 h-6 text-accent-primary" />,
    },
    {
      title: "Тим, хто не хоче знімати себе (Faceless)",
      text: "Ви хочете монетизувати соцмережі, але не готові «танцювати в сторіз» і показувати своє обличчя. Ви хочете створювати естетичні, глибокі відео за кадром",
      icon: <Code2 className="w-6 h-6 text-accent-primary" />,
    },
    {
      title: "Тим, хто боїться складностей",
      text: "Ви думаєте, що ШІ — це складно, потрібен код, ідеальна англійська або ПК за $2000. Я покажу чіткий алгоритм без розумних термінів",
      icon: <Sparkles className="w-6 h-6 text-accent-primary" />,
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
          
          {/* Left Column: Sticky Heading */}
          <div className="w-full md:w-5/12">
            <div className="sticky top-32">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-main uppercase leading-tight"
              >
                Цей практикум для вас, якщо:
              </motion.h2>
              <div className="w-20 h-1 bg-accent-primary mt-6 rounded-full shadow-[0_0_10px_rgba(206,16,62,0.5)]" />
            </div>
          </div>

          {/* Right Column: Scroll Cards */}
          <div className="w-full md:w-7/12 flex flex-col gap-8">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-accent-primary/50 hover:shadow-[0_0_30px_rgba(206,16,62,0.15)] overflow-hidden"
              >
                {/* Hover Glow Underlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-primary/30 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {card.title}
                  </h3>
                  <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
