let pokemonRepository = (function () {
  
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  //returns list of pokemon loaded from api
  function getAll() {
    return pokemonList;
  }
  
  //adds api info to empty pokemonList array (via loadList function)
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  //creates list of buttons with each button containing a single pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('.group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function (event) {
        showDetails(pokemon);
    });
  }
  
  //loads -pokemon list- from api and translates to javascript from json
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
  }
  
  //loads -details- from api and translates to javascript from json
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(' ' + details.types[i].type.name);
        }
      item.weight = details.weight;
      item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(' ' + details.abilities[i].ability.name);
        }
    }).catch(function (e) {
      console.error(e);
    });
  }
  
  //function that loads pokemon data from api and prints them inside the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    showModal(pokemon);
    });
  }
  
  let modalContainer = document.querySelector('#modal-container');

  //function containing modal layout and elements
  function showModal(text) {
    //defines body elements of modal
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerText = text.name;
    let modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';
    let modalFooter = document.querySelector('.modal-footer')
    let modalHeader = document.querySelector('.modal-header');
    let closeX = document.querySelector('.close');
    closeX.addEventListener('click', hideModal);
    let closeButton = document.querySelector('.btn-secondary');
    closeButton.addEventListener('click', hideModal);

    //defines name, height, and types elements in modal
    let imageElement = document.createElement('img');
    imageElement.src = text.imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + text.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + text.weight;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + text.types;

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = 'Abilities: ' + text.abilities;

    modalHeader.appendChild(closeX);
    modalFooter.appendChild(closeButton);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(abilitiesElement);
  
    modalContainer.classList.add('is-visible');
  }
  
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  
  //hides modal when escape key is clicked
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  //hides modal when it is clicked on
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
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

//for each loop that prints all pokemon from api list to the DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});

