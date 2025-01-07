import { Router, Request, Response } from "express";
import { TasksRepository } from "../repositories/tasksRepository";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const tasksRepository = new TasksRepository();

const SUPPORTED_LANGUAGES = ["pt", "en", "es"];
const pythonServiceUrl = process.env.PYTHON_LLM_URL + "/summarize";

// POST: Cria uma tarefa e solicita resumo ao serviço Python
router.post("/", async (req: Request, res: Response) => {
  try {
    const { text, lang } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Campo "text" é obrigatório.' });
    }
    if (!lang) {
      return res.status(400).json({ error: 'Campo "lang" é obrigatório.' });
    }

    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      return res.status(400).json({ error: "Language not supported" });
    }

    // Cria a "tarefa"
    const task = tasksRepository.createTask(text, lang);

    // Deve solicitar o resumo do texto ao serviço Python
    const response = await axios.post(pythonServiceUrl, { text, lang });
    const summary = response.data;

    if (!summary) {
      return res.status(500).json({ error: "Não foi possível gerar o resumo." });
    }

    // Atualiza a tarefa com o resumo
    const updatedTask = tasksRepository.updateTask(task.id, summary);

    if (!updatedTask) {
      return res.status(500).json({ error: "Erro ao atualizar a tarefa com o resumo." });
    }

    return res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: updatedTask, 
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ error: "Ocorreu um erro ao criar a tarefa." });
  }
});


// GET: Lista todas as tarefas
router.get("/", (req: Request, res: Response) => {
  const tasks = tasksRepository.getAllTasks();
  return res.json(tasks);
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const taskId = Number(id);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const task = tasksRepository.getTaskById(taskId);
  
  if (task) {
    return res.json(task);
  }

  return res.status(404).json({ error: "Task not found" });
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const taskId = Number(id);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const taskRemoved = tasksRepository.deleteTask(taskId);
  
  if (taskRemoved) {
    return res.status(200).json({ message: "Task removed successfully" });
  }

  return res.status(404).json({ error: "Task not found" });
});


export default router;
