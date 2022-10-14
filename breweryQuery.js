function breweryObject(json) {
  let brewery = document.createElement('div');
  let name = document.createElement('p');
  name.innerHTML = json.name;
  brewery.appendChild(name);

  let type = document.createElement('p');
  type.innerHTML = json.brewery_type;
  brewery.appendChild(type);

  let street = document.createElement('p');
  street.innerHTML = json.street;
  brewery.appendChild(street);

  let city = document.createElement('p');
  city.innerHTML = json.city + ", " + json.state + " " + json.postal_code + " " + json.country;
  brewery.appendChild(city);

  let phone = document.createElement('p');
  phone.innerHTML = json.phone;
  brewery.appendChild(phone);

  let website = document.createElement('a');
  website.innerHTML = "Website"
  website.href = json.website_url;
  brewery.appendChild(website);

  return brewery;
}

function getData(url) {
  fetch(url)
  .then (function (response) {
    return response.json();
  }).then(function (json) {
    let breweries = document.getElementById('display_breweries');
    breweries.innerHTML = "";
    for (let i = 0; i < json.length; i++) {
      breweries.appendChild(breweryObject(json[i]));
    }

  });
}

document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault();
  let type = document.getElementById('type').value;
  let name = document.getElementById('name').value;
  let city = document.getElementById('city').value;
  let state = document.getElementById('state').value;

  let url = "https://api.openbrewerydb.org/breweries?";

  if (type != "") {
    url += "by_type=" + type + "&";
  }
  if (name != "") {
    url += "by_name=" + name + "&";
  }
  if (city != "") {
    url += "by_city=" + city + "&";
  }
  if (state != "") {
    url += "by_state=" + state + "&";
  }

  url += "per_page=20";
  getData(url);
});

document.getElementById('randomize').addEventListener('click', function(event) {
  event.preventDefault();
  let size = document.getElementById('size').value;
  let url = "https://api.openbrewerydb.org/breweries/random";

  if (size != "") {
    url += "?size=" + size;
  }
  getData(url);
})

document.getElementById('multiple').addEventListener('click', function (event) {
  event.preventDefault();

  let queryForm = document.getElementById('listOptions');
  let btn = document.getElementById('submit');
  queryForm.innerHTML = "";
  let cityLabel = document.createElement('label');
  cityLabel.setAttribute('for', 'city');
  cityLabel.innerHTML = 'City:';
  queryForm.appendChild(cityLabel);
  let cityInput = document.createElement('input');
  cityInput.setAttribute('id', 'city');
  cityInput.setAttribute('type', 'text');
  cityInput.setAttribute('name', 'city');
  cityInput.setAttribute('value', '');
  queryForm.appendChild(cityInput);

  let nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'city');
  nameLabel.innerHTML = 'Brewery:';
  queryForm.appendChild(nameLabel);
  let nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('value', '');
  queryForm.appendChild(nameInput);

  let typeLabel = document.createElement('label');
  typeLabel.setAttribute('for', 'city');
  typeLabel.innerHTML = 'Brewery Type:';
  queryForm.appendChild(typeLabel);
  let typeInput = document.createElement('input');
  typeInput.setAttribute('id', 'type');
  typeInput.setAttribute('type', 'text');
  typeInput.setAttribute('name', 'type');
  typeInput.setAttribute('value', '');
  queryForm.appendChild(typeInput);
  queryForm.appendChild(btn);
});
