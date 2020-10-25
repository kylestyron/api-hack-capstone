'use strict';

function createResultItem(card) { //append these to ul for each item returned by searches
    const tcgCard = '';
    const ebayCard = '';

    console.log(getEbayInfo(card));
    
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
    const baseUrl = 'https://api.pokemontcg.io/v1/';
    return baseUrl + `cards?name=${params}`;
}

function getEbayInfo(card) {
    const appID = 'KyleStyr-cards-PRD-0e64be0f2-f6e14bc0';
    const url = `https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=KyleStyr-cards-PRD-0e64be0f2-f6e14bc0&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${card.name}+${card.set}&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0`;

    let requestOptions = {
      method: 'GET',
      mode: 'cors'
    };

    fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getTcgplayerInfo(card) {
    const key = '';
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