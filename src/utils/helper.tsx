import { useState } from "react";

export function Debounce<T>(
  func: (this: T, ...args: any[]) => void,
  delay: number = 500
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: T, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // `this`的类型是泛型`T`
      func.apply(this, args);
    }, delay);
  };
}

export function DebounceState(state: any, delay: number = 500) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let [innerState, setInnerState] = useState(state);

  const delaySetState = (newState: any) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      setInnerState(newState);
    }, delay);
  };

  return [innerState, delaySetState];
}
