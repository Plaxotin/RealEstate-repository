// RealEstate Pro - Main JavaScript functionality

// Mock data for properties
const mockProperties = [
    {
        id: 1,
        title: "Современная 3-комнатная квартира в центре",
        price: 15000000,
        type: "apartment",
        rooms: 3,
        area: 85,
        floor: 5,
        totalFloors: 12,
        district: "center",
        address: "ул. Тверская, 15",
        coordinates: [55.7558, 37.6176], // Москва, центр
        description: "Просторная квартира с современным ремонтом, панорамными окнами и видом на центр города.",
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-5e3c2b5b5b5b?w=800&h=600&fit=crop"
        ],
        features: ["Кондиционер", "Балкон", "Парковка", "Лифт"],
        agent: {
            name: "Анна Петрова",
            phone: "+7 (999) 123-45-67",
            email: "anna@realestatepro.ru"
        },
        status: "sale"
    },
    {
        id: 2,
        title: "Уютная 2-комнатная квартира для аренды",
        price: 80000,
        type: "apartment",
        rooms: 2,
        area: 65,
        floor: 3,
        totalFloors: 9,
        district: "north",
        address: "ул. Ленина, 42",
        coordinates: [55.8024, 37.6176], // Москва, север
        description: "Уютная квартира с мебелью, готова к заселению. Рядом метро и парк.",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
        ],
        features: ["Мебель", "Балкон", "Метро рядом"],
        agent: {
            name: "Михаил Соколов",
            phone: "+7 (999) 234-56-78",
            email: "mikhail@realestatepro.ru"
        },
        status: "rent"
    },
    {
        id: 3,
        title: "Просторный дом с участком",
        price: 25000000,
        type: "house",
        rooms: 5,
        area: 150,
        floor: 2,
        totalFloors: 2,
        district: "west",
        address: "пос. Загородный, ул. Садовая, 7",
        coordinates: [55.7558, 37.5176], // Москва, запад
        description: "Просторный дом с большим участком, гаражом и садом. Идеально для семьи.",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
        ],
        features: ["Участок", "Гараж", "Сад", "Камин"],
        agent: {
            name: "Елена Волкова",
            phone: "+7 (999) 345-67-89",
            email: "elena@realestatepro.ru"
        },
        status: "sale"
    },
    {
        id: 4,
        title: "Студия в новостройке",
        price: 6000000,
        type: "apartment",
        rooms: 1,
        area: 35,
        floor: 8,
        totalFloors: 25,
        district: "east",
        address: "ул. Молодежная, 88",
        coordinates: [55.7558, 37.7176], // Москва, восток
        description: "Современная студия в новостройке с панорамными окнами и современной планировкой.",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
        ],
        features: ["Новостройка", "Панорамные окна", "Подземная парковка"],
        agent: {
            name: "Дмитрий Козлов",
            phone: "+7 (999) 456-78-90",
            email: "dmitry@realestatepro.ru"
        },
        status: "sale"
    },
    {
        id: 5,
        title: "Коммерческое помещение под офис",
        price: 120000,
        type: "commercial",
        rooms: 0,
        area: 120,
        floor: 1,
        totalFloors: 5,
        district: "center",
        address: "ул. Деловая, 25",
        coordinates: [55.7058, 37.6176], // Москва, центр, юг
        description: "Просторное офисное помещение в деловом центре с отдельным входом.",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
        ],
        features: ["Отдельный вход", "Парковка", "Кондиционер"],
        agent: {
            name: "Ольга Морозова",
            phone: "+7 (999) 567-89-01",
            email: "olga@realestatepro.ru"
        },
        status: "rent"
    }
];

// Global state
let currentUser = null;
let pendingPostAuthAction = null;
let lastPropertyIdOpened = null;
let currentSmsSession = { phone: null, code: null };
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let viewHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];

// Map variables
let yandexMap = null;
let mapPlacemarks = [];
let currentMapFilters = {
    propertyType: '',
    status: '',
    minPrice: ''
};

