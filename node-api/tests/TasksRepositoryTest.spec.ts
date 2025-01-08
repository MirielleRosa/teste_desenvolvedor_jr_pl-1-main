import { TasksRepository } from '../src/repositories/tasksRepository'

describe('TasksRepository', () => {
  let tasksRepository: TasksRepository;

  beforeEach(() => {
    tasksRepository = new TasksRepository();
  });

  test('should create a new task', () => {
    const task = tasksRepository.createTask('Task 1', 'en');

    expect(task).toEqual({
      id: 1,
      text: 'Task 1',
      lang: 'en',
      summary: null,
    });

    const allTasks = tasksRepository.getAllTasks();
    expect(allTasks).toHaveLength(1);
    expect(allTasks[0]).toEqual(task);
  });

  test('should update a task summary', () => {
    const task = tasksRepository.createTask('Task 1', 'en');
    const updatedTask = tasksRepository.updateTask(task.id, 'Task 1');

    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.summary).toBe('Task 1');

    const fetchedTask = tasksRepository.getTaskById(task.id);
    expect(fetchedTask?.summary).toBe('Task 1');
  });

  test('should return null if updating a non-existing task', () => {
    const updatedTask = tasksRepository.updateTask(999, 'This ID does not exist');
    expect(updatedTask).toBeNull();
  });

  test('should get a task by its ID', () => {
    const task = tasksRepository.createTask('Task 1', 'en');
    const fetchedTask = tasksRepository.getTaskById(task.id);

    expect(fetchedTask).toEqual(task);
  });

  test('should return null when getting a task by a non-existing ID', () => {
    const fetchedTask = tasksRepository.getTaskById(999);
    expect(fetchedTask).toBeNull();
  });

  test('should get all tasks', () => {
    const task1 = tasksRepository.createTask('Task 1', 'en');
    const task2 = tasksRepository.createTask('Task 2', 'pt');
    const allTasks = tasksRepository.getAllTasks();

    expect(allTasks).toHaveLength(2);
    expect(allTasks).toEqual([task1, task2]);
  });

  test('should delete a task by its ID', () => {
    const task = tasksRepository.createTask('Task to delete', 'en');
    const deleted = tasksRepository.deleteTask(task.id);

    expect(deleted).toBe(true);

    const allTasks = tasksRepository.getAllTasks();
    expect(allTasks).toHaveLength(0);
  });

  test('should return false when deleting a non-existing task', () => {
    const deleted = tasksRepository.deleteTask(999);
    expect(deleted).toBe(false);
  });
});