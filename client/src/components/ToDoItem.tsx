import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ToDo } from "@/provider/globals";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import Nothing from "./Nothing";
import PlusAddToDo from "./PlusAddToDo";

interface ToDoItemProps {
  todoItems: ToDo[];
  updateTodoItem: (id: number, updatedName: string) => void;
}

const ToDoItem: FC<ToDoItemProps> = (ToDoItemProps) => {
  const [editedNames, setEditedNames] = useState(
    ToDoItemProps.todoItems.reduce((acc, todo) => {
      acc[todo.id] = todo.name; // Initialize edited name state for each todo
      return acc;
    }, {} as Record<number, string>)
  );

  const handleUpdateToDo = async (id: number, updatedData: ToDo) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}api/todoitems/${id}/`,
        updatedData
      );
      console.log("Updated Todo Fetch: ", response.data);
    } catch (error) {
      console.error("There was a problem with your update operation:", error);
    }
  };

  const handleSave = (id: number) => {
    const updatedName = editedNames[id];
    const todoToUpdate = ToDoItemProps.todoItems.find((todo) => todo.id === id);

    if (todoToUpdate) {
      const updatedTodo = {
        ...todoToUpdate,
        name: updatedName, // Keep other properties intact and only update name
      };
      handleUpdateToDo(id, updatedTodo); // Pass updated todo to handleUpdateToDo
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setEditedNames((prevState) => ({
      ...prevState,
      [id]: value, // Update the name for the specific todo item
    }));
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {ToDoItemProps.todoItems.map((todo) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-12 rounded-md shadow-sm"
            >
              <div className="flex flex-col items-start w-full">
                <p
                  className={`text-[10px] font-thin h-3 ${
                    todo.done ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {todo.done ? "Done" : "Not Done"}
                </p>
                <p className="text-base">{todo.name}</p>
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-72 rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-sm items-start w-full">
                Edit{" "}
              </AlertDialogTitle>
              <Input
                value={editedNames[todo.id] || todo.name}
                className="text-center font-medium"
                onChange={(e) => handleInputChange(todo.id, e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSave(todo.id)}>
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
      <PlusAddToDo />
    </div>
  );
};

export default ToDoItem;
