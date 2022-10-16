import React from "react";

const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault();
        handleToggle(e.currentTarget.id)
    }

    return (
        <div 
            id={todo.id}
            key={todo.key}
            className={todo.complete? "strike": ""}
            onClick={handleClick}
        >
            {todo.task}
        </div>
    )
}

export default ToDo;