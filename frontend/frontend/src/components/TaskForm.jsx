import React, { useState } from "react";
import axios from "axios";

function TaskForm() {
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
            window.location.reload();
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
            <select
                name="status"
                value={task.status}
                onChange={handleChange}
                required
                onInvalid={(e) =>
                    e.target.setCustomValidity(
                        "Selecione um status."
                    )
                }
                onInput={(e) => e.target.setCustomValidity("")}>
                <option value="">Selecione o status</option>
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluido">Concluída</option>
            </select>
            <button type="submit">Criar Tarefa</button>
        </form>
    );
}

export default TaskForm;
