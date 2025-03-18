import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  const handleStart = () => {
    if (running) {
      setRunning(false);
      clearInterval(timerRef.current);
      setElapsedTime(0);
      setStartTime(0);
      setLaps([]);
    } else {
      setRunning(true);
      const now = new Date().getTime();
      setStartTime(now);
      timerRef.current = setInterval(() => {
        setElapsedTime(new Date().getTime() - now);
      }, 1);
    }
  };

  const handleLap = () => {
    if (running) {
      const lapTime = new Date().getTime() - startTime;
      setLaps([...laps, lapTime]);
    }
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.button} onPress={handleLap}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={running ? styles.button2 : styles.button}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {laps.map((lap, index) => (
          <View style={styles.lapItem} key={index}>
            <Text style={styles.lap}>
              Lap {index + 1}: {formatTime(lap)}
            </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 16,
    gap: 16,
    width: "100%",
  },
  timer: {
    fontSize: 50,
    marginBottom: 16,
    marginTop: 32,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
    marginBottom: 16,
  },
  button2: {
    backgroundColor: "darkred",
    padding: 16,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  lapItem: {
    width: "100%",
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
  lap: {
    fontSize: 20,
    marginBottom: 8,
    color: "black",
    width: "100%",
    textAlign: "center",
  },
});
