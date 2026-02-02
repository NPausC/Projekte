function initApp() {
    renderMenu();
    refreshBasketUI();
}

function renderMenu() {
    let menuSection = document.getElementById("dish-content");
    if (menuSection == null) return;
    menuSection.innerHTML = "";

    for (let i = 0; i < allDishes.length; i++) {
        renderCategory(menuSection, i);
    }
}

function renderCategory(container, catIdx) {
    let category = allDishes[catIdx];
    container.innerHTML += getCategoryHeaderHTML(category, catIdx);

    for (let j = 0; j < category.items.length; j++) {
        let dish = category.items[j];
        container.innerHTML += createMenuCardHTML(dish, catIdx, j);
    }
}

function refreshBasketUI() {
    let basketData = calculateBasketData();

    renderBasketLists(basketData.html);
    updateBasketBadge(basketData.count);
    calculateAndDisplayPrices(basketData.subtotal);
}

function calculateBasketData() {
    let data = { subtotal: 0, count: 0, html: "" };
    for (let i = 0; i < allDishes.length; i++) {
        for (let j = 0; j < allDishes[i].items.length; j++) {
            let item = allDishes[i].items[j];
            if (item.amount > 0) {
                data.html += createBasketItemHTML(item, i, j);
                data.subtotal += item.price * item.amount;
                data.count += item.amount;
            }
        }
    }
    return data;
}

function renderBasketLists(basketHTML) {
    let desktopList = document.getElementById("basket-items");
    let mobileList = document.getElementById("mobile-basket-items");
    if (desktopList) desktopList.innerHTML = basketHTML;
    if (mobileList) mobileList.innerHTML = basketHTML;
}

function addItemToBasket(catIdx, dishIdx) {
    allDishes[catIdx].items[dishIdx].amount += 1;
    refreshBasketUI();
}

function updateQuantity(catIdx, dishIdx, change) {
    let dish = allDishes[catIdx].items[dishIdx];
    dish.amount = Math.max(0, dish.amount + change);
    refreshBasketUI();
}

function calculateAndDisplayPrices(subtotal) {
    let deliveryFee = subtotal > 0 ? 4.99 : 0;
    let total = subtotal + deliveryFee;

    let subStr = subtotal.toFixed(2).replace(".", ",") + " €";
    let totalStr = total.toFixed(2).replace(".", ",") + " €";

    updatePriceElements(subStr, totalStr);
}

function updatePriceElements(subStr, totalStr) {
    document.getElementById("subtotal").innerText = subStr;
    document.getElementById("total-price").innerText = totalStr;
    document.getElementById("mobile-subtotal").innerText = subStr;
    document.getElementById("mobile-total-price").innerText = totalStr;

    let buttons = document.querySelectorAll(".buy-now-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = "Buy now (" + totalStr + ")";
    }
}

function completeOrder() {
    if (isBasketEmpty()) {
        return alert("Please add items to your basket first!");
    }
    showOrderConfirmation();
    resetAllAmounts();
    refreshBasketUI();
}

function isBasketEmpty() {
    for (let i = 0; i < allDishes.length; i++) {
        for (let j = 0; j < allDishes[i].items.length; j++) {
            if (allDishes[i].items[j].amount > 0) return false;
        }
    }
    return true;
}

function resetAllAmounts() {
    for (let i = 0; i < allDishes.length; i++) {
        for (let j = 0; j < allDishes[i].items.length; j++) {
            allDishes[i].items[j].amount = 0;
        }
    }
}

function showOrderConfirmation() {
    document.getElementById("mobile-basket-overlay").classList.add("hidden");
    document.getElementById("order-overlay").classList.remove("hidden");
    document.body.classList.add("no-scroll");
}

function updateBasketBadge(count) {
    let badge = document.getElementById("basket-badge");
    if (!badge) return;
    badge.innerText = count;
    badge.classList.toggle("hidden", count === 0);
}

function toggleMobileBasket() {
    document.getElementById("mobile-basket-overlay").classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
}

function closeConfirmation() {
    document.getElementById("order-overlay").classList.add("hidden");
    document.body.classList.remove("no-scroll");
}