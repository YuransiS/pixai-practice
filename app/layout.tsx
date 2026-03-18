import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import RegisterPopup from "@/components/RegisterPopup";

const primaryFont = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Створення вірусних та комерційних AI-відео",
  description: "Безкоштовний онлайн-практикум. Алгоритм для початківців.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${primaryFont.variable} ${inter.variable} dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1963866740868835');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1963866740868835&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-body bg-background text-text-main antialiased selection:bg-accent-primary selection:text-white">
        <SmoothScroll>
          {children}
          <RegisterPopup />
        </SmoothScroll>
      </body>
    </html>
  );
}
