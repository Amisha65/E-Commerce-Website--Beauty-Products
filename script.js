const state = {
    allProducts: [],
    activeCategory: "all",
    searchTerm: "",
    cart: []
};

const fallbackCatalog = {
    categories: ["skincare", "makeup", "haircare"],
    products: [
        {
            id: "serum-glow",
            name: "Radiant Dew Serum",
            category: "skincare",
            badge: "Best seller",
            price: 42,
            originalPrice: 52,
            rating: 4.9,
            image: "/images/tranding1.jpg",
            description: "A cushiony niacinamide serum that brightens dullness and leaves a glassy finish without feeling sticky."
        },
        {
            id: "velvet-tint",
            name: "Velvet Cloud Tint",
            category: "makeup",
            badge: "New",
            price: 28,
            originalPrice: 34,
            rating: 4.8,
            image: "/images/trending2.jpg",
            description: "Soft-focus lip and cheek tint with a blurred matte texture that layers beautifully for everyday glam."
        },
        {
            id: "repair-mask",
            name: "Midnight Repair Mask",
            category: "skincare",
            badge: "Editor pick",
            price: 36,
            originalPrice: 44,
            rating: 4.7,
            image: "/images/trending3.jpg",
            description: "An overnight treatment packed with ceramides and peptides to calm stressed skin by morning."
        },
        {
            id: "shine-oil",
            name: "Silk Finish Hair Oil",
            category: "haircare",
            badge: "Hot",
            price: 24,
            originalPrice: 30,
            rating: 4.8,
            image: "/images/trending4.jpg",
            description: "Lightweight smoothing oil that adds shine, controls frizz, and protects lengths from heat styling."
        },
        {
            id: "spf-mist",
            name: "Glow Guard SPF Mist",
            category: "skincare",
            badge: "Travel favorite",
            price: 31,
            originalPrice: 38,
            rating: 4.6,
            image: "/images/hero.jpg",
            description: "Refresh sunscreen on the go with an invisible mist that sits well over skincare and makeup."
        },
        {
            id: "brow-lift",
            name: "Feather Brow Sculpt",
            category: "makeup",
            badge: "Trending",
            price: 19,
            originalPrice: 24,
            rating: 4.5,
            image: "/images/first.jpg",
            description: "Flexible brow wax that lifts, shapes, and holds without flakes or a crunchy finish."
        }
    ]
};

const productGrid = document.getElementById("productGrid");
const filterPills = document.getElementById("filterPills");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartButton = document.getElementById("cartButton");
const closeCartButton = document.getElementById("closeCart");
const pageBackdrop = document.getElementById("pageBackdrop");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.getElementById("site-menu");
const newsletterForm = document.getElementById("newsletterForm");
const consultForm = document.getElementById("consultForm");
const newsletterFeedback = document.getElementById("newsletterFeedback");
const consultFeedback = document.getElementById("consultFeedback");

initialize();

function initialize() {
    loadCart();
    bindUi();
    fetchProducts();
    renderCart();
}

function bindUi() {
    menuToggle?.addEventListener("click", toggleMenu);
    cartButton?.addEventListener("click", () => setCartOpen(true));
    closeCartButton?.addEventListener("click", () => setCartOpen(false));
    pageBackdrop?.addEventListener("click", () => {
        setCartOpen(false);
        setMenuOpen(false);
    });
    searchInput?.addEventListener("input", (event) => {
        state.searchTerm = event.target.value.trim().toLowerCase();
        renderProducts();
    });
    newsletterForm?.addEventListener("submit", handleNewsletterSubmit);
    consultForm?.addEventListener("submit", handleConsultSubmit);

    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.scrollTarget);
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
            setMenuOpen(false);
        });
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });
}

async function fetchProducts() {
    try {
        const response = await fetch("/api/products");
        if (!response.ok) {
            throw new Error("Failed to load products");
        }
        const payload = await response.json();
        state.allProducts = payload.products || [];
        renderFilters(payload.categories || []);
        renderProducts();
    } catch {
        state.allProducts = fallbackCatalog.products;
        renderFilters(fallbackCatalog.categories);
        renderProducts();
    }
}

