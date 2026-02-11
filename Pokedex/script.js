// #region global variables
const allPokemon = [];
const searchResults = [];
let currentOffset = 0;
// #endregion

// #region API
async function init() {
    await loadNextPokemon();
}

async function loadNextPokemon() {
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
    const pokemon = allPokemon[index];
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();

    const evoResponse = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoResponse.json();

    const names = [];
    let currentPart = evoData.chain;

    while (currentPart !== null && currentPart !== undefined) {
        names.push(currentPart.species.name);
        currentPart = currentPart.evolves_to[0];
    }

    renderEvolutions(names);
}
// #endregion

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

function resetSearch() {
    const searchInput = document.getElementById("search");
    if (searchInput) searchInput.value = "";

    toggleButtons(false);
    renderPokemonList();
}
// #endregion

// #region overlay
function openOverlay(index) {
    const pokemon = allPokemon[index];
    const overlay = document.getElementById("overlay");
    const content = document.querySelector(".overlay-content");

    if (overlay && content) {
        overlay.classList.add("show-overlay");
        document.body.style.overflow = "hidden";
        content.innerHTML = getOverlayHTML(pokemon, index);
    }
}

function closeOverlay() {
    document.getElementById("overlay").classList.remove("show-overlay");
    document.body.style.overflow = "auto";
}
// #endregion

function nextPokemon(index, event) {
    event.stopPropagation();
    const nextIndex = (index + 1) % allPokemon.length;
    openOverlay(nextIndex);
}

function previousPokemon(index, event) {
    event.stopPropagation();
    const prevIndex = (index - 1 + allPokemon.length) % allPokemon.length;
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
