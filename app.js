document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"], .header__button, .hero__button, .problems__button, .for-whom__button, .price-card__button').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ accordion functionality
    document.querySelectorAll('.faq-item__question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current if wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

 document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            smoothScrollTo(targetId);
            
            // Закрываем мобильное меню, если оно открыто
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
    // Функция для плавной прокрутки
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Обработчик для всех кнопок с data-атрибутом
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            smoothScrollTo(targetId);
            
            // Закрываем мобильное меню, если оно открыто
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Для обычных ссылок с якорями (если нужно переопределить стандартное поведение)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const modalClose = document.getElementById('modalClose');
    const bookingForm = document.getElementById('bookingForm');
    const selectedService = document.getElementById('selectedService');
    const selectedAmount = document.getElementById('selectedAmount');
    
    // Функция для открытия модального окна
    function openModal(service, amount) {
        selectedService.textContent = service;
        selectedAmount.textContent = amount;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }
    
    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
    }
    
    // Закрытие по клику на крестик
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Обработка отправки формы
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация формы
        const nameInput = document.getElementById('clientName');
        const phoneInput = document.getElementById('clientPhone');
        
        if (!nameInput.value.trim()) {
            alert('Пожалуйста, введите ваше имя');
            nameInput.focus();
            return;
        }
        
        if (!phoneInput.value.trim() || phoneInput.value.replace(/\D/g, '').length < 11) {
            alert('Пожалуйста, введите корректный номер телефона');
            phoneInput.focus();
            return;
        }
        
        // Сбор данных для отправки
        const bookingData = {
            service: selectedService.textContent,
            amount: selectedAmount.textContent,
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim()
        };
        
        console.log('Данные для бронирования:', bookingData);
        
        // Здесь будет реальная отправка данных на сервер
        // Например, с использованием fetch API
        
        // Временная заглушка для демонстрации
        simulatePayment(bookingData);
    });
    
    // Маска для телефона
    const phoneInput = document.getElementById('clientPhone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Убираем первую 7 или 8 если они есть
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        
        let formattedValue = '+7 (';
        
        if (value.length > 0) {
            formattedValue += value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length > 8) {
            formattedValue += '-' + value.substring(8, 10);
        }
        
        e.target.value = formattedValue;
    });
    
    // Фокусировка на первом поле при открытии модалки
    modal.addEventListener('transitionend', function() {
        if (modal.classList.contains('active')) {
            document.getElementById('clientName').focus();
        }
    });
    
    // Симуляция процесса оплаты (заглушка)
    function simulatePayment(data) {
        // Показываем индикатор загрузки
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Обработка...';
        submitButton.disabled = true;
        
        // Симуляция запроса к серверу
        setTimeout(() => {
            alert(`Бронирование успешно оформлено!\nУслуга: ${data.service}\nСумма: ${data.amount}\nВ ближайшее время с вами свяжутся для подтверждения.`);
            
            // Восстанавливаем кнопку
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Закрываем модальное окно
            closeModal();
            
            // Очищаем форму
            bookingForm.reset();
        }, 2000);
    }
    
    // Экспортируем функции для использования в других скриптах
    window.bookingModal = {
        open: openModal,
        close: closeModal
    };
});

// Инициализация обработчиков для кнопок бронирования (должен быть вызван после загрузки страницы)
function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('.price-card__button');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.price-card');
            const service = card.querySelector('.price-card__title').textContent;
            const amountMatch = this.textContent.match(/\d+[\s\d]*₽/);
            const amount = amountMatch ? amountMatch[0] : '0 ₽';
            
            if (typeof window.bookingModal !== 'undefined') {
                window.bookingModal.open(service, amount);
            }
        });
    });
}

// Инициализация при полной загрузке страницы
window.addEventListener('load', initBookingButtons);