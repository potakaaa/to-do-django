import { useGlobalState } from "@/provider/globals";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const { toDo, setToDo, doneTodo, setDoneTodo } = useGlobalState();

  const updateTodoName = (id: number, updatedName: string) => {
    // Find the todo item by id and update its name
    const updatedTodos = toDo.map((item) =>
      item.id === id ? { ...item, name: updatedName } : item
    );
    setToDo(updatedTodos);
  };

  const updateTodoDoneState = (id: number, doneState: boolean) => {
    if (doneState) {
      // Move item from `toDo` to `doneTodo`
      const itemToMove = toDo.find((item) => item.id === id);
      if (itemToMove) {
        setToDo((prev) => prev.filter((item) => item.id !== id));
        setDoneTodo((prev) => [...prev, { ...itemToMove, done: true }]);
      }
    } else {
      // Move item from `doneTodo` to `toDo`
      const itemToMove = doneTodo.find((item) => item.id === id);
      if (itemToMove) {
        setDoneTodo((prev) => prev.filter((item) => item.id !== id));
        setToDo((prev) => [...prev, { ...itemToMove, done: false }]);
      }
    }
  };

  const deleteTodoItem = (id: number) => {
    setToDo((prev) => prev.filter((todo) => todo.id !== id));
    setDoneTodo((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <div className="w-full">
      <ToDoItem
        todoItems={toDo}
        updateTodoName={updateTodoName}
        updateTodoDoneState={updateTodoDoneState}
        deleteTodoItem={deleteTodoItem}
        isCompleted={false}
      />
      {doneTodo.length > 0 && (
        <div>
          <p className="font-bold mt-10 tracking-tight mb-2">COMPLETED</p>
          <ToDoItem
            todoItems={doneTodo}
            updateTodoName={updateTodoName}
            updateTodoDoneState={updateTodoDoneState}
            deleteTodoItem={deleteTodoItem}
            isCompleted={true}
          />
        </div>
      )}
    </div>
  );
};

export default ToDoList;
