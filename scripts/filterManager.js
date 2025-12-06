// Управління фільтрацією задач за категоріями
class FilterManager {
    constructor() {
        this.currentFilter = 'all';
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.init();
    }

    // Ініціалізація фільтрів
    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.setFilter(category);
            });
        });
    }

    // Встановити активний фільтр
    setFilter(category) {
        this.currentFilter = category;
        
        // Оновити активну кнопку
        this.filterButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Викликати подію для оновлення списку задач
        this.triggerFilterChange();
    }

    // Отримати поточний фільтр
    getCurrentFilter() {
        return this.currentFilter;
    }

    // Викликати подію зміни фільтру
    triggerFilterChange() {
        const event = new CustomEvent('filterChanged', {
            detail: { filter: this.currentFilter }
        });
        document.dispatchEvent(event);
    }
}

// Створюємо глобальний екземпляр
const filterManager = new FilterManager();

