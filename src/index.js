import { getImage } from './getImage';

const refs = {
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtn.addEventListener('click', onLoadBtnClick);

let currentPage = 1;
const QUERY_KEY = 'query';
function onFormSubmit(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;

  if (refs.galleryEl.children) {
    refs.galleryEl.innerHTML = '';
    getImage(searchQuery.value);
  } else {
    getImage(searchQuery.value);
  }
}

function onLoadBtnClick() {
  currentPage += 1;
  const query = refs.inputEl.value;
  getImage(query, currentPage);
  refs.formEl.reset();
}
