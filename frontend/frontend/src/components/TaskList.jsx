import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
            alert("Erro ao buscar tarefas.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.description} (
                        {task.status})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
