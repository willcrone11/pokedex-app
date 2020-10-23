let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: .7, types: ['grass', 'poison']},
        {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
        {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
    ];
    function getAll() {
        return pokemonList;
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    return {
        getAll: getAll,
        add: add
    };
})();

//forEach loop that prints all pokemonList items names and heights to the DOM
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(`${pokemon.name} (height: ${pokemon.height}) `);
    if (pokemon.height >= 1.5) {
        document.write(` -Wow, that's big!<br>`)
    } else {
        document.write('<br>')
    };
});