// DOM elements
const elements = {
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    loginBtn: document.getElementById('loginBtn'),
    loginModal: document.getElementById('loginModal'),
    closeLoginModal: document.getElementById('closeLoginModal'),
    loginForm: document.getElementById('loginForm'),
    propertyModal: document.getElementById('propertyModal'),
    closeModal: document.getElementById('closeModal'),
    searchBtn: document.getElementById('searchBtn'),
    applyFilters: document.getElementById('applyFilters'),
    sendMessage: document.getElementById('sendMessage'),
    chatInput: document.getElementById('chatInput'),
    chatMessages: document.getElementById('chatMessages'),
    chatToggle: document.getElementById('chatToggle'),
    chatWindow: document.getElementById('chatWindow'),
    chatClose: document.getElementById('chatClose'),
    homeLink: document.getElementById('homeLink'),
    // SMS login modal elements
    smsLoginModal: document.getElementById('smsLoginModal'),
    closeSmsLoginModal: document.getElementById('closeSmsLoginModal'),
    smsStepPhone: document.getElementById('smsStepPhone'),
    smsStepCode: document.getElementById('smsStepCode'),
    smsPhone: document.getElementById('smsPhone'),
    smsPhoneDisplay: document.getElementById('smsPhoneDisplay'),
    smsSendCode: document.getElementById('smsSendCode'),
    smsVerify: document.getElementById('smsVerify'),
    smsBack: document.getElementById('smsBack'),
    smsResend: document.getElementById('smsResend'),
    smsCode: document.getElementById('smsCode')
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadFeaturedProperties();
    setupEventListeners();
    updateFavoritesDisplay();
    loadViewHistory();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateLoginButton();
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    // Header logo/name navigates to home
    if (elements.homeLink) {
        elements.homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('home');
            // Update active link state
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const homeNav = Array.from(document.querySelectorAll('.nav-link')).find(a => a.getAttribute('href') === '#home');
            if (homeNav) homeNav.classList.add('active');
            // Hide mobile menu if open and scroll to top
            elements.mobileMenu.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Login modal (legacy email) still exists but we'll favor SMS login
    elements.loginBtn.addEventListener('click', showSmsLoginModal);
    elements.closeLoginModal.addEventListener('click', hideLoginModal);
    elements.loginForm.addEventListener('submit', handleLogin);

    // SMS login modal
    if (elements.closeSmsLoginModal) {
        elements.closeSmsLoginModal.addEventListener('click', hideSmsLoginModal);
    }
    if (elements.smsSendCode) {
        elements.smsSendCode.addEventListener('click', handleSmsSendCode);
    }
    if (elements.smsVerify) {
        elements.smsVerify.addEventListener('click', handleSmsVerifyCode);
    }
    if (elements.smsBack) {
        elements.smsBack.addEventListener('click', () => switchSmsStep('phone'));
    }
    if (elements.smsResend) {
        elements.smsResend.addEventListener('click', resendSmsCode);
    }
    
    // Property modal
    elements.closeModal.addEventListener('click', hidePropertyModal);
    elements.propertyModal.addEventListener('click', function(e) {
        if (e.target === elements.propertyModal) {
            hidePropertyModal();
        }
    });
    
    // Search functionality
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.applyFilters.addEventListener('click', handleAdvancedSearch);
    
    // Chat functionality
    elements.sendMessage.addEventListener('click', sendChatMessage);
    elements.chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Floating chat widget
    elements.chatToggle.addEventListener('click', toggleChatWindow);
    elements.chatClose.addEventListener('click', closeChatWindow);
    
    // Map functionality
    document.getElementById('showAllProperties').addEventListener('click', showAllPropertiesOnMap);
    document.getElementById('centerMap').addEventListener('click', centerMap);
    document.getElementById('applyMapFilters').addEventListener('click', applyMapFilters);
}

function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle('hidden');
}

function handleNavigation(e) {
    e.preventDefault();
    const target = e.target.getAttribute('href').substring(1);
    showSection(target);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Hide mobile menu
    elements.mobileMenu.classList.add('hidden');
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Load section-specific content
        switch(sectionId) {
            case 'search':
                loadSearchResults();
                break;
            case 'map':
                loadMap();
                break;
            case 'favorites':
                loadFavorites();
                break;
            case 'profile':
                loadProfile();
                break;
        }
    }
}

function showLoginModal() {
    elements.loginModal.classList.remove('hidden');
}

