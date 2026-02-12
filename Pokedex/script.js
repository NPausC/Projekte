// #region global variables
const allPokemon = [];
const searchResults = [];
let activeIndexes = [];
let currentOffset = 0;
let isSearching = false;
let pokemonContainer;
let searchInputField;
let overlayElement;
let overlayContent;
let loadMoreBtn;
let backBtn;
let loadingScreen;
// #endregion

// #region API
async function init() {
    cacheDomElements();
    await loadNextPokemon();
}

function cacheDomElements() {
    pokemonContainer = document.getElementById("pokemon-list");
    document.getElementById("pokemon-grid");
    searchInputField = document.getElementById("search");
    overlayElement = document.getElementById("overlay");
    overlayContent = document.querySelector(".overlay-content");
    loadMoreBtn = document.getElementById("load-more-btn");
    backBtn = document.getElementById("back-btn");
    loadingScreen = document.getElementById("loading-screen");
}

async function loadNextPokemon() {
    if (isSearching) return;
    toggleLoading(true);
    await delay(800);
    await fetchPokemonData();
    renderPokemonList();
    toggleLoading(false);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPokemonData() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`;
    const response = await fetch(url);
    const responseAsJson = await response.json();
    await getPokemonDetails(responseAsJson.results);
    currentOffset += 20;
}

async function getPokemonDetails(results) {
    for (let i = 0; i < results.length; i++) {
        const response = await fetch(results[i].url);
        const pokemonData = await response.json();
        allPokemon.push(pokemonData);
    }
}

async function loadEvolutionChainByIndex(index) {
    ensureActiveIndexes();
    const pokemon = allPokemon[activeIndexes[index]];
    const status = document.getElementById("evo-status");
    try {
        const names = await fetchEvolutionNames(pokemon);
        handleEvolutionResult(names, status);
    } catch (e) {
        if (status)
            status.textContent = "Evolution konnte nicht geladen werden.";
    }
}

function ensureActiveIndexes() {
    if (!activeIndexes || activeIndexes.length === 0) {
        activeIndexes = allPokemon.map((_, i) => i);
    }
}

async function fetchEvolutionNames(pokemon) {
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();
    const names = [];
    let currentPart = evoData.chain;
    while (currentPart) {
        names.push(currentPart.species.name);
        currentPart = getNextEvolutionPart(currentPart);
    }
    return names;
}

function getNextEvolutionPart(currentPart) {
    const hasEvolution =
        currentPart.evolves_to && currentPart.evolves_to.length > 0;
    return hasEvolution ? currentPart.evolves_to[0] : null;
}

function handleEvolutionResult(names, status) {
    if (names.length === 0) {
        if (status) status.textContent = "Keine Evolution Chain gefunden.";
        return;
    }
    renderEvolutions(names);
}
// #endregion

// #region Rendering
function renderPokemonList() {
    if (!pokemonContainer) return;
    pokemonContainer.innerHTML = "";
    updateActiveIndexes();
    processPokemonListRendering(pokemonContainer);
}

function updateActiveIndexes() {
    if (!isSearching) {
        activeIndexes = allPokemon.map((_, i) => i);
    }
}

function processPokemonListRendering(container) {
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        const name =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        container.innerHTML += getPokemonCardHTML(pokemon, name, i);
    }
}
// #endregion

// #region search
function handleSearch() {
    const searchBtn = document.getElementById("search-btn");
    const tooltip = document.getElementById("search-tooltip");
    if (!searchInputField || !searchBtn || !tooltip) return;
    const query = searchInputField.value.toLowerCase();
    updateSearchUI(query, searchBtn, tooltip);
    if (query.length === 0) resetSearch();
}

function updateSearchUI(query, searchBtn, tooltip) {
    const isShort = query.length < 3;
    searchBtn.disabled = isShort;
    isShort
        ? tooltip.classList.add("show-tooltip")
        : tooltip.classList.remove("show-tooltip");
}

function executeSearch() {
    if (!searchInputField || !pokemonContainer) return;
    prepareSearchState();
    const query = searchInputField.value.toLowerCase();
    performSearchFiltering(query);
    finalizeSearch(pokemonContainer);
}

function prepareSearchState() {
    isSearching = true;
    if (loadMoreBtn) loadMoreBtn.disabled = true;
    searchResults.length = 0;
}

function performSearchFiltering(query) {
    for (let i = 0; i < allPokemon.length; i++) {
        const name = allPokemon[i].name.toLowerCase();
        if (name.includes(query)) searchResults.push(allPokemon[i]);
    }
}

function finalizeSearch(container) {
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
    processSearchResultsRendering(container);
}

function processSearchResultsRendering(container) {
    for (let i = 0; i < searchResults.length; i++) {
        const p = searchResults[i];
        const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
        container.innerHTML += getPokemonCardHTML(p, name, i);
    }
}

function resetSearch() {
    if (searchInputField) searchInputField.value = "";
    isSearching = false;
    if (loadMoreBtn) loadMoreBtn.disabled = false;
    toggleButtons(false);
    renderPokemonList();
}
// #endregion

// #region overlay
function openOverlay(index) {
    if (!overlayElement || !overlayContent) return;
    syncActiveIndexesForOverlay();
    const pokemon = allPokemon[activeIndexes[index]];
    overlayElement.classList.add("show-overlay");
    document.body.style.overflow = "hidden";
    overlayContent.innerHTML = getOverlayHTML(pokemon, index);
}

function syncActiveIndexesForOverlay() {
    if (isSearching) {
        activeIndexes = searchResults.map((p) =>
            allPokemon.findIndex((pokemon) => pokemon.name === p.name),
        );
    }
}

function closeOverlay() {
    overlayElement.classList.remove("show-overlay");
    document.body.style.overflow = "auto";
}

function showStats(event) {
    event.stopPropagation();
    const views = getTabViews();
    if (!views.statsView) return;
    views.statsView.classList.remove("d-none");
    views.evoView.classList.add("d-none");
    views.tabStats.classList.add("active");
    views.tabEvo.classList.remove("active");
}

async function showEvolution(event, index) {
    event.stopPropagation();
    const views = getTabViews();
    if (!views.evoView) return;
    updateEvolutionUI(views);
    if (views.evoView.dataset.loaded === "true") return;
    const status = document.getElementById("evo-status");
    if (status) status.textContent = "Loading Evolution Chain...";
    await loadEvolutionChainByIndex(index);
    views.evoView.dataset.loaded = "true";
}

function getTabViews() {
    return {
        statsView: document.getElementById("stats-view"),
        evoView: document.getElementById("evolution-view"),
        tabStats: document.getElementById("tab-stats"),
        tabEvo: document.getElementById("tab-evo"),
    };
}

function updateEvolutionUI(el) {
    el.statsView.classList.add("d-none");
    el.evoView.classList.remove("d-none");
    el.tabStats.classList.remove("active");
    el.tabEvo.classList.add("active");
}

function renderStats(stats) {
    let html = "<h3>Base Stats</h3>";
    for (let i = 0; i < stats.length; i++) {
        const statName = stats[i].stat.name.toUpperCase();
        html += `<p><b>${statName}:</b> ${stats[i].base_stat}</p>`;
    }
    return html;
}

function renderEvolutions(names) {
    const container = document.getElementById("evolution-container");
    if (!container) return;
    let html = '<h3>Evolution Chain</h3><div class="evo-row">';
    for (let i = 0; i < names.length; i++) {
        const name = names[i].charAt(0).toUpperCase() + names[i].slice(1);
        html += `<div class="evo-item">${name}</div>`;
        if (i < names.length - 1) html += '<div class="evo-arrow">➔</div>';
    }
    container.innerHTML = html + "</div>";
}
// #endregion

// #region Helpers
function renderTypeBadges(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        html += `<span class="type-badge">${types[i].type.name}</span>`;
    }
    return html;
}

function nextPokemon(index, event) {
    event.stopPropagation();
    if (activeIndexes.length === 0) return;
    openOverlay((index + 1) % activeIndexes.length);
}

function previousPokemon(index, event) {
    event.stopPropagation();
    if (activeIndexes.length === 0) return;
    const count = activeIndexes.length;
    openOverlay((index - 1 + count) % count);
}

function toggleButtons(searching) {
    if (!loadMoreBtn || !backBtn) return;
    loadMoreBtn.classList.toggle("d-none", searching);
    backBtn.classList.toggle("d-none", !searching);
}

function toggleLoading(isLoading) {
    if (!loadingScreen || !loadMoreBtn) return;
    loadingScreen.classList.toggle("d-none", !isLoading);
    loadMoreBtn.disabled = isLoading;
}
// #endregion
