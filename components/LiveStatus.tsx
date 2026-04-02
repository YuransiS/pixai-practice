"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Play, Music, Radio, Youtube, Tv } from "lucide-react";

const START_TIME = new Date("2026-04-02T16:00:00+03:00").getTime();
const END_TIME = new Date("2026-04-02T18:00:00+03:00").getTime();

export default function LiveStatus() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [status, setStatus] = useState<"upcoming" | "live" | "ended">("upcoming");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      
      if (now < START_TIME) {
        setStatus("upcoming");
        const diff = START_TIME - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else if (now >= START_TIME && now < END_TIME) {
        setStatus("live");
        setTimeLeft(null);
      } else {
        setStatus("ended");
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (status === "upcoming" && timeLeft) {
    return (
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="flex gap-2 sm:gap-3">
          <CountdownBlock value={timeLeft.days} label="днів" />
          <CountdownBlock value={timeLeft.hours} label="годин" />
          <CountdownBlock value={timeLeft.minutes} label="хвилин" />
          <CountdownBlock value={timeLeft.seconds} label="секунд" />
        </div>
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="flex items-center gap-2 text-text-muted text-xs sm:text-sm font-medium tracking-wide"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          ДО ПОЧАТКУ ПРЯМОГО ЕФІРУ
        </motion.div>
      </div>
    );
  }

  if (status === "live") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-accent-primary/20 backdrop-blur-md border border-accent-primary/50 rounded-full shadow-[0_0_20px_rgba(206,16,62,0.3)]">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-ping absolute" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent-primary relative" />
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-widest uppercase">ЕФІР ЗАРАЗ ІДЕ</span>
        </div>
        <a 
          href="https://t.me/valeria_pixai_bot?start=69baa1fface11cd6b505834a" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-accent-primary text-xs sm:text-sm font-bold uppercase hover:underline"
        >
          ПРИЄДНАТИСЯ В TELEGRAM <Send className="w-4 h-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
          <Tv className="w-5 h-5 text-accent-primary" />
        </div>
        <div>
           <div className="text-white font-bold text-sm sm:text-base leading-tight">ЕФІР ЗАВЕРШЕНО</div>
           <div className="text-text-muted text-xs">Запис доступний тільки підписникам</div>
        </div>
      </div>
      <a 
        href="https://t.me/valeria_pixai_bot?start=69baa1fface11cd6b505834a" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-primary/10 border border-accent-primary/30 text-white font-bold text-xs sm:text-sm uppercase transition-all hover:bg-accent-primary/20"
      >
        ЗАЙТИ В ТГ КАНАЛ <Send className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[55px] sm:min-w-[70px]">
      <div className="relative w-full h-[55px] sm:h-[70px] flex items-center justify-center bg-white/5 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-heading font-black text-white"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      <span className="text-[10px] sm:text-[11px] font-bold text-text-muted uppercase tracking-tighter sm:tracking-widest">{label}</span>
    </div>
  );
}
