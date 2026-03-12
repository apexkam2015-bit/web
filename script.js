// Все ваши рабочие ссылки (23 штуки)
const imageUrls = [
    // Старые (7)
    'https://i.ibb.co/ynJxgrcG/image.jpg',
    'https://i.ibb.co/f7zqG5S/image.jpg',
    'https://i.ibb.co/0ypFrJr8/image.jpg',
    'https://i.ibb.co/5XpBv6PC/image.jpg',
    'https://i.ibb.co/sv9HCQPX/image.jpg',
    'https://i.ibb.co/TDfxFJFh/image.jpg',
    'https://i.ibb.co/MDhcngwJ/image.webp',
    // Новые (16)
    'https://i.ibb.co/svR65LG2/images-1.jpg',
    'https://i.ibb.co/6S09nyv/1.png',
    'https://i.ibb.co/q3kcJvzm/HR-Model2-CF-8.jpg',
    'https://i.ibb.co/3ms70PD8/Tablemount-Model-1-CF-2.jpg',
    'https://i.ibb.co/mCvP4hpL/536064e39d46d44d990b707de85ebbed-preview-featured.jpg',
    'https://i.ibb.co/CSz2wNZ/7.png',
    'https://i.ibb.co/MkfTj7RW/images.jpg',
    'https://i.ibb.co/B5mR3Xdp/top10-3d-model-2.jpg',
    'https://i.ibb.co/7NYVQdfS/1721250346176877711.jpg',
    'https://i.ibb.co/dwP0Ghjq/2-68.png',
    'https://i.ibb.co/h18xm625/dragon-3d-model-stl.jpg',
    'https://i.ibb.co/fGPkgN7v/a0aa56767d9f4dbc9e8a7a959108d106.jpg',
    'https://i.ibb.co/gFt5ZMtt/1-20.png',
    'https://i.ibb.co/RkqMmgKm/shesterenka-podstavka-telefona-b08ce4a2.png',
    'https://i.ibb.co/pvYqfJKm/benchy.webp'
];

// Категории (без изменений)
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

// Генерация 250 товаров (равномерно по категориям)
let products = [];
const subcategoryIds = ['cartoon', 'animals', 'ground', 'air', 'home', 'garage'];
const names = {
    cartoon: ['Чебурашка', 'Микки Маус', 'Губка Боб', 'Шрек', 'Хелло Китти', 'Пикачу', 'Симпсоны', 'Винни Пух'],
    animals: ['Лев', 'Жираф', 'Слон', 'Тигр', 'Зебра', 'Обезьяна', 'Крокодил', 'Панда'],
    ground: ['Танк Т-34', 'БТР-80', 'Военный джип', 'Бульдозер', 'Экскаватор', 'Трактор', 'Броневик', 'Танк "Тигр"'],
    air: ['Истребитель Су-27', 'Вертолёт Ка-52', 'Бомбардировщик B-2', 'Самолёт Ан-2', 'Истребитель F-16', 'Вертолёт Ми-24', 'Планер', 'Квадрокоптер'],
    home: ['Ваза с узором', 'Подставка под кружку', 'Светильник', 'Держатель для книг', 'Мыльница', 'Крючок для одежды', 'Горшок для цветов', 'Ручка для двери'],
    garage: ['Держатель для инструментов', 'Крючок для шланга', 'Ящик для мелочей', 'Органайзер для гаек', 'Лоток для ключей', 'Полка для банок', 'Держатель для дрели', 'Магнит для инструментов']
};
const descriptions = [
    'Качественная 3D-печать, PLA пластик',
    'Прочная модель, высота 10 см',
    'Детализированная фигурка',
    'Подходит для подарка',
    'Ручная постобработка',
    'Модель с подвижными элементами',
    'Экологичный материал',
    'Яркий цвет, не выгорает'
];

let idCounter = 1;
for (let i = 0; i < 250; i++) {
    const catIndex = i % subcategoryIds.length;
    const catId = subcategoryIds[catIndex];
    const nameIndex = Math.floor(Math.random() * names[catId].length);
    const name = names[catId][nameIndex] + ' ' + (Math.floor(i / subcategoryIds.length) + 1);
    const price = 300 + Math.floor(Math.random() * 3000);
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const image = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    
    products.push({
        id: idCounter++,
        name: name,
        price: price,
        description: description,
        image: image,
        category: catId
    });
}

// Корзина и остальной код (без изменений, идёт ниже)
let cart = [];
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

    document.querySelectorAll('.subcategory li').forEach(li => {
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            const categoryId = li.dataset.category;
            setActiveCategory(categoryId);
            filterProductsByCategory(categoryId);
        });
    });
}

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

function filterProductsByCategory(categoryId) {
    currentCategory = categoryId;
    renderProducts();
}

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

window.addToCart = function(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartUI();
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    if (cartModal.style.display === 'block') {
        renderCartModal();
    }
};

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
}

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

function populateCategorySelect() {
    let options = '';
    categories.forEach(cat => {
        cat.subcategories.forEach(sub => {
            options += `<option value="${sub.id}">${cat.name} → ${sub.name}</option>`;
        });
    });
    newCategory.innerHTML = '<option value="">Выберите подкатегорию</option>' + options;
}

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
    newName.value = '';
    newPrice.value = '';
    newImage.value = '';
    newDescription.value = '';
    newCategory.value = '';
    if (!currentCategory || currentCategory === category) {
        renderProducts();
    } else {
        alert('Товар добавлен в категорию ' + category);
    }
});

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

buildCategoryTree();
populateCategorySelect();
renderProducts();
