// #region global variables
const allPokemon = [];
const searchResults = [];
let activeIndexes = [];
let currentOffset = 0;
let isSearching = false;
// #endregion

// #region API
async function init() {
    await loadNextPokemon();
}

async function loadNextPokemon() {
    if (isSearching) return;
    toggleLoading(true);
    await new Promise(function (resolve) {
        setTimeout(resolve, 800);
    });
    const url =
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + currentOffset;
    const response = await fetch(url);
    const responseAsJson = await response.json();
    await getPokemonDetails(responseAsJson.results);
    currentOffset = currentOffset + 20;
    renderPokemonList();
    toggleLoading(false);
}

async function getPokemonDetails(results) {
    for (let i = 0; i < results.length; i++) {
        const pokemonUrl = results[i].url;
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json();
        allPokemon.push(pokemonData);
    }
}

async function loadEvolutionChainByIndex(index) {
    if (!activeIndexes || activeIndexes.length === 0) {
        activeIndexes = allPokemon.map((_, i) => i);
    }
    const allIndex = activeIndexes[index];
    const pokemon = allPokemon[allIndex];
    const status = document.getElementById("evo-status");
    try {
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();
        const evoResponse = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoResponse.json();
        const names = [];
        let currentPart = evoData.chain;
        while (currentPart) {
            names.push(currentPart.species.name);
            if (currentPart.evolves_to && currentPart.evolves_to.length > 0) {
                currentPart = currentPart.evolves_to[0];
            } else {
                currentPart = null;
            }
        }
        if (names.length === 0) {
            if (status) status.textContent = "Keine Evolution Chain gefunden.";
            return;
        }
        renderEvolutions(names);
    } catch (e) {
        if (status)
            status.textContent = "Evolution konnte nicht geladen werden.";
    }
}
// #endregion

function renderPokemonList() {
    const container = document.getElementById("pokemon-list");
    if (!container) return;
    container.innerHTML = "";
    if (!isSearching) {
        activeIndexes = allPokemon.map((_, i) => i); // <- NUR wenn nicht gesucht wird
    }
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        const name =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        container.innerHTML += getPokemonCardHTML(pokemon, name, i);
    }
}

// #region search
function handleSearch() {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("search-btn");
    const tooltip = document.getElementById("search-tooltip");
    if (!searchInput || !searchBtn || !tooltip) return;
    const query = searchInput.value.toLowerCase();
    if (query.length < 3) {
        searchBtn.disabled = true;
        tooltip.classList.add("show-tooltip");
    } else {
        searchBtn.disabled = false;
        tooltip.classList.remove("show-tooltip");
    }
    if (query.length === 0) {
        resetSearch();
    }
}

function executeSearch() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;
    isSearching = true; // <- NEU: Suchmodus aktiv
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) loadMoreBtn.disabled = true; // <- NEU: Sicherheit (auch wenn versteckt)
    const query = searchInput.value.toLowerCase();
    const container =
        document.getElementById("pokemon-list") ||
        document.getElementById("pokemon-grid");
    if (!container) return;
    searchResults.length = 0;
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemonName = allPokemon[i].name.toLowerCase();
        if (pokemonName.includes(query)) {
            searchResults.push(allPokemon[i]);
        }
    }
    if (searchResults.length === 0) {
        renderNoPokemonFound(container);
        toggleButtons(true);
    } else {
        renderSearchResults(container);
    }
}

function renderSearchResults(container) {
    container.innerHTML = "";
    toggleButtons(true);
    activeIndexes = searchResults.map((p) =>
        allPokemon.findIndex((pokemon) => pokemon.name === p.name),
    );
    for (let i = 0; i < searchResults.length; i++) {
        const p = searchResults[i];
        const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
        container.innerHTML += getPokemonCardHTML(p, name, i);
    }
}

function resetSearch() {
    const searchInput = document.getElementById("search");
    if (searchInput) searchInput.value = "";
    isSearching = false;
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) loadMoreBtn.disabled = false;
    toggleButtons(false);
    renderPokemonList();
}
// #endregion

// #region overlay
function openOverlay(index) {
    const overlay = document.getElementById("overlay");
    const content = document.querySelector(".overlay-content");
    if (!overlay || !content) return;
    if (isSearching) {
        activeIndexes = searchResults.map((p) =>
            allPokemon.findIndex((pokemon) => pokemon.name === p.name),
        );
    }
    const allIndex = activeIndexes[index];
    const pokemon = allPokemon[allIndex];
    overlay.classList.add("show-overlay");
    document.body.style.overflow = "hidden";
    content.innerHTML = getOverlayHTML(pokemon, index);
}
function closeOverlay() {
    document.getElementById("overlay").classList.remove("show-overlay");
    document.body.style.overflow = "auto";
}

function showStats(event) {
    event.stopPropagation();

    const statsView = document.getElementById("stats-view");
    const evoView = document.getElementById("evolution-view");
    const tabStats = document.getElementById("tab-stats");
    const tabEvo = document.getElementById("tab-evo");
    if (!statsView || !evoView || !tabStats || !tabEvo) return;
    statsView.classList.remove("d-none");
    evoView.classList.add("d-none");
    tabStats.classList.add("active");
    tabEvo.classList.remove("active");
}

async function showEvolution(event, index) {
    event.stopPropagation();
    const statsView = document.getElementById("stats-view");
    const evoView = document.getElementById("evolution-view");
    const tabStats = document.getElementById("tab-stats");
    const tabEvo = document.getElementById("tab-evo");
    if (!statsView || !evoView || !tabStats || !tabEvo) return;
    statsView.classList.add("d-none");
    evoView.classList.remove("d-none");
    tabStats.classList.remove("active");
    tabEvo.classList.add("active");
    if (evoView.dataset.loaded === "true") return;
    const status = document.getElementById("evo-status");
    if (status) status.textContent = "Loading Evolution Chain...";
    await loadEvolutionChainByIndex(index);
    evoView.dataset.loaded = "true";
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
// #endregion

function renderTypeBadges(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        html =
            html + '<span class="type-badge">' + types[i].type.name + "</span>";
    }
    return html;
}

function nextPokemon(index, event) {
    event.stopPropagation();
    if (activeIndexes.length === 0) return;
    const nextIndex = (index + 1) % activeIndexes.length;
    openOverlay(nextIndex);
}

function previousPokemon(index, event) {
    event.stopPropagation();
    if (activeIndexes.length === 0) return;
    const prevIndex = (index - 1 + activeIndexes.length) % activeIndexes.length;
    openOverlay(prevIndex);
}

function toggleButtons(isSearching) {
    const loadMoreBtn = document.getElementById("load-more-btn");
    const backBtn = document.getElementById("back-btn");
    if (loadMoreBtn && backBtn) {
        if (isSearching) {
            loadMoreBtn.classList.add("d-none");
            backBtn.classList.remove("d-none");
        } else {
            loadMoreBtn.classList.remove("d-none");
            backBtn.classList.add("d-none");
        }
    }
}

function toggleLoading(isLoading) {
    const loadingScreen = document.getElementById("loading-screen");
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (isLoading === true) {
        if (loadingScreen) loadingScreen.classList.remove("d-none");
        if (loadMoreBtn) loadMoreBtn.disabled = true;
    } else {
        if (loadingScreen) loadingScreen.classList.add("d-none");
        if (loadMoreBtn) loadMoreBtn.disabled = false;
    }
}
