function getNoteTemplate(indexNote) {
    return `
        <div class="note-card">
            <h3>${notesTitles[indexNote]}</h3>
            <p>${notes[indexNote]}</p>
            <div class="card-footer">
                <button class="btn" onclick="moveNoteToTrash(${indexNote})">X</button>
                <button class="btn" onclick="moveNoteToArchiv(${indexNote})">A</button>
            </div>
        </div>
    `;
}

function getArchivNoteTemplate(indexNote) {
    return `
        <div class="note-card">
            <h3>${archivNotesTitles[indexNote]}</h3>
            <p>${archivNotes[indexNote]}</p>
            <div class="card-footer">
                <button class="btn" onclick="moveArchivNoteToTrash(${indexNote})">X</button>
                <button class="btn" onclick="moveArchivToNotes(${indexNote})">⬆</button>
            </div>
        </div>
    `;
}

function getTrashNoteTemplate(indexNote) {
    return `
        <div class="note-card">
            <h3>${trashNotesTitles[indexNote]}</h3>
            <p>${trashNotes[indexNote]}</p>
            <div class="card-footer">
                <button class="btn" onclick="deleteNoteFinal(${indexNote})">X</button>
                <button class="btn" onclick="moveTrashToArchiv(${indexNote})">⬆</button>
            </div>
        </div>
    `;
}
