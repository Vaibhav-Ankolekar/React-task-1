import { useState, useEffect } from "react";
import axios from "axios";
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
		const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
		setTodos(data);
	};

	const toggleComplete = async (task) => {
		task.completed = !task.completed;

		let { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${task.id}`, {
			body: JSON.stringify(task),
		});

		data = JSON.parse(data.body);
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
		await axios.delete(`https://jsonplaceholder.typicode.com/posts/${task.id}`);
		setTodos((todos) => todos.filter((todo) => todo.id !== task.id));
	};

	const addTodo = async (title) => {
		const task = {
			userId: 1,
			title: title,
			completed: false
		};

		let { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', {
			body: JSON.stringify(task),
		});

		data = JSON.parse(data.body);

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
