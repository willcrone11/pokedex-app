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
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
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
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  
  //function that loads pokemon data from api and prints them inside the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    showModal(pokemon.name, `Height: ${pokemon.height} `, pokemon.imageUrl);
    });
  }
  
  let modalContainer = document.querySelector('#modal-container');

  //function containing modal layout and elements
  function showModal(title, text, image) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
    //adds close button to modal
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    //header with pokemon name
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    
    //text with pokemon height
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    //picture of pokemon
    let imageElement = document.createElement('img');
    imageElement.src = image
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    
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

