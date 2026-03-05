import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [display, setDisplay] = useState("");
  const [num1, setNum1] = useState<number | null>(null);
  const [op, setOp] = useState("");

  function pressNumber(n: string) {
    setDisplay(display + n);
  }

  function pressOperator(operator: string) {
    setNum1(Number(display));
    setOp(operator);
    setDisplay("");
  }

  function calculate() {
    const num2 = Number(display);
    let result = 0;

    if (op === "+") result = (num1 ?? 0) + num2;
    if (op === "-") result = (num1 ?? 0) - num2;
    if (op === "*") result = (num1 ?? 0) * num2;
    if (op === "/") result = (num1 ?? 0) / num2;

    setDisplay(String(result));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display || "0"}</Text>

      <View style={styles.row}>
        <Button title="1" onPress={() => pressNumber("1")} />
        <Button title="2" onPress={() => pressNumber("2")} />
        <Button title="3" onPress={() => pressNumber("3")} />
        <Button title="+" onPress={() => pressOperator("+")} />
      </View>

      <View style={styles.row}>
        <Button title="4" onPress={() => pressNumber("4")} />
        <Button title="5" onPress={() => pressNumber("5")} />
        <Button title="6" onPress={() => pressNumber("6")} />
        <Button title="-" onPress={() => pressOperator("-")} />
      </View>

      <View style={styles.row}>
        <Button title="7" onPress={() => pressNumber("7")} />
        <Button title="8" onPress={() => pressNumber("8")} />
        <Button title="9" onPress={() => pressNumber("9")} />
        <Button title="*" onPress={() => pressOperator("*")} />
      </View>

      <View style={styles.row}>
        <Button title="0" onPress={() => pressNumber("0")} />
        <Button title="/" onPress={() => pressOperator("/")} />
        <Button title="=" onPress={calculate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  display: {
    fontSize: 40,
    textAlign: "right",
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
});