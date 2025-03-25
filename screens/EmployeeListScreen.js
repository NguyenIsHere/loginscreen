import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useEffect, useState } from "react";

export default function EmployeeListScreen({ navigation }) {
  const [data, setData] = useState([]);

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

  const getEmployees = async () => {
    try {
      const response = await fetch("http://blackntt.net:88/api/v1/employees");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  getEmployees();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("EmployeeDetail", { employee: item })
            }
          >
            <Text style={styles.index}>{index + 1}</Text>
            <Text style={styles.employeeName}>{item.employee_name}</Text>
            <Text style={styles.employeeAge}>{item.employee_age}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  item: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  index: { fontSize: 16, fontWeight: "bold", color: "#555" },
  employeeName: { fontSize: 18, fontWeight: "bold" },
  employeeAge: { fontSize: 14, color: "gray" },
  room: { fontSize: 14, color: "#333" },
});
