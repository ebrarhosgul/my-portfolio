


export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet/i;
  const isMobileUA = mobileRegex.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth <= 768;
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return isMobileUA || isSmallScreen || isTouchDevice;
};


export const isIOSDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};


export const isAndroidDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};


export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};


export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
