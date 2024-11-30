import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ToastAndroid } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Todo , TodoProps} from '@/components/todo';
import * as SQLite from 'expo-sqlite';


export default function App() {
  const db = SQLite.openDatabaseSync("database.db")

  const [todos, setTodos] = useState<TodoProps[]>([]);

  useEffect( ()=>{
    db.execSync(
      `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT DEFAULT '',
      description TEXT DEFAULT ''
      );`
    )

    
    const allRows = db.getAllSync('SELECT * FROM todos');
    let allTodos : TodoProps[] = [];

    allRows.forEach( (row) => {

      let aTodo : TodoProps = row as TodoProps;
      allTodos.push(aTodo);

    });

    setTodos(allTodos);

  } , [] )


  const deleteTodo = (id : number) =>{
    // Delete the todo
    db.execSync(
      `DELETE FROM todos WHERE id = ${id};`
    )

    // Refresh the components
    const allRows = db.getAllSync('SELECT * FROM todos');

    let allTodos : TodoProps[] = [];

    allRows.forEach( (row) => {

      let aTodo : TodoProps = row as TodoProps;
      allTodos.push(aTodo);

    });

    setTodos(allTodos);

  }


  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My To-Do List</Text>
      </View>


      {/* Scrollable Content */}

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        
        { (todos.length==0) ? 
        
        <View style={styles.emptyTodoWrapper}>
          <Text style={styles.emptyTodoText}>To-Do List is Empty!</Text>
        </View>
        
        : 
        
        todos.map( (todo , index)=>(
          <Todo
            key={index}
            id = {todo.id}
            title={todo.title}
            description={todo.description}
            handleDelete={deleteTodo}
          />
        )) }
      </ScrollView>

      {/* Button */}
        <View style={styles.buttonContainer} > 
          <Button title='Add Task' onPress={ ()=>{ router.push('/modal') } } />
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20, // Adjust to avoid overlap with status bar
    paddingBottom: 10,
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    flexGrow: 1, // Makes ScrollView take the remaining space
    justifyContent: 'center',
    padding: 20,
  },
  emptyTodoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyTodoText: {
    fontSize: 20,
    margin: 'auto',
  },
  buttonContainer: {
    padding: 20,
    width: '100%', // Make the button container span the full width
    elevation: 5,
  },
});
