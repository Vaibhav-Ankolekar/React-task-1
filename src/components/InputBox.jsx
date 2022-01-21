import { useState } from "react";

const InputBox = (props) => {
    const [newTodo, setNewTodo] = useState("");
    const { addTodo } = props;
    return (
        <div className="content">
            <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
                placeholder="Enter new task"
            />
            <div
                className="button"
                onClick={() => {
                    if (newTodo.length > 0) {
                        setNewTodo("");
                        addTodo(newTodo);
                    } else {
                        alert("Input not provided");
                    }
                }}
            >
                Add
            </div>
        </div>
    );
};

export default InputBox;
