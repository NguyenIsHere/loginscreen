import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native'

export default function EmployeeDetailScreen ({ route, navigation }) {
  const { employee } = route.params
  const [employeeInfo, setEmployeeInfo] = useState(employee)
  const [loadingUpdate, setLoadingUpdate] = useState(false) // ✅ State riêng cho cập nhật
  const [loadingDelete, setLoadingDelete] = useState(false) // ✅ State riêng cho xóa

  useEffect(() => {
    setEmployeeInfo(employee)
  }, [employee])

  const UpdateEmployee = async () => {
    setLoadingUpdate(true)
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/update/${employeeInfo.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employeeInfo)
        }
      )

      const updatedEmployee = await response.json()
      console.log('Server response:', updatedEmployee)

      if (response.ok) {
        setEmployeeInfo(updatedEmployee)
        Alert.alert('Thành công', 'Thông tin nhân viên đã được cập nhật!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ])
      } else {
        throw new Error(`Lỗi cập nhật: ${response.status}`)
      }
    } catch (error) {
      console.error('Update error:', error)
      Alert.alert('Lỗi', 'Không thể cập nhật nhân viên, vui lòng thử lại!')
    } finally {
      setLoadingUpdate(false)
    }
  }

  const DeleteEmployee = async () => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa nhân viên này?', [
      {
        text: 'Hủy',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoadingDelete(true)
            const response = await fetch(
              `http://blackntt.net:88/api/v1/delete/${employeeInfo.id}`,
              {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              }
            )

            if (response.ok) {
              Alert.alert('Thành công', 'Nhân viên đã bị xóa.')
              navigation.goBack()
            } else {
              throw new Error(`Lỗi xóa: ${response.status}`)
            }
          } catch (error) {
            console.error('Delete error:', error)
            Alert.alert('Lỗi', 'Không thể xóa nhân viên, vui lòng thử lại!')
          } finally {
            setLoadingDelete(false)
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {employeeInfo.id}</Text>

      <TextInput
        style={styles.input}
        value={employeeInfo.employee_name}
        onChangeText={text =>
          setEmployeeInfo(prev => ({ ...prev, employee_name: text }))
        }
        placeholder='Họ và tên'
      />
      <TextInput
        style={styles.input}
        value={String(employeeInfo.employee_age)}
        onChangeText={text =>
          setEmployeeInfo(prev => ({ ...prev, employee_age: Number(text) }))
        }
        placeholder='Tuổi'
      />
      <TextInput
        style={styles.input}
        value={String(employeeInfo.employee_salary)}
        onChangeText={text =>
          setEmployeeInfo(prev => ({ ...prev, employee_salary: Number(text) }))
        }
        placeholder='Lương'
      />

      <TextInput
        style={styles.input}
        value={employeeInfo.profile_image}
        onChangeText={text =>
          setEmployeeInfo(prev => ({ ...prev, profile_image: text }))
        }
        placeholder='Ảnh Profile (URL)'
      />

      {/* Hiển thị ảnh nếu có URL hợp lệ */}
      {employeeInfo.profile_image ? (
        <Image
          source={{ uri: employeeInfo.profile_image }}
          style={styles.profileImage}
          resizeMode='cover'
        />
      ) : null}

      <TouchableOpacity
        onPress={UpdateEmployee}
        style={[styles.button, { backgroundColor: '#007bff' }]}
        disabled={loadingUpdate || loadingDelete} // Tránh bấm khi đang xử lý
      >
        <Text style={styles.buttonText}>
          {loadingUpdate ? 'Đang cập nhật...' : 'Cập nhật'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={DeleteEmployee}
        style={[styles.button, { backgroundColor: '#dc3545' }]}
        disabled={loadingUpdate || loadingDelete} // Tránh bấm khi đang xử lý
      >
        <Text style={styles.buttonText}>
          {loadingDelete ? 'Đang xóa...' : 'Xóa'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc'
  },
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 20
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
