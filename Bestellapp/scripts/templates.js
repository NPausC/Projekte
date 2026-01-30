function createMenuCardHTML(dish, categoryIndex, dishIndex) {
    return `
        <div class="meal-card">
            <div class="meal-info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
                <p><b>${dish.price.toFixed(2).replace(".", ",")} €</b></p>
            </div>
            <div class="meal-image-wrapper">
                <img src="${dish.image}" class="dish-photo" alt="${dish.name}">
                <button class="add-btn" onclick="addItemToBasket(${categoryIndex}, ${dishIndex})">
                    <img src="./assets/icons/+.png" style="width:14px">
                </button>
            </div>
        </div>`;
}

function createBasketItemHTML(item, categoryIndex, dishIndex) {
    const itemTotalPrice = (item.price * item.amount)
        .toFixed(2)
        .replace(".", ",");
    return `
        <div class="basket-item">
            <div class="basket-item-top">
                <span>${item.amount}x ${item.name}</span>
                <span>${itemTotalPrice} €</span>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${categoryIndex}, ${dishIndex}, -1)">-</button>
                <span>${item.amount}</span>
                <button class="qty-btn" onclick="updateQuantity(${categoryIndex}, ${dishIndex}, 1)">+</button>
            </div>
        </div>`;
}
