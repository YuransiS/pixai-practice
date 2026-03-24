"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Я повний нуль у техніці. У мене вийде?",
      a: "Так. На практикумі не буде складних кодів чи термінів. Я показуватиму екран, а ви просто повторюватимете за мною",
    },
    {
      q: "Чи потрібен потужний комп'ютер?",
      a: "Ні. Нейромережі працюють в браузері. Більшість завдань можна виконати звичайним смартфоном або найпростішим ноутбуком",
    },
    {
      q: "Чи потрібно знати англійську?",
      a: "Не обов'язково. Я покажу, як швидко та ефективно використовувати перекладачі для створення ідеальних запитів (промптів) до ШІ",
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 sm:px-6">

        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-text-main mb-12 lg:mb-16 uppercase">
          Залишилися сумніви?
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => handleToggle(idx)}
                className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? "bg-white/[0.05] border-accent-primary shadow-[0_4px_20px_rgba(206,16,62,0.1)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between p-6 md:p-8">
                  <h3 className={`text-lg md:text-xl font-bold font-heading pr-8 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-text-main/90 group-hover:text-white'}`}>
                    {faq.q}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-accent-primary text-white rotate-45" : "bg-white/5 text-text-muted"
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="px-6 md:px-8 pb-6 md:pb-8 pt-0"
                      >
                        <p className="text-text-muted text-base leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
