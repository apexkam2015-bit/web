// ========== НАСТРОЙКИ ==========
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxf3XKrQrEVbwWBglJngiNy0kVabJZri8Ind72e94HxYC0ocCX6sG2zUH2MkZTNK-k/exec'; // ЗАМЕНИТЕ НА СВОЙ URL
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
    setTheme(currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark');
});

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

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let products = [];
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
const catalogBtn = document.getElementById('catalog-btn');
const catalogMenu = document.getElementById('catalog-menu');
const closeCatalog = document.querySelector('.close-catalog');
const customerName = document.getElementById('customer-name');
const customerPhone = document.getElementById('customer-phone');
const productModal = document.getElementById('product-modal');
const closeProduct = document.querySelector('.close-product');
const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');
const detailPrice = document.getElementById('detail-price');
const detailAddToCart = document.getElementById('detail-add-to-cart');
const detailThumbnails = document.getElementById('detail-thumbnails');
const loadingSpinner = document.getElementById('loading-spinner');

// ========== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ПРЕОБРАЗОВАНИЯ В МАССИВ ==========
function ensureArray(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim() !== '') {
        // Если строка, разбиваем по разделителю | (или , на случай если старые данные)
        // Сначала пробуем |, если нет, то ,
        if (value.includes('|')) {
            return value.split('|').map(s => s.trim());
        } else if (value.includes(',')) {
            return value.split(',').map(s => s.trim());
        } else {
            return [value.trim()];
        }
    }
    return [];
}

// ========== ЗАГРУЗКА ТОВАРОВ С КЭШИРОВАНИЕМ ==========
async function loadProducts() {
    // Пытаемся загрузить из кэша (если не старше 1 минуты)
    const cached = localStorage.getItem('products_cache');
    const cacheTime = localStorage.getItem('products_cache_time');
    const now = Date.now();
    if (cached && cacheTime && (now - parseInt(cacheTime)) < 60000) { // 1 минута
        products = JSON.parse(cached);
        // Преобразуем images и tags в массивы, если вдруг в кэше они хранятся как строки
        products = products.map(p => ({
            ...p,
            images: ensureArray(p.images),
            tags: ensureArray(p.tags)
        }));
        renderProducts();
        // В фоне обновляем кэш
        refreshProductsInBackground();
        return;
    }

    // Показываем спиннер
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    if (productsContainer) productsContainer.style.opacity = '0.5';

    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const rawProducts = await response.json();
        // Приводим images и tags к массиву
        products = rawProducts.map(p => ({
            ...p,
            images: ensureArray(p.images),
            tags: ensureArray(p.tags)
        }));
        // Сохраняем в кэш
        localStorage.setItem('products_cache', JSON.stringify(products));
        localStorage.setItem('products_cache_time', now.toString());
        renderProducts();
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        productsContainer.innerHTML = '<p>Не удалось загрузить товары. Попробуйте позже.</p>';
    } finally {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (productsContainer) productsContainer.style.opacity = '1';
    }
}

async function refreshProductsInBackground() {
    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const freshProducts = await response.json();
        const prepared = freshProducts.map(p => ({
            ...p,
            images: ensureArray(p.images),
            tags: ensureArray(p.tags)
        }));
        localStorage.setItem('products_cache', JSON.stringify(prepared));
        localStorage.setItem('products_cache_time', Date.now().toString());
        // Если пользователь всё ещё на странице, обновляем отображение
        products = prepared;
        renderProducts();
    } catch (e) {
        // игнорируем ошибки фоновой загрузки
    }
}

// ========== ФУНКЦИИ ==========
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
            (Array.isArray(p.tags) && p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        );
    }

    productsContainer.innerHTML = '';
    if (filtered.length === 0) {
        productsContainer.innerHTML = '<p>Нет товаров по вашему запросу</p>';
        return;
    }
    filtered.forEach(product => {
        const imagesArray = ensureArray(product.images);
        const mainImage = imagesArray.length > 0 ? imagesArray[0] : 'https://via.placeholder.com/300';
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.innerHTML = `
            <img src="${mainImage}" alt="${product.name}">
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
    const imagesArray = ensureArray(product.images);
    detailImage.src = imagesArray.length > 0 ? imagesArray[0] : 'https://via.placeholder.com/300';
    detailImage.alt = product.name;
    detailTitle.textContent = product.name;
    detailDescription.textContent = product.description;
    detailPrice.textContent = product.price + ' руб.';
    
    detailThumbnails.innerHTML = '';
    imagesArray.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `${product.name} - фото ${index+1}`;
        thumb.classList.add('thumbnail');
        if (index === 0) thumb.classList.add('active-thumbnail');
        thumb.addEventListener('click', () => {
            detailImage.src = imgSrc;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active-thumbnail'));
            thumb.classList.add('active-thumbnail');
        });
        detailThumbnails.appendChild(thumb);
    });

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

closeProduct.addEventListener('click', () => {
    productModal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
});

contactBtn.addEventListener('click', () => {
    window.open('https://t.me/Alexxandre_97', '_blank');
});

// ========== ИНИЦИАЛИЗАЦИЯ ==========
buildCategoryTree();
loadProducts();
