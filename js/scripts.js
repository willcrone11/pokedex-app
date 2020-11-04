let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function getAll() {
        return pokemonList;
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }
    function loadList() {
        return fetch(apiUrl).then(function (response) {
        return response.json();
        }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
            name: item.name,
            detailsUrl: item.url
            };
            add(pokemon);
        });
        }).catch(function (e) {
        console.error(e);
        })
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    showModal(pokemon.name, `Height: ${pokemon.height} `, pokemon.imageUrl);
    });
  }
  let modalContainer = document.querySelector('#modal-container');

  function showModal(title, text, image) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.src = image
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
        return response.json();
        }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        }).catch(function (e) {
        console.error(e);
        });
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
  });
  
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});
