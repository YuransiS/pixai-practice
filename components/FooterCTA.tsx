"use client";

import { motion } from "framer-motion";
import { usePopupStore } from "../store/popupStore";
import LiveStatus from "./LiveStatus";

export default function FooterCTA() {
  const { openPopup } = usePopupStore();
  return (
    <footer className="relative min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden px-4">
      {/* The Vortex Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full filter blur-[100px] bg-accent-primary transform-gpu"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[80px] bg-white transform-gpu"
        />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center max-w-4xl py-20 flex-grow pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase leading-tight drop-shadow-[0_0_15px_rgba(206,16,62,0.4)]">
            Готові згенерувати своє перше відео і дізнатися, як на цьому заробляти?
          </h2>
          
          <p className="text-text-muted text-lg md:text-xl max-w-2xl px-4">
            Займайте своє місце на практикумі та отримайте доступ до закритого каналу з корисними матеріалами
          </p>

          <LiveStatus />

          <div className="mt-8 w-full px-4 sm:px-0 flex justify-center">
            {/* Heartbeat animated wrapper */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full sm:w-max"
            >
              <motion.button
                onClick={openPopup}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto px-6 sm:px-12 py-6 rounded-2xl bg-accent-primary text-white font-heading font-bold text-[16px] sm:text-xl md:text-2xl tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(206,16,62,0.6)] hover:shadow-[0_0_60px_rgba(206,16,62,1)] overflow-hidden"
              >
                {/* Looping Sweep effect inside button */}
                <span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0" />
                <span className="relative z-10 w-full text-center block">ЙДУ НА ПРАКТИКУМ</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Micro Footer */}
      <div className="relative z-10 w-full pb-6 pt-12 flex flex-col md:flex-row items-center justify-center gap-4 text-[#444444] text-xs font-medium">
        <span>&copy; Copyright 2026</span>
        <span className="hidden md:inline">•</span>
        <a href="/oferta" className="hover:text-text-muted transition-colors">Публічна Оферта</a>
      </div>
    </footer>
  );
}
