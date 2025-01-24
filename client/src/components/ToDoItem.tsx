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

interface ToDoItemProps {
  todoItems: ToDo[];
  updateTodoItem: (id: number, updatedName: string) => void;
}

const ToDoItem: FC<ToDoItemProps> = (ToDoItemProps) => {
  const [editedName, setEditedName] = useState(
    ToDoItemProps.todoItems[0]?.name || ""
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

  const handleSave = (e: any) => {
    const newTodo = {
      id: ToDoItemProps.todoItems[0].id,
      name: editedName,
      done: ToDoItemProps.todoItems[0].done,
    };
    handleUpdateToDo(ToDoItemProps.todoItems[0].id, newTodo);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full h-12 rounded-md">
          <div className="flex flex-col items-start w-full">
            <p
              className={`text-[10px] font-thin h-3 ${
                ToDoItemProps.todoItems[0].done
                  ? "text-green-300"
                  : "text-red-300"
              }`}
            >
              {ToDoItemProps.todoItems[0].done ? "Done" : "Not Done"}
            </p>
            <p className="text-base">{ToDoItemProps.todoItems[0].name}</p>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-72 rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm items-start w-full">
            Edit{" "}
          </AlertDialogTitle>
          <Input
            value={editedName}
            className="text-center font-medium"
            onChange={(e) => setEditedName(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ToDoItem;
