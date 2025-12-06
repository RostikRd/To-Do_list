// Управління темами (normal/panic/happy mode)
class ThemeManager {
    constructor() {
        this.themeStylesheet = document.getElementById('theme-stylesheet');
        this.currentMode = 'normal';
        this.PANIC_THRESHOLD = 7; // Поріг для panic mode
        this.HAPPY_COMPLETED_THRESHOLD = 10; // Поріг виконаних для happy mode
        this.HAPPY_UNCOMPLETED_THRESHOLD = 3; // Поріг невиконаних для happy mode
    }

    // Перевірка та оновлення теми на основі кількості задач
    checkAndUpdateTheme() {
        const uncompletedCount = taskManager.getUncompletedCount();
        const completedCount = taskManager.getCompletedCount();

        // Пріоритет: Happy > Panic > Normal
        if (completedCount > this.HAPPY_COMPLETED_THRESHOLD && 
            uncompletedCount < this.HAPPY_UNCOMPLETED_THRESHOLD) {
            this.switchToHappyMode();
        } else if (uncompletedCount > this.PANIC_THRESHOLD) {
            this.switchToPanicMode();
        } else {
            this.switchToNormalMode();
        }
    }

    // Перехід у нормальний режим
    switchToNormalMode() {
        if (this.currentMode === 'normal') return;
        
        this.currentMode = 'normal';
        this.themeStylesheet.href = 'styles/normal-mode.css';
        this.hideHappyMessage();
    }

    // Перехід у panic mode
    switchToPanicMode() {
        if (this.currentMode === 'panic') return;
        
        this.currentMode = 'panic';
        this.themeStylesheet.href = 'styles/panic-mode.css';
        this.hideHappyMessage();
    }

    // Перехід у happy mode
    switchToHappyMode() {
        if (this.currentMode === 'happy') return;
        
        this.currentMode = 'happy';
        this.themeStylesheet.href = 'styles/happy-mode.css';
        this.showHappyMessage();
    }

    // Показати повідомлення happy mode
    showHappyMessage() {
        const happyMessage = document.getElementById('happy-message');
        if (happyMessage) {
            happyMessage.classList.remove('hidden');
        }
    }

    // Приховати повідомлення happy mode
    hideHappyMessage() {
        const happyMessage = document.getElementById('happy-message');
        if (happyMessage) {
            happyMessage.classList.add('hidden');
        }
    }
}

// Створюємо глобальний екземпляр
const themeManager = new ThemeManager();

