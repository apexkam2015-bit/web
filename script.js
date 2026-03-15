// ========== НАСТРОЙКИ TELEGRAM (ЗАМЕНИТЕ НА СВОИ) ==========
const TELEGRAM_BOT_TOKEN = '8798119858:AAF_07GNJPz0lep_Vplkv930jVtlASZ2byU';      // замените на реальный токен
const TELEGRAM_CHAT_ID = '331361131';           // замените на ваш chat_id

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

// ========== ВСЕ ССЫЛКИ НА КАРТИНКИ ==========
const imageUrls = [
    'https://i.ibb.co/ynJxgrcG/image.jpg',
    'https://i.ibb.co/f7zqG5S/image.jpg',
    'https://i.ibb.co/0ypFrJr8/image.jpg',
    'https://i.ibb.co/5XpBv6PC/image.jpg',
    'https://i.ibb.co/sv9HCQPX/image.jpg',
    'https://i.ibb.co/TDfxFJFh/image.jpg',
    'https://i.ibb.co/MDhcngwJ/image.webp',
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

// ========== КАТЕГОРИИ ==========
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

// ========== ГЕНЕРАЦИЯ 250 ТОВАРОВ С ТЕГАМИ ==========
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

const tagsMap = {
    cartoon: ['мультики', 'игрушки', 'чебурашка', 'микки маус', 'губка боб', 'шрек', 'пикачу', 'симпсоны'],
    animals: ['животные', 'лев', 'жираф', 'слон', 'тигр', 'зоопарк'],
    ground: ['техника', 'танк', 'бтр', 'джип', 'бульдозер', 'экскаватор', 'трактор', 'военная'],
    air: ['авиация', 'самолёт', 'вертолёт', 'истребитель', 'бомбардировщик', 'квадрокоптер'],
    home: ['дом', 'интерьер', 'ваза', 'подставка', 'светильник', 'мыльница', 'крючок'],
    garage: ['гараж', 'инструменты', 'органайзер', 'держатель', 'ящик', 'ключи']
};

let idCounter = 1;
for (let i = 0; i < 250; i++) {
    const catIndex = i % subcategoryIds.length;
    const catId = subcategoryIds[catIndex];
    const nameIndex = Math.floor(Math.random() * names[catId].length);
    const name = names[catId][nameIndex] + ' ' + (Math.floor(i / subcategoryIds.length) + 1);
    const price = 300 + Math.floor(Math.random() * 3000);
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const image = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    let tags = [...(tagsMap[catId] || [])];
    const nameWords = name.toLowerCase().split(' ');
    nameWords.forEach(word => {
        if (word.length > 2 && !tags.includes(word)) {
            tags.push(word);
        }
    });

    products.push({
        id: idCounter++,
        name: name,
        price: price,
        description: description,
        image: image,
        category: catId,
        tags: tags
    });
}

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
const missingModelBtn = document.getElementById('missing-model-btn');
const productInfoBtn = document.getElementById('product-info-btn');
const infoModal = document.getElementById('info-modal');
const missingModal = document.getElementById('missing-modal');
const closeInfo = document.querySelector('.close-info');
const closeMissing = document.querySelector('.close-missing');

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
            catalogMenu.classList.remove('show'); // Закрыть меню после выбора
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

// Модальные окна информации
productInfoBtn.addEventListener('click', () => {
    infoModal.style.display = 'block';
});

missingModelBtn.addEventListener('click', () => {
    missingModal.style.display = 'block';
});

closeInfo.addEventListener('click', () => {
    infoModal.style.display = 'none';
});

closeMissing.addEventListener('click', () => {
    missingModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        infoModal.style.display = 'none';
    }
    if (event.target === missingModal) {
        missingModal.style.display = 'none';
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

// Контакты
contactBtn.addEventListener('click', () => {
    window.open('https://t.me/ваш_канал', '_blank'); // замените на ваш канал
});

// ========== ИНИЦИАЛИЗАЦИЯ ==========
buildCategoryTree();
renderProducts();
