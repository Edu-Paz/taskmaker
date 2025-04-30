const { Task } = require("../models");

module.exports = {
    // Cria uma nova tarefa com os dados recebidos do corpo da requisição
    async create(req, res) {
        try {
            const task = await Task.create(req.body);
            return res.status(201).json(task);
        } catch (error) {
            return res.status(400).json({ error: error.message});
        }
    },

    // Retrona todas as tarefas
    async findAll(req, res) {
        try {
            const tasks = await Task.findAll();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar tarefas." });
        }
    },

    // Atualiza uma tarefa com base no ID passado na URL e dados enviados no body
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Task.update(req.body, {
                where: {
                    id,
                },
            });

            if (updated) {
                return res.json({ message: "Tarefa atualizada" });
            } else {
                return res
                    .status(404)
                    .json({ message: "Tarefa não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar tarefa." });
        }
    },

    // Deleta uma tarefa baseada no ID passado na URL
    async delete(req, res) {
        try {
        const { id } = req.params;
        const deleted = await Task.destroy({ where: { id } });

        if (deleted) {
            res.json({ message: "Tarefa removida" });
        } else {
            res.status(404).json({ message: "Tarefa nao encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar tarefa." });
    }
    },
};
