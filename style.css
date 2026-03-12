// Структура категорий (без изменений)
const categories = [
    {
        id: 'toys',
        name: 'Игрушки',
        subcategories: [
            { id: 'cartoon', name: 'Мультики', image: 'https://i.ibb.co/MDhcngwJ/image.webp' },
            { id: 'animals', name: 'Животные', image: 'https://via.placeholder.com/50?text=Animals' }
        ]
    },
    {
        id: 'modeling',
        name: 'Моделирование',
        subcategories: [
            { id: 'ground', name: 'Наземная техника', image: 'https://via.placeholder.com/50?text=Ground' },
            { id: 'air', name: 'Авиатехника', image: 'https://via.placeholder.com/50?text=Air' }
        ]
    },
    {
        id: 'household',
        name: 'Бытовые модели',
        subcategories: [
            { id: 'home', name: 'Для дома', image: 'https://via.placeholder.com/50?text=Home' },
            { id: 'garage', name: 'Для гаража', image: 'https://via.placeholder.com/50?text=Garage' }
        ]
    }
];

// Все ваши ссылки (7 штук)
const imageUrls = [
    'https://i.ibb.co/ynJxgrcG/image.jpg',
    'https://i.ibb.co/f7zqG5S/image.jpg',
    'https://i.ibb.co/0ypFrJr8/image.jpg',
    'https://i.ibb.co/5XpBv6PC/image.jpg',
    'https://i.ibb.co/sv9HCQPX/image.jpg',
    'https://i.ibb.co/TDfxFJFh/image.jpg',
    'https://i.ibb.co/MDhcngwJ/image.webp'
];

// УТРОЕННОЕ количество товаров (18 штук) с хаотичным распределением ссылок
let products = [
    // Игрушки -> Мультики (3 товара)
    { id: 1, name: 'Чебурашка', price: 1200, description: 'Фигурка Чебурашки, 10 см', image: imageUrls[0], category: 'cartoon' },
    { id: 2, name: 'Микки Маус', price: 1300, description: 'Мышка Микки, 12 см', image: imageUrls[6], category: 'cartoon' },
    { id: 3, name: 'Губка Боб', price: 1100, description: 'Квадратные штаны', image: imageUrls[3], category: 'cartoon' },
    
    // Игрушки -> Животные (3 товара)
    { id: 4, name: 'Лев', price: 1500, description: 'Царь зверей', image: imageUrls[1], category: 'animals' },
    { id: 5, name: 'Жираф', price: 1400, description: 'Длинная шея', image: imageUrls[5], category: 'animals' },
    { id: 6, name: 'Слон', price: 2000, description: 'Большой и добрый', image: imageUrls[2], category: 'animals' },
    
    // Моделирование -> Наземная техника (3 товара)
    { id: 7, name: 'Танк Т-34', price: 2500, description: 'Модель танка, масштаб 1:72', image: imageUrls[2], category: 'ground' },
    { id: 8, name: 'БТР-80', price: 2700, description: 'Бронетранспортёр', image: imageUrls[4], category: 'ground' },
    { id: 9, name: 'Военный джип', price: 1800, description: 'Вездеход', image: imageUrls[0], category: 'ground' },
    
    // Моделирование -> Авиатехника (3 товара)
    { id: 10, name: 'Истребитель Су-27', price: 3000, description: 'Модель самолёта, масштаб 1:100', image: imageUrls[3], category: 'air' },
    { id: 11, name: 'Вертолёт Ка-52', price: 3200, description: 'Аллигатор', image: imageUrls[1], category: 'air' },
    { id: 12, name: 'Бомбардировщик B-2', price: 4000, description: 'Стелс', image: imageUrls[5], category: 'air' },
    
    // Бытовые модели -> Для дома (3 товара)
    { id: 13, name: 'Ваза с узором', price: 800, description: 'Декоративная ваза', image: imageUrls[4], category: 'home' },
    { id: 14, name: 'Подставка под кружку', price: 300, description: 'Симпатичная подставка', image: imageUrls[2], category: 'home' },
    { id: 15, name: 'Светильник', price: 1200, description: 'Ночник в виде куба', image: imageUrls[6], category: 'home' },
    
    // Бытовые модели -> Для гаража (3 товара)
    { id: 16, name: 'Держатель для инструментов', price: 600, description: 'Органайзер', image: imageUrls[5], category: 'garage' },
    { id: 17, name: 'Крючок для шланга', price: 250, description: 'Удобно вешать', image: imageUrls[3], category: 'garage' },
    { id: 18, name: 'Ящик для мелочей', price: 450, description: 'Сортировка', image: imageUrls[1], category: 'garage' }
];

