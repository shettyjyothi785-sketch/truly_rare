
const products = [
    {
        id: 1,
        name: "Pink Bloom Designer Suit",
        category: "Traditional Wear",
        price: 1499,
        image: "IMAGE/01-white-pink-floral-suit.jpg",
        type: "Sale / Customisation",
        description: "A beautiful pink and white floral designer suit, perfect for celebrations and special occasions."
    },
    {
        id: 2,
        name: "Maroon Gold Saree Look",
        category: "Sarees",
        price: 1999,
        image: "IMAGE/02-maroon-gold-saree-blouse.jpg",
        type: "Sale / Rental",
        description: "An elegant maroon and gold traditional look for weddings and festive occasions."
    },
    {
        id: 3,
        name: "Sisters Saree Collection",
        category: "Sarees",
        price: 2499,
        image: "IMAGE/03-sister-saree-combination.jpg",
        type: "Sale / Rental",
        description: "A lovely coordinated saree collection designed to make special moments memorable."
    },
    {
        id: 4,
        name: "Red Bridal Lehenga",
        category: "Traditional Wear",
        price: 2999,
        image: "IMAGE/04-red-bridal-lehenga.jpg",
        type: "Rental / Customisation",
        description: "A stunning red bridal-inspired lehenga for weddings and grand celebrations."
    },
    {
        id: 5,
        name: "Blue Floral Maxi Dress",
        category: "Dresses",
        price: 1699,
        image: "IMAGE/05-blue-floral-maxi-dress.jpg",
        type: "Sale",
        description: "A graceful blue floral maxi dress for a stylish and comfortable look."
    },
    {
        id: 6,
        name: "Lavender Saree Blouse",
        category: "Designer Blouses",
        price: 999,
        image: "IMAGE/06-lavender-saree-blouse.jpg",
        type: "Sale / Customisation",
        description: "A charming lavender designer blouse that adds elegance to your traditional outfit."
    },
    {
        id: 7,
        name: "Cherry Red Cotton Dress",
        category: "Dresses",
        price: 1299,
        image: "IMAGE/07-cherry-red-cotton-dress.jpg",
        type: "Sale",
        description: "A beautiful cherry red cotton dress, perfect for everyday style and casual outings."
    },
    {
        id: 8,
        name: "Lavender Floral Blouse",
        category: "Designer Blouses",
        price: 899,
        image: "IMAGE/08-lavender-floral-blouse.jpg",
        type: "Sale / Customisation",
        description: "A delicate lavender floral blouse for a unique and fashionable traditional look."
    },
    {
        id: 9,
        name: "Black Tube Blouse",
        category: "Designer Blouses",
        price: 799,
        image: "IMAGE/09-black-tube-blouse-editorial.jpg",
        type: "Sale / Customisation",
        description: "A stylish black designer tube blouse for a modern and elegant appearance."
    }
];

