import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldTask) => [...oldTask, data]);
  };

  const handleToggleTaskDone = (id: number) => {
    const updatedTask = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTasks(updatedTask);
  };

  const handleRemoveTask = (id: number) => {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => setTasks((oldTask) => oldTask.filter((task) => task.id !== id)),
      },
    ]);
  };

  const handleEditTask = (taskId: number, taskNewTitle: string) => {
    const updatedTask = tasks.map((task) =>
      task.id === taskId ? { ...task, title: taskNewTitle } : task
    );

    setTasks(updatedTask);
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
