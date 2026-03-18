"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePopupStore } from "../store/popupStore";

export default function RegisterPopup() {
  const { isOpen, closePopup } = usePopupStore();
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [country, setCountry] = useState<any>("UA");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default to IP based country
  useEffect(() => {
    if (isOpen) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country_code) {
            setCountry(data.country_code);
          }
        })
        .catch(() => {
          // Fallback to UA if it fails
          setCountry("UA");
        });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Введіть ваше ім'я");
      return;
    }

    if (!telegram.trim()) {
      setError("Введіть ваш Telegram нікнейм");
      return;
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setError("Введіть коректний номер телефону");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData or JSON for the webhook
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "";
      
      const isPlaceholder = webhookUrl.includes("ВАША_ССЫЛКА");

      if (webhookUrl && !isPlaceholder && webhookUrl.startsWith("http")) {
        // Parse UTM parameters
        const searchParams = new URLSearchParams(window.location.search);
        
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors", // Useful for Google Scripts
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            telegram,
            phone,
            utm_source: searchParams.get('utm_source') || '',
            utm_medium: searchParams.get('utm_medium') || '',
            utm_campaign: searchParams.get('utm_campaign') || '',
            utm_content: searchParams.get('utm_content') || '',
            utm_term: searchParams.get('utm_term') || '',
            page_url: window.location.href,
            source: "Hero Popup",
            date: new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }),
          }),
        });
      } else {
        console.warn("Webhook URL is missing or is a placeholder. Simulation mode.");
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // 1. Trigger Pixel Lead Event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      // 2. Redirect to Telegram bot
      window.location.href = "https://t.me/valeria_pixai_bot?start=69baa1fface11cd6b505834a";
      
    } catch (err: any) {
      console.error("Webhook submission error:", err);
      // Even if webhook fails, we redirect them to the funnel to not lose the lead
      // Or you can choose to show an error and stop.
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      window.location.href = "https://t.me/valeria_pixai_bot?start=69baa1fface11cd6b505834a";
    } finally {
      setIsSubmitting(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: any = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white font-heading uppercase mb-2">
                Реєстрація на практикум
              </h2>
              <p className="text-text-muted text-sm">
                Заповніть форму, щоб отримати доступ до ефіру та бонуси
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/90">Ім'я</label>
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all font-sans"
                  disabled={isSubmitting}
                />
              </div>

              {/* Telegram */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/90">Telegram нікнейм</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all font-sans"
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/90">Номер телефону</label>
                {/* 
                  Using a small wrapper around PhoneInput to match dark style 
                  Styles applied globally or inline. "PhoneInput" from react-phone-number-input provides its own styling that we tweak below.
                */}
                <div className="phone-input-dark">
                  <PhoneInput
                    international
                    defaultCountry={country}
                    value={phone}
                    onChange={setPhone}
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white outline-none focus-within:border-accent-primary focus-within:ring-1 focus-within:ring-accent-primary/50 transition-all font-sans px-4 py-3"
                  />
                </div>
              </div>

              {/* Error state */}
              {error && (
                <div className="text-accent-primary text-sm font-medium text-center bg-accent-primary/10 py-2 rounded-lg mt-2 border border-accent-primary/20">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative mt-4 group w-full px-6 py-4 rounded-xl bg-accent-primary text-white font-bold text-lg tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(206,16,62,0.4)] hover:shadow-[0_0_40px_rgba(206,16,62,0.8)] overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Відправка...</span>
                  </div>
                ) : (
                  <>
                    <span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-0" />
                    <span className="relative z-10 w-full text-center block">
                      ПРОДОВЖИТИ
                    </span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-text-muted mt-2">
                Натискаючи на кнопку, ви погоджуєтеся з{" "}
                <a href="/oferta" target="_blank" className="underline hover:text-white transition-colors">
                  Публічною офертою
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
