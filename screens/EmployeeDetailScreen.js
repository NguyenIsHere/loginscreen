import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmployeeDetailScreen({ route }) {
  const { employee } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {employee.id}</Text>
      <Text style={styles.text}>Name: {employee.employee_name}</Text>
      <Text style={styles.text}>Age: {employee.employee_age}</Text>
      <Text style={styles.text}>Salary: {employee.employee_salary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
});
