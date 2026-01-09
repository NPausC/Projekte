
let myList = [12, "Banana", true];

const Fruits = ["Banana", "Orange", "Apple", "Mango"];


let singleTestVar = Fruits.pop();

function initArrays(){
    console.log(singleTestVar);
}

// --- Aufgabenstellung 1: includes ---
// Prüft, ob ein Wert in der Liste existiert.
function containsElement(array, element) {
    return array.includes(element);
}

// Tests zu Aufgabe 1
console.log(containsElement(['Anna', 'Ben', 'Clara'], 'Ben')); // true
console.log(containsElement(['Anna', 'Ben', 'Clara'], 'Daniel')); // false


// --- Aufgabenstellung 2: indexOf ---
// Sucht die Position eines Elements. Gibt -1 zurück, wenn nichts gefunden wurde.
function findElementIndex(array, element) {
    return array.indexOf(element);
}

// Tests zu Aufgabe 2
console.log(findElementIndex([10, 20, 30, 40], 30)); // 2
console.log(findElementIndex([10, 20, 30, 40], 50)); // -1


// --- Aufgabenstellung 3: shift ---
// Entfernt das erste Element (Index 0) und gibt das geänderte Array zurück.
function removeFirstElement(array) {
    array.shift(); 
    return array;
}

// Tests zu Aufgabe 3
console.log(removeFirstElement([10, 20, 30, 40])); // [20, 30, 40]
console.log(removeFirstElement(['a', 'b', 'c', 'd'])); // ['b', 'c', 'd']


// --- Aufgabenstellung 4: unshift ---
// Fügt ein Element ganz vorne am Anfang hinzu.
function addElementToStart(array, element) {
    array.unshift(element);
    return array;
}

// Tests zu Aufgabe 4
console.log(addElementToStart([2, 3, 4], 1)); // [1, 2, 3, 4]
console.log(addElementToStart(['b', 'c', 'd'], 'a')); // ['a', 'b', 'c', 'd']


// --- Aufgabenstellung 5: slice ---
// Kopiert einen Teilbereich. Das Original-Array bleibt unverändert.
function getSubArray(array, start, end) {
    return array.slice(start, end);
}

// Tests zu Aufgabe 5
console.log(getSubArray([1, 2, 3, 4, 5], 1, 4)); // [2, 3, 4]
console.log(getSubArray(['a', 'b', 'c', 'd', 'e'], 0, 3)); // ['a', 'b', 'c']


// --- Aufgabenstellung 6: join ---
// Verwandelt ein Array in einen Text-String mit Trennzeichen dazwischen.
function joinArray(array, separator) {
    return array.join(separator);
}

// Tests zu Aufgabe 6
console.log(joinArray(['apple', 'banana', 'cherry'], ', ')); // "apple, banana, cherry"
console.log(joinArray([1, 2, 3, 4], ' - ')); // "1 - 2 - 3 - 4"

function initArrays(){
    for (let indexFruits = 0; indexFruits < 7; indexFruits +=1) {
        console.log(indexFruits);
    }
}


function initArrays(){
    let contentRef = document.getElementById('my_content');
    contentRef.innerHTML =""; //leeren des Inhaltes
    for (let indexFruits = 0; indexFruits < Fruits.length; indexFruits++) {
        contentRef.innerHTML += `<p>+ ${Fruits[indexFruits]}</p>`
    }
}

function sumArray(array) {
    let sum = 0; // Startwert
    for (let i = 0; i < array.length; i++) {
        sum += array[i]; // Addiere den Wert des aktuellen Fachs zur Summe
    }
    return sum;
}

    console.log(sumArray([3, 7, 1, 4])); // Erwartete Ausgabe: 15 (3 + 7 + 1 + 4)

    console.log(sumArray([1, 2, 3, 4, 5])); // Erwartete Ausgabe: 15 (1 + 2 + 3 + 4 + 5)

function printNumbers(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

function printNumbersReverse(n) {
    // Start bei n; solange i >= 1; verringere i um 1
    for (let i = n; i >= 1; i--) {
        console.log(i);
    }
}

function printEveryThirdElement(array) {
    // i += 3 springt immer zwei Elemente über
    for (let i = 0; i < array.length; i += 3) {
        console.log(array[i]);
    }
}

function isPrime(num) {
    if (num <= 1) return false; // Zahlen kleiner/gleich 1 sind keine Primzahlen

    // Wir testen alle Teiler von 2 bis kurz vor der Zahl selbst
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            // Wenn der Rest 0 ist (Modulo %), wurde ein Teiler gefunden
            return false; // Keine Primzahl!
        }
    }
    // Wenn die Schleife ohne Treffer durchläuft, ist es eine Primzahl
    return true; 
}

console.log(isPrime(6)); // Erwartete Ausgabe: true (7 ist eine Primzahl)

console.log(isPrime(4)); // Erwartete Ausgabe: false (4 ist keine Primzahl)


let refList = document.getElementsByClassName('red_box')