import { useCallback } from 'react';

interface CookieOptions {
  path?: string;
  expires?: Date | string | 'today';
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  maxAge?: number;
}

export default function useCookies() {
  const setCookie = useCallback(
    (name: string, value: string, options: CookieOptions = {}) => {
      options = {
        path: '/',
        ...options,
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      if (options.expires === 'today') {
        const today = new Date();
        today.setHours(24, 0, 0, 0);
        options.expires = today.toUTCString();
      }

      let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

      for (let optionKey in options) {
        const key = optionKey as keyof typeof options;

        updatedCookie += '; ' + key;

        let optionValue = options[key];

        if (optionValue !== true) {
          updatedCookie += '=' + optionValue;
        }
      }

      document.cookie = updatedCookie;
    },
    [],
  );

  const getCookie = useCallback((name: string): string | undefined => {
    if (typeof window === 'undefined') return;

    const cookieName = name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length);
      }
    }

    return;
  }, []);

  const deleteCookie = (name: string) => {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    setCookie(name, '', {
      expires: date,
    });
  };

  const hasCookie = (name: string): boolean => {
    return !!getCookie(name);
  };

  return { setCookie, getCookie, hasCookie, deleteCookie };
}
