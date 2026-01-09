
let myCondition = true;

myCondition = !myCondition; // not Operator / Umkehr in diesem Fall Umkehr der Condition true in false

myCondition = false || false || false // or Operator / prüft in diesem Fall ab, ob einer der Werte true ist. Wenn ja, dann true

myCondition = true && true // and Operator



myCondition = 45 == "45"; // == testet ob exakt gleich, ohne Typ

myCondition = 45 === 45; // testet ob exakt gleich, mit Typ -> true
myCondition = 45 === "45"; //testet ob exakt gleich, mit Typ -> false

myCondition = 45 < 123; // größer Abfrage -> true

myCondition = 12 >= 45; // größergleich Abfrage -> false

myCondition = 45 != "47"; // = testet ob exakt gleich, ohne Typen -> true
myCondition = 45 !== 47; // testet ob exakt gleich, mit Type -> true
myCondition = 45 !== "47"; // testet ob exakt gleich, mit Type ->true


console.log(myCondition);

let myIfCondition = false;

if(3<2){
    console.log("hello world! if teil");
} else {
    console.log("hello world! else teil");
}

