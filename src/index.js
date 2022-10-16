import './css/styles.css';
import {
  countryList,
  countryInfo,
  fetchCountries,
} from './js/fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(inputHandling, DEBOUNCE_DELAY));

function inputHandling(event) {
  const name = event.target.value.trim().toLowerCase();
  if (!name) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(name);
}
