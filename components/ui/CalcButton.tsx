import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
}

export default function CalcButton({ label, onPress, style }: CalcButtonProps) {
  const isOperator = ["÷", "×", "−", "+", "="].includes(label);
  const isSecondary = ["C", "⌫", "%"].includes(label);

  const buttonStyle = [
    styles.button,
    isOperator && styles.operatorButton,
    isSecondary && styles.secondaryButton,
    style,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}
