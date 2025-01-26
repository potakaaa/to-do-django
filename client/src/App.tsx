import { useEffect } from "react";
import Nothing from "./components/Nothing";
import PlusAddToDo from "./components/PlusAddToDo";
import { useGlobalState, ToDo } from "./provider/globals";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";

const App = () => {
  const { toDo, setToDo, doneTodo } = useGlobalState();

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
  }, [setToDo]);

  useEffect(() => {
    console.log("Done To Do State: ", doneTodo);
  }, [doneTodo]);

  return (
    <div className="bg-background w-full h-screen flex flex-col justify-center items-center overflow-y-auto space-y-6 sm:space-y-10 transition-all duration-300">
      <h1 className="absolute top-5 sm:top-10 font-black text-2xl tracking-tight text-primary transition-all duration-300">
        what to do?
      </h1>
      <div
        className={`w-10/12 sm:w-9/12 lg:w-8/12 xl:w-6/12 h-auto max-h-[80%] rounded-2xl p-4 bg-background shadow-lg flex justify-center transition-all duration-300 ${
          toDo.length > 0 ? "items-start" : "items-center"
        } border border-accent pt-7 overflow-y-scroll mt-5`}
      >
        {toDo.length > 0 ? (
          <ToDoList />
        ) : (
          <div className="flex flex-col items-center space-y-5">
            <Nothing />
            <PlusAddToDo />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
