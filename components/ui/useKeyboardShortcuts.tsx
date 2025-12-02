import { ReactNode, useEffect, useRef } from "react";
import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputKeyPressEventData,
} from "react-native";

type Callbacks = {
  onDigit?: (digit: string) => void;
  onBackspace?: () => void;
  onEnter?: () => void;
  onOperator?: (op: string) => void;
};

export default function useKeyboardShortcuts(callbacks: Callbacks): ReactNode {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!callbacks) return;

        if (e.key >= "0" && e.key <= "9") callbacks.onDigit?.(e.key);
        if (e.key === "Backspace") callbacks.onBackspace?.();
        if (e.key === "Enter") callbacks.onEnter?.();
        if (["+", "-", "*", "/", "%"].includes(e.key)) {
          callbacks.onOperator?.(e.key);
        }
      };

      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [callbacks]);

  return Platform.OS !== "web" ? (
    <TextInput
      ref={inputRef}
      autoFocus
      style={{ height: 0, width: 0, opacity: 0 }}
      keyboardType="numeric"
      onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const key = e.nativeEvent.key;
        if (!callbacks) return;

        if (key >= "0" && key <= "9") callbacks.onDigit?.(key);
        else if (key === "Backspace") callbacks.onBackspace?.();
        else if (key === "Enter") callbacks.onEnter?.();
        else if (["+", "-", "*", "/", "%"].includes(key)) {
          callbacks.onOperator?.(key);
        }
      }}
    />
  ) : null;
}
