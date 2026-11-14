import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  if (cap?.isNativePlatform?.()) {
    // Inside the Android app: never cache screens with a service worker, and clear any old one.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
        if (regs.length > 0 && 'caches' in window) {
          caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
          try {
            if (!sessionStorage.getItem('sw_purged')) {
              sessionStorage.setItem('sw_purged', '1');
              window.location.reload();
            }
          } catch {
            // ignore storage errors
          }
        }
      });
    }
  } else {
    registerSW({ immediate: true });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
