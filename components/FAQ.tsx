"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Я повний нуль у техніці і не знаю англійської. У мене вийде?",
      a: "Нейромережі — це не програмування. Тобі не потрібно писати код чи мати технічну освіту. Уся англійська зводиться до того, щоб закинути текст у перекладач і скопіювати в правильне поле. Якщо ти вмієш замовляти їжу в додатку або викликати таксі — ти впораєшся. На ефірі я покажу, на які кнопки тиснути.",
    },
    {
      q: "Для цього потрібен потужний комп'ютер за $2000?",
      a: "Ні. Твоє залізо взагалі не має значення. Уся важка робота та рендер відбуваються на хмарних серверах нейромереж. Підійде звичайний старий ноутбук або навіть просто смартфон. Ми будемо працювати прямо в браузері.",
    },
    {
      q: "Хто взагалі за це платить і кому потрібні ці відео?",
      a: "Будь-якому бізнесу. Зняти звичайний рекламний ролик — це оренда студії, світло, гонорар оператору та моделям. Це мінімум $1000 і тиждень часу. Ти пропонуєш їм той самий вау-ефект за $300-$500 і робиш його за один вечір без жодних зйомок. Підприємці вміють рахувати гроші, тому зараз усі масово переходять на AI-контент.",
    },
    {
      q: "У мене основна робота / декрет. Скільки часу це займає?",
      a: "На створення одного ролика йде від 15 хвилин до пари годин. Тобі не потрібно сидіти перед монітором з 9 до 18. Написала запит, поставила генерацію в чергу — і пішла у своїх справах. 2-3 години на день вистачить із головою, щоб зібрати портфоліо і взяти перші замовлення.",
    },
    {
      q: "У чому підступ? Навіщо проводити безкоштовний ефір?",
      a: "Жодних підступів. Я показую тобі інструмент і доводжу, що він працює. Якщо після ефіру ти захочеш зробити це своєю професією, знайти клієнтів і отримати мою особисту підтримку — я запропоную тобі піти на мій повний курс. Якщо ні — ти просто забереш покроковий алгоритм і підеш генерувати відео самостійно. Все чесно.",
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
