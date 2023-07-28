'use client';

import { useEffect, useState } from 'react';

interface Props {
  localStorageKey: string;
  defaultValue?: any;
}

export default function usePersistentState({ localStorageKey, defaultValue = null }: Props) {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const lsValue = localStorage.getItem(localStorageKey);
    if (lsValue) {
      setState(JSON.parse(lsValue));
    }
  }, [localStorageKey]);

  function setValue(value: any | ((prev: any) => any)) {
    let newValue = value;
    if (typeof value === 'function') newValue = value(state);

    setState(newValue);
    localStorage.setItem(localStorageKey, JSON.stringify(newValue));
  }

  return [state, setValue];
}
