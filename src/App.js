import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import InputBox from "./components/InputBox";

const App = () => {

	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/todos",
			{
				method: "GET",
			}
		);

		const data = await response.json();

		console.log(data[0]);

		setTodos(data);
	};

	const toggleComplete = async (task) => {
		task.completed = !task.completed;
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${task.id}`,
			{
				method: "PUT",
				body: JSON.stringify(task),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();
		setTodos((todos) =>
			todos.map((todo) => {
				if (todo.id === data.id) {
					todo.completed = data.completed;
				}

				return todo;
			})
		);
	};

	const deleteTask = async (task) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${task.id}`,
			{
				method: "DELETE",
			}
		);
		const data = await response.json();
		setTodos((todos) => todos.filter((todo) => todo.id !== task.id));
	};

	const addTodo = async (title) => {
		const task = {
			userId: 1,
			title: title,
			completed: false
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		setTodos([...todos, data]);
	};

	return (
		<div className="App">
			<Header />
			<InputBox addTodo={addTodo} />
			<TaskList
				todos={todos}
				toggleComplete={toggleComplete}
				deleteTask={deleteTask} />
		</div>
	);
};

export default App;
