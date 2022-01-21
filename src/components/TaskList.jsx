import TaskItem from "./TaskItem";

const TodoList = (props) => {
    const { todos, toggleComplete, deleteTask } = props;

    return (
        <div className="todos">
            {todos.length > 0 ? (
                todos.map((task) => (
                    <TaskItem
                        key={task.title}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                    />
                ))
            ) : (
                <p className="todo text">
                    There are no task added to list. To add new Task enter task
                    in textbox and click Add.
                </p>
            )}
        </div>
    );
};

export default TodoList;
