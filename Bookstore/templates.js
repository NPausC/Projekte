function getBookTemplate(i) {
    const book = books[i];
    return `
        <div class="book-card">
            <div class="card-top-content">
                <h2>${book.name}</h2>
                <img src="${book.image}" class="cover" alt="Buchcover von ${book.name}">
                <div class="book-info">
                    <p><b>Autor:</b> ${book.author}</p>
                    <p><b>Jahr:</b> ${book.publishedYear}</p>
                    <p><b>Genre:</b> ${book.genre}</p>
                </div>
            </div>

            <div class="comment-section">
                <h3>Kommentare:</h3>
                <div class="comments-list-container">
                    ${renderComments(i)}
                </div>
                <div class="input-area">
                    <input id="name-input-${i}" placeholder="Dein Name...">
                    <input id="comment-input-${i}" placeholder="Dein Kommentar...">
                    <button onclick="addComment(${i})">Senden</button>
                </div>
            </div>

            <div class="price-like">
                <span class="price-tag">${book.price.toFixed(2)} €</span>
                <span onclick="toggleLike(${i})" class="heart">
                    ${book.likes} ${book.liked ? '❤️' : '🤍'}
                </span>
            </div>
        </div>
    `;
}

function renderComments(index) {
    let commentHtml = '';
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