import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

export default function HomeScreen ({ navigation }) {
  const [todos, setTodos] = useState([])

  useFocusEffect(
    useCallback(() => {
      const loadTodos = async () => {
        const storedTodos = await AsyncStorage.getItem('todos')
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos))
        }
      }
      loadTodos()
    }, [])
  )

  const deleteTodo = async id => {
    const filteredTodos = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodos)
    await AsyncStorage.setItem('todos', JSON.stringify(filteredTodos))
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() => navigation.navigate('TodoDetail', { todo: item })}
          >
            <Text>{item.content}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewTodo')}
      >
        <Text style={styles.addText}>+ Add Todo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 10
  },
  deleteText: { color: 'black', fontWeight: 'bold' },
  addButton: {
    backgroundColor: 'black',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  addText: { color: 'white', fontWeight: 'bold' }
})
