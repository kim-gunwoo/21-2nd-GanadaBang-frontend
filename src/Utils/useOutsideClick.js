import { useState, useRef, useCallback, useEffect } from 'react';

export const useOutsideClick = () => {
  const [isActive, setIsActive] = useState(false);
  const inputEl = useRef(null);

  const onOutSideClick = useCallback(e => {
    if (inputEl.current && !inputEl.current.contains(e.target)) {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onOutSideClick);

    return () => {
      document.removeEventListener('click', onOutSideClick);
    };
  }, []);

  return {
    isActive,
    setIsActive,
    inputEl,
  };
};
