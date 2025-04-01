import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import NewTodoScreen from './screens/NewToDoScreen'
import TodoDetailScreen from './screens/TodoDetailScreen'

const Stack = createNativeStackNavigator()

export default function Navigation () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='NewTodo' component={NewTodoScreen} />
        <Stack.Screen name='TodoDetail' component={TodoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
