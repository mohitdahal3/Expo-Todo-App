import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';

export default function Modal() {
    const db = SQLite.openDatabaseSync('database.db')
    const router = useRouter()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleButtonPressed = ()=>{
    if (title.trim() != "" ){
        
        db.runSync(
            `INSERT INTO todos (title, description) VALUES (?, ?)`, 
            title.trim() , description.trim()
        )

        router.push("/")

    }

  }

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Add New Task</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="words"           
          />
          
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          
          <Button title="Add Task" onPress={() => { handleButtonPressed() }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Android shadow
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    maxWidth: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
