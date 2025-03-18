import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import CourseListScreen from './screens/CourseListScreen'
import CourseDetailScreen from './screens/CourseDetailScreen'

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
        <Stack.Screen
          name='CourseList'
          component={CourseListScreen}
          options={{ title: 'Danh sách môn học' }}
        />
        <Stack.Screen
          name='CourseDetail'
          component={CourseDetailScreen}
          options={{ title: 'Chi tiết môn học' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
