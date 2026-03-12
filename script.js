// Массив товаров (в реальном проекте данные приходят с сервера)
const products = [
    {
        id: 1,
        name: "Дракон",
        price: 1500,
        image: "https://via.placeholder.com/250x200?text=Dragon",
        description: "Фигурка дракона, масштаб 1:100"
    },
    {
        id: 2,
        name: "Робот",
        price: 2000,
        image: "https://via.placeholder.com/250x200?text=Robot",
        description: "Подвижная модель робота"
    },
    {
        id: 3,
        name: "Ваза",
        price: 800,
        image: "https://via.placeholder.com/250x200?text=Vase",
        description: "Декоративная ваза с узором"
    }
];

// Корзина (храним id товаров и количество)
let cart = [];

// DOM элементы
const productsContainer = document.getElementById('products-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const cartIcon = document.querySelector('.cart-icon');
const checkoutBtn = document.getElementById('checkout-btn');

// Функция отображения товаров
function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price} руб.</p>
            <button onclick="addToCart(${product.id})">В корзину</button>
        `;
        productsContainer.appendChild(card);
    });
}

// Функция добавления в корзину
window.addToCart = function(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartUI();
};

// Функция удаления из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Обновление интерфейса корзины (счетчик и модальное окно)
function updateCartUI() {
    // Обновляем счетчик
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Обновляем содержимое модалки
    if (cartModal.style.display === 'block') {
        renderCartModal();
    }
}

// Отображение корзины в модальном окне
function renderCartModal() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} x${item.quantity} = ${product.price * item.quantity} руб.
                <button onclick="removeFromCart(${item.id})">Удалить</button>
            `;
            cartItemsList.appendChild(li);
            total += product.price * item.quantity;
        }
    });

    cartTotal.textContent = total;
}

// Обработчики для модального окна
cartIcon.addEventListener('click', () => {
    renderCartModal();
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    alert('Переход к оформлению заказа (здесь будет форма)');
    // Здесь можно открыть страницу оформления или отправить данные на сервер
});

// Инициализация
renderProducts();