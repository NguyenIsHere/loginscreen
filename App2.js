import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Stopwatch from "./Stopwatch";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="screen1" component={Screen1} />
        <Stack.Screen name="screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Screen1({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Screen 1</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("screen2", { name: 1 })}
        style={{
          padding: 16,
          backgroundColor: "black",
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>To screen 2</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
function Screen2({ navigation, route }) {
  //route.params.name
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Stopwatch style={styles.stopwatch} />
      <TouchableOpacity
        onPress={() => navigation.navigate("screen1")}
        style={styles.btn}
      >
        <Text style={styles.text}>To screen 1</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 32,
    paddingHorizontal: 32,
    backgroundColor: "black",
    marginTop: 10,
  },
  stopwatch: {
    flex: 1,
    width: "100%",
  },
});

export default App;
