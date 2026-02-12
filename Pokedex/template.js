function getPokemonMainType(pokemon) {
    return pokemon.types[0].type.name;
}

function getPokemonImgUrl(pokemon) {
    return pokemon.sprites.other.home.front_default;
}

function buildPokemonCardHeader(name, pokemon) {
    return '<div class="card-header"><h3>' + name + "</h3><span>#" + pokemon.id + "</span></div>";
}

function buildPokemonCardBody(pokemon, name, imgUrl) {
    return (
        '<div class="card-body"><div class="types">' +
        renderTypeBadges(pokemon.types) +
        "</div>" +
        '<img src="' +
        imgUrl +
        '" alt="' +
        name +
        '"></div>'
    );
}

function getPokemonCardHTML(pokemon, name, openIndex) {
    const mainType = getPokemonMainType(pokemon);
    const imgUrl = getPokemonImgUrl(pokemon);
    const header = buildPokemonCardHeader(name, pokemon);
    const body = buildPokemonCardBody(pokemon, name, imgUrl);
    return (
        '<div class="pokemon-card ' +
        mainType +
        '" onclick="openOverlay(' +
        openIndex +
        ')">' +
        header +
        body +
        "</div>"
    );
}

function capFirst(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function buildOverlayNav(index) {
    return `
        <div class="close-btn" onclick="closeOverlay()">✕</div>
        <button class="nav-btn left" onclick="previousPokemon(${index}, event)">‹</button>
        <button class="nav-btn right" onclick="nextPokemon(${index}, event)">›</button>
    `;
}

function buildOverlayHeader(name, pokemon, imgUrl) {
    return `
        <div class="detail-header-section">
            <h2>${name}</h2>
            <span>#${pokemon.id}</span>
            <img src="${imgUrl}" class="detail-img">
        </div>
    `;
}

function buildOverlayTabs(index) {
    return `
        <div class="tabs">
            <button class="tab-btn active" id="tab-stats" onclick="showStats(event)">Stats</button>
            <button class="tab-btn" id="tab-evo" onclick="showEvolution(event, ${index})">Evolution</button>
        </div>
    `;
}

function buildOverlayStatsView(pokemon) {
    return `
        <div id="stats-view" class="tab-view">
            ${renderStats(pokemon.stats)}
        </div>
    `;
}

function buildOverlayEvolutionView() {
    return `
        <div id="evolution-view" class="tab-view d-none">
            <div id="evolution-container" class="evolution-container">
                <p id="evo-status" class="evo-status">Klicke auf „Evolution“, um zu laden…</p>
            </div>
        </div>
    `;
}

function buildOverlayStatsContainer(pokemon, index) {
    const tabs = buildOverlayTabs(index);
    const stats = buildOverlayStatsView(pokemon);
    const evo = buildOverlayEvolutionView();
    return `<div class="stats-container">${tabs}${stats}${evo}</div>`;
}

function getOverlayHTML(pokemon, index) {
    const name = capFirst(pokemon.name);
    const mainType = getPokemonMainType(pokemon);
    const imgUrl = getPokemonImgUrl(pokemon);
    const nav = buildOverlayNav(index);
    const header = buildOverlayHeader(name, pokemon, imgUrl);
    const stats = buildOverlayStatsContainer(pokemon, index);
    return `<div class="detail-card ${mainType}" onclick="event.stopPropagation()">${nav}${header}${stats}</div>`;
}

function renderNoPokemonFound(container, loadMoreBtn) {
    container.innerHTML = '<div class="error-msg"><h2>WTF!</h2><p>No Pokémon found.</p></div>';
    if (loadMoreBtn) loadMoreBtn.classList.add("d-none");
}