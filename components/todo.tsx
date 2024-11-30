import React from 'react';
import { View, Text, Button, StyleSheet, ToastAndroid } from 'react-native';

export type TodoProps = {
    id: number;
    title: string;
    description: string;
};

type TodoPropsWithDelete = {
    id: number;
    title: string;
    description: string;
    handleDelete: (id: number)=>void;
};

export const Todo: React.FC<TodoPropsWithDelete> = ({id, title, description , handleDelete}) => {
  return (
    <View testID={`${id}`} style={styles.todoContainer}>
      <Text style={styles.todoTitle}>{title}</Text>
      <Text style={styles.todoDescription}>{description}</Text>
      <Button title="Completed" onPress={ ()=>{ handleDelete(id) } } color={'#62a155'} />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // For Android
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
});

