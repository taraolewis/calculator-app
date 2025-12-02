import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function CalcButton({ label, onPress, style }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel={`Button ${label}`}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}
