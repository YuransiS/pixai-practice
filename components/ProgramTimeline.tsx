"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProgramTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      title: "Модуль 0: Ефективний старт (Без страху техніки)",
      text: "Як працювати виключно з телефона. Що робити, якщо немає потужного ПК. Як користуватися перекладачем для ШІ (англійська не потрібна). Оптимізація витрат на підписки.",
    },
    {
      title: "Модуль 1: Сценарії, що тримають увагу",
      text: "Як писати тексти через ChatGPT, навіть якщо ви не копірайтер. Структура вірусного відео (хуки, щоб глядач не прогорнув).",
    },
    {
      title: "Модуль 2: Візуал (Створюємо Голлівуд, а не мультики)",
      text: "Як генерувати реалістичні кадри. Секрет збереження одного обличчя персонажа у всіх сценах (те, що не виходить у 90% новачків).",
    },
    {
      title: "Модуль 3-5: Оживлення, Озвучка та Монтаж",
      text: "Як змусити картинку рухатися. Створення професійної озвучки українською/англійською (без вашого голосу). Простий монтаж у CapCut.",
    },
    {
      title: "🔥 Модуль 7+Експерт: Пошук клієнтів та біржа Upwork",
      text: "Як знайти першого клієнта на $100+. Як вийти на закордонний ринок і отримувати оплату у валюті (спеціальна лекція від запрошеного експерта).",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 0px)", () => {
      // Main Line growth animation
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Nodes and Cards animations
      steps.forEach((_, idx) => {
        const node = nodeRefs.current[idx];
        const card = cardRefs.current[idx];

        // Fade in and slide up the card slightly before the node fully lights up
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: node,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Flash node with heavy primary box shadow when reached
        gsap.to(node, {
          backgroundColor: "#ce103e",
          boxShadow: "0 0 20px 4px rgba(206, 16, 62, 0.8)",
          borderColor: "#ce103e",
          duration: 0.3,
          scrollTrigger: {
            trigger: node,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => matchMedia.revert();
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-text-main mb-16 uppercase">
          Програма навчання
        </h2>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Base Gray Line (background) */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />

          {/* Animated Accent Line (foreground) */}
          <div
            ref={lineRef}
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[4px] bg-accent-primary transform origin-top scale-y-0 shadow-[0_0_15px_rgba(206,16,62,0.6)] z-10"
          />

          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative flex items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
              >
                {/* Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-white/20 z-20 transition-all duration-300">
                  <div
                    ref={(el) => {
                      nodeRefs.current[idx] = el;
                    }}
                    className="w-full h-full rounded-full transition-all duration-300"
                  />
                </div>

                {/* Card Container Layout */}
                <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg relative group overflow-hidden opacity-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="relative z-10 text-xl font-bold text-white font-heading mb-3">
                      {step.title}
                    </h3>
                    <p className="relative z-10 text-text-muted text-base">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
