'use strict';

function createResultItem(card) { //append these to ul for each item returned by searches
    const tcgPrice = '';
    const ebayPrice = '';

    console.log(getTcgplayerInfo(card));
    
    return `<li class="result"><img src=${card.imageUrl} alt=${card.name} ${card.set} ${card.number}>
    <br>
        <a href=#><p>TCGPlayer: ${tcgPrice}</p></a>
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

/*
function getEbayInfo(card) {
    const appID = 'KyleStyr-cards-PRD-0e64be0f2-f6e14bc0';
    //const ebayUrl = `https://svcs.ebay.com/services/search/FindingService/v1?`;

    const ebayJson = {
      "findItemsByKeywordsRequest": {
        "xmlns": "http://www.ebay.com/marketplace/search/v1/services",
        "keywords": "harry potter phoenix",
        "paginationInput": { "entriesPerPage": "2" }
      }
    }
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
    };
    
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
  }
    */


function getTcgplayerInfo(card) {
    const publicKey = '8625d225-a4b5-427d-802a-3615eb776c49';
    const privateKey = '96820297-6a18-4e88-9039-233e7974050f';
    
    const token = {"access_token":"9iGFKs2u-02D4vCK0J28CegHB2oyDYjuCOtiYpE9ccZrj7NkO2tIC9wawZxmKpN4hexLMGcYRLd2I0goFHZXVyDuFVuO6hvK9Vvlt80y4w-ynw-ahyYZ7JD1vBktxCqOk4IdENoafH2QH_3Iuli6lGZ3C6tcgMHgN3eDkuWNkC6bblwS5HRaPWxW3O1XW3wKYit9ojhzT5ltn1RPq1LjK04F4pS_mf0dVwaTWwjmMyGpZpf6EDjuMKMYZI0ACVMzq-8BslJsgJxGgq1L5uY1H1kPX5cZFOUMRpFRym2y2tBhFGeTwxDxRghX_iSPmHxxu9rbTQ",
    "token_type":"bearer",
    "expires_in":1209599,
    "userName":"8625d225-a4b5-427d-802a-3615eb776c49"};

    fetch("https://api.tcgplayer.com/catalog/categories", {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": `bearer ${token.access_token}`
    }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
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