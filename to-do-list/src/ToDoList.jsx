import React, { useState, useRef } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [dragging, setDragging] = useState(false);
    const dragTask = useRef();
    const draggedOverTask = useRef();

    function addTask() {
        const taskInput = document.getElementById("task-input");
        const task = taskInput.value;

        if (task === '') {
            alert('La tarea no puede estar vacía');
            return;
        } else {
            document.getElementById("task-input").value = "";
            setTasks(t => [...t, task]);
        }
    }

    function removeTask(index) {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    }

    function editTask(index) {
        // Lógica para editar la tarea
    }

    function handleDragStart(index) {
        dragTask.current = index;
        setDragging(true);
    }

    function handleDragEnter(index) {
        draggedOverTask.current = index;
    }

    function handleDragEnd() {
        const updatedTasks = [...tasks];
        const draggedTaskContent = updatedTasks[dragTask.current];
        updatedTasks.splice(dragTask.current, 1);
        updatedTasks.splice(draggedOverTask.current, 0, draggedTaskContent);
        dragTask.current = null;
        draggedOverTask.current = null;
        setTasks(updatedTasks);
        setDragging(false);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    return (
        <div>
            <h1>To Do List</h1>
            <input type='text' id='task-input' placeholder='Ingrese la tarea'></input>
            <button className='add-task' onClick={addTask}>Agregar Tarea</button>

            <div className='tasks'>
                <ol>
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            className={`p-4 mb-2 bg-gray-800 rounded ${dragging ? 'dragging' : ''}`}
                        >
                            <span className='text'>{task}</span>
                            <button className="delete-task" onClick={() => removeTask(index)}>Delete</button>
                            <button className="edit-task" onClick={() => editTask(index)}>Edit</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default ToDoList;
