let pokemonList = [
    {name: 'Bulbasaur', height: .7, types: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
];

//loop that prints all pokemonList items names and heights to the DOM
for (let i=0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);
    if (pokemonList[i].height >= 1.5) {
        document.write(` -Wow, that's big!<br>`)
    } else {
        document.write('<br>')
    };
};