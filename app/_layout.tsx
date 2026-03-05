import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [display, setDisplay] = useState("0");
  const [a, setA] = useState<string | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [waitingB, setWaitingB] = useState(false);

  const addNumber = (n: string) => {
    if (waitingB) {
      setDisplay(n);
      setWaitingB(false);
      return;
    }
    setDisplay((prev) => (prev === "0" ? n : prev + n));
  };

  const clear = () => {
    setDisplay("0");
    setA(null);
    setOp(null);
    setWaitingB(false);
  };

  const calc = (x: string, oper: string, y: string) => {
    const X = Number(x);
    const Y = Number(y);
    if (!isFinite(X) || !isFinite(Y)) return "0";
    if (oper === "/" && Y === 0) return "Erro";

    let r = 0;
    if (oper === "+") r = X + Y;
    if (oper === "-") r = X - Y;
    if (oper === "*") r = X * Y;
    if (oper === "/") r = X / Y;

    return String(Number(r.toFixed(10)));
  };

  const setOperator = (nextOp: string) => {
    if (display === "Erro") return;

    // Se já tem operação e já digitou o B, calcula antes (ex.: 2 + 3 + 4)
    if (op && a !== null && !waitingB) {
      const res = calc(a, op, display);
      setDisplay(res);
      setA(res === "Erro" ? null : res);
      setOp(nextOp);
      setWaitingB(true);
      return;
    }

    setA(display);
    setOp(nextOp);
    setWaitingB(true);
  };

  const equals = () => {
    if (!op || a === null) return;
    const res = calc(a, op, display);
    setDisplay(res);
    setA(null);
    setOp(null);
    setWaitingB(true);
  };

  const Btn = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>

      <View style={styles.row}>
        <Btn label="7" onPress={() => addNumber("7")} />
        <Btn label="8" onPress={() => addNumber("8")} />
        <Btn label="9" onPress={() => addNumber("9")} />
        <Btn label="+" onPress={() => setOperator("+")} />
      </View>

      <View style={styles.row}>
        <Btn label="4" onPress={() => addNumber("4")} />
        <Btn label="5" onPress={() => addNumber("5")} />
        <Btn label="6" onPress={() => addNumber("6")} />
        <Btn label="-" onPress={() => setOperator("-")} />
      </View>

      <View style={styles.row}>
        <Btn label="1" onPress={() => addNumber("1")} />
        <Btn label="2" onPress={() => addNumber("2")} />
        <Btn label="3" onPress={() => addNumber("3")} />
        <Btn label="*" onPress={() => setOperator("*")} />
      </View>

      <View style={styles.row}>
        <Btn label="0" onPress={() => addNumber("0")} />
        <Btn label="C" onPress={clear} />
        <Btn label="=" onPress={equals} />
        <Btn label="/" onPress={() => setOperator("/")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  display: { fontSize: 40, textAlign: "right", marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  btn: { backgroundColor: "#ddd", padding: 15, borderRadius: 6, minWidth: 60, alignItems: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});