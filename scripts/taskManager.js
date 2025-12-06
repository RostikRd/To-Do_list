// Управління задачами (CRUD операції)
class TaskManager {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }

    // Завантаження задач з localStorage або початкових даних
    loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        } else {
            // Якщо немає збережених задач, використовуємо початкові
            this.tasks = INITIAL_TASKS.map(task => ({ ...task }));
            this.saveTasks();
        }
    }

    // Збереження задач у localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Отримання всіх задач
    getAllTasks() {
        return this.tasks;
    }

    // Отримання задач за категорією
    getTasksByCategory(category) {
        if (category === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(task => task.category === category);
    }

    // Додавання нової задачі
    addTask(text, category) {
        const newTask = {
            id: Date.now(), // Простий спосіб генерації унікального ID
            text: text.trim(),
            category: category,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    // Зміна статусу задачі (виконана/невиконана)
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            return task;
        }
        return null;
    }

    // Видалення задачі
    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            return true;
        }
        return false;
    }

    // Підрахунок невиконаних задач
    getUncompletedCount() {
        return this.tasks.filter(task => !task.completed).length;
    }

    // Підрахунок виконаних задач
    getCompletedCount() {
        return this.tasks.filter(task => task.completed).length;
    }
}

// Створюємо глобальний екземпляр
const taskManager = new TaskManager();

