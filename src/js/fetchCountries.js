import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (data.length > 2 && data.length < 10) {
        countryList.innerHTML = data.reduce(
          (result, item) =>
            (result += `<li class="country-list__item">
               <img class="country-icon" src="${item.flags[0]}"/>
                <p>${item.name.official}</p>
          </li>`),
          ''
        );
        countryInfo.innerHTML = '';
      } else {
        const country = data[0];
        const languages = [];
        for (let key in country.languages) {
          languages.push(' ' + country.languages[key]);
        }
        countryList.innerHTML = `<li class="country-list__item">
             <img class="country-icon" src="${country.flags[0]}"/>
              <p class="coutry-name">${country.name.official}</p>
        </li>`;
        countryInfo.innerHTML = `
          <ul class="country-info__list">
          <li class="country-info__item"><p><span class="description">capital</span>: ${country.capital}</p></li>
          <li class="country-info__item"><p><span class="description">population</span>: ${country.population}</p></li>
          <li class="country-info__item"><p><span class="description">languages</span>:${languages}</p></li>
          </ul>`;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

export { countryList, countryInfo, fetchCountries };
