'use strict';

function createResultItem(card) { //append these to ul for each item returned by searches
    const tcgPrice = '';
    const ebayPrice = '';

    console.log(getEbayInfo(card));
    
    return `<li class="result"><img src=${card.imageUrl} alt=${card.name} ${card.set} ${card.number}>
    <br>
        <a href=#><p>TCGPlayer: ${tcgPrice}</p></a>
        <a href=#><p>eBay: ${ebayPrice}</p></a>
    </li>`;
}

function displayResults(response) {
    let resultHtml='';
    for(const card of response.cards) {
        resultHtml += createResultItem(card);
    }
    $('.results-list').append(resultHtml);
    $('.results').removeClass('hidden');
}

function toPokemonUrl(params) {
    const baseUrl = 'https://api.pokemontcg.io/v1/';
    return baseUrl + `cards?name=${params}`;
}

function getEbayInfo(card) {
    const appID = 'KyleStyr-cards-PRD-0e64be0f2-f6e14bc0';
    //const ebayUrl = `https://svcs.ebay.com/services/search/FindingService/v1?`;
/*
    const ebayJson = {
      "findItemsByKeywordsRequest": {
        "xmlns": "http://www.ebay.com/marketplace/search/v1/services",
        "keywords": "harry potter phoenix",
        "paginationInput": { "entriesPerPage": "2" }
      }
    }*/
    var settings = {
      "url": "https://svcs.ebay.com/services/search/FindingService/v1",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "X-EBAY-SOA-SECURITY-APPNAME": "KyleStyr-cards-PRD-0e64be0f2-f6e14bc0",
        "X-EBAY-SOA-OPERATION-NAME": "findItemsByKeywords",
        "X-EBAY-SOA-REQUEST-DATA-FORMAT": "JSON",
        "Content-Type": "application/json",
        "Cookie": "dp1=bbl/US63584580^; nonsession=BAQAAAXQoEGjGAAaAADMABWF3EgA5NTExOADKACBjWEWANjE2ZDI2NzIxNzUwYTEyMGVjMzVjZjNhZmY5MDI1NjMAywABX5XliDGvQ1cMyqwoJv5Pf4vmFf0IDhXLVA**; s=CgAD4ACBflzAANjE2ZDI2NzIxNzUwYTEyMGVjMzVjZjNhZmY5MDI1NjNsD7Zp; ebay=%5Esbf%3D%23000000%5E; ak_bmsc=17601DD874FB0ADA7AC1E43F5E32F92A17C5332E6F11000080DE955FFCEDC16C~plGafpl131BFitBZ6hH6Id3moCJwvbuFRH6U7zcHBcRpB55M7vDf0uO1OelA7WIG1O+Gci2+/mFAqUTlSA84K9QHyEhKEHkojZzHni3ZbpwwUhYQHRTKOefQ+c8lNGDOCr7GOL+vz7+/VEmUPzKKq3uLIIazFgq7p+M9HJzAcoqbSUht5YR8WwHtLtlB3+9ZWLMAiJ0xeJFDCL8tIJou9Y5JrJjrruLpp6kXGOsYk4ZUs="
      },
      "data": JSON.stringify({"findItemsByKeywordsRequest":{"jsonns":"http://www.ebay.com/marketplace/search/v1/services","keywords":"wailord-ex primal clash","paginationInput":{"entriesPerPage":"10"}}}),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    /*let requestOptions = {
      method: 'GET',
      mode: 'cors'
    };*/
    /*
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    */
}

function getTcgplayerInfo(card) {
    const key = '';
}

function cardSearch(query) {
    console.log(query);
    const url = toPokemonUrl(query);
    
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