let cart = JSON.parse(localStorage.getItem("trulyRareCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("trulyRareWishlist") || "[]");
let activeCategory = "All";

const $ = id => document.getElementById(id);

const money = amount =>
    "₹" + Number(amount).toLocaleString("en-IN");

function save() {
    localStorage.setItem("trulyRareCart", JSON.stringify(cart));
    localStorage.setItem("trulyRareWishlist", JSON.stringify(wishlist));
}

function toast(message) {
    const messageBox = $("toast");
    messageBox.textContent = message;
    messageBox.classList.add("show");

    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 2100);
}

/* PRODUCT DETAILS DESIGN */

const detailStyles = document.createElement("style");

detailStyles.textContent = `
.product-card {
    cursor: pointer;
}

.product-details-modal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 3000;
    background: rgba(0,0,0,.72);
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.product-details-modal.show {
    display: flex;
}

.details-box {
    position: relative;
    background: #fff;
    color: #222;
    width: 100%;
    max-width: 850px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.details-image {
    width: 100%;
    height: 100%;
    min-height: 430px;
    object-fit: cover;
}

.details-content {
    padding: 35px 28px;
}

.details-content small {
    color: #a34b73;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.details-content h2 {
    margin: 12px 0;
}

.details-price {
    font-size: 25px;
    font-weight: bold;
    margin: 15px 0;
}

.details-description {
    line-height: 1.7;
    color: #666;
    margin-bottom: 22px;
}

.details-content select {
    width: 100%;
    padding: 12px;
    margin: 10px 0 18px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.details-action {
    width: 100%;
    padding: 13px;
    margin: 6px 0;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: #e83e8c;
    color: white;
    border-radius: 4px;
}

.details-action.secondary {
    background: #222;
}

.details-action.light {
    background: #f5dce8;
    color: #7b2850;
}

.details-close {
    position: absolute;
    top: 12px;
    right: 15px;
    z-index: 2;
    border: none;
    background: white;
    font-size: 27px;
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

@media(max-width:650px) {
    .details-box {
        grid-template-columns: 1fr;
    }

    .details-image {
        height: 300px;
        min-height: 0;
    }

    .details-content {
        padding: 24px 20px;
    }
}
`;

document.head.appendChild(detailStyles);

/* CREATE PRODUCT DETAILS WINDOW */

const detailsModal = document.createElement("div");

detailsModal.id = "product-details-modal";
detailsModal.className = "product-details-modal";

detailsModal.innerHTML = `
    <div class="details-box">
        <button class="details-close" data-details-close>&times;</button>
        <img class="details-image" id="details-image" src="" alt="">
        <div class="details-content">
            <small id="details-category"></small>
            <h2 id="details-name"></h2>
            <div class="details-price" id="details-price"></div>
            <p class="details-description" id="details-description"></p>

            <strong>Select your size</strong>
            <select id="details-size">
                <option value="">Select Size</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
            </select>

            <button class="details-action" data-detail-action="buy">
                BUY NOW
            </button>

            <button class="details-action secondary" data-detail-action="rent">
                RENT NOW
            </button>

            <button class="details-action light" data-detail-action="customise">
                CUSTOMISE
            </button>

            <button class="details-action secondary" data-detail-action="add">
                ADD TO BAG
            </button>
        </div>
    </div>
`;

document.body.appendChild(detailsModal);

let selectedProduct = null;

function openProductDetails(id) {
    selectedProduct = products.find(product => product.id === id);

    if (!selectedProduct) return;

    $("details-image").src = selectedProduct.image;
    $("details-image").alt = selectedProduct.name;
    $("details-name").textContent = selectedProduct.name;
    $("details-category").textContent =
        selectedProduct.category + " · " + selectedProduct.type;
    $("details-price").textContent = money(selectedProduct.price);
    $("details-description").textContent = selectedProduct.description;
    $("details-size").value = "";

    detailsModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeProductDetails() {
    detailsModal.classList.remove("show");
    document.body.style.overflow = "";
}

/* PRODUCT DISPLAY */

function renderProducts() {
    const term = $("search-input").value.toLowerCase();

    let list = products.filter(product => {
        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const matchesSearch =
            (product.name + " " + product.category)
                .toLowerCase()
                .includes(term);

        return matchesCategory && matchesSearch;
    });

    const sort = $("sort").value;

    if (sort === "low") {
        list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        list.sort((a, b) => b.price - a.price);
    }

    $("product-grid").innerHTML = list.length
        ? list.map(product => `
            <article class="product-card" data-product="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">

                    <button class="wish-btn" data-wish="${product.id}">
                        ${wishlist.includes(product.id) ? "♥" : "♡"}
                    </button>
                </div>

                <div class="product-info">
                    <small>${product.category} · ${product.type}</small>
                    <h3>${product.name}</h3>
                    <div class="price">${money(product.price)}</div>

                    <button class="add-btn" data-add="${product.id}">
                        ADD TO BAG
                    </button>

                    <p class="view-details">VIEW DETAILS →</p>
                </div>
            </article>
        `).join("")
        : `<p class="empty">No matching designs found.</p>`;

    document.querySelectorAll(".filter").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === activeCategory
        );
    });
}

/* CART COUNTS */

function updateCounts() {
    $("cart-count").textContent =
        cart.reduce((total, item) => total + item.qty, 0);

    $("wish-count").textContent = wishlist.length;
}

/* CART */

function renderCart() {
    $("cart-items").innerHTML = cart.length
        ? cart.map(item => {
            const product = products.find(product => product.id === item.id);

            if (!product) return "";

            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="">
                    <div>
                        <strong>${product.name}</strong>
                        <p>${money(product.price)} × ${item.qty}</p>
                        <button data-remove="${product.id}">Remove</button>
                    </div>
                </div>
            `;
        }).join("")
        : `<p class="empty">Your bag is empty.</p>`;

    const total = cart.reduce((sum, item) => {
        const product = products.find(product => product.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    $("cart-total").textContent = money(total);
    updateCounts();
}

/* WISHLIST */

function renderWishlist() {
    $("wishlist-items").innerHTML = wishlist.length
        ? wishlist.map(id => {
            const product = products.find(product => product.id === id);

            if (!product) return "";

            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="">
                    <div>
                        <strong>${product.name}</strong>
                        <p>${money(product.price)}</p>
                        <button data-add="${product.id}">Add to bag</button>
                        <button data-unwish="${product.id}">Remove</button>
                    </div>
                </div>
            `;
        }).join("")
        : `<p class="empty">Your wishlist is empty.</p>`;

    updateCounts();
}

/* ADD TO CART */

function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    save();
    renderCart();
    toast("Added to your bag");
}

/* DRAWERS */

