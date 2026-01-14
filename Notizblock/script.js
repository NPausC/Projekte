const notesTitles = [];
const notes = [];

const archivNotesTitles = [];
const archivNotes = [];

const trashNotesTitles = [];
const trashNotes = [];

function init() {
    getFromLocalStorage();
    renderAll();
}

function renderAll() {
    renderNotes();
    renderArchivNotes();
    renderTrashNotes();
}

function addNote() {
    const titleInput = document.getElementById("note_title");
    const contentInput = document.getElementById("note_content");

    if (titleInput.value != "") {
        if (contentInput.value != "") {
            notesTitles.push(titleInput.value);
            notes.push(contentInput.value);

            titleInput.value = "";
            contentInput.value = "";

            saveToLocalStorage();
            renderNotes();
        }
    }
}

function renderNotes() {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }
}

function renderArchivNotes() {
    const archivRef = document.getElementById("archiv_content");
    archivRef.innerHTML = "";

    for (let i = 0; i < archivNotes.length; i++) {
        archivRef.innerHTML += getArchivNoteTemplate(i);
    }
}

function renderTrashNotes() {
    const trashRef = document.getElementById("trash_content");
    trashRef.innerHTML = "";

    for (let i = 0; i < trashNotes.length; i++) {
        trashRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function moveNoteToArchiv(index) {
    let title = notesTitles.splice(index, 1);
    let content = notes.splice(index, 1);

    archivNotesTitles.push(title[0]);
    archivNotes.push(content[0]);

    saveToLocalStorage();
    renderAll();
}

function moveNoteToTrash(index) {
    let title = notesTitles.splice(index, 1);
    let content = notes.splice(index, 1);

    trashNotesTitles.push(title[0]);
    trashNotes.push(content[0]);

    saveToLocalStorage();
    renderAll();
}

function moveArchivNoteToTrash(index) {
    let title = archivNotesTitles.splice(index, 1);
    let content = archivNotes.splice(index, 1);

    trashNotesTitles.push(title[0]);
    trashNotes.push(content[0]);

    saveToLocalStorage();
    renderAll();
}

function deleteNoteFinal(index) {
    trashNotesTitles.splice(index, 1);
    trashNotes.splice(index, 1);

    saveToLocalStorage();
    renderTrashNotes();
}

function saveToLocalStorage() {
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("archivTitles", JSON.stringify(archivNotesTitles));
    localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
    localStorage.setItem("trashTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function getFromLocalStorage() {
    let savedTitles = JSON.parse(localStorage.getItem("notesTitles"));
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    if (savedTitles && savedNotes) {
        notesTitles.length = 0;
        notes.length = 0;
        notesTitles.push(...savedTitles);
        notes.push(...savedNotes);
    }

    let savedArchivTitles = JSON.parse(localStorage.getItem("archivTitles"));
    let savedArchivNotes = JSON.parse(localStorage.getItem("archivNotes"));
    if (savedArchivTitles && savedArchivNotes) {
        archivNotesTitles.length = 0;
        archivNotes.length = 0;
        archivNotesTitles.push(...savedArchivTitles);
        archivNotes.push(...savedArchivNotes);
    }
}
