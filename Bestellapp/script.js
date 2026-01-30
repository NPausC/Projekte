function initApp() {
    renderMenu();
    refreshBasketUI();
}

function renderMenu() {
    let menuSection = document.getElementById("dish-content");
    if (menuSection == null) {
        return;
    }

    menuSection.innerHTML = "";

    for (let i = 0; i < allDishes.length; i++) {
        let category = allDishes[i];
        let titleText = category.categoryName;
        if (i === 0) {
            titleText = `<span class="desktop-only">${category.categoryName}</span><span class="mobile-only">Burger</span>`;
        }

        menuSection.innerHTML += `
            <div class="category-header-container">
                <div class="category-header-content">
                    <img src="${category.categoryIcon}" class="category-icon">
                    <h2 class="category-title">${titleText}</h2>
                </div>
            </div>`;

        for (let j = 0; j < category.items.length; j++) {
            let dish = category.items[j];
            menuSection.innerHTML += createMenuCardHTML(dish, i, j);
        }
    }
}

function refreshBasketUI() {
    let desktopList = document.getElementById("basket-items");
    let mobileList = document.getElementById("mobile-basket-items");

    let subtotal = 0;
    let totalItemsCount = 0;
    let basketHTML = "";

    for (let i = 0; i < allDishes.length; i++) {
        let category = allDishes[i];

        for (let j = 0; j < category.items.length; j++) {
            let item = category.items[j];

            if (item.amount > 0) {
                basketHTML += createBasketItemHTML(item, i, j);
                subtotal = subtotal + item.price * item.amount;
                totalItemsCount = totalItemsCount + item.amount;
            }
        }
    }

    if (desktopList) {
        desktopList.innerHTML = basketHTML;
    }
    if (mobileList) {
        mobileList.innerHTML = basketHTML;
    }

    updateBasketBadge(totalItemsCount);
    calculateAndDisplayPrices(subtotal);
}

function addItemToBasket(catIdx, dishIdx) {
    let dish = allDishes[catIdx].items[dishIdx];
    dish.amount = dish.amount + 1;
    console.log("Added to basket: " + dish.name);
    refreshBasketUI();
}

function updateQuantity(catIdx, dishIdx, change) {
    let dish = allDishes[catIdx].items[dishIdx];
    dish.amount = dish.amount + change;

    if (dish.amount < 0) {
        dish.amount = 0;
    }
    
    refreshBasketUI();
}

function calculateAndDisplayPrices(subtotal) {
    let deliveryFee = 0;
    if (subtotal > 0) {
        deliveryFee = 4.99;
    }

    let grandTotal = subtotal + deliveryFee;

    let formattedSubtotal = subtotal.toFixed(2).replace(".", ",") + " €";
    let formattedGrandTotal = grandTotal.toFixed(2).replace(".", ",") + " €";

    document.getElementById("subtotal").innerText = formattedSubtotal;
    document.getElementById("total-price").innerText = formattedGrandTotal;
    document.getElementById("mobile-subtotal").innerText = formattedSubtotal;
    document.getElementById("mobile-total-price").innerText =
        formattedGrandTotal;

    let buttons = document.querySelectorAll(".buy-now-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = "Buy now (" + formattedGrandTotal + ")";
    }
}

function completeOrder() {
    let empty = true;
    for (let i = 0; i < allDishes.length; i++) {
        for (let j = 0; j < allDishes[i].items.length; j++) {
            if (allDishes[i].items[j].amount > 0) {
                empty = false;
            }
        }
    }

    if (empty) {
        alert("Please add items to your basket first!");
        return;
    }

    document.getElementById("mobile-basket-overlay").classList.add("hidden");
    document.getElementById("order-overlay").classList.remove("hidden");
    document.body.classList.add("no-scroll");

    for (let i = 0; i < allDishes.length; i++) {
        for (let j = 0; j < allDishes[i].items.length; j++) {
            allDishes[i].items[j].amount = 0;
        }
    }
    refreshBasketUI();
}

function updateBasketBadge(count) {
    let badge = document.getElementById("basket-badge");
    if (badge) {
        badge.innerText = count;
        if (count > 0) {
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    }
}

function toggleMobileBasket() {
    let overlay = document.getElementById("mobile-basket-overlay");
    overlay.classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
}

function closeConfirmation() {
    document.getElementById("order-overlay").classList.add("hidden");
    document.body.classList.remove("no-scroll");
}

window.onload = initApp;
