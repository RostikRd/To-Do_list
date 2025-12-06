// Головна логіка додатку
class App {
    constructor() {
        this.taskList = document.getElementById('task-list');
        this.taskForm = document.getElementById('task-form');
        this.taskInput = document.getElementById('task-input');
        this.categorySelect = document.getElementById('category-select');
        this.uncompletedCountEl = document.getElementById('uncompleted-count');
        this.completedCountEl = document.getElementById('completed-count');
        
        this.init();
    }

    // Ініціалізація додатку
    init() {
        // Обробка форми додавання задачі
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTask();
        });

        // Слухач зміни фільтру
        document.addEventListener('filterChanged', () => {
            this.renderTasks();
        });

        // Початковий рендеринг
        this.renderTasks();
        this.updateStats();
        themeManager.checkAndUpdateTheme();
    }

    // Обробка додавання нової задачі
    handleAddTask() {
        const text = this.taskInput.value.trim();
        const category = this.categorySelect.value;

        if (!text || !category) {
            alert('Prosím vyplňte všetky polia!');
            return;
        }

        taskManager.addTask(text, category);
        this.taskInput.value = '';
        this.categorySelect.value = '';
        
        this.renderTasks();
        this.updateStats();
        themeManager.checkAndUpdateTheme();
    }

    // Обробка зміни статусу задачі
    handleToggleTask(id) {
        taskManager.toggleTask(id);
        this.renderTasks();
        this.updateStats();
        themeManager.checkAndUpdateTheme();
    }

    // Обробка видалення задачі
    handleDeleteTask(id) {
        if (confirm('Naozaj chcete vymazať túto úlohu?')) {
            taskManager.deleteTask(id);
            this.renderTasks();
            this.updateStats();
            themeManager.checkAndUpdateTheme();
        }
    }

    // Відображення списку задач
    renderTasks() {
        const currentFilter = filterManager.getCurrentFilter();
        const tasks = taskManager.getTasksByCategory(currentFilter);
        
        this.taskList.innerHTML = '';

        if (tasks.length === 0) {
            this.taskList.innerHTML = '<li class="no-tasks">Žiadne úlohy v tejto kategórii.</li>';
            return;
        }

        tasks.forEach(task => {
            const taskItem = this.createTaskElement(task);
            this.taskList.appendChild(taskItem);
        });
    }

    // Створення елемента задачі
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" 
                   class="task-checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="app.handleToggleTask(${task.id})">
            <div class="task-content">
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <span class="task-category">${this.escapeHtml(task.category)}</span>
            </div>
            <button class="btn-delete" onclick="app.handleDeleteTask(${task.id})">
                Vymazať
            </button>
        `;
        
        return li;
    }

    // Екранування HTML для безпеки
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Оновлення статистики
    updateStats() {
        const uncompletedCount = taskManager.getUncompletedCount();
        const completedCount = taskManager.getCompletedCount();
        
        this.uncompletedCountEl.textContent = uncompletedCount;
        this.completedCountEl.textContent = completedCount;
    }
}

// Ініціалізація додатку після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

