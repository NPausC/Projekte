function init() {
    loadFromLocalStorage();
    renderBooks();
}

function renderBooks() {
    const content = document.getElementById("book-container");
    if (!content) return;
    content.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        content.innerHTML += getBookTemplate(i);
    }
}

function toggleLike(index) {
    if (books[index].liked) {
        books[index].likes--;
        books[index].liked = false;
    } else {
        books[index].likes++;
        books[index].liked = true;
    }
    saveAndRefresh();
}

function addComment(index) {
    const nameInput = document.getElementById(`name-input-${index}`);
    const commentInput = document.getElementById(`comment-input-${index}`);

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name !== "" && comment !== "") {
        books[index].comments.push({
            name: name,
            comment: comment,
        });
        nameInput.value = "";
        commentInput.value = "";
        saveAndRefresh();
    }
}

function saveAndRefresh() {
    saveToLocalStorage();
    renderBooks();
}

function saveToLocalStorage() {
    localStorage.setItem("booksData", JSON.stringify(books));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("booksData");
    if (data) {
        books = JSON.parse(data);
    }
}
