let discount = 50;
let price = 500;

console.log((price-discount) * 1.19)

price = 400;

calculatePrice(); 

function calculatePrice() {
    console.log((price - discount) * 1.19);
}

//Parameter

logCalculatedPrice(50, 500);

logCalculatedPrice(50, 400);

function logCalculatedPrice(discount, price) {
    console.log((price - discount) * 1.19)
}

console.log(logCalculatedPrice(50, 300));

function logCalculatedPrice(discount, price) {
    let value = (price - discount) * 1.19;

    return value
}

// https://www.w3schools.com/js/js_functions.asp


