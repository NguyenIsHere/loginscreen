import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CourseDetailScreen ({ route }) {
  const { course } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.text}>Mã môn: {course.code}</Text>
      <Text style={styles.text}>Giảng viên: {course.teacher}</Text>
      <Text style={styles.text}>Buổi học: {course.schedule}</Text>
      <Text style={styles.text}>Phòng học: {course.room}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 }
})
