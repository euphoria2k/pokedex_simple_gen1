const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
	fire: '#ffa473',
	grass: '#9bfc81',
	electric: '#ffdc8a',
	water: '#81d9fc',
	ground: '#dec3b4',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#d08dfc',
	bug: '#f9faa0',
	dragon: '#90b6d4',
	psychic: '#ff85d8',
	flying: '#d4ccff',
	fighting: '#fc9a9d',
	normal: '#d6d6d6',
    fairy: "#f7b2e3"
};

//Stupid typing images aren't hosted online!
const typeImg = {
    bug: "6/67/BugIC_FRLG",
    dark: "3/3a/DarkIC_FRLG",
    dragon: "b/b8/DragonIC_FRLG",
    electric: "5/57/ElectricIC_FRLG",
    fairy: "7/73/FairyIC_Big",
    fighting: "b/bb/FightingIC_FRLG",
    fire: "e/eb/FireIC_RSE",
    flying: "8/87/FlyingIC_FRLG",
    ghost: "b/bf/GhostIC_FRLG",
    grass: "d/dc/GrassIC_FRLG",
    ground: "f/fb/GroundIC_FRLG",
    ice: "1/1b/IceIC_FRLG",
    normal: "c/c2/NormalIC_FRLG",
    poison: "9/9d/PoisonIC_FRLG",
    psychic: "9/94/PsychicIC_FRLG",
    rock: "f/fd/RockIC_FRLG",
    steel: "0/0c/SteelIC_FRLG",
    water: "c/c3/WaterIC_FRLG",
    }

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
    const typing = typeImg[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <span class="number">#${pokemon.id
            .toString()
            .padStart(3, '0')}</span>
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
        </div>
        <div class="info">
            <h3 class="name">${name}</h3>
            <small class="type">Type: <img class="typing" src="https://archives.bulbagarden.net/media/upload/${typing}.png"/></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();