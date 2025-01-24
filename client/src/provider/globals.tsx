import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type ToDo = {
  id: number;
  name: string;
  done: boolean;
};

interface GlobalStates {
  toDo: ToDo[];
  setToDo: React.Dispatch<React.SetStateAction<ToDo[]>>;
  currTodo: string;
  setCurrTodo: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalStates | undefined>(undefined);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [currTodo, setCurrTodo] = useState("");
  const [toDo, setToDo] = useState<ToDo[]>([]);

  return (
    <GlobalContext.Provider value={{ currTodo, setCurrTodo, toDo, setToDo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = (): GlobalStates => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
