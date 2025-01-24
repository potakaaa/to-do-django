import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PlusAddToDo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-xl font-bold shadow-md">
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="todo" className="text-primary px-1">
            Add a todo
          </Label>
          <Input
            type="text"
            id="todo"
            name="todo"
            placeholder="e.g. buy milk"
            className="w-full text-sm"
          />
          <Button variant="default" className="mt-2">
            Add
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlusAddToDo;
