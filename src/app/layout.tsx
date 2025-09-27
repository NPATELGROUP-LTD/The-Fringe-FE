import "../styles/globals.css";
import Header from "../components/layout/Header";
import SmoothScrollProvider from "../components/layout/SmoothScrollProvider";

export const metadata = {
  title: "The Fringe - Premium Salon & Beauty Academy",
  description:
    "Transform your look and advance your career with premium salon services and professional beauty education.",
  keywords: "salon, beauty, academy, hair, makeup, courses, education",
  authors: [{ name: "The Fringe" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#201A1E" />
      </head>
      <body style={{ opacity: 1, visibility: "visible" }}>
        <SmoothScrollProvider>
          <div className="page-content">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
