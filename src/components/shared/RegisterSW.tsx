'use client';

import { useEffect } from 'react';

function RegisterSW() {
  useEffect(function () {
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return null;
}

export default RegisterSW;
