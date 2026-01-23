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

function renderCommentsList(index) {
    let commentHtml = "";
    let comments = books[index].comments;

    if (comments.length === 0) {
        return '<p class="no-comments">Noch keine Kommentare...</p>';
    }

    for (let j = 0; j < comments.length; j++) {
        commentHtml += `
            <div class="single-comment">
                <strong>${comments[j].name}:</strong> ${comments[j].comment}
            </div>
        `;
    }
    return commentHtml;
}

function toggleLike(index) {
    const book = books[index];
    book.liked = !book.liked;
    book.likes += book.liked ? 1 : -1;
    
    saveToLocalStorage();
    
    const heartElement = document.querySelector(`#book-${index} .heart`);
    if (heartElement) {
        heartElement.innerHTML = `${book.likes} ${book.liked ? "❤️" : "🤍"}`;
    }
}

function addComment(index) {
    const nameInput = document.getElementById(`name-input-${index}`);
    const commentInput = document.getElementById(`comment-input-${index}`);
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name && comment) {
        books[index].comments.push({ name, comment });
        saveToLocalStorage();
        
        const container = document.querySelector(`#book-${index} .comments-list-container`);
        if (container) {
            container.innerHTML = renderCommentsList(index);
        }
        
        nameInput.value = "";
        commentInput.value = "";
    }
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