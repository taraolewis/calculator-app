import React, { useCallback, useState } from "react";
import { AccessibilityInfo, Alert, Text, View } from "react-native";
import { evaluateOperation, Operation } from "../../components/ui/arithmetic";
import CalcButton from "../../components/ui/CalcButton";
import { styles } from "../../components/ui/styles";
import useKeyboardShortcuts from "../../components/ui/useKeyboardShortcuts";

export default function CalculatorScreen() {
  const [display, setDisplay] = useState("0");
  const [storedOperand, setStoredOperand] = useState<string | null>(null);
  const [storedOperator, setStoredOperator] = useState<Operation | null>(null);

  const pushDigit = useCallback((digit: string) => {
    setDisplay((d) => (d === "0" ? digit : d + digit));
  }, []);

  const clear = () => {
    setDisplay("0");
    setStoredOperand(null);
    setStoredOperator(null);
    AccessibilityInfo.announceForAccessibility?.("Cleared");
  };

  const backspace = () => {
    setDisplay((d) => (d.length <= 1 ? "0" : d.slice(0, -1)));
  };

  const onOperatorPress = (op: Operation) => {
    if (!storedOperand) {
      setStoredOperand(display);
      setStoredOperator(op);
      setDisplay("0");
    } else {
      try {
        const result = evaluateOperation(
          `${storedOperand}${storedOperator}${display}`
        );
        setStoredOperand(result.toString());
        setStoredOperator(op);
        setDisplay("0");
      } catch (e: any) {
        Alert.alert("Error", e.message);
      }
    }
  };

  const equals = () => {
    if (!storedOperand || !storedOperator) return;
    try {
      const result = evaluateOperation(
        `${storedOperand}${storedOperator}${display}`
      );
      setDisplay(String(result));
      setStoredOperand(null);
      setStoredOperator(null);
      AccessibilityInfo.announceForAccessibility?.(`Result ${result}`);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const hiddenInput = useKeyboardShortcuts({
    onDigit: pushDigit,
    onBackspace: backspace,
    onEnter: equals,
    onOperator: (op) => {
      if (op === "+") onOperatorPress("+");
      else if (op === "-") onOperatorPress("-");
      else if (op === "*") onOperatorPress("*");
      else if (op === "/") onOperatorPress("/");
      else if (op === "%") onOperatorPress("%");
    },
  });

  return (
    <View style={styles.container}>
      {hiddenInput}
      <View
        style={styles.displayContainer}
        accessible
        accessibilityLabel={`Display ${display}`}
      >
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.row}>
        <CalcButton label="C" onPress={clear} />
        <CalcButton label="⌫" onPress={backspace} />
        <CalcButton label="%" onPress={() => onOperatorPress("%")} />
        <CalcButton label="÷" onPress={() => onOperatorPress("/")} />
      </View>
      <View style={styles.row}>
        <CalcButton label="7" onPress={() => pushDigit("7")} />
        <CalcButton label="8" onPress={() => pushDigit("8")} />
        <CalcButton label="9" onPress={() => pushDigit("9")} />
        <CalcButton label="×" onPress={() => onOperatorPress("*")} />
      </View>
      <View style={styles.row}>
        <CalcButton label="4" onPress={() => pushDigit("4")} />
        <CalcButton label="5" onPress={() => pushDigit("5")} />
        <CalcButton label="6" onPress={() => pushDigit("6")} />
        <CalcButton label="−" onPress={() => onOperatorPress("-")} />
      </View>
      <View style={styles.row}>
        <CalcButton label="1" onPress={() => pushDigit("1")} />
        <CalcButton label="2" onPress={() => pushDigit("2")} />
        <CalcButton label="3" onPress={() => pushDigit("3")} />
        <CalcButton label="+" onPress={() => onOperatorPress("+")} />
      </View>
      <View style={styles.row}>
        <CalcButton
          label="0"
          onPress={() => pushDigit("0")}
          style={{ flex: 2 }}
        />
        <CalcButton label="." onPress={() => pushDigit(".")} />
        <CalcButton label="=" onPress={equals} />
      </View>
    </View>
  );
}
