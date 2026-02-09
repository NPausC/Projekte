function getPokemonCardHTML(pokemon, name, index) {
    const mainType = pokemon.types[0].type.name;
    const imgUrl = pokemon.sprites.other.home.front_default;
    return (
        '<div class="pokemon-card ' +
        mainType +
        '" onclick="openOverlay(' +
        index +
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

function renderPokemonList() {
    const container =
        document.getElementById("pokemon-list") ||
        document.getElementById("pokemon-grid");

    if (container) {
        container.innerHTML = "";
        for (let i = 0; i < allPokemon.length; i++) {
            const pokemon = allPokemon[i];
            const name =
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            container.innerHTML =
                container.innerHTML + getPokemonCardHTML(pokemon, name, i);
        }
    }
}

function renderSearchResults(container) {
    container.innerHTML = "";
    toggleButtons(true);

    for (let i = 0; i < searchResults.length; i++) {
        const p = searchResults[i];
        const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);

        const originalIndex = allPokemon.findIndex(
            (pokemon) => pokemon.name === p.name,
        );

        container.innerHTML += getPokemonCardHTML(p, name, originalIndex);
    }
}

function renderTypeBadges(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        html =
            html + '<span class="type-badge">' + types[i].type.name + "</span>";
    }
    return html;
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
                ${renderStats(pokemon.stats)}
                <div id="evolution-container" class="evolution-container">
                    <button class="evo-load-btn" onclick="loadEvolutionChainByIndex(${index})">
                        Load Evolution Chains
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderStats(stats) {
    let html = "<h3>Base Stats</h3>";
    for (let i = 0; i < stats.length; i++) {
        html =
            html +
            "<p><b>" +
            stats[i].stat.name.toUpperCase() +
            ":</b> " +
            stats[i].base_stat +
            "</p>";
    }
    return html;
}

function renderEvolutions(names) {
    const container = document.getElementById("evolution-container");

    if (container) {
        let html = '<h3>Evolution Chain</h3><div class="evo-row">';

        for (let i = 0; i < names.length; i++) {
            const name = names[i].charAt(0).toUpperCase() + names[i].slice(1);

            html = html + '<div class="evo-item">' + name + "</div>";

            if (i < names.length - 1) {
                html = html + '<div class="evo-arrow">➔</div>';
            }
        }

        html = html + "</div>";
        container.innerHTML = html;
    }
}

function renderNoPokemonFound(container, loadMoreBtn) {
    container.innerHTML =
        '<div class="error-msg"><h2>WTF!</h2><p>No Pokémon found.</p></div>';
    if (loadMoreBtn) {
        loadMoreBtn.classList.add("d-none");
    }
}
