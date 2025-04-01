import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function NewTodoScreen () {
  const [content, setContent] = useState('')
  const navigation = useNavigation()

  const addTodo = async () => {
    if (!content.trim()) return

    const newTodo = { id: Date.now().toString(), content }
    const storedTodos = await AsyncStorage.getItem('todos')
    const todos = storedTodos ? JSON.parse(storedTodos) : []
    todos.push(newTodo)

    await AsyncStorage.setItem('todos', JSON.stringify(todos))
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Enter your note:</Text>
          <TextInput
            style={styles.input}
            placeholder='Write something...'
            value={content}
            onChangeText={setContent}
            multiline={true}
            textAlignVertical='top'
            returnKeyType='default'
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addText}>Save Note</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
    height: 150,
    textAlignVertical: 'top'
  },
  addButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  addText: { color: 'white', fontWeight: 'bold' }
})
