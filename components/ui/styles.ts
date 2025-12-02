import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A0008",
    padding: 20,
    justifyContent: "flex-end",
  },

  displayContainer: {
    minHeight: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 25,
    paddingRight: 10,
  },

  displayText: {
    fontSize: 60,
    color: "white",
    fontWeight: "200",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  button: {
    flex: 1,
    marginHorizontal: 6,
    height: 75,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF5C8A",
    borderRadius: 40,

    shadowColor: "#FF1E56",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 8,
  },

  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
  },

  operatorButton: {
    backgroundColor: "#FF1E56",
  },

  secondaryButton: {
    backgroundColor: "#FF8FB1",
  },
});
