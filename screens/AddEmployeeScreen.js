import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

export default function AddEmployeeScreen ({ navigation }) {
  const [employee, setEmployee] = useState({
    employee_name: '',
    employee_age: '',
    employee_salary: '',
    profile_image: ''
  })
  const [loading, setLoading] = useState(false)

  const nameRef = useRef(null)
  const ageRef = useRef(null)
  const salaryRef = useRef(null)
  const imageRef = useRef(null)

  const handleChange = (field, value) => {
    setEmployee(prev => ({ ...prev, [field]: value }))
  }

  const addEmployee = async () => {
    if (
      !employee.employee_name ||
      !employee.employee_age ||
      !employee.employee_salary
    ) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://blackntt.net:88/api/v1/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      })

      const json = await response.json()
      console.log('Server response:', json)

      if (response.ok) {
        Alert.alert('Thành công', 'Nhân viên đã được thêm!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ])
      } else {
        Alert.alert('Lỗi', 'Không thể thêm nhân viên.')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.title}>Thêm Nhân Viên</Text>

          <TextInput
            ref={nameRef}
            placeholder='Họ và tên'
            style={styles.input}
            value={employee.employee_name}
            onChangeText={text => handleChange('employee_name', text)}
            autoCapitalize='words'
            returnKeyType='next'
            onSubmitEditing={() => ageRef.current.focus()}
          />

          <TextInput
            ref={ageRef}
            placeholder='Tuổi'
            style={styles.input}
            value={employee.employee_age}
            onChangeText={text => handleChange('employee_age', text)}
            returnKeyType='next'
            onSubmitEditing={() => salaryRef.current.focus()}
          />

          <TextInput
            ref={salaryRef}
            placeholder='Lương'
            style={styles.input}
            value={employee.employee_salary}
            onChangeText={text => handleChange('employee_salary', text)}
            returnKeyType='next'
            onSubmitEditing={() => imageRef.current.focus()}
          />

          <TextInput
            ref={imageRef}
            placeholder='Ảnh Profile (URL)'
            style={styles.input}
            value={employee.profile_image}
            onChangeText={text => handleChange('profile_image', text)}
            autoCapitalize='none'
          />

          <TouchableOpacity
            onPress={addEmployee}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Đang thêm...' : 'Thêm'}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
