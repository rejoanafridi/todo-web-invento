import React from "react";
import {  AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
const TodoList = ({
	data,
	todoData,
	setEditMode,
	setEditInput,
	setTodoData,
}) => {
	const { id, title } = data;
	const handleEdit = (id) => {
		setEditMode(true);
		setEditInput(todoData.find((ed) => ed.id === id));
	};
	const handleDelete = (id) => {
		const newTodo = todoData.filter((todo) => todo.id !== id);
		setTodoData(newTodo);
		localStorage.setItem("todo", JSON.stringify(newTodo));
	};
	return (
		<section className="mt-5 mx-12 ">
			<div className="flex justify-between item-center p-4 rounded  gap-3  border-2 border-indigo-600">
				<div>{title}</div>
				<div className="flex gap-3">
					<button onClick={() => handleEdit(id)}>
						<AiFillEdit size={30} style={{ color: "green" }} />
					</button>

					<button onClick={() => handleDelete(id)}>
						<AiTwotoneDelete size={30} style={{ color: "red" }} />
					</button>
				</div>
			</div>
		</section>
	);
};

export default TodoList;
