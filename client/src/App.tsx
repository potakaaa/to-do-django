import { useEffect, useState } from "react";
import Nothing from "./components/Nothing";
import PlusAddToDo from "./components/PlusAddToDo";
import { useGlobalState, ToDo } from "./provider/globals";
import ToDoItem from "./components/ToDoItem";
import { todo } from "node:test";

const App = () => {
  const { toDo, setToDo } = useGlobalState();

  const fetchToDo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/todoitems/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: ToDo[] = await response.json();
      console.log("Fetch Result: ", result);
      setToDo(result);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchToDo();
  }, [toDo]);

  const updateTodoItem = (id: number, updatedName: string) => {
    // Find the todo item by id and update its name
    const updatedTodos = toDo.map((item) =>
      item.id === id ? { ...item, name: updatedName } : item
    );
    setToDo(updatedTodos); // update the state with the modified todo list
  };

  return (
    <div className="bg-background w-full h-screen max-h-full flex flex-col justify-center items-center">
      <h1 className="absolute top-5 font-black text-2xl tracking-tight text-primary">
        what to do?
      </h1>
      <div
        className={`w-10/12 h-5/6 rounded-2xl p-4 bg-background shadow-lg flex justify-center ${
          toDo.length > 0 ? "items-start" : "items-center"
        } border border-slate-200 pt-7`}
      >
        {toDo.length > 0 ? (
          <ToDoItem todoItems={toDo} updateTodoItem={updateTodoItem} />
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
};

export default App;
