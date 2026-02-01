'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