function renderFilters(categories) {
    const allCategories = ["all", ...categories];
    filterPills.innerHTML = allCategories
        .map((category) => {
            const activeClass = category === state.activeCategory ? "active" : "";
            const label = category === "all" ? "All products" : capitalize(category);
            return `<button class="filter-pill ${activeClass}" type="button" data-category="${category}">${label}</button>`;
        })
        .join("");

    filterPills.querySelectorAll("[data-category]").forEach((button) => {
        button.addEventListener("click", () => {
            state.activeCategory = button.dataset.category;
            renderFilters(categories);
            renderProducts();
        });
    });
}

function renderProducts() {
    const products = getFilteredProducts();
    emptyState.classList.toggle("hidden", products.length > 0);
    productGrid.innerHTML = products
        .map((product) => {
            const oldPrice = product.originalPrice ? `<span>$${product.originalPrice.toFixed(2)}</span>` : "";
            return `
                <article class="product-card">
                    <div class="product-image-wrap">
                        <img src="${product.image}" alt="${product.name}">
                        <span class="product-badge">${product.badge}</span>
                        <span class="product-category">${capitalize(product.category)}</span>
                    </div>
                    <div class="product-body">
                        <div class="product-title-row">
                            <h3>${product.name}</h3>
                            <span class="product-rating"><i class="fa-solid fa-star"></i> ${product.rating}</span>
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-meta">
                            <div class="price-group">
                                <strong>$${product.price.toFixed(2)}</strong>
                                ${oldPrice}
                            </div>
                            <button class="add-button" type="button" data-product-id="${product.id}">Add to bag</button>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    productGrid.querySelectorAll("[data-product-id]").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.productId));
    });
}

function getFilteredProducts() {
    return state.allProducts.filter((product) => {
        const matchesCategory = state.activeCategory === "all" || product.category === state.activeCategory;
        const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
        return matchesCategory && searchableText.includes(state.searchTerm);
    });
}

function addToCart(productId) {
    const product = state.allProducts.find((item) => item.id === productId);
    if (!product) {
        return;
    }
    const existingItem = state.cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    persistCart();
    renderCart();
    setCartOpen(true);
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.id !== productId);
    persistCart();
    renderCart();
}

function renderCart() {
    const itemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = String(itemCount);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    if (state.cart.length === 0) {
        cartItems.innerHTML = `<article class="journal-card"><h3>Your bag is empty</h3><p>Add a few products and your picks will appear here instantly.</p></article>`;
        return;
    }

    cartItems.innerHTML = state.cart
        .map((item) => `
            <article class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <div class="cart-row">
                        <h3>${item.name}</h3>
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <p>${capitalize(item.category)} · Qty ${item.quantity}</p>
                    <button type="button" data-remove-id="${item.id}">Remove</button>
                </div>
            </article>
        `)
        .join("");

    cartItems.querySelectorAll("[data-remove-id]").forEach((button) => {
        button.addEventListener("click", () => removeFromCart(button.dataset.removeId));
    });
}

function loadCart() {
    try {
        const stored = window.localStorage.getItem("be-bold-cart");
        state.cart = stored ? JSON.parse(stored) : [];
    } catch {
        state.cart = [];
    }
}

function persistCart() {
    window.localStorage.setItem("be-bold-cart", JSON.stringify(state.cart));
}

function setCartOpen(isOpen) {
    cartDrawer.classList.toggle("open", isOpen);
    cartDrawer.setAttribute("aria-hidden", String(!isOpen));
    cartButton.setAttribute("aria-expanded", String(isOpen));
    pageBackdrop.hidden = !isOpen && !navPanel.classList.contains("open");
}

function toggleMenu() {
    setMenuOpen(!navPanel.classList.contains("open"));
}

function setMenuOpen(isOpen) {
    navPanel.classList.toggle("open", isOpen);
    menuToggle?.setAttribute("aria-expanded", String(isOpen));
    pageBackdrop.hidden = !isOpen && !cartDrawer.classList.contains("open");
}

async function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();
    await submitJson("/api/subscribe", { email }, newsletterFeedback);
    newsletterForm.reset();
}

async function handleConsultSubmit(event) {
    event.preventDefault();
    const formData = new FormData(consultForm);
    const payload = Object.fromEntries(formData.entries());
    await submitJson("/api/contact", payload, consultFeedback);
    consultForm.reset();
}

async function submitJson(url, payload, feedbackNode) {
    feedbackNode.textContent = "Sending...";
    feedbackNode.className = "form-feedback";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }
        feedbackNode.textContent = data.message;
        feedbackNode.classList.add("success");
    } catch (error) {
        feedbackNode.textContent = error.message;
        feedbackNode.classList.add("error");
    }
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
