"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePopupStore } from "../store/popupStore";

export default function Hero() {
  const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-[100svh] w-full flex overflow-hidden bg-background">
      
      {/* Mobile: Full Screen Background Image */}
      <div className="absolute inset-0 z-0 md:hidden pointer-events-none">
        <img
          src="/lera-cutout.png"
          alt="Lera"
          className="object-cover object-top w-full h-[100svh]"
        />
        {/* Gradient: Dark at bottom to readable text, transparent at top to see face */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent/10 z-10 h-[100svh]" />
      </div>

      {/* Desktop: Background Gradient Mesh */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-40 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: ["0%", "5%", "0%"],
            y: ["0%", "5%", "0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-accent-primary/20 blur-[120px] transform-gpu translate-z-0"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: ["0%", "-5%", "0%"],
            y: ["0%", "-5%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/10 blur-[100px] transform-gpu translate-z-0"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-8 md:py-24 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 min-h-[100svh] justify-end md:justify-center">
        
        {/* Left Column: Text (On mobile: pushed to bottom) */}
        <div className="flex flex-col gap-3 md:gap-6 w-full max-w-2xl mt-auto md:mt-0 items-center md:items-start text-center md:text-left z-20 pb-4 md:pb-0">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1.5 md:gap-2 w-max px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-accent-primary/50 bg-accent-primary/10 backdrop-blur-md shadow-[0_0_15px_rgba(206,16,62,0.3)]"
          >
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_#ce103e]" />
            <span className="text-[9px] sm:text-sm font-semibold tracking-wide text-white uppercase">
              Безкоштовний онлайн-практикум | 26 березня
            </span>
          </motion.div>

          {/* H1 Headline */}
          <div className="overflow-hidden w-full">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="font-heading text-[26px] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-main leading-[1.15] md:leading-tight tracking-tight uppercase"
            >
              ЯК СТВОРЮВАТИ <br className="md:hidden" /> 
              AI ВІДЕО ТА <br className="hidden md:block" />
              <span className="whitespace-nowrap text-white">ЗАРОБЛЯТИ</span>
              <span className="block text-accent-primary text-[18px] sm:text-2xl md:text-4xl mt-2 md:mt-4">
                ВІД $500 ЗА ПАРУ КЛІКІВ
              </span>
            </motion.h1>
          </div>

          {/* Paragraph */}
          <div className="overflow-hidden w-full md:mt-2">
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="text-text-main/90 md:text-text-muted text-sm sm:text-lg md:text-xl leading-snug md:leading-relaxed drop-shadow-md md:drop-shadow-none"
            >
              Практичний розбір для новачків. Відкриваю екран і клік за кліком показую весь алгоритм. Ти побачиш, що робити комерційні ролики простіше, ніж ти думаєш.
            </motion.p>
          </div>
          
          {/* Desktop CTA Placeholder */}
          <div className="hidden md:block w-full">
            <CtaBlock variants={textRevealVariants} />
          </div>
        </div>

        {/* Right Column: Image & Floating Cards (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:flex relative w-full h-[80vh] items-center justify-center pointer-events-none"
        >
          {/* Main Image */}
          <div className="relative w-full h-full max-w-lg mx-auto z-10">
            <img
              src="/lera-cutout.png"
              alt="Lera"
              className="object-contain object-bottom w-full h-full drop-shadow-[0_0_40px_rgba(206,16,62,0.2)]"
            />
          </div>

          {/* Floating Card 1: Loader */}
          <motion.div
            animate={{ y: ["-10px", "10px", "-10px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] -left-[10%] z-20 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl"
          >
            <Loader2 className="w-5 h-5 text-accent-primary animate-spin" />
            <span className="text-sm font-medium text-white font-mono">Generating... 99%</span>
          </motion.div>

          {/* Floating Card 2: +$500 */}
          <motion.div
            animate={{ y: ["15px", "-15px", "15px"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] -right-[5%] z-20 flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
              <span className="text-green-400 font-bold text-lg leading-none">+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider">Payment Received</span>
              <span className="text-white font-bold text-lg font-mono">$500.00</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Sticky CTA Container */}
        <div className="md:hidden mt-2 z-50 w-full pb-4 pointer-events-auto">
          <CtaBlock variants={textRevealVariants} />
        </div>
        
      </div>
    </section>
  );
}

function CtaBlock({ variants }: { variants: any }) {
  const { openPopup } = usePopupStore();
  return (
    <motion.div
      custom={3}
      initial="hidden"
      animate="visible"
      variants={variants}
      className="flex flex-col gap-3 z-50 w-full rounded-2xl"
    >
      <motion.button
        onClick={openPopup}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden group w-full sm:w-max px-4 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-accent-primary text-white font-heading font-bold text-[15px] sm:text-lg tracking-wide shadow-[0_0_30px_rgba(206,16,62,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(206,16,62,0.8)]"
      >
        <span className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
        <span className="relative z-10 w-full block text-center whitespace-nowrap">ЗАРЕЄСТРУВАТИСЯ БЕЗКОШТОВНО</span>
      </motion.button>
      <p className="text-[11px] sm:text-xs md:text-sm text-white/80 md:text-text-muted font-medium text-center md:text-left drop-shadow-md">
        🎁 Бонус після реєстрації: PDF-гайд «Топ нейромереж для відео»
      </p>
    </motion.div>
  );
}
