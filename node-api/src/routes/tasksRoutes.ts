import { Router, Request, Response } from "express";
import { TasksRepository } from "../repositories/tasksRepository";
import { validateTaskInput } from "../middlewares/validateTaskInput";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const tasksRepository = new TasksRepository();
const pythonServiceUrl = process.env.PYTHON_LLM_URL + "/summarize";

// POST: Create a task and request a summary from the Python service
router.post("/", validateTaskInput, async (req: Request, res: Response) => {
  try {
    const { text, lang } = req.body;

    // Create the task
    const task = tasksRepository.createTask(text, lang);

    // Request summary from the Python service
    const response = await axios.post(pythonServiceUrl, { text, lang });
    const summary = response.data;

    if (!summary) {
      return res.status(500).json({ error: "Unable to generate the summary." });
    }

    // Update the task with the summary
    const updatedTask = tasksRepository.updateTask(task.id, summary);

    if (!updatedTask) {
      return res.status(500).json({ error: "Failed to update the task with the summary." });
    }

    return res.status(201).json({
      message: "Task created successfully!",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "An error occurred while creating the task." });
  }
});

// GET: List all tasks
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
