function initApp() {
    renderMenu();
    refreshBasketUI();
}

function renderMenu() {
    const menuSection = document.getElementById("dish-content");
    if (!menuSection) return;
    menuSection.innerHTML = "";

    allDishes.forEach((category, catIdx) => {
        const titleText =
            catIdx === 0
                ? `<span class="desktop-only">${category.categoryName}</span><span class="mobile-only">Burger</span>`
                : category.categoryName;

        menuSection.innerHTML += `
            <div class="category-header-container">
                <div class="category-header-content">
                    <img src="${category.categoryIcon}" class="category-icon">
                    <h2 class="category-title">${titleText}</h2>
                </div>
            </div>`;

        category.items.forEach((dish, dishIdx) => {
            menuSection.innerHTML += createMenuCardHTML(dish, catIdx, dishIdx);
        });
    });
}

function refreshBasketUI() {
    const desktopList = document.getElementById("basket-items");
    const mobileList = document.getElementById("mobile-basket-items");

    let subtotal = 0;
    let totalItemsCount = 0;
    let basketHTML = "";

    allDishes.forEach((category, catIdx) => {
        category.items.forEach((item, dishIdx) => {
            if (item.amount > 0) {
                basketHTML += createBasketItemHTML(item, catIdx, dishIdx);
                subtotal += item.price * item.amount;
                totalItemsCount += item.amount;
            }
        });
    });

    if (desktopList) desktopList.innerHTML = basketHTML;
    if (mobileList) mobileList.innerHTML = basketHTML;

    updateBasketBadge(totalItemsCount);
    calculateAndDisplayPrices(subtotal);
}

function addItemToBasket(catIdx, dishIdx) {
    allDishes[catIdx].items[dishIdx].amount++;
    refreshBasketUI();
}

function updateQuantity(catIdx, dishIdx, change) {
    const dish = allDishes[catIdx].items[dishIdx];
    dish.amount = Math.max(0, dish.amount + change);
    refreshBasketUI();
}

function calculateAndDisplayPrices(subtotal) {
    const DELIVERY_FEE = subtotal > 0 ? 4.99 : 0;
    const grandTotal = subtotal + DELIVERY_FEE;

    const formattedSubtotal = `${subtotal.toFixed(2).replace(".", ",")} €`;
    const formattedGrandTotal = `${grandTotal.toFixed(2).replace(".", ",")} €`;

    document.getElementById("subtotal").innerText = formattedSubtotal;
    document.getElementById("total-price").innerText = formattedGrandTotal;
    document.getElementById("mobile-subtotal").innerText = formattedSubtotal;
    document.getElementById("mobile-total-price").innerText =
        formattedGrandTotal;

    document.querySelectorAll(".buy-now-btn").forEach((button) => {
        button.innerText = `Buy now (${formattedGrandTotal})`;
    });
}

function updateBasketBadge(count) {
    const badge = document.getElementById("basket-badge");
    if (!badge) return;
    badge.innerText = count;
    badge.classList.toggle("hidden", count === 0);
}

function toggleMobileBasket() {
    document.getElementById("mobile-basket-overlay").classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
}

function completeOrder() {
    const isBasketEmpty = allDishes.every((cat) =>
        cat.items.every((dish) => dish.amount === 0),
    );
    if (isBasketEmpty) return alert("Your basket is empty!");

    document.getElementById("mobile-basket-overlay").classList.add("hidden");
    document.getElementById("order-overlay").classList.remove("hidden");
    document.body.classList.add("no-scroll");

    allDishes.forEach((cat) => cat.items.forEach((dish) => (dish.amount = 0)));
    refreshBasketUI();
}

function closeConfirmation() {
    document.getElementById("order-overlay").classList.add("hidden");
    document.body.classList.remove("no-scroll");
}

window.onload = initApp;
