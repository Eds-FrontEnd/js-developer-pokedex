const pokemonL = document.querySelector("#pokemonlist");
const loadMoreButton = document.querySelector("#loadMoreButton");
const limit = 6;
let offset = 0;
const maxRecords = 245;

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const convertPokemonToList = (pokemon) => {
    return`
        <div class="idKey" data-key = ${pokemon.number}>
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number.toFixed(0).replace(".", "")}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type)=> `<li class="type ${type}"> ${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </div>
    `
}

// Button Carregar Mais
function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newList = pokemonList.map((pokemon) => convertPokemonToList(pokemon));

        const newHtml = newList.join("");
        pokemonL.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", ()=>{
    offset += limit;

    const qtdRecord = offset + limit;

    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - qtdRecord;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
        document.querySelector("#buttonUp").style.display="block";
        loadPokemonItems(offset, limit);

    } else {

        loadPokemonItems(offset, limit);
    }

});

const btnUpTop = document.querySelector("#buttonUp");
btnUpTop.addEventListener("click", ()=>{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
});

