function getPokemonCardHTML(pokemon, name, openIndex) {
    const mainType = pokemon.types[0].type.name;
    const imgUrl = pokemon.sprites.other.home.front_default;
    return (
        '<div class="pokemon-card ' +
        mainType +
        '" onclick="openOverlay(' +
        openIndex +
        ')">' +
        '<div class="card-header"><h3>' +
        name +
        "</h3><span>#" +
        pokemon.id +
        "</span></div>" +
        '<div class="card-body"><div class="types">' +
        renderTypeBadges(pokemon.types) +
        "</div>" +
        '<img src="' +
        imgUrl +
        '" alt="' +
        name +
        '"></div></div>'
    );
}

function getOverlayHTML(pokemon, index) {
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const mainType = pokemon.types[0].type.name;
    const imgUrl = pokemon.sprites.other.home.front_default;

    return `
        <div class="detail-card ${mainType}" onclick="event.stopPropagation()">
            <div class="close-btn" onclick="closeOverlay()">✕</div>
            <button class="nav-btn left" onclick="previousPokemon(${index}, event)">‹</button>
            <button class="nav-btn right" onclick="nextPokemon(${index}, event)">›</button>

            <div class="detail-header-section">
                <h2>${name}</h2>
                <span>#${pokemon.id}</span>
                <img src="${imgUrl}" class="detail-img">
            </div>

            <div class="stats-container">

                <div class="tabs">
                    <button class="tab-btn active" id="tab-stats" onclick="showStats(event)">Stats</button>
                    <button class="tab-btn" id="tab-evo" onclick="showEvolution(event, ${index})">Evolution</button>
                </div>

                <div id="stats-view" class="tab-view">
                    ${renderStats(pokemon.stats)}
                </div>

                <div id="evolution-view" class="tab-view d-none">
                    <div id="evolution-container" class="evolution-container">
                        <p id="evo-status" class="evo-status">Klicke auf „Evolution“, um zu laden…</p>
                    </div>
            </div>


            </div>
        </div>
    `;
}

function renderNoPokemonFound(container, loadMoreBtn) {
    container.innerHTML =
        '<div class="error-msg"><h2>WTF!</h2><p>No Pokémon found.</p></div>';
    if (loadMoreBtn) {
        loadMoreBtn.classList.add("d-none");
    }
}