// Корзина
let cart = [];

// Текущая выбранная подкатегория
let currentCategory = null;

// DOM элементы
const categoryTreeEl = document.getElementById('category-tree');
const categoryTitle = document.getElementById('category-title');
const productsContainer = document.getElementById('products-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const cartIcon = document.querySelector('.cart-icon');
const checkoutBtn = document.getElementById('checkout-btn');
const newName = document.getElementById('new-name');
const newPrice = document.getElementById('new-price');
const newImage = document.getElementById('new-image');
const newDescription = document.getElementById('new-description');
const newCategory = document.getElementById('new-category');
const addProductBtn = document.getElementById('add-product-btn');

// Построение дерева категорий
function buildCategoryTree() {
    let html = '';
    categories.forEach(cat => {
        html += `<li><span class="category-name">${cat.name}</span>`;
        html += `<ul class="subcategory">`;
        cat.subcategories.forEach(sub => {
            html += `<li data-category="${sub.id}">`;
            if (sub.image) {
                html += `<img src="${sub.image}" alt="${sub.name}">`;
            }
            html += `<span>${sub.name}</span>`;
            html += `</li>`;
        });
        html += `</ul></li>`;
    });
    categoryTreeEl.innerHTML = html;

    // Обработчики клика
    document.querySelectorAll('.subcategory li').forEach(li => {
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            const categoryId = li.dataset.category;
            setActiveCategory(categoryId);
            filterProductsByCategory(categoryId);
        });
    });
}

// Подсветка активной категории
function setActiveCategory(categoryId) {
    document.querySelectorAll('.subcategory li').forEach(li => {
        li.classList.remove('active');
        if (li.dataset.category === categoryId) {
            li.classList.add('active');
        }
    });
    const cat = categories.flatMap(c => c.subcategories).find(s => s.id === categoryId);
    categoryTitle.textContent = cat ? cat.name : 'Все товары';
}

// Фильтрация товаров по категории
function filterProductsByCategory(categoryId) {
    currentCategory = categoryId;
    renderProducts();
}

// Отображение товаров
function renderProducts() {
    let filtered = products;
    if (currentCategory) {
        filtered = products.filter(p => p.category === currentCategory);
    }
    productsContainer.innerHTML = '';
    if (filtered.length === 0) {
        productsContainer.innerHTML = '<p>Нет товаров в этой категории</p>';
        return;
    }
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">${product.price} руб.</p>
            </div>
            <button onclick="addToCart(${product.id})">В корзину</button>
        `;
        productsContainer.appendChild(card);
    });
}

// Добавление в корзину
window.addToCart = function(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartUI();
};

// Удаление из корзины
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    if (cartModal.style.display === 'block') {
        renderCartModal();
    }
};

// Обновление счётчика корзины
function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
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
                <span>${product.name} x${item.quantity}</span>
                <span>${product.price * item.quantity} руб.</span>
                <button onclick="removeFromCart(${item.id})">Удалить</button>
            `;
            cartItemsList.appendChild(li);
            total += product.price * item.quantity;
        }
    });

    cartTotal.textContent = total;
}

// Заполнение выпадающего списка категорий
function populateCategorySelect() {
    let options = '';
    categories.forEach(cat => {
        cat.subcategories.forEach(sub => {
            options += `<option value="${sub.id}">${cat.name} → ${sub.name}</option>`;
        });
    });
    newCategory.innerHTML = '<option value="">Выберите подкатегорию</option>' + options;
}

// Добавление нового товара
addProductBtn.addEventListener('click', () => {
    const name = newName.value.trim();
    const price = parseFloat(newPrice.value);
    const image = newImage.value.trim();
    const description = newDescription.value.trim();
    const category = newCategory.value;

    if (!name || !price || !image || !description || !category) {
        alert('Заполните все поля!');
        return;
    }

    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: newId,
        name,
        price,
        description,
        image,
        category
    };
    products.push(newProduct);
    // Очистить форму
    newName.value = '';
    newPrice.value = '';
    newImage.value = '';
    newDescription.value = '';
    newCategory.value = '';
    // Если текущая категория совпадает с добавленной, обновляем отображение
    if (!currentCategory || currentCategory === category) {
        renderProducts();
    } else {
        alert('Товар добавлен в категорию ' + category);
    }
});

// Обработчики модального окна корзины
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
    alert('Оформление заказа (демо-режим)');
});

// Инициализация
buildCategoryTree();
populateCategorySelect();
renderProducts();
