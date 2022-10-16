import React from "react";
import ToDo from "./ToDo";

const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    return (
        <div>
            {toDoList.map(todo => {
                return (
                    <ToDo 
                        todo={todo} 
                        handleToggle={handleToggle}
                    />
                )
            })}

            <button 
                style={{ margin: "20px"}} 
                onClick={handleFilter}
            >
                Clear completed tasks
            </button>
        </div>
    )
}

export default ToDoList;