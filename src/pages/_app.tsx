import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (darkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  return <Component {...pageProps} />;
}
