import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  displayContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  displayText: {
    fontSize: 48,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  button: {
    flex: 1,
    margin: 4,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 24,
  },
});
