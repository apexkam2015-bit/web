// ========== НАСТРОЙКИ TELEGRAM (ЗАМЕНИТЕ НА СВОИ) ==========
const TELEGRAM_BOT_TOKEN = '8798119858:AAF_07GNJPz0lep_Vplkv930jVtlASZ2byU';      // замените на реальный токен
const TELEGRAM_CHAT_ID = '-5291424885';           // замените на ваш chat_id

// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(theme);
    themeToggle.textContent = theme === 'theme-dark' ? '☀️' : '🌙';
    localStorage.setItem('siteTheme', theme);
}

const savedTheme = localStorage.getItem('siteTheme') || 'theme-light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
    const newTheme = currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    setTheme(newTheme);
});

// ========== ВСЕ ССЫЛКИ НА КАРТИНКИ (больше не нужны для генерации, оставлены для справки) ==========
// (можно удалить, но оставим для возможного использования)
const imageUrls = []; // не используется

// ========== КАТЕГОРИИ (без изменений) ==========
const categories = [
    {
        id: 'toys',
        name: 'Игрушки',
        subcategories: [
            { id: 'cartoon', name: 'Мультики', image: 'https://i.ibb.co/MDhcngwJ/image.webp' },
            { id: 'animals', name: 'Животные', image: 'https://i.ibb.co/f7zqG5S/image.jpg' }
        ]
    },
    {
        id: 'modeling',
        name: 'Моделирование',
        subcategories: [
            { id: 'ground', name: 'Наземная техника', image: 'https://i.ibb.co/0ypFrJr8/image.jpg' },
            { id: 'air', name: 'Авиатехника', image: 'https://i.ibb.co/5XpBv6PC/image.jpg' }
        ]
    },
    {
        id: 'household',
        name: 'Бытовые модели',
        subcategories: [
            { id: 'home', name: 'Для дома', image: 'https://i.ibb.co/sv9HCQPX/image.jpg' },
            { id: 'garage', name: 'Для гаража', image: 'https://i.ibb.co/TDfxFJFh/image.jpg' }
        ]
    }
];

// ========== НОВЫЙ СПИСОК ТОВАРОВ (только для дома) ==========
let products = [
    {
        id: 1,
        name: 'Подставка для мыла/губки',
        price: 350,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/PGsc7Xqd/6e80449db9c92631.jpg',
        category: 'home',
        tags: ['кухня', 'ванная', 'губка', 'мыла', 'посуда', 'дом']
    },
    {
        id: 2,
        name: 'Подставка для мыла',
        price: 350,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/ccqBRQkD/20240623183428-d7bf47f6-641e-48df-b3a4-2ee001e945f2.png',
        category: 'home',
        tags: ['кухня', 'мыло', 'подставка', 'полезное', 'для дома', 'дом']
    },
    {
        id: 3,
        name: 'Набор для мытья посуды (малый)',
        price: 1300,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/pBRzvpw0/106ef660-0e52-11f0-8c8e-b3bcabc80b84.jpg',
        category: 'home',
        tags: ['посуда', 'кухня', 'мойка', 'дом', 'полезное']
    },
    {
        id: 4,
        name: 'Футляр для хранения таблеток',
        price: 500,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/x87wvZJF/IMG-9935-5da726aa-7a5f-401e-9ddb-9fc546234da7.png',
        category: 'home',
        tags: ['таблетки', 'футляр', 'хранение', 'для дома', 'дом']
    },
    {
        id: 5,
        name: 'Набор для мытья посуды (большой)',
        price: 2400,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/RGxx2s1s/C224-B11-D-8-BFD-48-F0-8-EFC-7-D35-E0487-E3-F-1.png',
        category: 'home',
        tags: ['посуда', 'кухня', 'мытье', 'дом', 'для дома']
    },
    {
        id: 6,
        name: 'Ваза',
        price: 750,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/1Gh4mzTs/04.png',
        category: 'home',
        tags: ['ваза', 'декор', 'для дома', 'дом']
    },
    {
        id: 7,
        name: 'Ваза рифленая (малая)',
        price: 800,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/rKS0vNTN/Planter-ribbed-04-34bbcaa2-30a0-4153-a007-c57b0c84a8ef.png',
        category: 'home',
        tags: ['ваза', 'цветы', 'для дома', 'дом']
    },
    {
        id: 8,
        name: 'Ваза рифленая (большая)',
        price: 1900,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/JRdGYRNx/Planter-ribbed-05-3e29cad0-f8ea-46be-93cd-c23df60a0296.png',
        category: 'home',
        tags: ['ваза', 'цветы', 'для дома', 'дом']
    },
    {
        id: 9,
        name: 'Ваза с автополивкой',
        price: 1700,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/jvzf68tv/2941-BECD-F525-4-B56-8-F78-D5636633-BC4-B.png',
        category: 'home',
        tags: ['ваза', 'цветы', 'дом', 'для дома']
    },
    {
        id: 10,
        name: 'Комплект для рассады',
        price: 1800,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/HL1KxPHH/Self-watering-Seed-starter-2.png',
        category: 'home',
        tags: ['рассада', 'цветы', 'для дома']
    },
    {
        id: 11,
        name: 'Диспенсер для бумажных полотенец',
        price: 800,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/VkqnwWt/Titel-horizont.png',
        category: 'home',
        tags: ['для дома', 'кухня', 'полотенца']
    },
    {
        id: 12,
        name: 'Холдер для чайных пакетиков',
        price: 1000,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/21vFYYgK/TEA001-7.png',
        category: 'home',
        tags: ['чай', 'кухня', 'для дома']
    },
    {
        id: 13,
        name: 'Магазин для ААА батареек',
        price: 650,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/2rbrpY1/Mag-V2-6.png',
        category: 'home',
        tags: ['батарейки', 'холдер', 'магазин', 'ААА']
    },
    {
        id: 14,
        name: 'Диспенсер для банок',
        price: 2000,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/My09Zch6/541821e0-c601-11f0-be47-bb9995818d0e.jpg',
        category: 'home',
        tags: ['банки', 'диспенсер', 'кола', 'пиво', 'холодильник', 'кухня', 'дом']
    },
    {
        id: 15,
        name: 'Тарелка для фисташек со скрытым дном',
        price: 1200,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/T3XKyX0/DSCF8464.png',
        category: 'home',
        tags: ['фисташки', 'тарелка', 'пиво', 'для дома']
    },
    {
        id: 16,
        name: 'Диспенсер для яиц',
        price: 1200,
        description: 'Качественная 3D-печать из PLA пластика',
        image: 'https://i.ibb.co/Mkn7zCkS/image.png',
        category: 'home',
        tags: ['кухня', 'яйца', 'диспенсер', 'дом']
    }
];

