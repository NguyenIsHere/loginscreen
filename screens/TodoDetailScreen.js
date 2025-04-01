import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function TodoDetailScreen ({ route }) {
  const { todo } = route.params
  const navigation = useNavigation()

  const [content, setContent] = useState(todo.content)

  useEffect(() => {
    setContent(todo.content)
  }, [todo.content])

  const deleteTodo = async () => {
    const storedTodos = await AsyncStorage.getItem('todos')
    const todos = storedTodos ? JSON.parse(storedTodos) : []
    const updatedTodos = todos.filter(t => t.id !== todo.id)

    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
    navigation.goBack()
  }

  const saveTodo = async () => {
    if (content.trim() === todo.content) return

    const storedTodos = await AsyncStorage.getItem('todos')
    const todos = storedTodos ? JSON.parse(storedTodos) : []
    const updatedTodos = todos.map(t =>
      t.id === todo.id ? { ...t, content } : t
    )

    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          multiline={true}
          textAlignVertical='top'
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveTodo}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={deleteTodo}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  input: {
    fontSize: 18,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1
  },
  saveText: { color: 'white', fontWeight: 'bold' },
  deleteText: { color: 'white', fontWeight: 'bold' }
})
