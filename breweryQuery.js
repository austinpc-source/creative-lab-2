form.addEventListener('submit', (event) => {
  let city = document.getElementById('city');
  let name = document.getElementById('name');
  let type = document.getElementById('type');

  let url = "https://api.openbrewerydb.org/breweries?";
  if (city != "") {
    url += "by_city=" + city + "&";
  }
  if (name != "") {
    url += "by_name=" + name + "&";
  }
  if (type != "") {
    url += "by_type=" + type + "&"
  }

  url += "per_page=20";
});

function getData(url) {
  fetch(url)
  .then (function (response) {
    let breweries = document.getElementById('display breweries');
    for (let i = 0; i < response.length; i++) {
      let brewery = createElement('div');
      let name = createElement('p');
      name.innerHTML = response[i].name;
      brewery.appendChild(name);

      let type = createElement('p');
      type.innerHTML = response[i].brewery_type;
      brewery.appendChild(type);

      let street = createElement('p');
      street.innerHTML = response[i].street;
      brewery.appendChild(street);

      let city = createElement('p');
      city.innerHTML = response[i].city + ", " + response[i].state + " " + response[i].postal_code + " " + response[i].country;
      brewery.appendChild(city);

      let phone = createElement('p');
      phone.innerHTML = response[i].phone;
      brewery.appendChild(phone);

      let website = createElement('a');
      website.innerHTML = "Website"
      website.src = response[i].website_url;
      brewery.appendChild(website);

      breweries.appendChild(brewery);
    }

  });
}
