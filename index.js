'use strict';

function createResultItem(card) { //append these to ul for each item returned by searches
    let tcgPrice = 4.25;
    let ebayPrice = 5.00;
    
    return `<li class="result"><img src=${card.imageUrl} alt=${card.name} ${card.set} ${card.number}>
    <br>
        <a href=#><p>TCGPlayer: ${tcgPrice}</p></a>
        <a href=#><p>eBay: ${ebayPrice}</p></a>
    </li>`;
}

function displayResults(response) {
    console.log(response);
    let resultHtml='';
    for(const card of response.cards) {
        resultHtml += createResultItem(card);
    }
    console.log(resultHtml);
    $('.results-list').append(resultHtml);
    $('.results').removeClass('hidden');
}

function toPokemonUrl(params) {
    const baseUrl= 'https://api.pokemontcg.io/v1/';
    return baseUrl + `cards?name=${params}`;
}

function getEbayPrice(card) {
    
}

function getTcgplayerPrice(card) {

}

function cardSearch(query) {
    console.log(query);
    const url=toPokemonUrl(query);
    
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      cardSearch(searchTerm);
    });
  }
  
$(watchForm);