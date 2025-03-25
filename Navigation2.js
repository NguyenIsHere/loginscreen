import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen2 from "./screens/LoginScreen2";
import EmployeeListScreen from "./screens/EmployeeListScreen";
import EmployeeDetailScreen from "./screens/EmployeeDetailScreen";

const Stack = createNativeStackNavigator();

export default function Navigation2() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmployeeList"
          component={EmployeeListScreen}
          options={{ title: "Danh sách employee" }}
        />
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetailScreen}
          options={{ title: "Chi tiết employee" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
