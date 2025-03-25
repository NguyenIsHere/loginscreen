import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

export default function EmployeeListScreen ({ navigation }) {
  const [data, setData] = useState([])

  const getEmployees = async () => {
    try {
      const response = await fetch('http://blackntt.net:88/api/v1/employees')
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getEmployees()
    }, [])
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('EmployeeDetail', { employee: item })
            }
          >
            <Text style={styles.index}>{index + 1}</Text>
            <Text style={styles.employeeName}>{item.employee_name}</Text>
            <Text style={styles.employeeAge}>{item.employee_age}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: 'black',
          borderRadius: 16,
          color: 'white'
        }}
        onPress={() => navigation.navigate('AddEmployee')}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
          Add Employee
        </Text>
      </TouchableOpacity>
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
  employeeName: { fontSize: 18, fontWeight: 'bold' },
  employeeAge: { fontSize: 14, color: 'gray' },
  room: { fontSize: 14, color: '#333' }
})
