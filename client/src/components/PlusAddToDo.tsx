import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalState } from "@/provider/globals";
import axios from "axios";

const PlusAddToDo = () => {
  const { currTodo, setCurrTodo, toDo, setToDo } = useGlobalState();

  const handleAddToDo = () => {
    const newTodo = {
      name: currTodo,
      completed: false,
    };

    console.log(currTodo);

    axios
      .post(`${import.meta.env.VITE_API_URL}api/todoitems/`, newTodo)
      .then((response) => {
        console.log("Response: ", response.data);
        setToDo([...toDo, response.data]);
        console.log("To Do State: ", toDo);
        setCurrTodo("");
      })
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation:",
          error.response.data
        );
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="text-xl font-bold shadow-md h-9 sm:h-11 transition-all duration-300"
        >
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 sm:w-80 lg:w-96 p-4 bg-background shadow-lg rounded-xl transition-all duration-300">
        <div className="flex flex-col space-y-2">
          <Input
            type="text"
            id="todo"
            name="todo"
            placeholder="e.g. buy milk"
            className="w-full text-sm lg:text-center text-left py-0 md:py-5 md:text-base"
            value={currTodo}
            onChange={(e) => setCurrTodo(e.target.value)}
          />
          <Button
            variant="default"
            className="mt-2 md:text-base"
            onClick={handleAddToDo}
          >
            Add
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlusAddToDo;
