"use client";

import { motion } from "framer-motion";

export default function StudentResults() {
  const baseCards = [
    {
      role: "Мама в декреті",
      result: "+$900 за перший місяць на фрілансі",
      detail: "Зібрала портфоліо з нуля, витрачаючи 2 години на день.",
    },
    {
      role: "Вчителька",
      result: "Контракт з брендом косметики",
      detail: "Зробила тестове відео без навичок монтажу і отримала замовника.",
    },
    {
      role: "Власниця бізнесу",
      result: "100 000+ переглядів без реклами",
      detail: "Оживила історичне фото і зібрала вірусні охоплення для свого блогу.",
    },
  ];

  // Duplicate the cards twice to ensure seamless infinite looping spanning wide screens
  const cards = [...baseCards, ...baseCards, ...baseCards, ...baseCards];

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-text-main uppercase">
          Реальні гроші, а не теорія
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden pause-on-hover group/container">
        {/* Track */}
        <div className="flex w-max animate-[marquee_25s_linear_infinite] marquee-track">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[300px] md:w-[400px] mx-4 transition-all duration-300 transform-gpu group-hover/container:opacity-50 hover:!opacity-100 hover:scale-105 hover:z-10"
            >
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-lg border border-white/10 hover:border-accent-primary/40 hover:shadow-[0_8px_30px_rgba(206,16,62,0.2)] transition-all duration-300 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted font-medium uppercase tracking-wider">
                    {card.role}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-accent-primary font-heading mt-2">
                  {card.result}
                </h3>
                
                <p className="text-text-muted text-sm sm:text-base leading-relaxed flex-grow">
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