// ========== КОРЗИНА ==========
let cart = [];
let currentCategory = null;
let searchQuery = '';

// ========== DOM ЭЛЕМЕНТЫ ==========
const categoryTreeEl = document.getElementById('category-tree');
const categoryTitle = document.getElementById('category-title');
const productsContainer = document.getElementById('products-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const floatingCart = document.getElementById('floating-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const searchInput = document.getElementById('search-input');
const contactBtn = document.getElementById('contact-btn');
const productInfoBtn = document.getElementById('product-info-btn');
const infoModal = document.getElementById('info-modal');
const closeInfo = document.querySelector('.close-info');

// Элементы каталога
const catalogBtn = document.getElementById('catalog-btn');
const catalogMenu = document.getElementById('catalog-menu');
const closeCatalog = document.querySelector('.close-catalog');

// Поля для данных клиента
const customerName = document.getElementById('customer-name');
const customerPhone = document.getElementById('customer-phone');

// Элементы для модального окна товара
const productModal = document.getElementById('product-modal');
const closeProduct = document.querySelector('.close-product');
const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');
const detailPrice = document.getElementById('detail-price');
const detailAddToCart = document.getElementById('detail-add-to-cart');

// ========== ФУНКЦИИ ==========

// Построение дерева категорий в меню каталога
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
            searchInput.value = '';
            searchQuery = '';
            catalogMenu.classList.remove('show');
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
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    productsContainer.innerHTML = '';
    if (filtered.length === 0) {
        productsContainer.innerHTML = '<p>Нет товаров по вашему запросу</p>';
        return;
    }
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
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

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            const productId = parseInt(card.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                showProductDetail(product);
            }
        });
    });
}

function showProductDetail(product) {
    detailImage.src = product.image;
    detailImage.alt = product.name;
    detailTitle.textContent = product.name;
    detailDescription.textContent = product.description;
    detailPrice.textContent = product.price + ' руб.';
    detailAddToCart.onclick = () => {
        addToCart(product.id);
        productModal.style.display = 'none';
    };
    productModal.style.display = 'block';
}

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

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

async function sendOrderToTelegram() {
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }

    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();

    if (!name || !phone) {
        alert('Пожалуйста, введите имя и контактный телефон');
        return;
    }

    let message = '🛒 *Новый заказ с сайта*\n\n';
    message += `👤 *Имя:* ${name}\n`;
    message += `📞 *Телефон:* ${phone}\n\n`;
    message += '*Состав заказа:*\n';
    
    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            message += `• ${product.name} x${item.quantity} = ${product.price * item.quantity} руб.\n`;
            total += product.price * item.quantity;
        }
    });
    message += `\n*Итого: ${total} руб.*`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.ok) {
            alert('Заказ успешно отправлен в Telegram!');
            cart = [];
            customerName.value = '';
            customerPhone.value = '';
            updateCartUI();
            cartModal.style.display = 'none';
        } else {
            alert('Ошибка отправки: ' + data.description);
        }
    } catch (error) {
        alert('Ошибка соединения с Telegram');
        console.error(error);
    }
}

// ========== ОБРАБОТЧИКИ ==========

// Каталог
catalogBtn.addEventListener('click', () => {
    catalogMenu.classList.toggle('show');
});

closeCatalog.addEventListener('click', () => {
    catalogMenu.classList.remove('show');
});

window.addEventListener('click', (event) => {
    if (!catalogMenu.contains(event.target) && !catalogBtn.contains(event.target)) {
        catalogMenu.classList.remove('show');
    }
});

// Корзина
floatingCart.addEventListener('click', () => {
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

checkoutBtn.addEventListener('click', sendOrderToTelegram);

// Модальное окно информации о продукции
productInfoBtn.addEventListener('click', () => {
    infoModal.style.display = 'block';
});

closeInfo.addEventListener('click', () => {
    infoModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        infoModal.style.display = 'none';
    }
});

// Модальное окно товара
closeProduct.addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
});

// Контакты (открывает Telegram-канал)
contactBtn.addEventListener('click', () => {
    window.open('https://t.me/Alexxandre_97', '_blank');
});

// ========== ИНИЦИАЛИЗАЦИЯ ==========
buildCategoryTree();
renderProducts();
