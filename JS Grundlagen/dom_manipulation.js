// let title = document.getElementById('website_title');

// console.log(title.innerHTML);

// title.innerHTML = "neuer Titel";

document.getElementById('test_div').innerHTML = '<p>test</p>'

document.getElementById('test_div').classList.add('green_bg');
// document.getElementById('test_div').classList.remove('green_bg');
// document.getElementById('test_div').classList.toogle('green_bg');

const container = document.getElementById("button-container")

container.innerHTML = '<button id="mein-Test-Button">Klick mich!</button>';

document.getElementById('test_input').setAttribute('type', 'text');
document.getElementById('test_input').setAttribute('value', '590');

console.log(document.getElementById('test_input').value);



const textElement = document.getElementById("meinText");

textElement.setAttribute("title", "Ich bin ein Tooltip!"); //ich kann man Elementen ein Atrribut geben. In diesem Fall Hovert man mit der Maus über den Text, es erscheint der Title 

console.log(textElement);

textElement.setAttribute("class", "meine-super-klasse");

const meinElement = document.getElementById("meinText");


//const meinElement = document.getElementById("meinText");




meinElement.classList.add("fett"); 

meinElement.classList.add("gruen");
console.log("Nach classList.add:", meinElement.className); 

meinElement.setAttribute("class", "blau");
console.log("Nach setAttribute:", meinElement.className); 


//Aufgabe Modul 06 Vorbereitung Video

function toggleDNone(our_p_tag) {
    document.getElementById(our_p_tag).classList.toggle('d_none');
}

//Events wichtige Funktion 

function loggeInput() {
    const input = document.getElementById('meinEingabefeld');
    
    console.log(input.value);
}

//⚠️Beim Googlen oder Recherchieren kannst du auf Methoden stoßen, die wir hier nicht behandeln. Der folgende Hinweis dient dazu, dich darüber zu informieren und Bewusstsein zu schaffen. Es soll jedoch keinesfalls ein Anreiz sein, sich diese Technik jetzt schon anzusehen. Wir empfehlen dir ausdrücklich, die hier gezeigten Techniken zu nutzen, um erst einmal zu starten!

// Weitere Methode
// Neben .innerHTML gibt es auch komplexere Techniken, um HTML-Elemente zu erzeugen.

// Eine bekannte Methode ist, Elemente mit einer Funktion wie createElement zu erstellen und sie anschließend mit appendChild hinzuzufügen.

// Diese Technik ist jedoch eher fortgeschritten und wird besonders zu Beginn nicht empfohlen. Sie eignet sich besser für später, wenn du mehr Erfahrung hast.

// Von daher bitte verwende dies vorerst nicht!

