import React, { useEffect, useState } from "react";

import TodoList from "../components/TodoList";

import { useGetTodosQuery } from "../features/api/apiSlice";
const Todo = () => {
	const { data } = useGetTodosQuery();

	const [editMode, setEditMode] = useState(false);
	const [input, setInput] = useState();
	const [editInput, setEditInput] = useState();
	// get todo data from localStorage
	const [todoData, setTodoData] = useState([]);

	console.log(todoData, "local");
	// create todo id
	const nextId = (dataId) => {
		return dataId;
	};
	// edit todo
	const handleEditFormSubmit = (e) => {
		e.preventDefault();
		const newTodo = [...todoData];
		const index = newTodo.findIndex((todo) => todo.id === editInput.id);
		newTodo[index] = editInput;
		setTodoData(newTodo);
		localStorage.setItem("todo", JSON.stringify(newTodo));
		setEditMode(false);
		setInput("");
	};
	// add new todo
	const handleFormSubmit = (e) => {
		e.preventDefault();
		const newTodos = [
			...todoData,
			{ id: nextId(todoData.length + 1), title: input },
		];
		setTodoData(newTodos);
		localStorage.setItem("todo", JSON.stringify(newTodos));
		setInput("");
	};
	// save localStorage data
	localStorage.setItem("todo", JSON.stringify(data));
	const localTodoData = localStorage.getItem("todo");

	useEffect(() => {
		if (localTodoData !== null) {
			try {
				const parsedData = JSON.parse(localTodoData);

				setTodoData(parsedData.slice(0, 5));
			} catch (e) {
				console.error("Error parsing JSON data:", e);
			}
		} else {
			console.log("Data not found in localStorage");
		}
	}, [localTodoData]);
	return (
		<div className="w-1/3 mx-auto bg-gray-200 p-10  shadow-3xl rounded-xl mt-5">
			<h2 className="mb-7 text-4xl text-bold">
				Todo <span className="text-indigo-600">Invento </span> Redux
			</h2>
			{/* edit mode check */}

			{editMode ? (
				<form onSubmit={handleEditFormSubmit}>
					<input
						className="rounded p-3 w-2/3 shadow-2xl  focus:outline-none"
						type="text"
						placeholder="Enter Todo"
						value={editInput.title}
						onChange={(e) =>
							setEditInput({ ...editInput, title: e.target.value })
						}
					/>
					<button className="bg-indigo-600 rounded px-5 py-3 text-white ml-2 hover:bg-green-600 shadow-2xl">
						Edit
					</button>
				</form>
			) : (
				<form onSubmit={handleFormSubmit}>
					<input
						className="rounded p-3 w-2/3 shadow-2xl  focus:outline-none"
						type="text"
						value={input}
						placeholder="Enter Todo"
						onChange={(e) => setInput(e.target.value)}
					/>
					<button className="bg-indigo-600 rounded px-5 py-3 text-white ml-2 hover:bg-green-600 shadow-2xl">
						Add
					</button>
				</form>
			)}
			{todoData.map((td) => (
				<TodoList
					key={td.id}
					data={td}
					todoData={todoData}
					setTodoData={setTodoData}
					setEditInput={setEditInput}
					setEditMode={setEditMode}
				/>
			))}
		</div>
	);
};

export default Todo;
