import Nothing from "./components/Nothing";
import PlusAddToDo from "./components/PlusAddToDo";

const App = () => {
  return (
    <div className="bg-background w-full h-screen max-h-full flex flex-col justify-center items-center">
      <h1 className="absolute top-5 font-black text-2xl tracking-tight text-primary">
        what to do?
      </h1>
      <div className="w-10/12 h-5/6 rounded-2xl p-10 bg-background shadow-lg flex justify-center items-center">
        <PlusAddToDo />
      </div>
    </div>
  );
};

export default App;
