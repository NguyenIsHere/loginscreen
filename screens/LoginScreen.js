import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

export default function LoginScreen ({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleLogin = () => {
    let valid = true
    if (username !== 'user1' && username !== 'user2') {
      setUsernameError(true)
      valid = false
    } else {
      setUsernameError(false)
    }

    if (password !== '123456') {
      setPasswordError(true)
      valid = false
    } else {
      setPasswordError(false)
    }

    if (valid) {
      navigation.replace('CourseList', { username })
    } else {
      Alert.alert('Invalid credentials')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, usernameError && styles.errorInput]}
            placeholder='Username'
            onChangeText={setUsername}
            value={username}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError && styles.errorInput]}
            placeholder='Password'
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Confirm and Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: { fontSize: 30, marginBottom: 20 },
  label: { marginBottom: 8, width: '100%', textAlign: 'left' },
  input: {
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: 'black'
  },
  errorInput: { borderColor: 'red' },
  loginBtn: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
})
