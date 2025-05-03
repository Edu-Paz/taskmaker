import React, { useState } from "react";
import axios from "axios";

function TaskForm({ onTaskCreated }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/tasks", task);
            alert("Tarefa criada com sucesso!");
            setTask({ title: "", description: "", status: "" });
            onTaskCreated();
        } catch (error) {
            console.error(error);
            alert("Erro ao criar tarefa.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                name="title"
                placeholder="Título"
                value={task.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Descrição"
                value={task.description}
                onChange={handleChange}
            />
            <input
                type="text"
                name="status"
                placeholder="Status"
                value={task.status}
                onChange={handleChange}
            />
            <button type="submit">Criar Tarefa</button>
        </form>
    );
}

export default TaskForm;
