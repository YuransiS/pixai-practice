"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutExpert() {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Left Column: Image & Glow */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative flex justify-center items-center"
          >
            {/* Blurred Glowing Orb behind the image */}
            <div className="absolute w-[80%] h-[80%] bg-accent-primary/30 rounded-full blur-[100px] pointer-events-none z-0" />
            
            <Image 
              src="/lera-expert.png" 
              alt="Валерія - AI-креатор" 
              width={500} 
              height={600} 
              className="relative z-10 w-full max-w-[400px] md:max-w-[500px] object-contain drop-shadow-[0_0_20px_rgba(206,16,62,0.3)]"
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col gap-8"
          >
            <div>
              <h2 className="text-accent-primary uppercase tracking-widest text-sm font-bold mb-2">
                Хто проводить ефір?
              </h2>
              <h3 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                Валерія
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              {/* Point A */}
              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />
                <p className="text-text-muted text-lg relative z-10">
                  <span className="text-white font-semibold block mb-1">Минуле:</span> Від власниці манікюрного салону в постійному стресі та мами в декреті, яка рахувала виплати.
                </p>
              </div>

              {/* Point B */}
              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-accent-primary/30 relative overflow-hidden shadow-[0_0_20px_rgba(206,16,62,0.15)]">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary shadow-[0_0_10px_#ce103e]" />
                <p className="text-white text-lg relative z-10 font-medium">
                  <span className="text-accent-primary font-bold block mb-1">Зараз:</span> До затребуваного AI-креатора, яка створює комерційні ролики для міжнародних брендів із чеками від $500 за відео.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-4 border-l-4 border-accent-primary/80 pl-6 py-2">
              <p className="font-heading text-xl md:text-2xl italic text-white/90 leading-relaxed shadow-accent-primary drop-shadow-sm">
                «Я доведу тобі, що штучний інтелект — це не вища математика. Це інструмент, який дає свободу та гроші, якщо знати, на які кнопки тиснути».
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
