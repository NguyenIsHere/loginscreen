import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const courses = [
  {
    id: '1',
    code: 'IT001',
    name: 'Lập trình Java',
    teacher: 'Thầy A',
    schedule: 'Thứ 2, 10:00 - 12:00',
    room: 'B1-101'
  },
  {
    id: '2',
    code: 'IT002',
    name: 'Cấu trúc dữ liệu',
    teacher: 'Cô B',
    schedule: 'Thứ 4, 14:00 - 16:00',
    room: 'B2-202'
  },
  {
    id: '3',
    code: 'IT003',
    name: 'Hệ điều hành',
    teacher: 'Thầy C',
    schedule: 'Thứ 6, 08:00 - 10:00',
    room: 'B3-303'
  }
]

export default function CourseListScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('CourseDetail', { course: item })
            }
          >
            <Text style={styles.index}>#{index + 1}</Text>
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.courseCode}>{item.code}</Text>
            <Text style={styles.room}>Phòng: {item.room}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  item: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  index: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  courseName: { fontSize: 18, fontWeight: 'bold' },
  courseCode: { fontSize: 14, color: 'gray' },
  room: { fontSize: 14, color: '#333' }
})
