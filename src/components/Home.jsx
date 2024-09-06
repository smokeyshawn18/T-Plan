import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos)); // Ensure proper JSON parsing
    }
  }, []);

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]); // Depend on todos state

  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent empty todo
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
      timestamp: new Date().toLocaleString(),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos); // Update state with new todo
    setTodo(""); // Clear input after adding
  };

  const handleChange = (event) => {
    setTodo(event.target.value); // Track input
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos); // Toggle completed state
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id)); // Remove edited item from the list
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos); // Remove item
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-50 shadow-lg rounded-xl min-h-[80vh]">
      {/* Add Todo Section */}
      <div className="addTodo bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add a New Todo
        </h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="border border-gray-300 p-3 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your todo"
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-800 py-2 px-5 font-bold text-white rounded-lg transition duration-300 ease-in-out"
          >
            Save
          </button>
        </div>
      </div>

      {/* Todos Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Todos</h2>
      <div className="todos space-y-6">
        {todos.length === 0 && (
          <p className="mx-5 p-5 font-bold text-gray-600">
            No todos to display!
          </p>
        )}
        {todos.map((item) => (
          <div
            key={item.id}
            className="todo bg-white p-6 shadow-md rounded-lg flex flex-col gap-4 w-1/2 my-3"
          >
            <div className="flex items-center gap-4">
              <input
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.isCompleted}
                name={item.id}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <div
                className={`text-lg ${
                  item.isCompleted
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {item.todo}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 bg-gray-200 p-2 rounded-md">
                {item.timestamp}
              </p>
              <div className="actions flex space-x-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-blue-600 hover:bg-blue-800 py-2 px-4 font-bold text-white rounded-lg transition duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Have you completed this todo?")) {
                      handleDelete(item.id);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 py-2 px-4 font-bold text-white rounded-lg transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