function openDrawer(drawerId) {
    $("overlay").classList.add("show");
    $(drawerId).classList.add("open");
}

function closeDrawers() {
    $("overlay").classList.remove("show");

    document.querySelectorAll(".drawer").forEach(drawer => {
        drawer.classList.remove("open");
    });
}

/* WHATSAPP PRODUCT ENQUIRY */

function sendProductEnquiry(action) {
    if (!selectedProduct) return;

    const size = $("details-size").value;

    if (!size) {
        toast("Please select your size first");
        return;
    }

    const message = encodeURIComponent(
        `Hello TRULY RARE!

I am interested in this product:

Product: ${selectedProduct.name}
Price: ${money(selectedProduct.price)}
Size: ${size}
Request: ${action}

Please share more details.`
    );

    window.open("https://wa.me/?text=" + message, "_blank");
}

/* ALL BUTTON ACTIONS */

document.addEventListener("click", event => {

    const addButton = event.target.closest("[data-add]");

    if (addButton) {
        addToCart(Number(addButton.dataset.add));
        return;
    }

    const wishButton = event.target.closest("[data-wish]");

    if (wishButton) {
        const id = Number(wishButton.dataset.wish);

        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(item => item !== id);
        } else {
            wishlist.push(id);
        }

        save();
        renderProducts();
        renderWishlist();
        toast("Wishlist updated");
        return;
    }

    const removeWish = event.target.closest("[data-unwish]");

    if (removeWish) {
        const id = Number(removeWish.dataset.unwish);
        wishlist = wishlist.filter(item => item !== id);

        save();
        renderWishlist();
        renderProducts();
        return;
    }

    const removeButton = event.target.closest("[data-remove]");

    if (removeButton) {
        const id = Number(removeButton.dataset.remove);
        cart = cart.filter(item => item.id !== id);

        save();
        renderCart();
        return;
    }

    const filterButton = event.target.closest("[data-category]");

    if (filterButton) {
        activeCategory = filterButton.dataset.category;
        renderProducts();

        $("shop").scrollIntoView({ behavior: "smooth" });
        return;
    }

    if (event.target.closest("[data-close]")) {
        closeDrawers();
        return;
    }

    /* OPEN PRODUCT DETAILS */

    const productCard = event.target.closest("[data-product]");

    if (productCard) {
        openProductDetails(Number(productCard.dataset.product));
    }

});

/* PRODUCT DETAILS BUTTONS */

detailsModal.addEventListener("click", event => {
    if (event.target === detailsModal ||
        event.target.closest("[data-details-close]")) {
        closeProductDetails();
        return;
    }

    const actionButton = event.target.closest("[data-detail-action]");

    if (!actionButton || !selectedProduct) return;

    const action = actionButton.dataset.detailAction;

    if (action === "add") {
        addToCart(selectedProduct.id);
        closeProductDetails();
    }

    if (action === "buy") {
        if (!$("details-size").value) {
            toast("Please select your size first");
            return;
        }

        addToCart(selectedProduct.id);
        closeProductDetails();
        openDrawer("cart-drawer");
    }

    if (action === "rent") {
        sendProductEnquiry("Rent this dress");
    }

    if (action === "customise") {
        sendProductEnquiry("Customise this dress");
    }
});

/* CLOSE DETAILS WITH ESCAPE */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProductDetails();
    }
});

/* CART AND WISHLIST */

$("cart-toggle").addEventListener("click", () => {
    renderCart();
    openDrawer("cart-drawer");
});

$("wishlist-toggle").addEventListener("click", () => {
    renderWishlist();
    openDrawer("wishlist-drawer");
});

$("overlay").addEventListener("click", closeDrawers);

/* SEARCH */

$("search-toggle").addEventListener("click", () => {
    $("search-bar").classList.toggle("show");
});

$("search-input").addEventListener("input", renderProducts);

/* SORT */

$("sort").addEventListener("change", renderProducts);

/* WHATSAPP CART ENQUIRY */

$("checkout-btn").addEventListener("click", () => {
    if (!cart.length) {
        toast("Your bag is empty");
        return;
    }

    const lines = cart.map(item => {
        const product = products.find(product => product.id === item.id);
        return `${product.name} x ${item.qty} — ${money(product.price * item.qty)}`;
    }).join("\n");

    const total = cart.reduce((sum, item) => {
        const product = products.find(product => product.id === item.id);
        return sum + product.price * item.qty;
    }, 0);

    const message = encodeURIComponent(
        `Hello TRULY RARE!

I would like to enquire about these items:

${lines}

Total shown on website: ${money(total)}

Please confirm availability, sale or rental price and delivery details.`
    );

    window.open("https://wa.me/?text=" + message, "_blank");
});

/* CURRENT YEAR */

$("year").textContent = new Date().getFullYear();

/* START WEBSITE */

renderProducts();
renderCart();
renderWishlist();
