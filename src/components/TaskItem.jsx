const TaskItem = (props) => {
    const { task, toggleComplete, deleteTask } = props;
    return (
        <div className={"todo" + (task.completed ? " is-complete" : "")}>
            <div
                className="checkbox"
                onClick={() => toggleComplete(task)}
            ></div>

            <div className="text" onClick={() => toggleComplete(task)}>
                {task.title}
            </div>

            <div className="delete-todo" onClick={() => deleteTask(task)}>
                x
            </div>
        </div>
    );
};

export default TaskItem;
