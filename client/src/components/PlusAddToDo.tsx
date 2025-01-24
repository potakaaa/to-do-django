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
        <Button variant="outline" className="text-xl font-bold shadow-md">
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col space-y-2">
          <Input
            type="text"
            id="todo"
            name="todo"
            placeholder="e.g. buy milk"
            className="w-full text-sm"
            value={currTodo}
            onChange={(e) => setCurrTodo(e.target.value)}
          />
          <Button variant="default" className="mt-2" onClick={handleAddToDo}>
            Add
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlusAddToDo;
