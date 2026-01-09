// #region Variablen und Datentypen

// #region Variablen erschaffen (let vs const)

// Deklaration    Definition
// Namensgebung   Wertzuweisung
let einName      = "Vaish";

// console.log(einName);

einName = "Sydney";

// console.log(einName);

let newPlayer;

// console.log(newPlayer);


newPlayer = "Norman";

// console.log(newPlayer);



// Deklaration    Definition
// Namensgebung   Wertzuweisung
const eineNummer   = 42;

// console.log(eineNummer);

// eineNummer = 1337; // error wegen erneuter Wertzuweisung

// console.log(eineNummer);



// const anotherPlayer; // error. weil definition fehlt

// #endregion


// #region Datentypen

// #region Datentyp number

const meinAlter = 42;
const deinAlter = 29;

// console.log(meinAlter + deinAlter);

// console.log(meinAlter - deinAlter);

// console.log(meinAlter / deinAlter);

// console.log(meinAlter * deinAlter);


// // modulo = %
// console.log(meinAlter % deinAlter);

// console.log(meinAlter % 2);

// #endregion

// #region Datentyp boolean

let kinder = true;

// console.log(kinder);

kinder = false;

// #endregion

// #region Datentyp string (Zeichenkette)

const myName = "Nico";

// console.log("meine Tochter hat gesagt: 'Page, du kannst nicht singen.'");

const einTrick = `einfach nur markieren`;

const stringMitBackticks = `so nämlich: ${myName}`;

// console.log(stringMitBackticks);

// console.log(myName + " " + einTrick);





// #endregion

// #region Array (Collection)

const meinArray = [1337, "ein String", true]

// console.log(meinArray);

// console.log(meinArray.length);

// console.log(meinArray[3]);

// Hinzufügen von Werten mit .push(Wert)

meinArray.push("Jonas");

// console.log(meinArray);

meinArray.push([1,2,3,4,5]);

// console.log(meinArray);

meinArray[4].push(6);

console.log(meinArray);

// console.log(meinArray[4][3]);

// Werte entfernen oder ersetzen mit .splice()

// splice mit einem Wert
meinArray.splice(3); // 3 = Index ab dem entfernt wird


// splice mit zwei Werten
meinArray.splice(1,2); // zwoter wert = anzahl der betroffenen elemente


// splice mit drei werten

meinArray.splice(3,2, ["Backstein", "Backstein"]);
meinArray.push("Backstein");

console.log(meinArray);

const bestellung = [12, 43, 26, 29, 22];

console.log(bestellung);

bestellung.splice(1, 2, 1337); // dritte Wert wird stattdessen eingesetzt

console.log(bestellung);








// #endregion

// #endregion

// #endregion


// #region function basic


// Beispiel für Funktions-Definition

// keyword    name       parameterbereich      Funktionskörper
  function    sayHello      ()                    {
    console.log("Hello world");
}

// Beispiel für Funktions-Aufruf / Ausführung einer Funktion
// sayHello();


// #endregion


// #region die 4 Grundformen der Funktionen

// #region (ohne Parameter und ohne Rückgabewert)

const a = 2;

const b = 40;

function ohnePohneR(){
    const result = a + b;
    console.log(result);
}

// ohnePohneR();

// #endregion

// #region (ohne Parameter und mit Rückgabewert)

function getMyName(){

    // console.log("mich kann man sehen! nä nä nä nä nä nä");
    

    return "Nico";

    console.log("kann man mich sehen? Nein! weil nach return");
    
}


const deinName = "Sydney";

// console.log(deinName);

const meinName = getMyName();

// console.log(meinName);


function getNumber(){
    console.log("passiert");
    
    return 1330;
}

// console.log(7 + getNumber());


// getNumber(); // macht keinen sinn
"das hier"; // macht keinen sinn


// #endregion

// #region (mit Parameter und ohne Rückgabewert)


function logSummary(a, b){ // a und b sind 'parameter'
    console.log(a + b);
}

logSummary(40, 2); // 40 und 2 sind 'arguments'

logSummary(12, 23);


// #endregion


// #region (mit Parameter und mit Rückgabewer)

function getFullName(karo, akkuschrauber){

    const fullName = "Vorname: " + karo + " | " + "Nachname: " + akkuschrauber;

    return fullName;
}

const firstName = "Pipi";
const lastName = "Langstrumpf";

console.log(getFullName(firstName, lastName));


const who = getFullName("the", "doctor");

console.log(who);


// console.log(getFullName("Nico", "Heller"));




// #endregion

// #endregion



// #region for-loop  



// keyword (for)      (zähler   ; bedingung  ; schritt)
for (let i = 0; i < 10; i++) {
    // console.log(i);
}

for (let i = 10; i < 20; i += 2) {
    // console.log(i);
}

for (let j = 10; j > 0; j--) {
    // console.log(j);
}



const meinArray = ["Sydney", "Nico", "Reza", "Xenia", "Ziyad"];

// console.log(meinArray.length);

for (let k = 0; k < meinArray.length; k++) {
    // console.log("der Name lautet: " + meinArray[k] + " und besteht aus " + meinArray[k].length + " Buchstaben");
}

for (let i = 1; i <= 10; i++) {
    // console.log("5 * " + i + " = " + (5*i));
}



// #endregion


let meineNummer = 0;

// meineNummer-=10; // meineNummer = (meineNummer + 10);

// meineNummer = (meineNummer - 10);

// console.log(meineNummer);


// #region if-abfragen

const kontostand = 100;

const abheben = 120;

// if(abheben <= kontostand){
//     console.log("geld kann abgehoben werden");
// } else {
//     console.log("konto nicht ausreichend gedeckt");
// }

// if(abheben <= kontostand){
//     console.log("geld kann abgehoben werden");
// } 

// if(abheben > kontostand){
//     console.log("konto nicht ausreichend gedeckt");
// }


// let meinAlter = 72;

// if(meinAlter < 18){
//     console.log("du bist noch nicht volljährig");
// } else if(meinAlter >= 18 && meinAlter < 68){
//     console.log("du bist volljährig, aber noch kein Rentner");
// } else {
//     console.log("du bist sehr alt");
// }



// const zahl = 10;

// if(zahl < 20){
//     console.log("stimmt");
// } else if(zahl < 30){
//     console.log("stimmt auch");
// }



// #endregion


const arr = [0, 1, 2.3, 4, 5, [true, 24], 231, 1228, "brot", 1337];

for(let y = 0; y < arr.length; y++){

    if(arr[y] % 2 == 0){
        console.log(arr[y] + " ist eine gerade Zahl");
    }else if(arr[y] > 0 && arr[y] % 2 != 0){
        console.log(arr[y] + " ist eine ungerade Zahl");
    } else {
        console.log(arr[y] + " ist keine Zahl");
    }
}















// whatHappend(32, 10); // console-ausgabe: 320