"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StudentResults() {
  const baseCards = [
    {
      role: "Реальний відгук",
      result: "Сумніви зникли",
      detail: "Від повного скептицизму до захоплення процесом з перших спроб.",
      proof: "/proof-4.jpg",
    },
    {
      role: "Реальний відгук",
      result: "Чітка структура",
      detail: "Якісна подача матеріалу без води. Все розкладено по поличках.",
      proof: "/proof-5.jpg",
    },
    {
      role: "Реальний відгук",
      result: "Швидкий старт",
      detail: "Професійна підтримка та залученість експерта, яка дає швидкий результат.",
      proof: "/proof-6.jpg",
    },
    {
      role: "Реальний відгук",
      result: "Загорівся ідеєю",
      detail: "Кінець прокрастинації. Навчання, яке змушує зібратися і діяти.",
      proof: "/proof-1.jpg",
    },
    {
      role: "Реальний відгук",
      result: "Творча свобода",
      detail: "Нові навички для створення унікального контенту для душі.",
      proof: "/proof-3.jpg",
    },
    {
      role: "Реальний відгук",
      result: "Довіра учнів",
      detail: "Щирі емоції та вдячність — найкращий показник якості навчання.",
      proof: "/proof-2.jpg",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 md:mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-text-main uppercase">
          Реальні гроші, а не теорія
        </h2>
      </div>

      {/* Horizontal Scroll Slider */}
      <div className="flex w-full overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-4 sm:px-6 gap-4 sm:gap-6" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {/* Spacer for mobile safe area */}
        <div className="w-[1px] flex-shrink-0 md:hidden" />
        
        {baseCards.map((card, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center transition-all duration-300 transform-gpu hover:scale-[1.02]"
          >
            <div className="h-full p-4 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-lg border border-white/10 hover:border-accent-primary/40 hover:shadow-[0_8px_30px_rgba(206,16,62,0.2)] transition-all duration-300 flex flex-col gap-4">
              <Image 
                src={card.proof} 
                alt="Proof" 
                width={800} 
                height={300} 
                className="rounded-lg w-full h-auto object-contain bg-[#0a0a0a]/50 border border-white/5" 
              />
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted font-medium uppercase tracking-wider">
                  {card.role}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-accent-primary font-heading mt-1">
                {card.result}
              </h3>
              
              <p className="text-text-muted text-sm sm:text-base leading-relaxed flex-grow">
                {card.detail}
              </p>
            </div>
          </div>
        ))}
        
        {/* Spacer for mobile safe area */}
        <div className="w-[1vw] flex-shrink-0 md:hidden" />
      </div>
    </section>
  );
}
