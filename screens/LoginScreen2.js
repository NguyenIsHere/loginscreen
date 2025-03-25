import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function LoginScreen2({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //   [
  //     {
  //       "id": "1",
  //       "employee_name": "John Doe",
  //       "employee_age": 18,
  //       "employee_salary": 999,
  //       "profile_image": ""
  //     },
  //     {
  //       "id": "2",
  //       "employee_name": "Jane Doe",
  //       "employee_age": 19,
  //       "employee_salary": 1000,
  //       "profile_image": ""
  //     },
  //     {
  //       "id": "3",
  //       "employee_name": "string",
  //       "employee_age": 0,
  //       "employee_salary": 0,
  //       "profile_image": "string"
  //     }
  //   ]

  const getEmployeeById = async (id) => {
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/employee/${id}`
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await getEmployeeById(username);
      if (data && data.id == username && username != "") {
        navigation.replace("EmployeeList", { username });
      } else {
        Alert.alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, usernameError && styles.errorInput]}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          {/* <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError && styles.errorInput]}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          /> */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Confirm and Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 30, marginBottom: 20 },
  label: { marginBottom: 8, width: "100%", textAlign: "left" },
  input: {
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: "black",
  },
  errorInput: { borderColor: "red" },
  loginBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
