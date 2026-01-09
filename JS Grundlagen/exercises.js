let vorname = "Max";
let nachname = "Mustermann";


function fullName (vorname, nachname) {
    return vorname + " " + nachname;
}

console.log(fullName(vorname, nachname));


function capitalizeLetters (Text) {
    return Text.toUpperCase();    
}

console.log(capitalizeLetters("bAnanE"))


function countCharacters (Text) {
    const anzahl = Text.length;

    return anzahl;
}

console.log (countCharacters("banana"));