function hideLoginModal() {
    elements.loginModal.classList.add('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple mock authentication
    if (email && password) {
        currentUser = {
            id: 1,
            name: 'Иван Иванов',
            email: email,
            phone: '+7 (999) 123-45-67'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateLoginButton();
        hideLoginModal();
        showToast('Успешный вход в систему!', 'success');
    } else {
        showToast('Пожалуйста, заполните все поля', 'error');
    }
}

function updateLoginButton() {
    if (currentUser) {
        const displayName = currentUser.name || (currentUser.phone ? maskPhone(currentUser.phone) : 'Профиль');
        elements.loginBtn.innerHTML = `
            <i class="fas fa-user mr-2"></i>${displayName}
        `;
        elements.loginBtn.onclick = function() { showSection('profile'); };
    } else {
        elements.loginBtn.innerHTML = 'Войти';
        elements.loginBtn.onclick = showSmsLoginModal;
    }
}

// SMS auth helpers and handlers
function showSmsLoginModal() {
    if (!elements.smsLoginModal) return;
    switchSmsStep('phone');
    elements.smsLoginModal.classList.remove('hidden');
}

function hideSmsLoginModal() {
    if (!elements.smsLoginModal) return;
    elements.smsLoginModal.classList.add('hidden');
}

function switchSmsStep(step) {
    if (!elements.smsStepPhone || !elements.smsStepCode) return;
    if (step === 'phone') {
        elements.smsStepPhone.classList.remove('hidden');
        elements.smsStepCode.classList.add('hidden');
        if (elements.smsPhone) elements.smsPhone.focus();
    } else {
        elements.smsStepPhone.classList.add('hidden');
        elements.smsStepCode.classList.remove('hidden');
        if (elements.smsCode) elements.smsCode.focus();
    }
}

function normalizePhone(phone) {
    return (phone || '').replace(/[^\d+]/g, '');
}

function maskPhone(phone) {
    const p = normalizePhone(phone);
    if (p.length < 6) return phone;
    return p.replace(/(\+?\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, (m, c, a, b, d, e) => `${c} ${a[0]}${a[1]}${a[2]} ${b[0]}**-**-**`);
}

function isPhoneAuthenticated() {
    return Boolean(currentUser && currentUser.phone);
}

function requirePhoneAuth(action) {
    if (isPhoneAuthenticated()) {
        action && action();
        return true;
    }
    pendingPostAuthAction = action;
    showSmsLoginModal();
    return false;
}

function handleSmsSendCode() {
    const phoneInput = elements.smsPhone ? elements.smsPhone.value.trim() : '';
    const phone = normalizePhone(phoneInput);
    if (!phone || phone.length < 10) {
        showToast('Введите корректный номер телефона', 'error');
        return;
    }
    // Simulate sending SMS by generating a code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    currentSmsSession = { phone, code };
    if (elements.smsPhoneDisplay) elements.smsPhoneDisplay.textContent = maskPhone(phone);
    switchSmsStep('code');
    showToast('Код отправлен по СМС', 'success');
    console.log('SMS code (dev):', code);
}

function handleSmsVerifyCode() {
    const inputCode = elements.smsCode ? elements.smsCode.value.trim() : '';
    if (!currentSmsSession.code || !currentSmsSession.phone) {
        showToast('Сначала запросите код', 'error');
        return;
    }
    if (inputCode !== currentSmsSession.code) {
        showToast('Неверный код. Попробуйте ещё раз', 'error');
        return;
    }
    // Mark authenticated
    currentUser = {
        id: Date.now(),
        name: currentUser && currentUser.name ? currentUser.name : 'Пользователь',
        phone: currentSmsSession.phone
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateLoginButton();
    hideSmsLoginModal();
    showToast('Телефон подтверждён', 'success');
    // Continue pending action or refresh modal content
    if (typeof pendingPostAuthAction === 'function') {
        const action = pendingPostAuthAction;
        pendingPostAuthAction = null;
        try { action(); } catch (e) { console.error(e); }
    } else if (lastPropertyIdOpened) {
        showPropertyDetails(lastPropertyIdOpened);
    }
}

function resendSmsCode() {
    if (!currentSmsSession.phone) {
        switchSmsStep('phone');
        return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    currentSmsSession.code = code;
    showToast('Код отправлён повторно', 'info');
    console.log('SMS code (dev, resend):', code);
}

function loadFeaturedProperties() {
    const container = document.getElementById('featuredProperties');
    const featured = mockProperties.slice(0, 3);
    
    container.innerHTML = featured.map(property => createPropertyCard(property)).join('');
}

function createPropertyCard(property) {
    const isFavorited = favorites.includes(property.id);
    const priceText = property.status === 'rent' ? 
        `${property.price.toLocaleString()} ₽/мес` : 
        `${property.price.toLocaleString()} ₽`;
    
    return `
        <div class="property-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="relative">
                <img src="${property.images[0]}" alt="${property.title}" class="w-full h-48 object-cover">
                <div class="status-badge ${property.status}">${property.status === 'rent' ? 'Аренда' : 'Продажа'}</div>
                <button class="favorite-btn absolute top-4 left-4 text-white ${isFavorited ? 'favorited' : ''}" 
                        onclick="toggleFavorite(${property.id})">
                    <i class="fas fa-heart text-xl"></i>
                </button>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${property.title}</h3>
                <p class="text-gray-600 mb-4">${property.address}</p>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-bold text-blue-600">${priceText}</span>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-bed mr-1"></i>${property.rooms} комн
                        <i class="fas fa-expand-arrows-alt ml-3 mr-1"></i>${property.area} м²
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="showPropertyDetails(${property.id})" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                        Подробнее
                    </button>
                    <button onclick="requirePhoneAuth(() => contactAgent(${property.id}))" 
                            class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                        <i class="fas fa-phone"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showPropertyDetails(propertyId) {
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) return;
    lastPropertyIdOpened = propertyId;
    
    // Add to view history
    if (!viewHistory.find(h => h.id === propertyId)) {
        viewHistory.unshift({
            id: property.id,
            title: property.title,
            price: property.price,
            image: property.images[0],
            viewedAt: new Date().toISOString()
        });
        localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
    }
    
    const modal = document.getElementById('propertyModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = property.title;
    
    const priceText = property.status === 'rent' ? 
        `${property.price.toLocaleString()} ₽/мес` : 
        `${property.price.toLocaleString()} ₽`;
    
    content.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="image-gallery mb-6">
                    ${property.images.map(img => `
                        <img src="${img}" alt="${property.title}" onclick="openImageModal('${img}')">
                    `).join('')}
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-bold mb-2">Описание</h4>
                    <p class="text-gray-700">${property.description}</p>
                </div>
            </div>
            <div>
                <div class="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 class="text-2xl font-bold text-blue-600 mb-4">${priceText}</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Комнат:</strong> ${property.rooms}</div>
                        <div><strong>Площадь:</strong> ${property.area} м²</div>
                        <div><strong>Этаж:</strong> ${property.floor}/${property.totalFloors}</div>
                        <div><strong>Район:</strong> ${getDistrictName(property.district)}</div>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-bold mb-3">Особенности</h4>
                    <div class="flex flex-wrap gap-2">
                        ${property.features.map(feature => `
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                ${feature}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 class="font-bold mb-3">Агент</h4>
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-600"></i>
                        </div>
                        <div>
                            <p class="font-bold">${property.agent.name}</p>
                            ${isPhoneAuthenticated() ? `
                                <p class=\"text-sm text-gray-700\">${property.agent.phone}</p>
                                <p class=\"text-sm text-gray-500\">${property.agent.email}</p>
                            ` : `
                                <p class=\"text-sm text-gray-500\">Контакты доступны после входа по СМС</p>
                                <button onclick=\"requirePhoneAuth(() => showPropertyDetails(${property.id}))\" class=\"mt-2 text-blue-600 hover:text-blue-700\">Показать контакты</button>
                            `}
                        </div>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <button onclick="requirePhoneAuth(() => contactAgent(${property.id}))" 
                            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-bold">
                        <i class="fas fa-phone mr-2"></i>Связаться с агентом
                    </button>
                    <button onclick="showOnMap(${property.id})" 
                            class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition">
                        <i class="fas fa-map-marker-alt mr-2"></i>Найти на карте
                    </button>
                    <button onclick="toggleFavorite(${property.id})" 
                            class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition">
                        <i class="fas fa-heart mr-2"></i>${favorites.includes(property.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function hidePropertyModal() {
    elements.propertyModal.classList.add('hidden');
}

function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Убрано из избранного', 'info');
    } else {
        favorites.push(propertyId);
        showToast('Добавлено в избранное', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
    
    // Update property cards
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const card = btn.closest('.property-card');
        if (card) {
            const propertyId = parseInt(card.querySelector('.favorite-btn').onclick.toString().match(/\d+/)[0]);
            if (favorites.includes(propertyId)) {
                btn.classList.add('favorited');
            } else {
                btn.classList.remove('favorited');
            }
        }
    });
}

function updateFavoritesDisplay() {
    const favoriteCount = favorites.length;
    const favoriteLinks = document.querySelectorAll('a[href="#favorites"]');
    favoriteLinks.forEach(link => {
        if (favoriteCount > 0) {
            link.innerHTML = `Избранное <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">${favoriteCount}</span>`;
        } else {
            link.innerHTML = 'Избранное';
        }
    });
}

function contactAgent(propertyId) {
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    // Ensure phone auth before contacting (this function may be wrapped by requirePhoneAuth already)
    if (!isPhoneAuthenticated()) {
        requirePhoneAuth(() => contactAgent(propertyId));
        return;
    }

    showToast(`Связываемся с агентом ${property.agent.name}...`, 'info');
    
    // Simulate phone call or redirect to chat
    setTimeout(() => {
        openChatWindow();
        addChatMessage('system', `Вы связались с агентом ${property.agent.name} по объекту "${property.title}"`);
    }, 1000);
}

function toggleChatWindow() {
    if (elements.chatWindow.classList.contains('hidden')) {
        openChatWindow();
    } else {
        closeChatWindow();
    }
}

function openChatWindow() {
    elements.chatWindow.classList.remove('hidden');
    elements.chatInput.focus();
    
    // Hide notification badge when chat is opened
    const badge = elements.chatToggle.querySelector('span');
    if (badge) {
        badge.style.display = 'none';
    }
}

function closeChatWindow() {
    elements.chatWindow.classList.add('hidden');
}

function handleSearch() {
    const propertyType = document.getElementById('propertyType').value;
    const district = document.getElementById('district').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    let filteredProperties = mockProperties;
    
    if (propertyType) {
        filteredProperties = filteredProperties.filter(p => p.type === propertyType);
    }
    
    if (district) {
        filteredProperties = filteredProperties.filter(p => p.district === district);
    }
    
    if (minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice));
    }
    
    showSection('search');
    displaySearchResults(filteredProperties);
}

function handleAdvancedSearch() {
    const rooms = document.getElementById('rooms').value;
    const minArea = document.getElementById('minArea').value;
    const maxArea = document.getElementById('maxArea').value;
    const floor = document.getElementById('floor').value;
    
    let filteredProperties = mockProperties;
    
    if (rooms) {
        filteredProperties = filteredProperties.filter(p => p.rooms === parseInt(rooms));
    }
    
    if (minArea) {
        filteredProperties = filteredProperties.filter(p => p.area >= parseInt(minArea));
    }
    
    if (maxArea) {
        filteredProperties = filteredProperties.filter(p => p.area <= parseInt(maxArea));
    }
    
    if (floor) {
        const [minFloor, maxFloor] = floor.split('-').map(f => f === '10+' ? 10 : parseInt(f));
        filteredProperties = filteredProperties.filter(p => {
            if (maxFloor) {
                return p.floor >= minFloor && p.floor <= maxFloor;
            } else {
                return p.floor >= minFloor;
            }
        });
    }
    
    displaySearchResults(filteredProperties);
}

function loadSearchResults() {
    displaySearchResults(mockProperties);
}

function displaySearchResults(properties) {
    const container = document.getElementById('searchResults');
    
    if (properties.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl text-gray-500">Объекты не найдены</p>
                <p class="text-sm text-gray-400">Попробуйте изменить параметры поиска</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = properties.map(property => createPropertyCard(property)).join('');
}

function loadFavorites() {
    const container = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <i class="fas fa-heart text-6xl mb-4"></i>
                <p class="text-xl">У вас пока нет избранных объектов</p>
                <p class="text-sm">Добавьте объекты в избранное, нажав на сердечко</p>
            </div>
        `;
        return;
    }
    
    const favoriteProperties = mockProperties.filter(p => favorites.includes(p.id));
    container.innerHTML = favoriteProperties.map(property => createPropertyCard(property)).join('');
}


function sendChatMessage() {
    const input = elements.chatInput;
    const message = input.value.trim();
    
    if (!message) return;
    
    addChatMessage('user', message);
    input.value = '';
    
    // Simulate agent response
    setTimeout(() => {
        const responses = [
            'Спасибо за ваш вопрос! Я свяжусь с вами в ближайшее время.',
            'Это отличный объект! Хотите записаться на просмотр?',
            'У меня есть несколько похожих вариантов. Покажу вам?',
            'Давайте обсудим условия сделки. Когда вам удобно встретиться?',
            'Могу организовать просмотр на удобное для вас время.',
            'Есть вопросы по финансированию? Помогу с ипотекой.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage('agent', randomResponse);
    }, 1000);
}

function addChatMessage(sender, message) {
    const messagesContainer = elements.chatMessages;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'mb-4 chat-message';
    
    const isUser = sender === 'user';
    const isSystem = sender === 'system';
    
    if (isSystem) {
        messageDiv.innerHTML = `
            <div class="text-center">
                <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                    ${message}
                </span>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                <div class="bg-${isUser ? 'blue-600 text-white' : 'gray-200 text-gray-800'} rounded-lg p-3 max-w-xs">
                    <p class="text-sm">${message}</p>
                    <p class="text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'} mt-1">
                        ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function loadProfile() {
    if (!currentUser) {
        showSection('home');
        showLoginModal();
        return;
    }
    
    loadViewHistory();
}

function loadViewHistory() {
    const container = document.getElementById('viewHistory');
    
    if (viewHistory.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-eye text-4xl mb-2"></i>
                <p>История просмотров пуста</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = viewHistory.slice(0, 10).map(item => `
        <div class="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-bold text-sm">${item.title}</h4>
                <p class="text-sm text-gray-600">${item.price.toLocaleString()} ₽</p>
                <p class="text-xs text-gray-400">${new Date(item.viewedAt).toLocaleDateString('ru-RU')}</p>
            </div>
            <button onclick="showPropertyDetails(${item.id})" 
                    class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `).join('');
}

function getDistrictName(district) {
    const districts = {
        'center': 'Центр',
        'north': 'Север',
        'south': 'Юг',
        'east': 'Восток',
        'west': 'Запад'
    };
    return districts[district] || district;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'bg-red-100 border-red-300 text-red-800' : 
                              type === 'success' ? 'bg-green-100 border-green-300 text-green-800' : 
                              'bg-blue-100 border-blue-300 text-blue-800'}`;
    toast.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 
                               type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function openImageModal(imageSrc) {
    // Simple image modal implementation
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="relative max-w-4xl max-h-full p-4">
            <img src="${imageSrc}" alt="Property image" class="max-w-full max-h-full object-contain">
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Map functions
function loadMap() {
    if (typeof ymaps === 'undefined') {
        showToast('Yandex Maps не загружены. Проверьте подключение к интернету.', 'error');
        return;
    }
    
    if (!yandexMap) {
        initYandexMap();
    } else {
        showAllPropertiesOnMap();
    }
}

function initYandexMap() {
    ymaps.ready(function() {
        yandexMap = new ymaps.Map('yandexMap', {
            center: [55.7558, 37.6176], // Москва
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        });
        
        // Add map event listeners
        yandexMap.events.add('click', function(e) {
            const coords = e.get('coords');
            console.log('Map clicked at:', coords);
        });
        
        showAllPropertiesOnMap();
    });
}

function showAllPropertiesOnMap() {
    if (!yandexMap) return;
    
    // Clear existing placemarks
    yandexMap.geoObjects.removeAll();
    mapPlacemarks = [];
    
    // Add all properties to map
    mockProperties.forEach(property => {
        addPropertyToMap(property);
    });
    
    // Fit map to show all placemarks
    if (mapPlacemarks.length > 0) {
        yandexMap.setBounds(yandexMap.geoObjects.getBounds());
    }
}

function addPropertyToMap(property) {
    if (!yandexMap || !property.coordinates) return;
    
    // Get marker color based on property type and status
    const markerColor = getMarkerColor(property.type, property.status);
    
    // Create placemark
    const placemark = new ymaps.Placemark(
        property.coordinates,
        {
            balloonContentHeader: property.title,
            balloonContentBody: `
                <div style="padding: 10px;">
                    <p><strong>Адрес:</strong> ${property.address}</p>
                    <p><strong>Цена:</strong> ${property.status === 'rent' ? 
                        property.price.toLocaleString() + ' ₽/мес' : 
                        property.price.toLocaleString() + ' ₽'}</p>
                    <p><strong>Площадь:</strong> ${property.area} м²</p>
                    <p><strong>Комнат:</strong> ${property.rooms}</p>
                    <p><strong>Агент:</strong> ${property.agent.name}</p>
                    ${isPhoneAuthenticated() ? 
                        `<p><strong>Телефон:</strong> ${property.agent.phone}</p>` : 
                        `<p><strong>Телефон:</strong> <span style="filter: blur(5px);">${property.agent.phone}</span></p>
                         <button onclick=\"requirePhoneAuth(() => showPropertyDetails(${property.id}))\" style=\"margin-top:8px;color:#2563eb;\">Показать контакты</button>`}
                    <div style="margin-top: 10px;">
                        <button onclick="showPropertyDetails(${property.id})" 
                                style="background: #2563eb; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                            Подробнее
                        </button>
                        <button onclick="requirePhoneAuth(() => contactAgent(${property.id}))" 
                                style="background: #10b981; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">
                            Связаться
                        </button>
                    </div>
                </div>
            `,
            balloonContentFooter: `<small>ID: ${property.id}</small>`
        },
        {
            preset: 'islands#' + markerColor + 'CircleDotIcon',
            iconColor: markerColor
        }
    );
    
    // Add click event to placemark
    placemark.events.add('click', function() {
        showPropertyDetails(property.id);
    });
    
    yandexMap.geoObjects.add(placemark);
    mapPlacemarks.push(placemark);
}

function getMarkerColor(type, status) {
    if (status === 'rent') return 'orange';
    if (status === 'sale') return 'green';
    
    switch(type) {
        case 'apartment': return 'blue';
        case 'house': return 'purple';
        case 'commercial': return 'red';
        default: return 'blue';
    }
}

function showOnMap(propertyId) {
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property || !property.coordinates) {
        showToast('Координаты объекта не найдены', 'error');
        return;
    }
    
    // Close property modal first
    hidePropertyModal();
    
    // Switch to map section
    showSection('map');
    
    // Wait for map to load, then center on property
    setTimeout(() => {
        if (yandexMap) {
            yandexMap.setCenter(property.coordinates, 15);
            
            // Find and open balloon for this property
            mapPlacemarks.forEach(placemark => {
                const coords = placemark.geometry.getCoordinates();
                if (coords[0] === property.coordinates[0] && coords[1] === property.coordinates[1]) {
                    placemark.balloon.open();
                }
            });
        } else {
            // If map not initialized, initialize and then show property
            initYandexMap();
            setTimeout(() => {
                yandexMap.setCenter(property.coordinates, 15);
            }, 1000);
        }
    }, 500);
}

function centerMap() {
    if (!yandexMap) return;
    
    yandexMap.setCenter([55.7558, 37.6176], 10);
    showToast('Карта отцентрирована на Москве', 'info');
}

function applyMapFilters() {
    if (!yandexMap) return;
    
    // Get filter values
    const propertyType = document.getElementById('mapPropertyType').value;
    const status = document.getElementById('mapStatus').value;
    const minPrice = document.getElementById('mapMinPrice').value;
    
    // Update current filters
    currentMapFilters = { propertyType, status, minPrice };
    
    // Clear existing placemarks
    yandexMap.geoObjects.removeAll();
    mapPlacemarks = [];
    
    // Filter properties
    let filteredProperties = mockProperties;
    
    if (propertyType) {
        filteredProperties = filteredProperties.filter(p => p.type === propertyType);
    }
    
    if (status) {
        filteredProperties = filteredProperties.filter(p => p.status === status);
    }
    
    if (minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice));
    }
    
    // Add filtered properties to map
    filteredProperties.forEach(property => {
        addPropertyToMap(property);
    });
    
    // Fit map to show filtered placemarks
    if (mapPlacemarks.length > 0) {
        yandexMap.setBounds(yandexMap.geoObjects.getBounds());
    } else {
        showToast('Объекты не найдены по заданным фильтрам', 'info');
    }
}

// Initialize default section
showSection('home');
