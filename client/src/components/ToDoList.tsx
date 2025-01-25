import { useGlobalState } from "@/provider/globals";
import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const { toDo, setToDo, doneTodo } = useGlobalState();

  const updateTodoItem = (id: number, updatedName: string) => {
    // Find the todo item by id and update its name
    const updatedTodos = toDo.map((item) =>
      item.id === id ? { ...item, name: updatedName } : item
    );
    setToDo(updatedTodos); // update the state with the modified todo list
  };

  const deleteTodoItem = (id: number) => {
    setToDo((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <div className="w-full">
      <ToDoItem
        todoItems={toDo}
        updateTodoItem={updateTodoItem}
        deleteTodoItem={deleteTodoItem}
        isCompleted={false}
      />
      {doneTodo.length > 0 && (
        <div>
          <p className="font-bold mt-10 tracking-tight mb-2">COMPLETED</p>
          <ToDoItem
            todoItems={doneTodo}
            updateTodoItem={updateTodoItem}
            deleteTodoItem={deleteTodoItem}
            isCompleted={true}
          />
        </div>
      )}
    </div>
  );
};

export default ToDoList;
